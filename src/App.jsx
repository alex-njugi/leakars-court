import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Apartments from './pages/Apartments'
import Amenities from './pages/Amenities'
import Location from './pages/Location'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import {
  Phone, Mail, MapPin, Menu, X,
  Home as HomeIcon, Image, Building2, Trees, Star, ChevronRight
} from 'lucide-react'

/* ---------------- Theme Hook ---------------- */
function useTheme() {
  const getInitial = () => {
    try {
      const saved = localStorage.getItem('leakars-theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {}
    const prefersDark = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('leakars-theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
    if (!mq) return
    const handler = (e) => {
      try {
        const saved = localStorage.getItem('leakars-theme')
        if (!saved) setTheme(e.matches ? 'dark' : 'light')
      } catch {}
    }
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else if (mq.addListener) mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else if (mq.removeListener) mq.removeListener(handler)
    }
  }, [])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

/* Theme toggle button */
function ThemeToggleButton({ theme, onClick, className = '' }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border px-3 py-2 touch-target focus-ring ${className}`}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

/* Desktop floating toggle (md+) */
function FloatingThemeToggle({ theme, toggle }) {
  return (
    <div className="hidden md:block fixed left-6 bottom-[calc(env(safe-area-inset-bottom,0px)+24px)] z-40">
      <ThemeToggleButton
        theme={theme}
        onClick={toggle}
        className="rounded-full bg-white/90 dark:bg-[var(--surface-2)]
                   border border-neutral-200 dark:border-[var(--line-1)]
                   shadow-soft hover:shadow-lg px-3 py-3"
      />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <Layout />
    </HelmetProvider>
  )
}

function Layout(){
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="app-root min-h-screen flex flex-col bg-white dark:bg-[var(--surface-0)]">
      {loading && <PageLoader />}
      <TopBar />
      <Nav theme={theme} toggle={toggle} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
      <Footer />

      {/* Desktop floating toggle */}
      <FloatingThemeToggle theme={theme} toggle={toggle} />
    </div>
  )
}

function PageLoader(){
  return (
    <div className="fixed inset-0 z-50 grid place-items-center page-loader-bg bg-white/80 backdrop-blur-sm">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 rounded-full border-[6px] border-maroon-200 border-t-maroon-500 animate-spin mx-auto"></div>
        <p className="mt-4 font-medium text-maroon-600">Loading Leakars Pages…</p>
      </div>
    </div>
  )
}

/* ---------- Top Bar (no toggle here) ---------- */
function TopBar(){
  return (
    <div className="bg-maroon-500 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <span className="font-semibold truncate">Leakars Court</span>

        <div className="hidden sm:flex items-center gap-3">
          <a href="https://wa.me/254722690154" className="flex items-center gap-2 hover:underline">
            <Phone size={16}/> +254 722 690 154
          </a>
          <a href="mailto:talexsuppliers@gmail.com" className="flex items-center gap-2 hover:underline">
            <Mail size={16}/> talexsuppliers@gmail.com
          </a>
        </div>

        {/* Mobile compact */}
        <div className="sm:hidden flex items-center gap-2">
          <a href="https://wa.me/254722690154" className="topbar-pill">Call</a>
          <a href="mailto:talexsuppliers@gmail.com" className="topbar-pill">Email</a>
        </div>
      </div>
    </div>
  )
}

/* ---------- Navbar (classy + clear active states) ---------- */
function Nav({ theme, toggle }){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home', icon: HomeIcon, end: true },
    { to: '/gallery', label: 'Gallery', icon: Image },
    { to: '/apartments', label: 'Available', icon: Building2 },
    { to: '/amenities', label: 'Amenities', icon: Trees },
    { to: '/location', label: 'Location', icon: MapPin },
  ]

  // Desktop pill style with strong active state
  const desktopClass = ({ isActive }) =>
    [
      'px-3 py-2 rounded-full text-[15px] font-medium transition-colors',
      isActive
        ? 'bg-maroon-500 text-white'
        : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 dark:text-[var(--text-2)] dark:hover:text-white dark:hover:bg-[var(--surface-3)]',
    ].join(' ')

  return (
    <header className={`sticky top-0 z-40 backdrop-blur ${scrolled ? 'shadow-sm border-b' : 'border-b'} bg-white/90 dark:bg-[color:rgba(15,15,18,.85)]`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Leakars Court" className="w-9 h-9"/>
          <div className="leading-none">
            <div className="font-bold text-lg text-neutral-900 dark:text-[var(--text-1)]">Leakars Court</div>
            <div className="text-xs text-neutral-500 dark:text-[var(--text-2)]">Modern • Luxurious • Affordable</div>
          </div>
        </div>

        {/* Desktop nav (pill style + active state) */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={desktopClass}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary ml-2">Book a Viewing</NavLink>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2"
          onClick={()=>setOpen(o=>!o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
        >
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* Mobile dropdown — classy sheet with active highlight */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ${open ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="px-4 pb-4">
          <div className="rounded-2xl border bg-white/95 dark:bg-[var(--surface-3)] dark:border-[var(--line-1)] shadow-soft backdrop-blur">
            {/* Header row with theme toggle */}
            <div className="flex items-center justify-between px-4 py-3 border-b dark:border-[var(--line-1)]">
              <div className="text-sm text-neutral-600 dark:text-[var(--text-2)]">Appearance</div>
              <ThemeToggleButton theme={theme} onClick={toggle} />
            </div>

            {/* Link list */}
            <nav className="py-2">
              {links.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      'group relative flex items-center justify-between gap-3 px-4 py-3',
                      'active:scale-[.99] transition-colors',
                      isActive
                        ? 'bg-maroon-50/80 dark:bg-[rgba(138,21,56,.12)]'
                        : 'hover:bg-neutral-50 dark:hover:bg-[var(--surface-2)]'
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* left accent bar on active */}
                      <span
                        className={[
                          'absolute left-0 top-0 h-full w-1 rounded-r',
                          isActive ? 'bg-maroon-500' : 'bg-transparent'
                        ].join(' ')}
                        aria-hidden
                      />
                      <div className="flex items-center gap-3">
                        <span className={[
                          'grid place-items-center w-9 h-9 rounded-xl',
                          isActive
                            ? 'bg-maroon-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-[var(--surface-2)] dark:text-[var(--text-2)]'
                        ].join(' ')}>
                          <Icon size={18}/>
                        </span>
                        <span className={isActive ? 'font-semibold text-neutral-900 dark:text-white' : 'text-neutral-800 dark:text-[var(--text-1)]'}>
                          {label}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-neutral-400 group-hover:text-neutral-600 dark:text-[var(--text-2)]" />
                    </>
                  )}
                </NavLink>
              ))}

              <div className="px-4 py-3">
                <NavLink to="/contact" className="btn btn-primary w-full min-h-[44px]">Book a Viewing</NavLink>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ---------- Footer ---------- */
function Footer(){
  return (
    <footer className="bg-neutral-50 dark:bg-[var(--surface-0)] border-t dark:border-[var(--line-1)]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-bold text-lg mb-2 text-neutral-900 dark:text-[var(--text-1)]">Leakars Court</div>
          <p className="text-sm text-neutral-600 dark:text-[var(--text-2)]">
            Premium 1 & 2 bedroom apartments in a serene, green environment with full-time water,
            24/7 security & CCTV, and large safe parking, right off the main road for easy access.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2 text-neutral-900 dark:text-[var(--text-1)]">Visit Us</div>
          <p className="text-sm text-neutral-600 dark:text-[var(--text-2)] flex items-start gap-2">
            <MapPin className="mt-0.5" size={18}/> Near main road • Quick access • Nairobi
          </p>
          <a className="text-maroon-600 dark:text-[#e79ab3] underline mt-2 inline-block" href="/location">Open map</a>
        </div>
        <div>
          <div className="font-semibold mb-2 text-neutral-900 dark:text-[var(--text-1)]">Contact</div>
          <p className="text-sm text-neutral-600 dark:text-[var(--text-2)]">Phone/WhatsApp: +254 722 690 154</p>
          <p className="text-sm text-neutral-600 dark:text-[var(--text-2)]">Email: talexsuppliers@gmail.com</p>
          <div className="mt-3 flex gap-3">
            <a href="https://wa.me/254722690154" className="btn btn-primary">Chat on WhatsApp</a>
            <a href="mailto:talexsuppliers@gmail.com" className="btn btn-outline">Email Us</a>
          </div>
        </div>
      </div>

      <div className="border-t dark:border-[var(--line-1)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-[var(--text-2)]">
          <div>© {new Date().getFullYear()} Leakars Court. All rights reserved.</div>
          <div className="sm:text-right">
            Built by{' '}
            <a href="https://alexnjugi.com" target="_blank" rel="noopener noreferrer"
               className="underline text-maroon-600 dark:text-[#e79ab3]">
              Alex Njugi Karanja
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
