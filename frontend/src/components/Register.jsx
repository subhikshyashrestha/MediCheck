import { useState } from 'react'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      const data = await response.json()
      if (response.ok) {
        setSuccess('Registration successful! You can now login.')
        setError('')
      } else {
        setError(data.error || 'Registration failed')
        setSuccess('')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#eff6ff'
    }}>
      <div style={{
        background: '#fff',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: '24px', textAlign: 'center' }}>💊 MediCheck Register</h2>
        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '12px' }}>{success}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '24px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '14px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
          Register
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#555' }}>
          Already have an account? <a href="/login" style={{ color: '#2563eb' }}>Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register