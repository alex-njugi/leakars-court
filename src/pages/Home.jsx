import { Helmet } from 'react-helmet-async'
import { SITE } from '../siteData'
import { ArrowRight, Shield, Droplets, ParkingSquare, Trees, Camera, Baby, Trash2, MapPin } from 'lucide-react'
import CTA from '../components/CTA'

export default function Home(){
  return (
    <div>
      <Helmet>
        <title>Leakars Court - Luxury Apartments</title>
        <meta
          name="description"
          content="Discover refined living at Leakars Court: elegant 1 & 2 bedroom apartments from KSh 13,000, with 24/7 security & CCTV, constant water, serene greenery, and instant access to the main road. Book a private viewing today."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Luxury Living Refined at <span className="text-maroon-500">Leakars Court</span>
            </h1>
            <p className="mt-4 text-neutral-700 text-lg">
              Come home to calm. Every apartment at Leakars Court blends modern finishes with everyday convenience:
              constant water, round-the-clock security with CCTV, a peaceful green setting, and quick access to the main road.
              Choose from impeccably kept <b>1 Bedroom @ KSh 15,000</b> or spacious <b>2 Bedroom @ KSh 18,000</b> units - designed
              for comfort, privacy, and effortless living.
            </p>
            <ul className="mt-4 text-neutral-700 text-sm space-y-1">
              <li>• 20 tastefully maintained units • Move-in ready</li>
              <li>• Large, well-lit parking • Children’s play area • Spacious balconies</li>
              <li>• Serene, tree-lined compound • Professional trash collection</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="/contact" className="btn btn-primary">
                Book a Private Viewing <ArrowRight className="ml-2" size={18}/>
              </a>
              <a href="/apartments" className="btn btn-outline">See Current Availability</a>
            </div>
          </div>
          <div className="card p-0 overflow-hidden">
            <img
              src="/placeholder-assets/cover.jpg"
              alt="Leakars Court — elegant exterior and landscaped grounds"
              onError={e=>{e.currentTarget.src='/placeholder-assets/exterior.txt'}}
            />
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-2">Why Residents Love Leakars Court</h2>
        <p className="text-neutral-700 mb-6">
          We’ve perfected the details that matter most: safety, reliability, and serenity. Settle into a home that
          feels modern the moment you arrive, and practical every day thereafter.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          <Feature
            icon={<ParkingSquare/>}
            title="Generous, Safe Parking"
            text="Arrive with ease. Ample, well-lit parking inside the compound. No daily parking stress."
          />
          <Feature
            icon={<Droplets/>}
            title="24/7 Water Availability"
            text="Count on a steady, full-time water supply so your routine never skips a beat."
          />
          <Feature
            icon={<Shield/>}
            title="24/7 Security + CCTV"
            text="Professional on-site security supported by round-the-clock camera coverage."
          />
          <Feature
            icon={<Trees/>}
            title="Serene Greenery"
            text="Breathe easier in a calm, tree-lined environment that quiets the city’s pace."
          />
          <Feature
            icon={<Baby/>}
            title="Children’s Play Area"
            text="A dedicated, safe space where little ones can play within view and within the compound."
          />
          <Feature
            icon={<Camera/>}
            title="Monitored Spaces"
            text="CCTV keeps common areas watched, adding reassurance day and night."
          />
          <Feature
            icon={<Trash2/>}
            title="Clean & Tidy"
            text="Regular trash collection keeps the grounds neat, hygienic, and welcoming."
          />
          <Feature
            icon={<MapPin/>}
            title="Near the Main Road"
            text="Be on your way in minutes. Effortless access to transport, work, and daily errands."
          />
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div className="card p-0 overflow-hidden">
          <img
            src="/placeholder-assets/livingroom.jpg"
            alt="Bright living room with premium finishes and balcony access"
            onError={e=>{e.currentTarget.src='/placeholder-assets/livingroom.txt'}}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Spacious Balconies, Bright Interiors, Modern Touches</h3>
          <p className="text-neutral-700 mt-3">
            Wake up to natural light, unwind on your private balcony, and enjoy finishes that feel modern, clean, and built to last.
            At Leakars Court, comfort isn’t an upgrade, it’s standard.
          </p>
          <ul className="mt-4 text-neutral-700 text-sm space-y-1">
            <li>• Airy living spaces ideal for relaxing or entertaining</li>
            <li>• Practical layouts for singles, couples, and young families</li>
            <li>• Thoughtful storage and easy-to-maintain materials</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="/gallery" className="btn btn-outline">Explore the Gallery</a>
            <a href="/contact" className="btn btn-primary">Schedule Your Viewing</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <CTA/>
      </div>
    </div>
  )
}

function Feature({icon, title, text}){
  return (
    <div className="card p-6">
      <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-600 grid place-items-center mb-3">
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-neutral-700">{text}</div>
    </div>
  )
}
