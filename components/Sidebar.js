'use client'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../lib/supabase'

const navItems = [
  { label: 'Dashboard', icon: '⊞', href: '/dashboard' },
  { label: 'My Tools', icon: '⚙', href: '/dashboard/tools', badge: '5' },
  { label: 'Pupils', icon: '◎', href: '/dashboard/pupils' },
  { label: 'Reviews', icon: '★', href: '/dashboard/reviews' },
]

const bottomNav = [
  { label: 'Branding', icon: '◈', href: '/dashboard/branding' },
  { label: 'Settings', icon: '⊛', href: '/dashboard/settings' },
]

export default function Sidebar({ profile }) {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside style={{
      width: 220,
      background: '#0a0908',
      borderRight: '0.5px solid #2a2520',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
    }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '0.5px solid #2a2520' }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: '#C9A84C' }}>DriveSuite</div>
        <div style={{ fontSize: 11, color: '#5a5248', marginTop: 2 }}>Instructor toolkit</div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{ fontSize: 10, color: '#5a5248', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>Menu</div>
        {navItems.map(item => (
          <div
            key={item.href}
            onClick={() => router.push(item.href)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              color: pathname === item.href ? '#C9A84C' : '#9a9088',
              background: pathname === item.href ? '#1e1a10' : 'transparent',
              marginBottom: 2,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
            {item.badge && (
              <span style={{
                marginLeft: 'auto',
                background: '#C9A84C22',
                color: '#C9A84C',
                fontSize: 10,
                padding: '2px 7px',
                borderRadius: 10,
              }}>{item.badge}</span>
            )}
          </div>
        ))}

        <div style={{ fontSize: 10, color: '#5a5248', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 8px', margin: '16px 0 8px' }}>Account</div>
        {bottomNav.map(item => (
          <div
            key={item.href}
            onClick={() => router.push(item.href)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              color: pathname === item.href ? '#C9A84C' : '#9a9088',
              background: pathname === item.href ? '#1e1a10' : 'transparent',
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div style={{ padding: 16, borderTop: '0.5px solid #2a2520' }}>
        <div style={{ fontSize: 12, color: '#C9A84C', fontWeight: 500 }}>
          {profile?.school_name || 'My Driving School'}
        </div>
        <div style={{ fontSize: 11, color: '#5a5248', marginTop: 2 }}>Pro Plan · £29/mo</div>
        <div
          onClick={handleLogout}
          style={{ fontSize: 11, color: '#5a5248', marginTop: 10, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Sign out
        </div>
      </div>
    </aside>
  )
}