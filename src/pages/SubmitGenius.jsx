import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

// Genius Lyrics is handled by the same backend as Cry808's submission flow.
const GENIUS_API_URL = import.meta.env.VITE_CRY808_API_URL
const PENDING_KEY = 'pluggpress_genius_pending_submission'
const RETURN_PATH = '/submit-genius'

const inputCls = 'w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-colors rounded-lg'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2'

export default function SubmitGenius() {
  const [form, setForm] = useState({
    artist_name: '', email: '', song_title: '', genius_song_url: '', genius_lyrics: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('form') // form | success
  const [canceled, setCanceled] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const checkout = params.get('checkout')
    if (checkout === 'success') {
      sessionStorage.removeItem(PENDING_KEY)
      setStatus('success')
      window.history.replaceState({}, '', RETURN_PATH)
    } else if (checkout === 'canceled') {
      const saved = sessionStorage.getItem(PENDING_KEY)
      if (saved) {
        try { setForm((p) => ({ ...p, ...JSON.parse(saved) })) } catch { /* ignore */ }
      }
      setCanceled(true)
      window.history.replaceState({}, '', RETURN_PATH)
    }
  }, [])

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }
  const handle = (e) => set(e.target.name, e.target.value)

  const validate = () => {
    const e = {}
    if (!form.artist_name.trim()) e.artist_name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.song_title.trim()) e.song_title = 'Required'
    if (!form.genius_song_url.trim()) e.genius_song_url = 'Required'
    if (!form.genius_lyrics.trim()) e.genius_lyrics = 'Required'
    else if (form.genius_lyrics.trim().length < 100) e.genius_lyrics = 'At least 100 characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setServerError('')
    try {
      const fd = new FormData()
      fd.append('artist_name', form.artist_name)
      fd.append('email', form.email)
      fd.append('title', form.song_title)
      fd.append('content', form.genius_lyrics)
      fd.append('submission_type', 'genius')
      fd.append('genius_song_url', form.genius_song_url)
      fd.append('genius_lyrics', form.genius_lyrics)
      fd.append('return_path', RETURN_PATH)

      const r = await fetch(`${GENIUS_API_URL}/api/submissions/create-checkout-session`, { method: 'POST', body: fd })
      const d = await r.json()
      if (r.ok && d.url) {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(form))
        window.location.href = d.url
        return
      }
      setServerError(d.message || 'Failed to start checkout. Please try again.')
    } catch {
      setServerError('Network error. Please try again.')
    }
    setIsLoading(false)
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Helmet>
          <title>Submission Received — PluggPress</title>
        </Helmet>
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-3">Payment received!</h1>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              We'll post your lyrics to Genius.com within 2–3 business days.
            </p>
            <p className="text-white/30 text-xs mb-10">
              Confirmation sent to <span className="text-white/50">{form.email}</span>
            </p>
            <a href="/" className="inline-block px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg transition-colors">
              ← Back to PluggPress
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Helmet>
        <title>Genius Lyrics — PluggPress</title>
        <meta name="description" content="Get your song lyrics formatted and published on Genius.com. $5, handled securely through Stripe." />
      </Helmet>
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto px-6 py-10 w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 mb-2">Genius · Lyrics Publishing</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Get your lyrics posted to Genius</h1>
        <p className="text-white/50 text-sm mb-6">
          We'll format and publish your lyrics to Genius.com on your behalf — pay once, submit once, all without leaving PluggPress.
        </p>

        <div className="flex items-center justify-between px-5 py-3.5 mb-6 border border-yellow-400/25 bg-yellow-950/10 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">📝 Genius Lyrics</span>
            <span className="text-sm font-bold text-yellow-400">$5</span>
          </div>
          <span className="hidden sm:inline text-xs text-white/40">2–3 day turnaround</span>
        </div>

        <p className="text-white/40 text-xs mb-6">
          Your artist page on Genius must exist, or we'll create an entry for this song.
        </p>

        {canceled && (
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 mb-5 border border-amber-500/25 bg-amber-950/10 text-amber-200/70 text-xs rounded-lg">
            <span>Payment canceled — your info wasn't charged. Pick up where you left off whenever you're ready.</span>
            <button onClick={() => setCanceled(false)} className="text-amber-200/40 hover:text-amber-200/80 flex-shrink-0">✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Artist Name <span className="text-red-400">*</span></label>
              <input name="artist_name" value={form.artist_name} onChange={handle} placeholder="Exactly as on Genius.com" className={inputCls} disabled={isLoading} />
              {errors.artist_name && <p className="text-red-400 text-xs mt-1.5">{errors.artist_name}</p>}
            </div>
            <div>
              <label className={labelCls}>Email <span className="text-red-400">*</span></label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" className={inputCls} disabled={isLoading} />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Song Title <span className="text-red-400">*</span></label>
            <input name="song_title" value={form.song_title} onChange={handle} placeholder="Exact title as it should appear on Genius" className={inputCls} disabled={isLoading} />
            {errors.song_title && <p className="text-red-400 text-xs mt-1.5">{errors.song_title}</p>}
          </div>

          <div>
            <label className={labelCls}>Song / Artist URL <span className="text-red-400">*</span></label>
            <input name="genius_song_url" type="url" value={form.genius_song_url} onChange={handle} placeholder="Spotify, Apple Music, YouTube, or existing Genius URL" className={inputCls} disabled={isLoading} />
            {errors.genius_song_url && <p className="text-red-400 text-xs mt-1.5">{errors.genius_song_url}</p>}
          </div>

          <div>
            <label className={labelCls}>Lyrics <span className="text-red-400">*</span></label>
            <p className="text-white/30 text-[11px] mb-2">Use section labels like [Verse 1], [Chorus], [Bridge] to format your lyrics.</p>
            <textarea name="genius_lyrics" value={form.genius_lyrics} onChange={handle} rows={10}
              placeholder="Paste your full lyrics here… (min 100 chars)"
              className={`${inputCls} resize-none`} disabled={isLoading} />
            <div className="flex justify-between items-center mt-1.5">
              {errors.genius_lyrics ? <p className="text-red-400 text-xs">{errors.genius_lyrics}</p> : <span className="text-[10px] text-white/25">min 100 chars</span>}
              <span className={`text-[10px] font-mono ${form.genius_lyrics.length >= 100 ? 'text-yellow-400' : 'text-white/25'}`}>{form.genius_lyrics.length}</span>
            </div>
          </div>

          {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

          <button type="submit" disabled={isLoading}
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Redirecting to secure checkout…' : 'Pay $5 & Submit →'}
          </button>
          <p className="text-center text-white/25 text-[10px]">
            Secure payment via Stripe. Non-refundable regardless of outcome.
          </p>
        </form>
      </div>

      <Footer />
    </div>
  )
}
