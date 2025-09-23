import { Helmet } from 'react-helmet-async'
import { SITE } from '../siteData'
import {
  ArrowRight,
  Shield,
  Droplets,
  SquareParking,
  Camera,
  Trees,
  Baby,
  MapPin,
  Sparkles,
  Home
} from 'lucide-react'

export default function Apartments(){
  // You can update these two numbers anytime.
  const availability = [
    { type: '1 Bedroom', price: 13000, available: 3, details: 'Effortless living for singles or couples' },
    { type: '2 Bedroom', price: 18000, available: 2, details: 'Extra breathing room for small families' },
  ]

  const totalOpen = availability.reduce((s,a)=> s + a.available, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Available Apartments - Leakars Court</title>
        <meta
          name="description"
          content="Choose your next home at Leakars Court: elegant 1BR @ KSh 13,000 or spacious 2BR @ KSh 18,000. Safe parking, 24/7 security with CCTV, constant water, serene greenery, and near-road access. Book a private viewing via WhatsApp."
        />
      </Helmet>

      {/* Header + credibility band */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Available Apartments</h1>
          <p className="text-neutral-700">
            Thoughtfully kept, move-in-ready homes in a calm, green compound — with everyday essentials handled.
          </p>
        </div>
        <div className="hidden md:block">
          <Badge>Currently {totalOpen} units open</Badge>
        </div>
      </div>

      {/* Value highlights */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <Value icon={<Shield size={18}/>} text="24/7 security + CCTV" />
        <Value icon={<Droplets size={18}/>} text="Water — always on" />
        <Value icon={<SquareParking size={18}/>} text="Generous safe parking" />
        <Value icon={<Trees size={18}/>} text="Serene, tree-lined grounds" />
      </div>

      {/* Cards for each unit type */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {availability.map((a,i)=> (
          <UnitCard key={i} a={a} />
        ))}
      </div>

      {/* Included with every unit */}
      <section className="mt-10 card p-6">
        <h2 className="text-xl font-semibold">What Every Resident Enjoys</h2>
        <p className="text-neutral-700 mt-2">
          At Leakars Court, comfort is standard — not a premium add-on. Your home comes with:
        </p>
        <ul className="mt-4 grid md:grid-cols-2 gap-2 text-sm text-neutral-700 list-disc list-inside">
          <li>Full-time water supply for predictable routines</li>
          <li>Spacious balconies for fresh air and natural light</li>
          <li>Professional trash collection to keep the compound neat</li>
          <li>Children’s play area within the secure compound</li>
          <li>Near-road location for quick commutes and easy errands</li>
          <li>Well-lit internal circulation and tidy common areas</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/location" className="btn btn-outline">See Why the Location Works</a>
          <a href="/gallery" className="btn btn-primary">Browse Photos</a>
        </div>
      </section>

      {/* Micro-FAQ to remove friction */}
      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <FaqCard
          q="How do I book a viewing?"
          a="Tap the WhatsApp button on your preferred unit. Tell us your name and a convenient day/time — we’ll confirm and meet you at the gate."
        />
        <FaqCard
          q="Are the photos representative?"
          a="Yes — and we recommend an in-person tour to feel the light, balcony space, and the calm of the compound."
        />
        <FaqCard
          q="Is parking limited?"
          a="Parking is generous and inside the compound. Guests also have arranged spots for short visits."
        />
      </section>

      {/* Soft reassurance */}
      <div className="mt-10 card p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-maroon-600" size={18}/>
          <h3 className="text-lg font-semibold">Move-In Made Simple</h3>
        </div>
        <p className="text-neutral-700 mt-2">
          We keep the process straightforward and respectful of your time. See a unit, love it, and we’ll guide you through each step to make your move smooth.
        </p>
      </div>
    </div>
  )
}

/* ---------- Components ---------- */

function UnitCard({ a }){
  const msg = encodeURIComponent(
    `Hello Leakars Court, my name is _____. I’m interested in the ${a.type} at KSh ${a.price.toLocaleString()}. ` +
    `Are there viewings available this week?`
  )

  const perks = [
    { icon: <Home size={16}/>, text: a.type === '1 Bedroom' ? 'Efficient layout, bright living' : 'Spacious layout for family life' },
    { icon: <Camera size={16}/>, text: 'CCTV-monitored common areas' },
    { icon: <SquareParking size={16}/>, text: 'Inside-compound parking' },
    { icon: <MapPin size={16}/>, text: 'Near the main road' },
    { icon: <Baby size={16}/>, text: 'Children’s play area' },
    { icon: <Droplets size={16}/>, text: 'Full-time water supply' },
  ]

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-lg">{a.type}</div>
          <div className="text-neutral-600 text-sm">{a.details}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl">KSh {a.price.toLocaleString()}</div>
          <div className="text-xs text-neutral-500">{a.available} available</div>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-neutral-700">
        {perks.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-maroon-50 text-maroon-600 grid place-items-center">{p.icon}</span>
            <span>{p.text}</span>
          </li>
        ))}
      </ul>

      <a
        href={SITE.whatsappLink + '?text=' + msg}
        className="btn btn-primary mt-5 w-full text-center"
      >
        Enquire on WhatsApp <ArrowRight className="ml-2" size={16}/>
      </a>

      <p className="text-xs text-neutral-500 mt-3">
        Prices shown are monthly rent. Availability changes quickly — message us for the latest.
      </p>
    </div>
  )
}

function Value({ icon, text }){
  return (
    <div className="card p-4 flex items-center gap-3">
      <span className="w-9 h-9 rounded-xl bg-maroon-50 text-maroon-600 grid place-items-center">{icon}</span>
      <span className="text-sm font-medium text-neutral-800">{text}</span>
    </div>
  )
}

function Badge({ children }){
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-maroon-50 text-maroon-700 px-4 py-2 text-sm border border-maroon-100">
      <span className="w-2 h-2 rounded-full bg-maroon-500" />
      {children}
    </div>
  )
}

function FaqCard({ q, a }){
  return (
    <article className="card p-6">
      <h3 className="font-semibold">{q}</h3>
      <p className="text-neutral-700 mt-2 text-sm">{a}</p>
    </article>
  )
}
