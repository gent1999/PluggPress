import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Logo from '../../components/Logo.jsx'

const API_URL = import.meta.env.VITE_API_URL

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = () => localStorage.getItem('adminToken')
  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    navigate('/admin/login')
  }

  useEffect(() => {
    const tok = token()
    const adminInfo = localStorage.getItem('adminInfo')
    if (!tok || !adminInfo) {
      navigate('/admin/login')
      return
    }
    setAdmin(JSON.parse(adminInfo))

    fetch(`${API_URL}/api/leads`, { headers: { Authorization: `Bearer ${tok}` } })
      .then((res) => {
        if (res.status === 401) {
          logout()
          return { leads: [] }
        }
        return res.json()
      })
      .then((data) => setLeads(data.leads || []))
      .catch(() => setError('Could not load leads.'))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await fetch(`${API_URL}/api/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token()}` },
      })
      setLeads((prev) => prev.filter((l) => l.id !== id))
    } catch {
      setError('Could not delete that message.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin — PluggPress</title>
      </Helmet>

      <div className="min-h-screen bg-[#08080b] text-white">
        <header className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo className="w-28" />
            <div className="flex items-center gap-4">
              {admin && <span className="text-white/40 text-sm">{admin.email}</span>}
              <button
                onClick={logout}
                className="text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5 transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Dashboard</p>
            <h1 className="text-2xl font-bold">Contact form messages</h1>
            <p className="text-white/40 text-sm mt-1">Everything submitted through the PluggPress contact page.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-white/40 text-sm">Loading…</p>
          ) : leads.length === 0 ? (
            <div className="border border-white/10 rounded-2xl p-10 text-center">
              <p className="text-white/40 text-sm">No messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold">{lead.name}</p>
                      <a href={`mailto:${lead.email}`} className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
                        {lead.email}
                      </a>
                      {lead.service && (
                        <span className="ml-2 text-xs text-white/40 border border-white/10 rounded-full px-2 py-0.5">
                          {lead.service}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-white/30">{fmtDate(lead.created_at)}</span>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/70 whitespace-pre-wrap">{lead.message}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
