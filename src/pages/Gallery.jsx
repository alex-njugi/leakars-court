import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Maximize2, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'

const photos = [
  { src: '/placeholder-assets/exterior.jpg', alt: 'Exterior' },
  { src: '/placeholder-assets/cover.jpg', alt: 'Parking' },
  { src: '/placeholder-assets/livingroom.jpg', alt: 'Living room' },
  { src: '/placeholder-assets/livi.jpg', alt: 'Kitchen' },
  { src: '/placeholder-assets/bedroom.jpg', alt: 'Bedroom' },
  { src: '/placeholder-assets/gate.jpg', alt: 'Bathroom' },
  { src: '/placeholder-assets/balcony.jpg', alt: 'Balcony' },
  { src: '/placeholder-assets/kitchen.jpg', alt: 'Children play area' },
]

export default function Gallery(){
  const [lightbox, setLightbox] = useState({ open:false, index:0 })

  const open = (i)=> setLightbox({ open:true, index:i })
  const close = ()=> setLightbox({ open:false, index:0 })
  const prev = ()=> setLightbox(s => ({ ...s, index: (s.index - 1 + photos.length) % photos.length }))
  const next = ()=> setLightbox(s => ({ ...s, index: (s.index + 1) % photos.length }))

  // Keyboard controls
  useEffect(()=>{
    if(!lightbox.open) return
    const onKey = (e)=>{
      if(e.key === 'Escape') close()
      if(e.key === 'ArrowLeft') prev()
      if(e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox.open])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Gallery - Leakars Court</title>
        <meta name="description" content="Browse photos of Leakars Court: exterior, parking, living rooms, kitchens, bedrooms, bathrooms, balconies, and the children’s play area." />
      </Helmet>

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <span className="badge"><Images size={14}/> {photos.length} photos</span>
      </div>
      <p className="text-neutral-700 mb-6">
        A glimpse of everyday life at Leakars Court - calm, green, and thoughtfully maintained. Tap any photo to view full size.
      </p>

      {/* Picture-only tiles */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p,i)=> (
          <div
            key={i}
            className="group rounded-2xl overflow-hidden shadow-soft border border-neutral-100 cursor-pointer"
            onClick={()=>open(i)}
          >
            <div className="relative aspect-[4/3]">
              <img
                src={p.src}
                alt={`${p.alt} — Leakars Court`}
                loading="lazy"
                decoding="async"
                onError={(e)=>{ e.currentTarget.src = '/placeholder-assets/fallback.jpg' }}
                className="block w-full h-full object-cover"
              />
              {/* subtle hover overlay + icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              <div className="absolute right-3 top-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
                <Maximize2 size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox (no captions, photo only) */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm grid place-items-center p-4">
          <button
            onClick={close}
            className="absolute top-4 right-4 btn btn-ghost text-white !px-3 !py-2 rounded-xl"
            aria-label="Close"
            title="Close (Esc)"
          >
            <X size={18}/>
          </button>

          <button
            onClick={prev}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 btn btn-ghost text-white !px-3 !py-2 rounded-xl"
            aria-label="Previous"
            title="Previous (←)"
          >
            <ChevronLeft size={22}/>
          </button>

          <button
            onClick={next}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 btn btn-ghost text-white !px-3 !py-2 rounded-xl"
            aria-label="Next"
            title="Next (→)"
          >
            <ChevronRight size={22}/>
          </button>

          <div className="max-w-6xl w-full">
            <img
              src={photos[lightbox.index].src}
              alt={`${photos[lightbox.index].alt} — Leakars Court large view`}
              className="block w-full max-h-[85vh] object-contain rounded-2xl"
              onError={(e)=>{ e.currentTarget.src = '/placeholder-assets/fallback.jpg' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
