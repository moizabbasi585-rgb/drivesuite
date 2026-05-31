'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/Sidebar'

const tools = [
  {
    name: 'Pupil Progress Log',
    desc: 'Track DVSA skill levels, share progress with parents',
    icon: '◎',
    tag: 'Live',
    tagColor: '#4a7c59',
    tagBg: '#4a7c5922',
    url: 'YOUR_PUPIL_PROGRESS_URL',
  },
  {
    name: 'Review Multiplier',
    desc: 'Generate Google review drafts, send pupils your link',
    icon: '★',
    tag: 'Live',
    tagColor: '#4a7c59',
    tagBg: '#4a7c5922',
    url: 'YOUR_REVIEW_MULTIPLIER_URL',
  },
  {
    name: 'PassCard Generator',
    desc: 'Create Instagram story pass cards, WhatsApp instantly',
    icon: '⬡',
    tag: 'Popular',
    tagColor: '#C9A84C',
    tagBg: '#C9A84C22',
    url: 'YOUR_PASSCARD_URL',
  },
  {
    name: 'Quote Generator',
    desc: 'Customer gets instant estimate, sends via WhatsApp',
    icon: '◷',
    tag: 'Live',
    tagColor: '#4a7c59',
    tagBg: '#4a7c5922',
    url: 'YOUR_QUOTE_GENERATOR_URL',
  },
  {
    name: 'Job Pipeline',
    desc: 'Track leads from quote through to completed job',
    icon: '⊞',
    tag: 'Live',
    tagColor: '#4a7c59',
    tagBg: '#4a7c5922',
    url: 'YOUR_JOB_PIPELINE_URL',
  },
]

const activity = [
  { text: 'Pass card sent — Sarah M.', time: '2h ago', color: '#C9A84C' },
  { text: 'New Google review — Tom K.', time: 'Yesterday', color: '#4a7abf' },
  { text: 'Pupil progress updated — Aisha R.', time: '2 days ago', color: '#4a7c59' },
  { text: 'Pass card sent — Daniel W.', time: '3 days ago', color: '#C9A84C' },
  { text: 'New Google review — Priya S.', time: '4 days ago', color: '#4a7abf' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      setProfile(data)
      setLoading(false)
    }
    init()
  }, [router])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0e0c' }}>
        <div style={{ color: '#C9A84C', fontSize: 14 }}>Loading...</div>
      </div>
    )
  }

  const firstName = profile?.school_name?.split(' ')[2] || user?.email?.split('@')[0] || 'there'

  return (
    <div style={{ display: 'flex', background: '#0f0e0c', minHeight: '100vh' }}>
      <Sidebar profile={profile} />

      <main style={{ marginLeft: 220, padding: '28px', flex: 1 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#f0e8d8' }}>
              Good morning, {firstName} 👋
            </div>
            <div style={{ fontSize: 13, color: '#6b6055', marginTop: 2 }}>
              Here's what's happening with your business today
            </div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#1e1a10',
            border: '1px solid #C9A84C44',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#C9A84C', fontSize: 13, fontWeight: 500, cursor: 'pointer'
          }}>
            {(profile?.school_name || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Active pupils', val: '12', change: '+2 this week', changeColor: '#4a7c59' },
            { label: 'Reviews collected', val: '34', change: '+5 this month', changeColor: '#4a7abf' },
            { label: 'Pass cards sent', val: '8', change: 'This month', changeColor: '#6b6055' },
            { label: 'Quotes sent', val: '3', change: '£2,400 pipeline', changeColor: '#4a7c59' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#141210',
              border: i === 0 ? '0.5px solid #C9A84C33' : '0.5px solid #2a2520',
              borderRadius: 10,
              padding: '16px 18px',
            }}>
              <div style={{ fontSize: 11, color: '#6b6055', marginBottom: 8 }}>{stat.label}</div>
              <div style={{ fontSize: 26, fontWeight: 500, color: i === 0 ? '#C9A84C' : '#f0e8d8' }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: stat.changeColor, marginTop: 4 }}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088', marginBottom: 14, letterSpacing: '0.3px' }}>
          Your tools
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {tools.map((tool, i) => (
            <div
              key={i}
              onClick={() => window.open(tool.url, '_blank')}
              style={{
                background: '#141210',
                border: '0.5px solid #2a2520',
                borderRadius: 12,
                padding: 18,
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#C9A84C55'
                e.currentTarget.style.background = '#1a1610'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2a2520'
                e.currentTarget.style.background = '#141210'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: '#1e1a10', border: '0.5px solid #2a2520',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 12, fontSize: 20, color: '#C9A84C'
              }}>
                {tool.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#e8dcc8', marginBottom: 4 }}>{tool.name}</div>
              <div style={{ fontSize: 12, color: '#6b6055', lineHeight: 1.5 }}>{tool.desc}</div>
              <div style={{
                display: 'inline-block', fontSize: 10, padding: '2px 8px',
                borderRadius: 10, marginTop: 10,
                background: tool.tagBg, color: tool.tagColor
              }}>
                {tool.tag}
              </div>
              <span style={{ position: 'absolute', top: 16, right: 16, color: '#3a3530', fontSize: 16 }}>↗</span>
            </div>
          ))}

          {/* Coming soon slot */}
          <div style={{
            background: '#141210', border: '0.5px dashed #2a2520',
            borderRadius: 12, padding: 18, opacity: 0.5,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#1e1a10', border: '0.5px solid #2a2520',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12, fontSize: 20, color: '#6b6055'
            }}>+</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#6b6055', marginBottom: 4 }}>More coming soon</div>
            <div style={{ fontSize: 12, color: '#4a4540', lineHeight: 1.5 }}>New tools added regularly for DriveSuite members</div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Activity */}
          <div style={{ background: '#141210', border: '0.5px solid #2a2520', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088', marginBottom: 14 }}>Recent activity</div>
            {activity.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0',
                borderBottom: i < activity.length - 1 ? '0.5px solid #1e1c18' : 'none'
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: '#9a9088', flex: 1 }}>{item.text}</div>
                <div style={{ fontSize: 11, color: '#4a4540' }}>{item.time}</div>
              </div>
            ))}
          </div>

          {/* Branding summary */}
          <div style={{ background: '#141210', border: '0.5px solid #2a2520', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088', marginBottom: 14 }}>Your branding</div>
            {[
              { label: 'School name', val: profile?.school_name || '—' },
              { label: 'WhatsApp', val: profile?.whatsapp || '—' },
              { label: 'Google link', val: profile?.google_review_link ? 'Set ✓' : 'Not set' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#6b6055', width: 90, flexShrink: 0 }}>{row.label}</div>
                <div style={{
                  fontSize: 12, color: '#9a9088',
                  background: '#0f0e0c', border: '0.5px solid #2a2520',
                  borderRadius: 6, padding: '6px 10px', flex: 1
                }}>{row.val}</div>
              </div>
            ))}
            <button
              onClick={() => router.push('/dashboard/branding')}
              style={{
                width: '100%', background: '#C9A84C', color: '#0a0908',
                border: 'none', borderRadius: 8,
                padding: '9px', fontSize: 12, fontWeight: 500, marginTop: 4
              }}
            >
              Update branding
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
