import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Apartments from './pages/Apartments'
import Amenities from './pages/Amenities'
import Location from './pages/Location'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react'

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

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {loading && <PageLoader />}
      <TopBar />
      <Nav />
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
    </div>
  )
}

function PageLoader(){
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur-sm">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 rounded-full border-[6px] border-maroon-200 border-t-maroon-500 animate-spin mx-auto"></div>
        <p className="mt-4 font-medium text-maroon-600">Loading Leakars Pages…</p>
      </div>
    </div>
  )
}

/* ---------- Top Bar (responsive) ---------- */
function TopBar(){
  return (
    <div className="bg-maroon-500 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <span className="font-semibold truncate">Leakars Court</span>

        {/* Desktop inline, Mobile compact */}
        <div className="hidden sm:flex items-center gap-5">
          <a href="https://wa.me/254722690154" className="flex items-center gap-2 hover:underline">
            <Phone size={16}/> +254 722 690 154
          </a>
          <a href="mailto:talexsuppliers@gmail.com" className="flex items-center gap-2 hover:underline">
            <Mail size={16}/> talexsuppliers@gmail.com
          </a>
        </div>

        <div className="sm:hidden flex items-center gap-3">
          <a
            href="https://wa.me/254722690154"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"
          >
            <Phone size={16}/> <span className="font-medium">Call</span>
          </a>
          <a
            href="mailto:talexsuppliers@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"
          >
            <Mail size={16}/> <span className="font-medium">Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ---------- Navbar (improved dropdown + mobile sheet) ---------- */
function Nav(){
  const [open, setOpen] = useState(false)            // mobile sheet
  const [exploreOpen, setExploreOpen] = useState(false) // desktop dropdown
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)

  const link = ({isActive}) => isActive ? "navlink active-link" : "navlink"

  // close menus on route change
  useEffect(() => { setOpen(false); setExploreOpen(false) }, [location.pathname])

  // subtle shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); setExploreOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // click outside (desktop dropdown)
  useEffect(() => {
    function handleClickOutside(e){
      const d = dropdownRef.current
      const t = triggerRef.current
      if (exploreOpen && d && t && !d.contains(e.target) && !t.contains(e.target)){
        setExploreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [exploreOpen])

  return (
    <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur ${scrolled ? 'shadow-sm border-b' : 'border-b'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Leakars Court" className="w-9 h-9"/>
          <div className="leading-none">
            <div className="font-bold text-lg">Leakars Court</div>
            <div className="text-xs text-neutral-500">Modern • Luxurious • Affordable</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          <NavLink to="/" className={link} end>Home</NavLink>

          {/* Keep your original links (SEO + quick access) */}
          <NavLink to="/gallery" className={link}>Gallery</NavLink>
          <NavLink to="/apartments" className={link}>Available</NavLink>
          <NavLink to="/amenities" className={link}>Amenities</NavLink>
          <NavLink to="/location" className={link}>Location</NavLink>
          <NavLink to="/contact" className="btn btn-primary">Book a Viewing</NavLink>
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

      {/* Mobile overlay (tap to close) */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile sheet menu */}
      <div
        id="mobile-menu"
        className={`md:hidden relative z-40 border-t bg-white transition-[max-height] duration-300 overflow-hidden ${open ? 'max-h-[520px]' : 'max-h-0'}`}
        role="dialog"
        aria-modal="true"
      >
        <nav className="max-w-7xl mx-auto px-4 py-3 grid gap-2" aria-label="Mobile">
          <NavLink to="/" className="navlink py-2" end onClick={()=>setOpen(false)}>Home</NavLink>

          {/* Collapsible Explore for mobile (no new imports) */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer rounded-xl px-2 py-2 hover:bg-neutral-50">
              <span className="navlink">Explore</span>
              <svg className="size-3 transition-transform group-open:rotate-90" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M4 3l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </summary>
            <div className="pl-2">
              <NavLink to="/gallery" className="navlink py-2 block" onClick={()=>setOpen(false)}>Gallery</NavLink>
              <NavLink to="/amenities" className="navlink py-2 block" onClick={()=>setOpen(false)}>Amenities</NavLink>
              <NavLink to="/location" className="navlink py-2 block" onClick={()=>setOpen(false)}>Location</NavLink>
            </div>
          </details>

          <NavLink to="/apartments" className="navlink py-2" onClick={()=>setOpen(false)}>Available</NavLink>
          <NavLink to="/contact" className="btn btn-primary w-full mt-1 min-h-[44px]" onClick={()=>setOpen(false)}>
            Book a Viewing
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

/* ---------- Footer (with aligned credit like screenshot) ---------- */
function Footer(){
  return (
    <footer className="bg-neutral-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-bold text-lg mb-2">Leakars Court</div>
          <p className="text-sm text-neutral-600">
            Premium 1 & 2 bedroom apartments in a serene, green environment with full-time water,
            24/7 security & CCTV, and large safe parking, right off the main road for easy access.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Visit Us</div>
          <p className="text-sm text-neutral-600 flex items-start gap-2">
            <MapPin className="mt-0.5" size={18}/> Near main road • Quick access • Nairobi
          </p>
          <a className="text-maroon-600 underline mt-2 inline-block" href="/location">Open map</a>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <p className="text-sm text-neutral-600">Phone/WhatsApp: +254 722 690 154</p>
          <p className="text-sm text-neutral-600">Email: talexsuppliers@gmail.com</p>
          <div className="mt-3 flex gap-3">
            <a href="https://wa.me/254722690154" className="btn btn-primary">Chat on WhatsApp</a>
            <a href="mailto:talexsuppliers@gmail.com" className="btn btn-outline">Email Us</a>
          </div>
        </div>
      </div>

      {/* bottom bar: © left, Built by right; stacks on mobile */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div>© {new Date().getFullYear()} Leakars Court. All rights reserved.</div>
          <div className="sm:text-right">
            Built by{' '}
            <a
              href="https://alexnjugi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-maroon-600"
            >
              Alex Njugi Karanja
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Tiny helpers ---------- */
function DropdownItem({to, title, desc}){
  return (
    <NavLink
      to={to}
      className="flex items-start gap-3 rounded-xl p-3 hover:bg-neutral-50 focus:bg-neutral-50 outline-none"
      role="menuitem"
    >
      <div className="mt-1 w-2 h-2 rounded-full bg-maroon-500" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-neutral-600">{desc}</div>
      </div>
    </NavLink>
  )
}
