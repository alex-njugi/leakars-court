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
import { Phone, Mail, MapPin } from 'lucide-react'

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
    // Show loader on route change
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600) // simulate loading content
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

function TopBar(){
  return (
    <div className="bg-maroon-500 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <span className="font-semibold">Leakars Court</span>
        <div className="flex items-center gap-4">
          <a href="https://wa.me/254722690154" className="flex items-center gap-2 hover:underline">
            <Phone size={16}/> +254 722 690 154
          </a>
          <a href="mailto:talexsuppliers@gmail.com" className="flex items-center gap-2 hover:underline">
            <Mail size={16}/> talexsuppliers@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

function Nav(){
  const link = ({isActive}) => isActive ? "navlink active-link" : "navlink"
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Leakars Court" className="w-9 h-9"/>
          <div className="leading-none">
            <div className="font-bold text-lg">Leakars Court</div>
            <div className="text-xs text-neutral-500">Modern • Luxurious • Affordable</div>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={link} end>Home</NavLink>
          <NavLink to="/gallery" className={link}>Gallery</NavLink>
          <NavLink to="/apartments" className={link}>Available</NavLink>
          <NavLink to="/amenities" className={link}>Amenities</NavLink>
          <NavLink to="/location" className={link}>Location</NavLink>
          <NavLink to="/reviews" className={link}>Reviews</NavLink>
          <NavLink to="/contact" className="btn btn-primary">Book a Viewing</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer(){
  return (
    <footer className="bg-neutral-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-bold text-lg mb-2">Leakars Court</div>
          <p className="text-sm text-neutral-600">
            Premium 1 & 2 bedroom apartments in a serene, green environment with full-time water,
            24/7 security & CCTV, and large safe parking—right off the main road for easy access.
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
      <div className="text-center text-xs text-neutral-500 pb-6">© {new Date().getFullYear()} Leakars Court. All rights reserved.</div>
    </footer>
  )
}
