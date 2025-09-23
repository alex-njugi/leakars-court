import { Helmet } from 'react-helmet-async'

const photos = [
  { src: '/placeholder-assets/exterior.jpg', alt: 'Exterior' },
  { src: '/placeholder-assets/parking.jpg', alt: 'Parking' },
  { src: '/placeholder-assets/livingroom.jpg', alt: 'Living room' },
  { src: '/placeholder-assets/kitchen.jpg', alt: 'Kitchen' },
  { src: '/placeholder-assets/bedroom.jpg', alt: 'Bedroom' },
  { src: '/placeholder-assets/bathroom.jpg', alt: 'Bathroom' },
  { src: '/placeholder-assets/balcony.jpg', alt: 'Balcony' },
  { src: '/placeholder-assets/playarea.jpg', alt: 'Children play area' },
]

export default function Gallery(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet><title>Gallery - Leakars Court</title></Helmet>
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((p,i)=> (
          <div key={i} className="card overflow-hidden">
            <img src={p.src} alt={p.alt} onError={e=>{e.currentTarget.src='/placeholder-assets/%s.txt'.replace('%s', p.alt.toLowerCase().split(' ')[0])}}/>
            <div className="p-3 text-sm text-neutral-600">{p.alt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
