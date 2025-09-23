import { Helmet } from 'react-helmet-async'
import { SITE } from '../siteData'
import {
  ParkingSquare,
  Droplets,
  Shield,
  Camera,
  Baby,
  Trees,
  Trash2,
  MapPin,
  Sun
} from 'lucide-react'

const AMENITIES = [
  {
    key: 'parking',
    title: 'Generous, Safe Parking',
    icon: <ParkingSquare className="text-maroon-600" size={22} />,
    lead:
      'Arrive home without the daily parking lottery. Our inside-the-compound parking is wide, well-lit, and planned for smooth in–out movement.',
    body: `You’ll never “hunt” for a spot again. Wide bays make parking easy for both sedans and SUVs, with clear lighting that keeps evenings comfortable. Guest spots mean friends and family can visit without stress, and the controlled access ensures only residents and approved guests enter.`,
    bullets: [
      'Evening-safe illumination and clean sightlines',
      'Controlled gate access to reduce through-traffic',
      'Close proximity to block entries for convenient unloading'
    ]
  },
  {
    key: 'water',
    title: '24/7 Water Availability',
    icon: <Droplets className="text-maroon-600" size={22} />,
    lead:
      'Morning showers, evening cooking, laundry on your schedule, not the city’s. At Leakars Court, water reliability is part of the experience.',
    body: `We maintain full-time water supply with responsible storage and distribution, so daily routines never have to pause. The system is managed to keep pressure consistent and access predictable, because the best luxury is convenience.`,
    bullets: [
      'Full-time supply with well-managed storage',
      'Consistent pressure to upper floors',
      'Scheduled maintenance for minimal disruption',
      'Clear resident communication if servicing is planned'
    ]
  },
  {
    key: 'security',
    title: '24/7 Security with CCTV',
    icon: <Shield className="text-maroon-600" size={22} />,
    lead:
      'Peace of mind is priceless. Professional security teams and always-on camera coverage keep common areas watched day and night.',
    body: `From the gate to the corridors, our security layers are designed to be visible enough to reassure yet discreet enough to feel like home. Access is monitored, and cameras complement on-site personnel, for a thoughtful human-first approach to safety.`,
    bullets: [
      'Manned gate and controlled visitor entry',
      'Round-the-clock CCTV in strategic common areas',
      'Rapid incident response protocols',
      'Friendly, respectful engagement with residents'
    ],
    asideIcon: <Camera className="text-maroon-500" size={18} />,
    asideText: 'CCTV augments patrolled rounds to maintain coverage without intruding on privacy.'
  },
  {
    key: 'play',
    title: 'Children’s Play Area',
    icon: <Baby className="text-maroon-600" size={22} />,
    lead:
      'Childhood should feel bright and safe. Our dedicated play space lets kids explore, move, and laugh within view and within the compound.',
    body: `We’ve carved out a zone where families can unwind while little ones enjoy fresh air and movement. It’s close enough to feel supervised.`,
    bullets: [
      'Comfortably visible from common areas',
      'Soft landscaping and easy-to-clean surfaces',
      'Etiquette signage to keep it friendly for everyone'
    ]
  },
  {
    key: 'balcony',
    title: 'Spacious Balconies',
    icon: <Sun className="text-maroon-600" size={22} />,
    lead:
      'Your private outdoor nook, morning coffee, sunset exhale, or a quiet call with a view of the greenery.',
    body: `Every balcony is designed as a genuine extension of your living room: space for a bistro set, a plant corner, or simply a breath of air. Railings are sturdy, finishes are easy to maintain, and the outlook is intentionally green.`,
    bullets: [
      'Room for seating and potted plants',
      'Durable, low-maintenance finishes',
      'Natural light without harsh exposure',
      'Pleasant sightlines over trees and lawns'
    ]
  },
  {
    key: 'green',
    title: 'Serene, Tree-Lined Grounds',
    icon: <Trees className="text-maroon-600" size={22} />,
    lead:
      'Step into calm. Lawns, trees, and thoughtful landscaping make the compound feel like a small sanctuary.',
    body: `Greenery softens the day. Whether you’re returning from work or stepping out on a weekend, the atmosphere stays unhurried, a buffer between you and the bustle just beyond the gate.`,
    bullets: [
      'Curated mix of trees and shrubs for shade + texture',
      'Regular landscaping and seasonal refreshes',
      'Seating nooks that invite quick breathers',
      'Cleaner air and a visibly cared-for environment'
    ]
  },
  {
    key: 'trash',
    title: 'Professional Trash Collection',
    icon: <Trash2 className="text-maroon-600" size={22} />,
    lead:
      'Cleanliness isn’t a chore when the system works. We keep disposal organized, discreet, and on schedule.',
    body: `Neat common areas signal a home that’s respected. Collection points are easy to access, with frequent pickups. The result is a compound that stays fresh and welcoming every day.`,
    bullets: [
      'Regular pickups to stop overflow',
      'Odor-control best practices',
      'Clear resident guidelines for smooth cooperation'
    ]
  },
  {
    key: 'access',
    title: 'Close to the Main Road',
    icon: <MapPin className="text-maroon-600" size={22} />,
    lead:
      'Save minutes every day. With the main road nearby, your commute, errands, and school runs get noticeably easier.',
    body: `Location is leverage. Whether you use public transport or drive, you’ll appreciate being connected to key routes without giving up the quiet of a tucked-away compound.`,
    bullets: [
      'Quick access to transport links',
      'Faster commutes and simpler logistics',
      'Ride-hailing pickups with minimal wait times',
      'Close to everyday essentials and services'
    ]
  }
]

