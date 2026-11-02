import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', service: 'Cry808', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', service: 'Cry808', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-50 rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-50 rounded-lg"
        />
      </div>
      <select
        name="service"
        value={form.service}
        onChange={handleChange}
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-50 rounded-lg"
      >
        <option className="bg-zinc-900">Cry808</option>
        <option className="bg-zinc-900">ArtistHeat</option>
        <option className="bg-zinc-900">Genius</option>
        <option className="bg-zinc-900">Something else</option>
      </select>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us what you need"
        required
        rows={4}
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-50 rounded-lg resize-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
      {status === 'success' && <p className="text-green-400 text-sm">Got it — we'll get back to you soon.</p>}
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
    </form>
  )
}
