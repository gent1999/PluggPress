import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import cry808Logo from '../assets/about/cry808-logo.png'
import artistHeatLogo from '../assets/about/artistheat-logo.png'
import overallsLogo from '../assets/about/2koveralls-logo.png'
import geniusLogo from '../assets/about/genius-logo.png'

const PUBLICATIONS = [
  {
    name: 'Cry808',
    domain: 'cry808.com',
    description: 'Hip-hop news, interviews, and reviews.',
    url: 'https://cry808.com',
    logo: cry808Logo,
    logoBg: 'bg-zinc-900',
  },
  {
    name: 'ArtistHeat',
    domain: 'artistheat.com',
    description: 'Interviews, music reviews, and fashion.',
    url: 'https://artistheat.com',
    logo: artistHeatLogo,
    logoBg: 'bg-white',
  },
  {
    name: '2K Overalls',
    domain: '2koveralls.com',
    description: "Objective artist ratings and rankings — the culture's board.",
    url: 'https://2koveralls.com',
    logo: overallsLogo,
    logoBg: 'bg-black',
  },
]

const PLATFORMS = [
  {
    name: 'Fiverr',
    description: 'Where it all started — write-ups, Genius placements, and promo gigs.',
    url: 'https://www.fiverr.com',
    accent: 'text-emerald-400',
    ring: 'border-emerald-400/25 hover:border-emerald-400/50',
  },
  {
    name: 'Genius',
    description: 'Lyrics publishing and artist profile creation.',
    url: 'https://genius.com',
    logo: geniusLogo,
    accent: 'text-yellow-400',
    ring: 'border-yellow-400/25 hover:border-yellow-400/50',
  },
  {
    name: 'One Submit',
    description: 'Playlist, blog, and curator submissions for independent artists.',
    url: 'https://www.one-submit.com',
    accent: 'text-amber-400',
    ring: 'border-amber-400/25 hover:border-amber-400/50',
  },
  {
    name: 'Musosoup',
    description: 'Pay-as-you-go PR and curator coverage.',
    url: 'https://musosoup.com',
    accent: 'text-purple-400',
    ring: 'border-purple-400/25 hover:border-purple-400/50',
  },
]

function PublicationCard({ name, domain, description, url, logo, logoBg }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-colors"
    >
      <div className={`w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center ${logoBg}`}>
        <img src={logo} alt={`${name} logo`} className="w-full h-full object-contain p-1.5" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{name}</h3>
      <p className="mt-1 text-white/50 text-sm leading-relaxed">{description}</p>
      <span className="mt-3 text-xs font-mono text-white/30 group-hover:text-amber-400 transition-colors">{domain}</span>
    </a>
  )
}

function PlatformBadge({ name, description, url, logo, accent, ring }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col p-5 rounded-2xl bg-white/[0.03] border transition-colors ${ring}`}
    >
      <div className="flex items-center gap-2.5">
        {logo ? (
          <img src={logo} alt={`${name} logo`} className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <span className={`w-2 h-2 rounded-full ${accent.replace('text-', 'bg-')}`} />
        )}
        <span className={`font-bold ${accent}`}>{name}</span>
      </div>
      <p className="mt-2 text-white/50 text-xs leading-relaxed">{description}</p>
    </a>
  )
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — PluggPress</title>
        <meta
          name="description"
          content="Independent music blogger, curator, and Genius contributor behind Cry808, ArtistHeat, and 2K Overalls."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08080b] text-white flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/* Intro */}
          <section className="max-w-3xl mx-auto px-6 pt-10 pb-14 sm:pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">About</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Hi, I'm Mahmoud.
            </h1>
            <div className="mt-4 space-y-4 text-white/60 text-sm sm:text-base leading-relaxed">
              <p>
                I'm an independent music blogger, curator, and Genius contributor. I write about hip-hop
                and up-and-coming artists, place verified lyrics and artist profiles on Genius, and run
                PluggPress as the hub for everything I publish.
              </p>
              <p>
                It started on Fiverr with write-ups for independent artists, and grew into a small network
                of publications and a handful of promotion platforms I work through regularly to get real
                coverage in front of real audiences.
              </p>
            </div>
          </section>

          {/* Publications */}
          <section className="border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-14">
              <div className="mb-8 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-2">Publications</p>
                <h2 className="text-xl sm:text-2xl font-bold">What I publish</h2>
                <p className="mt-1.5 text-white/50 text-sm">Three sites, one network.</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {PUBLICATIONS.map((p) => (
                  <PublicationCard key={p.name} {...p} />
                ))}
              </div>
            </div>
          </section>

          {/* Platforms */}
          <section className="border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-14">
              <div className="mb-8 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Platforms</p>
                <h2 className="text-xl sm:text-2xl font-bold">Where I work</h2>
                <p className="mt-1.5 text-white/50 text-sm">
                  The marketplaces and tools I use to get artists placed, published, and heard.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PLATFORMS.map((p) => (
                  <PlatformBadge key={p.name} {...p} />
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-white/10">
            <div className="max-w-xl mx-auto px-6 py-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Say hey</p>
              <h2 className="text-xl sm:text-2xl font-bold">Got a song, a feature idea, or just want to connect?</h2>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://instagram.com/pluggpress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-white/[0.04] border border-white/10 hover:border-amber-400/40 rounded-lg text-sm font-semibold transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="mailto:contact@pluggpress.com"
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-lg text-sm font-bold transition-colors"
                >
                  contact@pluggpress.com
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
