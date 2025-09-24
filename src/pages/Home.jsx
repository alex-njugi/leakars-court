import { Helmet } from 'react-helmet-async'
import { ArrowRight, Shield, Droplets, ParkingSquare, Trees, Camera, Baby, Trash2, MapPin } from 'lucide-react'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <div className="bg-white text-neutral-900">
      <Helmet>
        <title>Leakars Court - Luxury Apartments</title>
        <meta
          name="description"
          content="Discover refined living at Leakars Court: elegant 1 & 2 bedroom apartments from KSh 15,000, with 24/7 security & CCTV, constant water, serene greenery, generous parking, and instant access to the main road. Book a private viewing today."
        />
      </Helmet>

      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-maroon-500/10 blur-3xl"/>
          <div className="absolute -bottom-40 -left-10 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"/>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-maroon-50/40"/>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 id="hero-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Luxury living refined at <span className="text-maroon-600">Leakars Court</span>
            </h1>
            <p className="mt-5 text-neutral-700 text-base md:text-lg max-w-prose">
              Come home to calm. Every apartment blends modern finishes with everyday convenience: constant water,
              round-the-clock security with CCTV, a peaceful green setting, and quick access to the main road. Choose from impeccably
              kept <strong>1 Bedroom @ KSh 15,000</strong> or spacious <strong>2 Bedroom @ KSh 18,000</strong> units-designed for comfort,
              privacy, and effortless living.
            </p>

            {/* Quick benefits */}
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700 md:max-w-[520px]">
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-maroon-500"/><dd>Safely maintained units</dd></div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-maroon-500"/><dd>Move-in ready</dd></div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-maroon-500"/><dd>Large, well-lit parking</dd></div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-maroon-500"/><dd>Children’s play area</dd></div>
            </dl>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="/contact" className="btn btn-primary group w-full sm:w-auto min-h-[44px]" aria-label="Book a private viewing">
                Book a Private Viewing
                <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-0.5" size={18}/>
              </a>
              <a href="/apartments" className="btn btn-outline w-full sm:w-auto min-h-[44px]" aria-label="See current availability">
                See Current Availability
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">24/7 Security Services</span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">Reliable Water</span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700">Serene Environment</span>
            </div>
          </div>

          <div className="relative">
            <div className="card p-0 overflow-hidden group">
              <img
                src="/placeholder-assets/cover.jpg"
                alt="Leakars Court exterior with landscaped greenery"
                loading="eager"
                decoding="async"
                sizes="(min-width: 768px) 600px, 100vw"
                onError={(e)=>{ e.currentTarget.src='/placeholder-assets/placeholder.jpg' }}
                className="w-full h-[300px] md:h-[420px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute -bottom-4 left-4 md:-bottom-5 md:left-5">
              <div className="rounded-2xl bg-white/90 backdrop-blur border shadow-md px-4 py-2 text-sm flex items-center gap-2">
                <Shield size={16} className="text-green-600"/>
                <span className="font-medium">Gated & Guarded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section aria-labelledby="amenities" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 id="amenities" className="text-2xl md:text-3xl font-bold tracking-tight">Why residents love Leakars Court</h2>
        <p className="text-neutral-700 mt-2 md:mt-3 max-w-prose">
          We’ve perfected the details that matter most: safety, reliability, and serenity. Settle into a home that feels modern
          the moment you arrive, and practical every day thereafter.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature icon={ParkingSquare} title="Generous, safe parking" text="Ample, well-lit parking inside the compound. No daily parking stress."/>
          <Feature icon={Droplets} title="24/7 water availability" text="Count on a steady, full-time water supply so your routine never skips a beat."/>
          <Feature icon={Shield} title="24/7 security + CCTV" text="Professional on-site security supported by round-the-clock camera coverage."/>
          <Feature icon={Trees} title="Serene greenery" text="Breathe easier in a calm, tree-lined environment that quiets the city’s pace."/>
          <Feature icon={Baby} title="Children’s play area" text="A dedicated, safe space where little ones can play within view and within the compound."/>
          <Feature icon={Camera} title="Monitored spaces" text="CCTV keeps common areas watched, adding reassurance day and night."/>
          <Feature icon={Trash2} title="Clean & tidy" text="Regular trash collection keeps the grounds neat, hygienic, and welcoming."/>
          <Feature icon={MapPin} title="Near the main road" text="Be on your way in minutes. Effortless access to transport, work, and daily errands."/>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Spacious balconies, bright interiors, modern touches</h3>
          <p className="text-neutral-700">
            Wake up to natural light, unwind on your private balcony, and enjoy finishes that feel modern, clean, and built to last.
            At Leakars Court, comfort isn’t an upgrade-it’s standard.
          </p>
          <ul className="text-neutral-700 text-sm space-y-1 list-disc pl-5">
            <li>Airy living spaces ideal for relaxing or entertaining</li>
            <li>Practical layouts for singles, couples, and young families</li>
            <li>Thoughtful storage and easy-to-maintain materials</li>
          </ul>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a href="/gallery" className="btn btn-outline w-full sm:w-auto min-h-[44px]" aria-label="Explore the gallery">Explore the Gallery</a>
            <a href="/contact" className="btn btn-primary w-full sm:w-auto min-h-[44px]" aria-label="Schedule your viewing">Schedule Your Viewing</a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="card p-0 overflow-hidden group">
            <img
              src="/placeholder-assets/exterior.jpg"
              alt="Bright living room with premium finishes and balcony access"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 768px) 600px, 100vw"
              onError={(e)=>{ e.currentTarget.src='/placeholder-assets/placeholder.jpg' }}
              className="w-full h-[260px] md:h-[420px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <CTA />
      </div>
    </div>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article className="card p-6 transition duration-300 hover:shadow-lg focus-within:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-maroon-50 text-maroon-700 grid place-items-center">
          <Icon aria-hidden size={22} />
        </div>
        <div>
          <h3 className="font-semibold leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-neutral-700">{text}</p>
        </div>
      </div>
    </article>
  )
}
