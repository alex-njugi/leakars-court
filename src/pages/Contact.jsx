import { Helmet } from 'react-helmet-async'
import { SITE } from '../siteData'
import { Phone, MessageCircle, Mail, Clock, MapPin, ArrowRight } from 'lucide-react'

export default function Contact(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Contact - Leakars Court</title>
        <meta
          name="description"
          content="Book a private viewing at Leakars Court via WhatsApp, call, or email. Quick replies, friendly guidance, and easy directions to our serene, near-road location."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-1">Contact Us</h1>
      <p className="text-neutral-700 mb-6">
        We’d love to show you around. Reach us on WhatsApp, call us directly, or send an email, we reply quickly and help you schedule a convenient time.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column: Quick contacts + hours */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-3">Quick Contacts</h3>
            <div className="space-y-2 text-neutral-800">
              <a href={SITE.whatsappLink + '?text=' + encodeURIComponent('Hello Leakars Court, I would like to book a viewing.')}
                 className="btn btn-primary w-full">
                <MessageCircle size={18} className="mr-2"/> Chat on WhatsApp
              </a>
              <a href={`tel:${SITE.phoneIntl.replace('+','')}`} className="btn btn-outline w-full">
                <Phone size={18} className="mr-2"/> Call {SITE.phonePretty}
              </a>
              <a
                href={`mailto:${SITE.email}?subject=Apartment%20Viewing%20Request&body=Hello%20Leakars%20Court%2C%0A%0AI'd%20like%20to%20book%20a%20viewing.%20Here%20are%20my%20details%3A%0AName%3A%0APreferred%20Unit%3A%201BR%20or%202BR%0APreferred%20Date%2FTime%3A%0A%0AThanks!`}
                className="btn btn-outline w-full"
              >
                <Mail size={18} className="mr-2"/> Send Email
              </a>
            </div>

            <div className="mt-5 grid gap-2 text-sm text-neutral-700">
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-maroon-600 mt-0.5"/>
                <div>
                  <div className="font-medium">Hours</div>
                  <div>Mon–Sat: 8:00–18:00 (Sun by appointment)</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-maroon-600 mt-0.5"/>
                <div>
                  <div className="font-medium">Location</div>
                  <div>{SITE.address}</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-500 mt-4">
              We aim to respond within the hour during business times.
            </p>
          </div>

          {/* Map preview */}
          <div className="card p-3 overflow-hidden">
            <div className="rounded-xl overflow-hidden" dangerouslySetInnerHTML={{__html: SITE.mapEmbed}} />
            <div className="flex gap-3 mt-3">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                Open in Maps
              </a>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.address)}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                Get Directions <ArrowRight size={14} className="ml-1"/>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Smart WhatsApp form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="font-semibold mb-3">Book a Private Viewing (Fastest)</h3>
            <p className="text-neutral-700 mb-4">
              Fill this quick form, it opens WhatsApp with your details pre-filled so we can confirm a time right away.
            </p>

            <form
              onSubmit={(e)=>{
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = (fd.get('name') || '').toString().trim();
                const type = (fd.get('type') || '1 Bedroom').toString();
                const date = (fd.get('date') || '').toString();
                const time = (fd.get('time') || '').toString();
                const notes = (fd.get('notes') || '').toString().trim();

                const lines = [
                  `Hello Leakars Court, my name is ${name || '—'}.`,
                  `I’d like to book a viewing for a ${type}.`,
                  date || time ? `Preferred schedule: ${[date, time].filter(Boolean).join(' at ')}` : null,
                  notes ? `Notes: ${notes}` : null,
                ].filter(Boolean);

                const msg = encodeURIComponent(lines.join('\n'));
                window.location.href = SITE.whatsappLink + '?text=' + msg;
              }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div className="sm:col-span-2">
                <label className="form-label">Your Full Name</label>
                <input className="input" name="name" required placeholder="e.g., Amina K." />
              </div>

              <div>
                <label className="form-label">Preferred Unit</label>
                <select className="select" name="type" defaultValue="1 Bedroom">
                  <option>1 Bedroom</option>
                  <option>2 Bedroom</option>
                </select>
              </div>

              <div>
                <label className="form-label">Preferred Date</label>
                <input className="input" type="date" name="date" />
              </div>

              <div>
                <label className="form-label">Preferred Time</label>
                <input className="input" type="time" name="time" />
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Anything we should know?</label>
                <textarea className="textarea" name="notes" placeholder="Parking needs, move-in timeline, best contact time…"></textarea>
                <p className="form-help">We’ll do our best to accommodate your schedule.</p>
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <button className="btn btn-primary">
                  Send via WhatsApp
                </button>
                <a href={`tel:${SITE.phoneIntl.replace('+','')}`} className="btn btn-outline">
                  Call Us
                </a>
                <a
                  href={`mailto:${SITE.email}?subject=Apartment%20Viewing%20Request&body=${encodeURIComponent(
                    `Hello Leakars Court,\n\nI’d like to book a viewing.\n\nName: \nPreferred Unit: \nPreferred Date/Time: \nNotes: \n\nThanks!`
                  )}`}
                  className="btn btn-outline"
                >
                  Email Instead
                </a>
              </div>
            </form>
          </div>

          {/* Reassurance / privacy */}
          <div className="mt-6 card p-6 text-sm text-neutral-700">
            <b>What to expect:</b> we confirm a time, meet you at the gate, and tour the unit plus shared areas (parking, play area, security points).
            <br/>We respect your time, viewings are efficient and informative.
            <p className="text-xs text-neutral-500 mt-3">
              Your details are used only to schedule your viewing and answer your questions. We don’t sell or share contact info.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
