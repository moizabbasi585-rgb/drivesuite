'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import Sidebar from '../../../components/Sidebar'

export default function BrandingPage() {
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    school_name: '',
    whatsapp: '',
    google_review_link: '',
    brand_color: '#C9A84C',
  })

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (data) {
        setProfile(data)
        setForm({
          school_name: data.school_name || '',
          whatsapp: data.whatsapp || '',
          google_review_link: data.google_review_link || '',
          brand_color: data.brand_color || '#C9A84C',
        })
      }
      setLoading(false)
    }
    init()
  }, [router])

  async function handleSave() {
    setSaving(true)
    const { data: { session } } = await supabase.auth.getSession()

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, ...form, updated_at: new Date().toISOString() })

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0e0c' }}>
        <div style={{ color: '#C9A84C', fontSize: 14 }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', background: '#0f0e0c', minHeight: '100vh' }}>
      <Sidebar profile={profile} />

      <main style={{ marginLeft: 220, padding: '28px', flex: 1, maxWidth: 680 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#f0e8d8' }}>Branding</div>
          <div style={{ fontSize: 13, color: '#6b6055', marginTop: 2 }}>
            This information appears on your tools and is shown to your pupils
          </div>
        </div>

        <div style={{ background: '#141210', border: '0.5px solid #2a2520', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { key: 'school_name', label: 'Driving school name', placeholder: 'Drive With James' },
              { key: 'whatsapp', label: 'WhatsApp number', placeholder: '+44 7700 900000' },
              { key: 'google_review_link', label: 'Google review link', placeholder: 'https://g.page/r/...' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: 12, color: '#6b6055', display: 'block', marginBottom: 8 }}>
                  {field.label}
                </label>
                <input
                  type="text"
                  value={form[field.key]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div>
              <label style={{ fontSize: 12, color: '#6b6055', display: 'block', marginBottom: 8 }}>
                Brand colour
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input
                  type="color"
                  value={form.brand_color}
                  onChange={e => setForm(prev => ({ ...prev, brand_color: e.target.value }))}
                  style={{ width: 48, height: 36, padding: 2, borderRadius: 8, cursor: 'pointer' }}
                />
                <span style={{ fontSize: 13, color: '#9a9088' }}>{form.brand_color}</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: saved ? '#4a7c59' : '#C9A84C',
                color: '#0a0908',
                border: 'none',
                borderRadius: 10,
                padding: '12px',
                fontSize: 14,
                fontWeight: 500,
                marginTop: 4,
                opacity: saving ? 0.7 : 1,
                transition: 'background 0.3s',
              }}
            >
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save branding'}
            </button>
          </div>
        </div>

        <div style={{
          background: '#141210', border: '0.5px solid #2a2520',
          borderRadius: 12, padding: 20, marginTop: 16
        }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088', marginBottom: 12 }}>Preview</div>
          <div style={{
            background: '#0a0908', borderRadius: 10, padding: 16,
            borderLeft: `3px solid ${form.brand_color}`
          }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: form.brand_color }}>
              {form.school_name || 'Your School Name'}
            </div>
            <div style={{ fontSize: 12, color: '#6b6055', marginTop: 4 }}>
              {form.whatsapp || 'Your WhatsApp number'}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}