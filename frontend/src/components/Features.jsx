function Features() {
  const features = [
    {
      icon: '⏰',
      title: 'Medicine Reminders',
      description: 'Get notified at the right time to take your medicines every day.'
    },
    {
      icon: '🔍',
      title: 'Interaction Checker',
      description: 'Check if two or more medicines are safe to take together.'
    },
    {
      icon: '🤖',
      title: 'AI Explanation',
      description: 'Get simple, plain-English explanations of any medicine interaction risk.'
    }
  ]

  return (
    <div style={{ padding: '80px 48px', textAlign: 'center', background: '#f8fafc' }}>
      <h2 style={{ fontSize: '2rem', color: '#1e40af', marginBottom: '12px' }}>Why MediCheck?</h2>
      <p style={{ color: '#64748b', marginBottom: '48px' }}>Everything you need to stay safe with your medicines.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px 32px',
            width: '280px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '3rem' }}>{f.icon}</div>
            <h3 style={{ color: '#2563eb', margin: '16px 0 8px', fontSize: '1.2rem' }}>{f.title}</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features