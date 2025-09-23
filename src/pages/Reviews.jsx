import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'

const DEFAULT_TESTIMONIALS = [
  { name: 'Grace W.', text: 'Quiet, clean, and very secure. My kids love the play area!', rating: 5 },
  { name: 'Brian M.', text: 'Reliable water and quick access to the road. Great value.', rating: 5 },
  { name: 'Naomi K.', text: 'Spacious balcony and safe parking sealed the deal for me.', rating: 4 },
]

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch from Supabase (newest first)
  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) setError(error.message)
    setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const allReviews = useMemo(() => {
    return [...reviews, ...DEFAULT_TESTIMONIALS] // DB first, then defaults as fillers
  }, [reviews])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet><title>Reviews — Leakars Court</title></Helmet>

      <h1 className="text-3xl font-bold mb-2">What Our Tenants Say</h1>
      <p className="text-neutral-700 mb-6">
        Real experiences from residents and visitors. Add yours below — it helps others choose with confidence.
      </p>

      {error && <div className="card p-4 text-sm text-red-700 bg-red-50 border border-red-100 mb-4">{error}</div>}

      {loading ? (
        <div className="card p-6">Loading reviews…</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {allReviews.map((t, i) => (
            <div key={t.id || `default-${i}`} className="card p-6 flex flex-col">
              <Stars n={t.rating} />
              <p className="mt-3 text-neutral-700 flex-1">“{t.body || t.text}”</p>
              <div className="mt-4 font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t my-10" />

      <SubmitReview
        onAdd={async (rev) => {
          // Optimistic UI
          const optimistic = [{ ...rev, id: `temp-${Date.now()}` }, ...reviews]
          setReviews(optimistic)

          const { error } = await supabase.from('reviews').insert({
            name: rev.name,
            rating: rev.rating,
            body: rev.text
          })
          if (error) {
            // revert and show error
            setReviews(reviews)
            alert('Could not save review. Please try again.')
          } else {
            load()
          }
        }}
      />

      <div className="mt-10 card p-6 text-sm text-neutral-600">
        Note: New reviews appear instantly and are visible to everyone across devices. We may curate featured reviews on the homepage.
      </div>
    </div>
  )
}

/* ------------ Components ------------ */

function Stars({ n }) {
  return (
    <div className="text-maroon-500" aria-label={`${n} out of 5 stars`}>
      {'★'.repeat(n)}
      <span className="text-neutral-300">{'★'.repeat(5 - n)}</span>
    </div>
  )
}

function SubmitReview({ onAdd }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)

  const isValid = name.trim().length >= 2 && text.trim().length >= 10

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || busy) return
    setBusy(true)
    await onAdd({ name: name.trim(), rating, text: text.trim() })
    setBusy(false)
    setSubmitted(true)
    setName(''); setRating(5); setText('')
  }

  return (
    <section className="card p-6">
      <h2 className="text-xl font-semibold">Add Your Review</h2>
      <p className="text-neutral-700 mt-1">
        Tell us what you loved about living or visiting Leakars Court. No login required.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
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

        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <StarPicker value={rating} onChange={setRating} />
        </div>

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

        <div className="flex flex-wrap gap-3">
          <button disabled={!isValid || busy} className="btn btn-primary">
            {busy ? 'Submitting…' : 'Submit Review'}
          </button>
        </div>

        {submitted && (
          <div className="text-sm text-maroon-700 bg-maroon-50 border border-maroon-100 rounded-xl p-3">
            Thank you! Your review has been submitted.
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
