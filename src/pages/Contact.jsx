import { Helmet } from 'react-helmet-async'
import { SITE } from '../siteData'

export default function Contact(){
  const whatsappPrefill = encodeURIComponent('Hello Leakars Court, I would like to book a viewing.')

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet><title>Contact — Leakars Court</title></Helmet>
      <h1 className="text-3xl font-bold mb-1">Contact Us</h1>
      <p className="text-neutral-600 mb-6">We’d love to hear from you. Reach out on WhatsApp or email and we’ll respond promptly.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Quick Contacts</h3>
          <div className="text-neutral-700">
            <div>Phone/WhatsApp: <a className="text-maroon-600 underline" href={SITE.whatsappLink + '?text=' + whatsappPrefill}>{SITE.phonePretty}</a></div>
            <div>Email: <a className="text-maroon-600 underline" href={'mailto:'+SITE.email}>{SITE.email}</a></div>
          </div>
          <a href={SITE.whatsappLink + '?text=' + whatsappPrefill} className="btn btn-primary mt-5 w-full text-center">Chat on WhatsApp</a>
          <a href={'mailto:'+SITE.email+'?subject=Apartment%20Viewing%20Request&body=Hello%20Leakars%20Court%2C%0A%0AI%27d%20like%20to%20book%20a%20viewing.%20Here%20are%20my%20details%3A%0AName%3A%0APreferred%20Unit%3A%201BR%20or%202BR%0APreferred%20Date%2FTime%3A%0A%0AThanks!'} className="btn btn-outline mt-3 w-full text-center">Send Email</a>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-3">Simple Inquiry (No backend)</h3>
          <form onSubmit={(e)=>{
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = fd.get('name');
            const type = fd.get('type');
            const msg = encodeURIComponent(`Hello Leakars Court, my name is ${name}. I’d like to book a viewing for a ${type}.`);
            window.location.href = SITE.whatsappLink + '?text=' + msg;
          }} className="grid gap-3">
            <input className="card p-3" name="name" required placeholder="Your full name"/>
            <select className="card p-3" name="type">
              <option>1 Bedroom</option>
              <option>2 Bedroom</option>
            </select>
            <button className="btn btn-primary">Send via WhatsApp</button>
          </form>
        </div>
      </div>
    </div>
  )
}
