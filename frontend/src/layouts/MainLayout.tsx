import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import {
  LayoutDashboard,
  Layout,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function MainLayout() {
  const { user, logout } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', label: 'Projects', icon: LayoutDashboard },
    { path: '/templates', label: 'Templates', icon: Layout },
  ]

  const isEditorPage = location.pathname.includes('/editor/')

  if (isEditorPage) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent-blue rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="2" />
                  <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-text-primary">Shotify</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                      transition-all duration-150
                      ${
                        isActive
                          ? 'bg-surface text-text-primary'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* User menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface transition-colors"
              >
                <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-accent-blue" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-text-primary">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl overflow-hidden animate-scale-in">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                    <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
