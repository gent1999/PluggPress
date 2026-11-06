import { Link } from 'react-router-dom'
import geniusCover from '../assets/genius/Genius_cover.png'
import artistExample from '../assets/genius/Genius_Artist_Example.png'
import lyricsExample from '../assets/genius/Genius_Lyrics_Example.png'

const CARD_HEIGHT = 'h-64 sm:h-72'

function ArrowIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )
}

function ExamplePreview({ image, label, alt, objectPositionClass = 'object-top' }) {
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-2xl border border-yellow-400/40 shadow-[0_0_30px_-12px_rgba(250,204,21,0.35)] bg-black ${CARD_HEIGHT}`}>
      <div className="flex-1 overflow-hidden">
        <img src={image} alt={alt} className={`w-full h-full object-cover ${objectPositionClass}`} />
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-yellow-400/30">
        <span className="text-xs font-bold uppercase tracking-wider text-white">{label}</span>
        <ArrowIcon className="w-4 h-4 text-yellow-400" />
      </div>
    </div>
  )
}

export default function GeniusSection() {
  return (
    <section id="genius" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-5">
        <div
          className={`relative rounded-2xl p-[2px] shadow-[0_0_40px_-12px_rgba(250,204,21,0.4)] ${CARD_HEIGHT}`}
          style={{
            background: 'conic-gradient(from var(--border-angle), #d97706 0%, #d97706 40%, #fde68a 47%, #fffbeb 50%, #fde68a 53%, #d97706 60%, #d97706 100%)',
            animation: 'spin-border-angle 3s linear infinite',
          }}
        >
          <Link
            to="/submit-genius"
            className="group relative block w-full h-full overflow-hidden rounded-[14px]"
          >
            <img
              src={geniusCover}
              alt="Genius"
              className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="relative h-full flex flex-col justify-center p-6 sm:p-8 max-w-xs sm:max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">genius.com</span>
              <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Genius</h3>
              <p className="text-white/60 text-sm leading-relaxed mt-2">
                I'll publish your music with lyrics, and I'll create an artist profile for you on Genius.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 w-fit px-5 py-2 bg-yellow-400 group-hover:bg-yellow-300 text-black text-sm font-bold rounded-lg transition-colors">
                Buy Now: $5
                <ArrowIcon className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        <ExamplePreview image={artistExample} label="Artist Profile" alt="Example Genius artist profile" />
        <ExamplePreview image={lyricsExample} label="Lyrics Page" alt="Example Genius lyrics page" objectPositionClass="object-left-top" />
      </div>
    </section>
  )
}
