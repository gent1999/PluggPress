import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Logo from '../../components/Logo.jsx'

const API_URL = import.meta.env.VITE_API_URL

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminInfo', JSON.stringify(data.admin))
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login — PluggPress</title>
      </Helmet>

      <div className="min-h-screen bg-[#08080b] text-white flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="flex justify-center mb-8">
            <Logo className="w-40" />
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <h1 className="text-xl font-bold text-center mb-1">Admin Login</h1>
            <p className="text-white/40 text-sm text-center mb-6">Sign in to manage PluggPress</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                autoComplete="username"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-50 rounded-lg"
              />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-50 rounded-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
