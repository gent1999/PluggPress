import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Footer from '../components/Footer.jsx'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — PluggPress</title>
        <meta name="description" content="Questions about Cry808, ArtistHeat, Genius, or something new — send it over." />
      </Helmet>

      <div className="min-h-screen bg-[#08080b] text-white flex flex-col">
        <Navbar />

        <section className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="max-w-xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Get in touch</p>
              <h1 className="text-2xl sm:text-3xl font-bold">Work with us</h1>
              <p className="mt-2 text-white/50 text-sm">Questions about Cry808, ArtistHeat, Genius, or something new — send it over.</p>
              <p className="mt-4 text-sm">
                Or email us directly at{' '}
                <a href="mailto:contact@pluggpress.com" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  contact@pluggpress.com
                </a>
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
