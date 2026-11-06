import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Logo from '../../components/Logo.jsx'

const API_URL = import.meta.env.VITE_API_URL

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const num = (n) => (+n || 0).toLocaleString()

function MetricCard({ label, value, meta }) {
  return (
    <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-1.5 text-2xl font-extrabold text-white">{value}</p>
      {meta && <p className="mt-0.5 text-xs text-white/30">{meta}</p>}
    </div>
  )
}

function MonthlyBars({ monthly }) {
  const recent = monthly.slice(-6)
  const max = Math.max(1, ...recent.map((m) => m.visitors))
  return (
    <div className="flex items-end gap-3 h-28">
      {recent.map((m) => (
        <div key={m.yearMonth} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full bg-amber-400/80 rounded-t-sm"
              style={{ height: `${Math.max(4, (m.visitors / max) * 100)}%` }}
              title={`${m.label}: ${num(m.visitors)} visitors`}
            />
          </div>
          <span className="text-[10px] text-white/30">{m.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [analytics, setAnalytics] = useState(null)
  const [analyticsMessage, setAnalyticsMessage] = useState('')
  const [analyticsLoading, setAnalyticsLoading] = useState(true)

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

    fetch(`${API_URL}/api/analytics/visitors`, { headers: { Authorization: `Bearer ${tok}` } })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        setAnalytics(data.visitors || null)
        if (!ok) setAnalyticsMessage(data.message || 'Analytics is not connected yet.')
      })
      .catch(() => setAnalyticsMessage('Could not load analytics.'))
      .finally(() => setAnalyticsLoading(false))
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
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-white/40 text-sm mt-1">Traffic to pluggpress.com, from Google Analytics.</p>
          </div>

          {analyticsLoading ? (
            <p className="text-white/40 text-sm mb-12">Loading…</p>
          ) : analyticsMessage ? (
            <div className="mb-12 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-white/40 text-sm">{analyticsMessage}</p>
            </div>
          ) : (
            <div className="mb-12">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <MetricCard label="Live Now" value={num(analytics.realtime)} meta="Active visitors" />
                <MetricCard
                  label="This Month"
                  value={num(analytics.current)}
                  meta={analytics.change ? `${analytics.change >= 0 ? '+' : ''}${analytics.change}% vs last month` : undefined}
                />
                <MetricCard label="Last Month" value={num(analytics.previous)} />
                <MetricCard label="All Time" value={num(analytics.allTime)} />
                <MetricCard label="Avg Monthly" value={num(analytics.average)} />
              </div>
              {analytics.monthly?.length > 0 && (
                <div className="mt-4 border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
                  <MonthlyBars monthly={analytics.monthly} />
                </div>
              )}
            </div>
          )}

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Inbox</p>
            <h2 className="text-2xl font-bold">Contact form messages</h2>
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
