import { SITE } from '../siteData'
export default function CTA(){
  return (
    <div className="card p-8 text-center">
      <h3 className="text-2xl font-bold">Ready to Book a Viewing?</h3>
      <p className="text-neutral-600 mt-2">Chat with us on WhatsApp or send an email and we’ll schedule a convenient time.</p>
      <div className="mt-5 flex items-center justify-center gap-4">
        <a href={SITE.whatsappLink} className="btn btn-primary">WhatsApp</a>
        <a href={`mailto:${SITE.email}`} className="btn btn-outline">Email Us</a>
      </div>
    </div>
  )
}
