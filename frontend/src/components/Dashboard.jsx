import { useState, useEffect } from 'react'

function Dashboard() {
  const [medicines, setMedicines] = useState([])
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [error, setError] = useState('')

  const token = localStorage.getItem('access')

  const fetchMedicines = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/medicines/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    setMedicines(data)
  }

  useEffect(() => {
    fetchMedicines()
  }, [])

  const handleAdd = async () => {
    if (!name || !dosage || !reminderTime) {
      setError('Please fill in all fields')
      return
    }
    const response = await fetch('http://127.0.0.1:8000/api/medicines/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, dosage, reminder_time: reminderTime })
    })
    if (response.ok) {
      setName('')
      setDosage('')
      setReminderTime('')
      setError('')
      fetchMedicines()
    }
  }

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/medicines/${id}/delete/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetchMedicines()
  }

return (
    <div style={{ minHeight: '100vh', background: '#eff6ff', padding: '40px' }}>
      <h1 style={{ color: '#1e40af', marginBottom: '32px', textAlign: 'center' }}>💊 MediCheck Dashboard</h1>

      <div style={{ display: 'flex', gap: '32px', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap' }}>
        
        {/* Add Medicine Form */}
        <div style={{
          background: '#fff',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
          flex: '1',
          minWidth: '280px'
        }}>
          <h2 style={{ color: '#2563eb', marginBottom: '20px' }}>Add Medicine</h2>
          {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
          <input
            type="text"
            placeholder="Medicine name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          <input
            type="text"
            placeholder="Dosage (e.g. 500mg)"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              background: '#2563eb',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
            Add Medicine
          </button>
        </div>

        {/* Medicines List */}
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h2 style={{ color: '#1e40af', marginBottom: '16px' }}>My Medicine List</h2>
          {medicines.length === 0 ? (
            <p style={{ color: '#64748b' }}>No medicines added yet.</p>
          ) : (
            medicines.map((med) => (
              <div key={med.id} style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ color: '#1e40af', margin: '0 0 4px' }}>{med.name}</h3>
                  <p style={{ color: '#64748b', margin: 0 }}>{med.dosage} — ⏰ {med.reminder_time}</p>
                </div>
                <button
                  onClick={() => handleDelete(med.id)}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard