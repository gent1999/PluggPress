import { Link } from 'react-router-dom'

const BORDER_CLASSES = {
  purple: 'border-purple-500/40 shadow-[0_0_28px_-16px_rgba(147,51,234,0.6)]',
  red: 'border-red-500/40 shadow-[0_0_28px_-16px_rgba(220,38,38,0.6)]',
}

export default function ServiceCard({ name, tagline, description, url, domain, image, accentClass, accentTextClass, glowClass, borderColor, buyNowPath, buyNowLabel }) {
  return (
    <div className={`relative flex flex-col sm:flex-row overflow-hidden bg-zinc-950 rounded-2xl border ${BORDER_CLASSES[borderColor]}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col w-full sm:w-[55%] flex-shrink-0 overflow-hidden bg-black/30"
      >
        <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="ml-1.5 text-[9px] font-mono text-white/40">{domain}</span>
        </div>
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <div className={`pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${glowClass}`} />
          <img
            src={image}
            alt={`${name} home page`}
            className="block w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </a>

      <div className="relative flex flex-col flex-1 min-w-0 p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">{name}</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1.5 line-clamp-2">{description}</p>

        <div className="mt-3 sm:mt-4 space-y-2">
          {buyNowPath ? (
            <Link
              to={buyNowPath}
              className="block w-full text-center px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold rounded-lg transition-colors"
            >
              {buyNowLabel || 'Buy Now'}
            </Link>
          ) : (
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${accentTextClass}`}>{tagline}</span>
          )}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition-colors"
          >
            Visit site
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
            </svg>
          </a>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 ${accentClass} opacity-70`} />
    </div>
  )
}
