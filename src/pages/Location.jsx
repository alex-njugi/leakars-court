import { Helmet } from 'react-helmet-async'
import { SITE } from '../siteData'
import {
  MapPin,
  Navigation,
  Car,
  Bus,
  Footprints,     // ✅ replace Walk
  Shield,
  SquareParking,  // ✅ replace ParkingSquare
  ArrowRight
} from 'lucide-react'

// Optional: if you ever move, just update these coords.
const GEO = { lat: -1.1594250988294796, lng: 36.8195772749656 }
const MAPS_VIEW = `https://www.google.com/maps?q=${GEO.lat},${GEO.lng}`
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`

export default function Location(){
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: 'Leakars Court',
    telephone: SITE.phoneIntl.replace('+', '+'),
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
    geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
    url: MAPS_VIEW
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Location - Leakars Court</title>
        <meta
          name="description"
          content="Perfectly positioned near the main road for effortless access. Leakars Court offers quick connections to transport, shopping, schools, and daily essentials, without sacrificing the calm of a serene, green compound."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <h1 className="text-3xl font-bold mb-3">Location</h1>
      <p className="text-neutral-700 mb-8">
        At Leakars Court, you get the best of both worlds: a calm, tree-lined compound that’s tucked away from noise,
        yet close to the main road so you can be on your way in minutes. Commutes feel shorter, errands feel lighter,
        and weekend plans are simply easier to reach.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Fact
          icon={<MapPin className="text-maroon-600" size={20}/>}
          title="Near the Main Road"
          text="Zip out quickly for work, school runs, and daily errands. No maze of backstreets required."
        />
        <Fact
          icon={<Bus className="text-maroon-600" size={20}/>}
          title="Transport Options"
          text="Public transport is close by, and ride-hailing pickups are smooth right from the gate."
        />
        <Fact
          icon={<Car className="text-maroon-600" size={20}/>}
          title="Drive with Ease"
          text="Simple in-out access and generous internal parking make every trip stress-free."
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="card p-3 overflow-hidden">
          <div className="rounded-xl overflow-hidden" dangerouslySetInnerHTML={{__html: SITE.mapEmbed}} />
          <div className="flex flex-wrap gap-3 mt-4">
            <a href={MAPS_VIEW} target="_blank" rel="noreferrer" className="btn btn-outline">
              Open in Google Maps
            </a>
            <a href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="btn btn-primary">
              Get Directions <Navigation className="ml-2" size={16}/>
            </a>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            Tip: On mobile, “Get Directions” opens your maps app for turn-by-turn navigation.
          </p>
        </div>

        <div className="space-y-6">
          <Card
            icon={<Shield className="text-maroon-600" size={20}/>}
            title="A Calm Pocket of the City"
            body="Step through the gate and the city’s pace softens. Landscaped greenery, neat paths, and a quiet, residential feel give you a refreshing buffer from the bustle, without pushing you far from where you need to be."
            bullets={[
              'Tree-lined compound that stays pleasantly cool',
              'Clean, well-kept common areas',
              'Security presence that’s reassuring yet discreet'
            ]}
          />

          <Card
            icon={<SquareParking className="text-maroon-600" size={20}/>}
            title="Errands, Simplified"
            body="Everyday essentials are within easy reach: groceries, pharmacies, fuel, and quick eats, so weekday logistics don’t consume your evenings."
            bullets={[
              'Close to shops and services for fast stops',
              'Convenient access to fuel and maintenance',
              'Weekend leisure within a short drive'
            ]}
          />

          <Card
            icon={<Footprints className="text-maroon-600" size={20}/>}
            title="Kid-Friendly, Commute-Friendly"
            body="Families appreciate the balance: a safe, tucked-in compound for downtime, and a near-road location for smoother school and work routines."
            bullets={[
              'Safer internal circulation away from the main road',
              'Ride-hailing meets you at the gate, no long walks',
              'Public transport access nearby for flexible commuting'
            ]}
          />

          <div className="card p-6">
            <h3 className="text-xl font-semibold">See It in Person</h3>
            <p className="text-neutral-700 mt-2">
              The best way to feel how well-located Leakars Court is? Visit. We’ll walk you through the compound and show you
              how easy access pairs with a serene everyday atmosphere.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/contact" className="btn btn-primary">
                Book a Private Viewing <ArrowRight className="ml-2" size={16}/>
              </a>
              <a href="/apartments" className="btn btn-outline">See Available Units</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 card p-6">
        <h3 className="text-lg font-semibold">Well-Placed for Real Life</h3>
        <p className="text-neutral-700 mt-2">
          Whether you’re heading to work, taking kids to school, or grabbing weekend essentials, Leakars Court’s location trims
          the friction out of your day. It’s the kind of convenience you feel, every single week.
        </p>
      </div>
    </div>
  )
}

function Fact({ icon, title, text }){
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-maroon-50 grid place-items-center">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="text-sm text-neutral-700 mt-1">{text}</p>
        </div>
      </div>
    </div>
  )
}

function Card({ icon, title, body, bullets }){
  return (
    <article className="card p-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-maroon-50 grid place-items-center">{icon}</div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-neutral-700 mt-1">{body}</p>
        </div>
      </div>
      {bullets?.length ? (
        <ul className="mt-4 text-sm text-neutral-700 space-y-1 list-disc list-inside">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      ) : null}
    </article>
  )
}
