'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('login')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email to confirm your account, then log in.')
        setMode('login')
      }
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0e0c',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: 32, fontWeight: 500, color: '#C9A84C', marginBottom: 6 }}>DriveSuite</div>
          <div style={{ fontSize: 14, color: '#6b6055' }}>The complete toolkit for driving instructors</div>
        </div>

        <div style={{
          background: '#141210',
          border: '0.5px solid #2a2520',
          borderRadius: 16,
          padding: '32px'
        }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: '#f0e8d8', marginBottom: 24 }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: '#6b6055', display: 'block', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="james@drivewithme.co.uk"
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, color: '#6b6055', display: 'block', marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div style={{ background: '#2a1010', border: '0.5px solid #5a2020', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#e07070', marginBottom: 16 }}>
                {error}
              </div>
            )}
            {message && (
              <div style={{ background: '#0a2010', border: '0.5px solid #205a30', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#70c090', marginBottom: 16 }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: '#C9A84C',
                color: '#0a0908',
                border: 'none',
                borderRadius: 10,
                padding: '12px',
                fontSize: 14,
                fontWeight: 500,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6b6055' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMessage('') }}
              style={{ color: '#C9A84C', cursor: 'pointer' }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#3a3530' }}>
          © 2024 DriveSuite · Built for UK driving instructors
        </div>
      </div>
    </div>
  )
}