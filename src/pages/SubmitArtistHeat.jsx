import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const ARTISTHEAT_API_URL = import.meta.env.VITE_ARTISTHEAT_API_URL
const PENDING_KEY = 'pluggpress_artistheat_pending_submission'

const inputCls = 'w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors rounded-lg'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2'

function Check() {
  return (
    <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function SubmitArtistHeat() {
  const [form, setForm] = useState({
    artistName: '', email: '', title: '', genre: '', instagramUrl: '',
    content: '', youtubeUrl: '', spotifyUrl: '', soundcloudUrl: '', appleMusicUrl: '',
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
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
      window.history.replaceState({}, '', '/submit-artistheat')
    } else if (checkout === 'canceled') {
      const saved = sessionStorage.getItem(PENDING_KEY)
      if (saved) {
        try { setForm((p) => ({ ...p, ...JSON.parse(saved) })) } catch { /* ignore */ }
      }
      setCanceled(true)
      window.history.replaceState({}, '', '/submit-artistheat')
    }
  }, [])

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }
  const handle = (e) => set(e.target.name, e.target.value)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setErrors((p) => ({ ...p, image: 'Images only' })); return }
    if (file.size > 5 * 1024 * 1024) { setErrors((p) => ({ ...p, image: 'Image must be under 5MB' })); return }
    setErrors((p) => ({ ...p, image: undefined }))
    set('image', file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const e = {}
    if (!form.artistName.trim()) e.artistName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.title.trim()) e.title = 'Required'
    if (!form.content.trim()) e.content = 'Required'
    else if (form.content.trim().length < 50) e.content = 'At least 50 characters'
    if (!form.youtubeUrl && !form.spotifyUrl && !form.soundcloudUrl && !form.appleMusicUrl)
      e.links = 'At least one streaming link required'
    setErrors(e)
    return !Object.keys(e).length
  }

  // ArtistHeat's backend (ServerHeat) takes a pre-uploaded Cloudinary URL
  // rather than a raw multipart file, so the image goes straight to
  // Cloudinary via a short-lived signature before the submission itself.
  const uploadImageIfPresent = async () => {
    if (!form.image) return null
    const sigRes = await fetch(`${ARTISTHEAT_API_URL}/api/submissions/upload-signature`, { method: 'POST' })
    if (!sigRes.ok) throw new Error('Failed to prepare image upload')
    const { cloudName, apiKey, timestamp, signature, folder } = await sigRes.json()

    const fd = new FormData()
    fd.append('file', form.image)
    fd.append('api_key', apiKey)
    fd.append('timestamp', String(timestamp))
    fd.append('signature', signature)
    fd.append('folder', folder)

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: fd })
    if (!uploadRes.ok) throw new Error('Image upload failed')
    const data = await uploadRes.json()
    return data.secure_url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setServerError('')
    try {
      const imageUrl = await uploadImageIfPresent().catch(() => null)
      const { image, ...fields } = form

      const r = await fetch(`${ARTISTHEAT_API_URL}/api/submissions/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, imageUrl }),
      })
      const d = await r.json()
      if (r.ok && d.url) {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify({ ...form, image: null }))
        window.location.href = d.url
        return
      }
      setServerError(d.error || 'Failed to start checkout. Please try again.')
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
            <div className="text-6xl mb-6">⚡</div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-3">Payment received!</h1>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Your submission jumped to the top of ArtistHeat's review queue. Expect to hear from us within 1–2 days.
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
        <title>Submit to ArtistHeat — PluggPress</title>
        <meta name="description" content="Submit your music to ArtistHeat for a dedicated article. $5 skip-the-line review, handled securely through Stripe." />
      </Helmet>
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto px-6 py-10 w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">ArtistHeat · Paid Submission</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Get featured on ArtistHeat</h1>
        <p className="text-white/50 text-sm mb-6">
          Fill this out once, pay securely with Stripe, and you're at the top of the queue — all without leaving PluggPress.
        </p>

        <div className="flex items-center justify-between px-5 py-3.5 mb-6 border border-red-500/25 bg-red-950/10 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">⚡ Skip the Line</span>
            <span className="text-sm font-bold text-red-400">$5</span>
          </div>
          <ul className="hidden sm:flex items-center gap-4 text-xs text-white/40">
            <li className="flex items-center gap-1.5"><Check />1–2 day turnaround</li>
          </ul>
        </div>

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
              <input name="artistName" value={form.artistName} onChange={handle} placeholder="Your artist name" className={inputCls} disabled={isLoading} />
              {errors.artistName && <p className="text-red-400 text-xs mt-1.5">{errors.artistName}</p>}
            </div>
            <div>
              <label className={labelCls}>Email <span className="text-red-400">*</span></label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" className={inputCls} disabled={isLoading} />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Song / Project Title <span className="text-red-400">*</span></label>
            <input name="title" value={form.title} onChange={handle} placeholder="Name of your song, EP, or album" className={inputCls} disabled={isLoading} />
            {errors.title && <p className="text-red-400 text-xs mt-1.5">{errors.title}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Genre <span className="text-white/30 normal-case font-normal">(optional)</span></label>
              <input name="genre" value={form.genre} onChange={handle} placeholder="e.g. R&B, Afrobeats, Hip-Hop" className={inputCls} disabled={isLoading} />
            </div>
            <div>
              <label className={labelCls}>Instagram <span className="text-white/30 normal-case font-normal">(optional)</span></label>
              <input name="instagramUrl" value={form.instagramUrl} onChange={handle} placeholder="@yourhandle" className={inputCls} disabled={isLoading} />
            </div>
          </div>

          <div>
            <label className={labelCls}>About Your Sound <span className="text-red-400">*</span></label>
            <textarea name="content" value={form.content} onChange={handle} rows={4}
              placeholder="Tell us about your music, your style, your story. (min 50 chars)"
              className={`${inputCls} resize-none`} disabled={isLoading} />
            <div className="flex justify-between items-center mt-1.5">
              {errors.content ? <p className="text-red-400 text-xs">{errors.content}</p> : <span className="text-[10px] text-white/25">min 50 chars</span>}
              <span className={`text-[10px] font-mono ${form.content.length >= 50 ? 'text-amber-400' : 'text-white/25'}`}>{form.content.length}</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Streaming Links <span className="text-red-400">*</span> <span className="text-white/30 normal-case font-normal">(at least one)</span></label>
            {errors.links && <p className="text-red-400 text-xs mb-2">{errors.links}</p>}
            <div className="space-y-2.5">
              {[
                ['spotifyUrl', '🎵', 'Spotify', 'https://open.spotify.com/track/...'],
                ['youtubeUrl', '▶️', 'YouTube', 'https://youtube.com/watch?v=...'],
                ['appleMusicUrl', '🍎', 'Apple Music', 'https://music.apple.com/...'],
                ['soundcloudUrl', '☁️', 'SoundCloud', 'https://soundcloud.com/...'],
              ].map(([key, emoji, label, ph]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-base w-7 flex-shrink-0 text-center select-none">{emoji}</span>
                  <input name={key} type="url" value={form[key]} onChange={handle} placeholder={`${label} — ${ph}`}
                    className="flex-1 px-3 py-2.5 bg-white/[0.04] border border-white/10 text-white text-xs placeholder-white/25 focus:outline-none focus:border-amber-400/50 rounded-lg transition-colors" disabled={isLoading} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Cover Art <span className="text-white/30 normal-case font-normal">(optional · max 5MB)</span></label>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover rounded-lg border border-white/10" />
                <button type="button" onClick={() => { set('image', null); setImagePreview(null) }}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-900/80 text-white w-7 h-7 flex items-center justify-center text-xs rounded-md border border-white/20 transition-colors">
                  ✕
                </button>
              </div>
            ) : (
              <input type="file" accept="image/*" onChange={handleImage} disabled={isLoading}
                className={`${inputCls} file:mr-3 file:py-1 file:px-3 file:border-0 file:rounded file:bg-white/[0.08] file:text-white/60 file:text-xs file:cursor-pointer`} />
            )}
            {errors.image && <p className="text-red-400 text-xs mt-1.5">{errors.image}</p>}
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