export default function Amenities(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Amenities - Leakars Court</title>
        <meta
          name="description"
          content="Explore Leakars Court amenities: generous secure parking, 24/7 security with CCTV, constant water, dedicated kids’ play area, spacious balconies, serene green grounds, professional trash collection, and instant access to the main road."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-3">Amenities</h1>
      <p className="text-neutral-700 mb-8">
        At Leakars Court, comfort is in the details. From everyday reliability to the quiet luxuries that elevate your routine, each
        feature is designed to make home feel calm, convenient, and truly premium.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {AMENITIES.map((a) => (
          <AmenityCard key={a.key} amenity={a} />
        ))}
      </div>

      <div className="mt-12 card p-6">
        <h3 className="text-xl font-semibold">Everything You Need - Thoughtfully Arranged</h3>
        <p className="text-neutral-700 mt-2">
          Choose the home that supports your best days. Our <b>1 Bedroom @ KSh 15,000</b> is ideal for singles or couples seeking quiet ease,
          while the <b>2 Bedroom @ KSh 18,000</b> gives growing households extra breathing room. Both enjoy the full set of Leakars Court amenities.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/apartments" className="btn btn-outline">See Availability</a>
          <a href="/contact" className="btn btn-primary">Book a Private Viewing</a>
        </div>
      </div>

      <div className="mt-10">
        <a href="/gallery" className="btn btn-outline">See Photos</a>
      </div>
    </div>
  )
}

function AmenityCard({ amenity }) {
  const { title, icon, lead, body, bullets, asideIcon, asideText } = amenity
  return (
    <article className="card p-6">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-maroon-50 grid place-items-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-neutral-700 mt-1">{lead}</p>
        </div>
      </div>

      <p className="text-neutral-700 mt-4">{body}</p>

      {bullets?.length ? (
        <ul className="mt-4 text-sm text-neutral-700 space-y-1 list-disc list-inside">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      ) : null}

      {asideText ? (
        <div className="mt-4 text-sm text-neutral-600 flex items-center gap-2">
          {asideIcon}
          <span>{asideText}</span>
        </div>
      ) : null}
    </article>
  )
}
