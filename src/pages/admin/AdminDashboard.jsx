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

function TrafficChart({ monthly }) {
  const [hovered, setHovered] = useState(null)

  const values = monthly.map((point) => Math.max(0, +point.visitors || 0))
  const max = Math.max(...values, 1)
  const chartWidth = 760
  const chartHeight = 280
  const left = 48
  const right = 20
  const top = 20
  const bottom = 40
  const plotWidth = chartWidth - left - right
  const plotHeight = chartHeight - top - bottom
  const divisor = Math.max(values.length - 1, 1)
  const points = values.map((value, index) => [
    left + (index / divisor) * plotWidth,
    top + plotHeight - (value / max) * plotHeight,
  ])
  const d = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
  const area = `${d} L ${points.at(-1)[0]} ${chartHeight - bottom} L ${points[0][0]} ${chartHeight - bottom} Z`
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: top + plotHeight - ratio * plotHeight,
    value: Math.round(max * ratio),
  }))
  const labelStep = Math.max(1, Math.ceil(monthly.length / 9))

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="pluggTrafficLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="55%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="pluggTrafficArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map(({ y, value }) => (
          <g key={y}>
            <line x1={left} x2={chartWidth - right} y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
            <text x="4" y={y + 4} fill="rgba(255,255,255,.3)" fontSize="11">{num(value)}</text>
          </g>
        ))}
        <path d={area} fill="url(#pluggTrafficArea)" />
        <path d={d} fill="none" stroke="url(#pluggTrafficLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map(([x, y], index) => (
          <g key={monthly[index]?.yearMonth || index}>
            <circle cx={x} cy={y} r="4" fill="#08080b" stroke="#fbbf24" strokeWidth="2.2" />
            <circle
              cx={x}
              cy={y}
              r="14"
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHovered({
                label: monthly[index]?.label,
                visitors: monthly[index]?.visitors,
                left: `${(x / chartWidth) * 100}%`,
                top: `${(y / chartHeight) * 100}%`,
              })}
              onMouseLeave={() => setHovered(null)}
            />
            {(index % labelStep === 0 || index === points.length - 1) && (
              <text x={x} y={chartHeight - 10} textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="12">{monthly[index]?.label}</text>
            )}
          </g>
        ))}
      </svg>
      {hovered && (
        <div
          className="pointer-events-none absolute z-10 border border-white/10 bg-[#0d0d10]/95 px-3 py-2 text-xs rounded-lg shadow-lg backdrop-blur-md"
          style={{ left: hovered.left, top: hovered.top, transform: 'translate(-50%, calc(-100% - 12px))' }}
        >
          <div className="font-semibold text-white">{num(hovered.visitors)} visits</div>
          <div className="mt-0.5 text-white/40">{hovered.label}</div>
        </div>
      )}
    </div>
  )
}

function SearchTable({ title, rows, firstColumn }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{title}</p>
      <div className="border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-[11px] text-white/40">
            <tr>
              <th className="px-3 py-2 font-medium">{firstColumn}</th>
              <th className="px-3 py-2 text-right font-medium">Clicks</th>
              <th className="px-3 py-2 text-right font-medium">Impr.</th>
              <th className="px-3 py-2 text-right font-medium">CTR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.length ? rows.map((row, i) => (
              <tr key={`${row.label}-${i}`} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-3 py-2 max-w-[200px] truncate text-white/70">{row.label}</td>
                <td className="px-3 py-2 text-right font-medium text-amber-400">{num(row.clicks)}</td>
                <td className="px-3 py-2 text-right text-white/50">{num(row.impressions)}</td>
                <td className="px-3 py-2 text-right text-purple-300">{row.ctr}%</td>
              </tr>
            )) : (
              <tr><td colSpan="4" className="px-3 py-6 text-center text-white/30">No data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
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
  const [seo, setSeo] = useState(null)
  const [seoQueries, setSeoQueries] = useState([])
  const [seoPages, setSeoPages] = useState([])
  const [seoMessage, setSeoMessage] = useState('')
  const [seoLoading, setSeoLoading] = useState(true)

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

    const hdrs = { Authorization: `Bearer ${tok}` }
    Promise.all([
      fetch(`${API_URL}/api/search-console/performance`, { headers: hdrs }),
      fetch(`${API_URL}/api/search-console/top-queries`, { headers: hdrs }),
      fetch(`${API_URL}/api/search-console/top-pages`, { headers: hdrs }),
    ])
      .then(async ([perfRes, queriesRes, pagesRes]) => {
        const perfData = await perfRes.json()
        setSeo(perfData.performance || null)
        if (!perfRes.ok) setSeoMessage(perfData.message || 'Search Console is not connected yet.')
        const queriesData = await queriesRes.json()
        setSeoQueries(queriesData.queries || [])
        const pagesData = await pagesRes.json()
        setSeoPages(pagesData.pages || [])
      })
      .catch(() => setSeoMessage('Could not load Search Console.'))
      .finally(() => setSeoLoading(false))
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
              <div className="mt-4 border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
                {analytics.monthly?.length > 0 ? (
                  <TrafficChart monthly={analytics.monthly} />
                ) : (
                  <div className="h-56 flex items-center justify-center text-center">
                    <p className="text-white/30 text-sm">
                      Monthly traffic will show up here once Google Analytics has processed a full day of data.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-2">Search</p>
            <h2 className="text-2xl font-bold">Search Console</h2>
            <p className="text-white/40 text-sm mt-1">How pluggpress.com shows up in Google Search, last 28 days.</p>
          </div>

          {seoLoading ? (
            <p className="text-white/40 text-sm mb-12">Loading…</p>
          ) : seoMessage ? (
            <div className="mb-12 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-white/40 text-sm">{seoMessage}</p>
            </div>
          ) : (
            <div className="mb-12">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <MetricCard label="Clicks" value={num(seo.clicks)} />
                <MetricCard label="Impressions" value={num(seo.impressions)} />
                <MetricCard label="CTR" value={`${seo.ctr || 0}%`} />
                <MetricCard label="Avg Position" value={seo.position || 0} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <SearchTable
                  title="Top Keywords"
                  firstColumn="Keyword"
                  rows={seoQueries.slice(0, 6).map((q) => ({ label: q.query, clicks: q.clicks, impressions: q.impressions, ctr: q.ctr }))}
                />
                <SearchTable
                  title="Top Pages"
                  firstColumn="Page"
                  rows={seoPages.slice(0, 6).map((p) => ({ label: p.page?.replace(/^https?:\/\/[^/]+/, '') || '/', clicks: p.clicks, impressions: p.impressions, ctr: p.ctr }))}
                />
              </div>
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
