'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/Sidebar'

const tools = [
  {
    name: 'Hours Predictor',
    desc: 'Predict how many hours a pupil needs before they are test ready.',
    longDesc: 'Enter pupil details and driving history — the tool predicts how many hours they will likely need before their test. Great for setting expectations with new pupils and their parents.',
    icon: '⏱',
    tag: 'Live',
    tagColor: '#4a7c59',
    tagBg: '#4a7c5922',
    url: 'https://driving-school-predictor.vercel.app/',
    color: '#4a7c59',
  },
  {
    name: 'PassCard Generator',
    desc: 'Create a branded Instagram story pass card and WhatsApp it to your pupil instantly.',
    longDesc: 'Enter pupil name, upload their photo, pick a pass message — generates a professional 1080×1920 branded story card in seconds. Download and WhatsApp it to them right after their test.',
    icon: '🎉',
    tag: 'Popular',
    tagColor: '#C9A84C',
    tagBg: '#C9A84C22',
    url: 'https://diveresult.vercel.app/',
    color: '#C9A84C',
  },
  {
    name: 'Google Review Tool',
    desc: 'Send pupils a link — they get an AI-written review draft and land on your Google page.',
    longDesc: 'Pupil clicks your unique link, picks tags describing you, gets an AI-written review draft ready to copy, then lands directly on your Google Maps page to paste it. More 5-star reviews, zero effort.',
    icon: '⭐',
    tag: 'Live',
    tagColor: '#4a7abf',
    tagBg: '#4a7abf22',
    url: 'https://drive-booster.vercel.app/',
    color: '#4a7abf',
  },
  {
    name: 'Pupil Progress Chart',
    desc: 'Track DVSA skill levels for each pupil and share live progress with parents.',
    longDesc: 'Your pupils progress through DVSA skills rated 1–5. Parents get a beautiful shareable link showing real-time progress rings and skill badges. Looks premium, builds trust with families.',
    icon: '📈',
    tag: 'Live',
    tagColor: '#9a6abf',
    tagBg: '#9a6abf22',
    url: 'https://driving-school-portal-n7b1.vercel.app/',
    color: '#9a6abf',
  },
]

