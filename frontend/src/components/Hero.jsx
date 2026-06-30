function Hero() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '100px 40px',
      background: 'linear-gradient(135deg, #1e40af, #2563eb)',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        💊 Your Personal Medicine Safety Assistant
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#bfdbfe', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
        Track your medicines, get reminders, and instantly check interactions using AI — all in one place.
      </p>
      <a href="/register" style={{
        background: '#fff',
        color: '#2563eb',
        padding: '14px 36px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold'
      }}>Get Started →</a>
    </div>
  )
}

export default Hero