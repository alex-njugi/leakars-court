import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'

const DEFAULT_TESTIMONIALS = [
  { name: 'Grace W.', text: 'Quiet, clean, and very secure. My kids love the play area!', rating: 5 },
  { name: 'Brian M.', text: 'Reliable water and quick access to the road. Great value.', rating: 5 },
  { name: 'Naomi K.', text: 'Spacious balcony and safe parking sealed the deal for me.', rating: 4 },
]

const STORAGE_KEY = 'lc_reviews' // localStorage key

function Stars({ n }) {
  return (
    <div className="text-maroon-500" aria-label={`${n} out of 5 stars`}>
      {'★'.repeat(n)}
      <span className="text-neutral-300">{'★'.repeat(5 - n)}</span>
    </div>
  )
}

export default function Reviews() {
  const [stored, setStored] = useState([])

  // Load saved reviews from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setStored(JSON.parse(raw))
    } catch {}
  }, [])

  const allReviews = useMemo(() => {
    // Newest first: stored (latest first) + defaults
    const recent = [...stored].reverse()
    return [...recent, ...DEFAULT_TESTIMONIALS]
  }, [stored])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet><title>Reviews — Leakars Court</title></Helmet>

      <h1 className="text-3xl font-bold mb-2">What Our Tenants Say</h1>
      <p className="text-neutral-700 mb-6">
        Real experiences from residents and visitors. Add yours below — it helps others choose with confidence.
      </p>

      {/* Reviews grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {allReviews.map((t, i) => (
          <div key={i} className="card p-6 flex flex-col">
            <Stars n={t.rating} />
            <p className="mt-3 text-neutral-700 flex-1">“{t.text}”</p>
            <div className="mt-4 font-semibold">{t.name}</div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t my-10" />

      {/* Frontend-only submission form */}
      <SubmitReview onAdd={(rev) => {
        // Save to localStorage
        const next = [...stored, rev]
        setStored(next)
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      }} />

      <div className="mt-10 card p-6 text-sm text-neutral-600">
        These include example reviews. Your submissions here are saved in your browser (local only). If you want your
        review considered for the public site, please also share it via WhatsApp or Email using the buttons above.
      </div>
    </div>
  )
}

/* ------------ Components ------------ */

function SubmitReview({ onAdd }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isValid = name.trim().length >= 2 && text.trim().length >= 10

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    const review = { name: name.trim(), rating, text: text.trim() }
    onAdd(review)
    setSubmitted(true)
    // Clear the form
    setName('')
    setRating(5)
    setText('')
  }

  const shareMsg = encodeURIComponent(
    `Hello Leakars Court, I'd like to share a review.\n\n` +
    `Name: ${name || '—'}\n` +
    `Rating: ${rating}/5\n` +
    `Review: ${text || '—'}\n\n` +
    `You may feature this on the website.`
  )

  return (
    <section className="card p-6">
      <h2 className="text-xl font-semibold">Add Your Review</h2>
      <p className="text-neutral-700 mt-1">
        Tell us what you loved about living or visiting Leakars Court. (No login needed — this is a frontend-only form.)
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            className="card p-3 w-full"
            placeholder="e.g., Amina K."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
        </div>

        {/* Rating (clickable stars) */}
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <StarPicker value={rating} onChange={setRating} />
        </div>

        {/* Review text */}
        <div>
          <label className="block text-sm font-medium mb-1">Your Review</label>
          <textarea
            className="card p-3 w-full min-h-[120px]"
            placeholder="Share details: safety, water reliability, parking, balconies, greenery, access to the road, etc."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            minLength={10}
          />
          <p className="text-xs text-neutral-500 mt-1">Tip: Specifics help future residents — what stood out for you?</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button disabled={!isValid} className="btn btn-primary">
            Save to This Device
          </button>
          <a
            href={`https://wa.me/254722690154?text=${shareMsg}`}
            className="btn btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            Share via WhatsApp
          </a>
          <a
            href={`mailto:talexsuppliers@gmail.com?subject=Leakars%20Court%20Review&body=${shareMsg}`}
            className="btn btn-outline"
          >
            Share via Email
          </a>
        </div>

        {submitted && (
          <div className="text-sm text-maroon-700 bg-maroon-50 border border-maroon-100 rounded-xl p-3">
            Thank you! Your review was saved on this device. If you’d like it considered for the public page,
            please also send it via WhatsApp or Email.
          </div>
        )}
      </form>
    </section>
  )
}

function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-2xl leading-none ${n <= value ? 'text-maroon-500' : 'text-neutral-300'} hover:scale-110 transition`}
          aria-label={`${n} star${n>1?'s':''}`}
          title={`${n} star${n>1?'s':''}`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-sm text-neutral-600">{value}/5</span>
    </div>
  )
}