const activity = [
  { text: 'Pass card sent — Sarah M.', time: '2h ago', color: '#C9A84C' },
  { text: 'New Google review — Tom K.', time: 'Yesterday', color: '#4a7abf' },
  { text: 'Pupil progress updated — Aisha R.', time: '2 days ago', color: '#9a6abf' },
  { text: 'Pass card sent — Daniel W.', time: '3 days ago', color: '#C9A84C' },
  { text: 'New Google review — Priya S.', time: '4 days ago', color: '#4a7abf' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showToolsModal, setShowToolsModal] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      const { data } = await supabase
        .from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      setLoading(false)
    }
    init()
  }, [router])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setSelectedTool(null); setShowToolsModal(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0e0c' }}>
      <div style={{ color: '#C9A84C', fontSize: 14 }}>Loading...</div>
    </div>
  )

  const firstName = profile?.school_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'

  return (
    <div style={{ display: 'flex', background: '#0f0e0c', minHeight: '100vh' }}>
      <Sidebar profile={profile} />

      <main style={{ marginLeft: 220, padding: '28px', flex: 1 }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#f0e8d8' }}>Good morning, {firstName} 👋</div>
            <div style={{ fontSize: 13, color: '#6b6055', marginTop: 2 }}>Here's what's happening with your driving school today</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#1e1a10',
            border: '1px solid #C9A84C44', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#C9A84C', fontSize: 13, fontWeight: 500, cursor: 'pointer'
          }}>
            {(profile?.school_name || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Active pupils', val: '12', change: '+2 this week', changeColor: '#4a7c59' },
            { label: 'Reviews collected', val: '34', change: '+5 this month', changeColor: '#4a7abf' },
            { label: 'Pass cards sent', val: '8', change: 'This month', changeColor: '#C9A84C' },
            { label: 'Avg hours predicted', val: '38', change: 'Per new pupil', changeColor: '#9a6abf' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#141210',
              border: i === 0 ? '0.5px solid #C9A84C33' : '0.5px solid #2a2520',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <div style={{ fontSize: 11, color: '#6b6055', marginBottom: 8 }}>{stat.label}</div>
              <div style={{ fontSize: 26, fontWeight: 500, color: i === 0 ? '#C9A84C' : '#f0e8d8' }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: stat.changeColor, marginTop: 4 }}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tools header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088' }}>Your tools</div>
          <div
            onClick={() => setShowToolsModal(true)}
            style={{ fontSize: 12, color: '#C9A84C', cursor: 'pointer', textDecoration: 'underline' }}
          >
            View all {tools.length} →
          </div>
        </div>

        {/* Tools grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
          {tools.map((tool, i) => (
            <div
              key={i}
              onClick={() => { setSelectedTool(tool); setShowToolsModal(true) }}
              style={{
                background: '#141210', border: '0.5px solid #2a2520',
                borderRadius: 12, padding: 18, cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s', position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${tool.color}44`; e.currentTarget.style.background = '#1a1712' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2520'; e.currentTarget.style.background = '#141210' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: '#1e1a10', border: `0.5px solid ${tool.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>
                  {tool.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#e8dcc8' }}>{tool.name}</div>
                    <div style={{ fontSize: 10, padding: '1px 7px', borderRadius: 10, background: tool.tagBg, color: tool.tagColor }}>{tool.tag}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b6055', lineHeight: 1.5 }}>{tool.desc}</div>
                </div>
                <div style={{ color: '#3a3530', fontSize: 20, flexShrink: 0 }}>›</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: '#141210', border: '0.5px solid #2a2520', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088', marginBottom: 14 }}>Recent activity</div>
            {activity.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < activity.length - 1 ? '0.5px solid #1e1c18' : 'none' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: '#9a9088', flex: 1 }}>{item.text}</div>
                <div style={{ fontSize: 11, color: '#4a4540' }}>{item.time}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#141210', border: '0.5px solid #2a2520', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#9a9088', marginBottom: 14 }}>Your branding</div>
            {[
              { label: 'School name', val: profile?.school_name || '—' },
              { label: 'WhatsApp', val: profile?.whatsapp || '—' },
              { label: 'Google link', val: profile?.google_review_link ? 'Set ✓' : 'Not set' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#6b6055', width: 90, flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontSize: 12, color: '#9a9088', background: '#0f0e0c', border: '0.5px solid #2a2520', borderRadius: 6, padding: '6px 10px', flex: 1 }}>{row.val}</div>
              </div>
            ))}
            <button onClick={() => router.push('/dashboard/branding')} style={{ width: '100%', background: '#C9A84C', color: '#0a0908', border: 'none', borderRadius: 8, padding: '9px', fontSize: 12, fontWeight: 500, marginTop: 4 }}>
              Update branding
            </button>
          </div>
        </div>
      </main>

      {/* ===== TOOLS MODAL ===== */}
      {showToolsModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { setSelectedTool(null); setShowToolsModal(false) } }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <div style={{
            background: '#141210', border: '0.5px solid #2a2520',
            borderRadius: 20, width: '100%', maxWidth: 560,
            maxHeight: '85vh', overflow: 'auto',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}>
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '0.5px solid #2a2520' }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 500, color: '#f0e8d8' }}>
                  {selectedTool ? selectedTool.name : 'Your DriveSuite Tools'}
                </div>
                <div style={{ fontSize: 12, color: '#6b6055', marginTop: 2 }}>
                  {selectedTool ? 'Tool details' : 'Tap any tool to open it'}
                </div>
              </div>
              <div
                onClick={() => { setSelectedTool(null); setShowToolsModal(false) }}
                style={{ width: 32, height: 32, borderRadius: 8, background: '#1e1c18', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9a9088', fontSize: 20 }}
              >×</div>
            </div>

            {/* Tool detail */}
            {selectedTool ? (
              <div style={{ padding: 24 }}>
                <button
                  onClick={() => setSelectedTool(null)}
                  style={{ background: 'none', border: 'none', color: '#6b6055', fontSize: 13, cursor: 'pointer', marginBottom: 24, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  ← All tools
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: '#1e1a10', border: `1px solid ${selectedTool.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
                  }}>
                    {selectedTool.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 500, color: '#f0e8d8', marginBottom: 6 }}>{selectedTool.name}</div>
                    <div style={{ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 10, background: selectedTool.tagBg, color: selectedTool.tagColor }}>{selectedTool.tag}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, color: '#9a9088', lineHeight: 1.8, marginBottom: 28, background: '#0f0e0c', borderRadius: 12, padding: 16, border: '0.5px solid #2a2520' }}>
                  {selectedTool.longDesc}
                </div>
                <button
                  onClick={() => window.open(selectedTool.url, '_blank')}
                  style={{
                    width: '100%', background: selectedTool.color,
                    color: '#fff', border: 'none', borderRadius: 12,
                    padding: '15px', fontSize: 15, fontWeight: 500, cursor: 'pointer',
                    boxShadow: `0 4px 20px ${selectedTool.color}44`,
                  }}
                >
                  Open {selectedTool.name} →
                </button>
              </div>
            ) : (
              /* All tools list */
              <div style={{ padding: '12px 16px' }}>
                {tools.map((tool, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedTool(tool)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 12px', borderRadius: 12, cursor: 'pointer',
                      marginBottom: 4, transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a1712'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: '#1e1a10', border: `0.5px solid ${tool.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                    }}>
                      {tool.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#e8dcc8' }}>{tool.name}</div>
                        <div style={{ fontSize: 10, padding: '1px 7px', borderRadius: 10, background: tool.tagBg, color: tool.tagColor }}>{tool.tag}</div>
                      </div>
                      <div style={{ fontSize: 12, color: '#6b6055', lineHeight: 1.5 }}>{tool.desc}</div>
                    </div>
                    <div style={{ color: '#5a5248', fontSize: 22, flexShrink: 0 }}>›</div>
                  </div>
                ))}

                <div style={{ margin: '8px 12px 12px', padding: '12px 14px', background: '#0f0e0c', borderRadius: 10, border: '0.5px dashed #2a2520', opacity: 0.6 }}>
                  <div style={{ fontSize: 12, color: '#5a5248' }}>✦ More tools coming soon for DriveSuite members</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}