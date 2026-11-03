import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Footer from '../components/Footer.jsx'
import Reviews from '../components/Reviews.jsx'
import GeniusSection from '../components/GeniusSection.jsx'
import cry808Home from '../assets/Cry808_Home.png'
import artistHeatHome from '../assets/ArtistHeat_Home.png'
import fernyg342Avatar from '../assets/reviews/fernyg342.jpg'
import mrdjnyAvatar from '../assets/reviews/mrdjny.jpg'

const REVIEWS = [
  {
    username: 'fernyg342',
    avatar: fernyg342Avatar,
    country: 'United States',
    comment: "Wrote a dope article about my song, made revisions quickly when I asked him too and was very thoughtful and spot on with what he had to say. Order from this guy, you won't be disappointed!",
  },
  {
    username: 'lacreshahayesra',
    avatar: null,
    country: 'United States',
    comment: 'I will be back!',
  },
  {
    username: 'mrdjny',
    avatar: mrdjnyAvatar,
    country: 'United States',
    comment: 'Another great service thank you so much.',
  },
  {
    username: 'justinbestok',
    avatar: null,
    country: 'India',
    comment: 'Great and fast delivery, will order again.',
  },
  {
    username: 'mrdjny',
    avatar: mrdjnyAvatar,
    country: 'United States',
    comment: 'Thank you for everything, take care.',
  },
  {
    username: 'mrdjny',
    avatar: mrdjnyAvatar,
    country: 'United States',
    comment: 'Thank you for everything, have a great day 😊😁 awesome job 🤝😊',
  },
  {
    username: 'mrdjny',
    avatar: mrdjnyAvatar,
    country: 'United States',
    comment: 'Awesome job thank you so much 😎',
  },
  {
    username: 'bravodaproducer',
    avatar: null,
    country: 'United States',
    comment: '😎😁 Solid blog write-up on the CRY808 feature 📰🔥 Great working with you, take care.',
  },
  {
    username: 'kingmushuben987',
    avatar: null,
    country: 'United States',
    comment: 'Perfect timing and delivery.',
  },
  {
    username: 'lpzchris1',
    avatar: null,
    country: 'United States',
    comment: 'He is absolutely amazing and efficient.',
  },
  {
    username: 'mrdjny',
    avatar: mrdjnyAvatar,
    country: 'United States',
    comment: 'Always great service, communicates well, team player, and makes sure the client is happy.',
  },
  {
    username: 'nashville615tn',
    avatar: null,
    country: 'United States',
    comment: 'Another great job, thank you.',
  },
  {
    username: 'ceo_goat',
    avatar: null,
    country: 'United States',
    comment: 'I like the way the seller described my music in the article, so detailed and professional, and the delivery time was on point. Delivered on time, thanks a million.',
  },
  {
    username: 'jared_999',
    avatar: null,
    country: 'United States',
    comment: 'Great work as always.',
  },
  {
    username: 'muzicboxx',
    avatar: null,
    country: 'United States',
    comment: "Truly amazing work. One of the best freelancers out there. If you're a serious musician, hit him up for top notch professional work 🔥🔥🔥",
  },
  {
    username: 'gent1999',
    avatar: null,
    country: 'United States',
    comment: 'Great article.',
  },
]

const SERVICES = [
  {
    name: 'Cry808',
    domain: 'cry808.com',
    tagline: 'Hip-Hop News',
    description: 'Hip-hop news, interviews, and reviews.',
    url: 'https://cry808.com',
    image: cry808Home,
    accentClass: 'bg-purple-500',
    accentTextClass: 'text-purple-400',
    glowClass: 'bg-purple-500',
    borderColor: 'purple',
    buyNowPath: '/submit-cry808',
    buyNowLabel: 'Buy Now: $5',
  },
  {
    name: 'ArtistHeat',
    domain: 'artistheat.com',
    tagline: 'Music & Culture',
    description: 'Interviews, music reviews, and fashion.',
    url: 'https://artistheat.com',
    image: artistHeatHome,
    accentClass: 'bg-red-500',
    accentTextClass: 'text-red-400',
    glowClass: 'bg-red-500',
    borderColor: 'red',
    buyNowPath: '/submit-artistheat',
    buyNowLabel: 'Buy Now: $5',
  },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>PluggPress — The Hub for Our Music Sites & Services</title>
        <meta name="description" content="PluggPress is the home base for our music properties and services — Cry808, ArtistHeat, and Genius lyrics + artist profiles." />
      </Helmet>

      <div id="top" className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        {/* Hero — network + reviews, all above the fold */}
        <section id="services" className="max-w-6xl mx-auto px-6 pt-8 pb-10">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Our network</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              The sites we run.
            </h1>
            <p className="mt-1.5 text-white/50 text-xs sm:text-sm max-w-xl">
              PluggPress is the home base for everything we build in music — pick a site below.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>
        </section>

        <GeniusSection />

        <Reviews reviews={REVIEWS} />

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Get in touch</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Work with us</h2>
              <p className="mt-2 text-white/50 text-sm">Questions about Cry808, ArtistHeat, Genius, or something new — send it over.</p>
            </div>
            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
