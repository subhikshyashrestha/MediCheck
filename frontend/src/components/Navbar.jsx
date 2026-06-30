function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 48px',
      background: '#fff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h2 style={{ color: '#2563eb', fontSize: '1.5rem' }}>💊 MediCheck</h2>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</a>
        <a href="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Login</a>
        <a href="/register" style={{
          textDecoration: 'none',
          background: '#2563eb',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600'
        }}>Register</a>
      </div>
    </nav>
  )
}

export default Navbar