import { Link } from 'react-router-dom'

const BORDER_GRADIENTS = {
  purple: 'conic-gradient(from var(--border-angle), #9333ea 0%, #9333ea 40%, #e9d5ff 47%, #ffffff 50%, #e9d5ff 53%, #9333ea 60%, #9333ea 100%)',
  red: 'conic-gradient(from var(--border-angle), #dc2626 0%, #dc2626 40%, #fecaca 47%, #ffffff 50%, #fecaca 53%, #dc2626 60%, #dc2626 100%)',
}

const BORDER_SHADOWS = {
  purple: '0 0 30px -12px rgba(147,51,234,0.5)',
  red: '0 0 30px -12px rgba(220,38,38,0.5)',
}

export default function ServiceCard({ name, tagline, description, url, domain, image, accentClass, accentTextClass, glowClass, borderColor, buyNowPath, buyNowLabel }) {
  return (
    <div
      className="relative rounded-2xl p-[2px]"
      style={{
        background: BORDER_GRADIENTS[borderColor],
        boxShadow: BORDER_SHADOWS[borderColor],
        animation: 'spin-border-angle 3s linear infinite',
      }}
    >
      <div className="relative overflow-hidden bg-zinc-950 rounded-[14px]">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
        >
          <div className={`pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${glowClass}`} />

          {/* Browser-chrome preview of the site's home page */}
          <div className="relative bg-black/40 border-b border-white/10">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="ml-2 text-[10px] font-mono text-white/30">{domain}</span>
            </div>
            <div className="h-28 sm:h-32 overflow-hidden">
              <img
                src={image}
                alt={`${name} home page`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="relative p-3 sm:p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">{name}</h3>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${accentTextClass} flex-shrink-0`}>{tagline}</span>
            </div>
            <p className="text-white/50 text-xs mt-1 truncate">{description}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
              Visit site
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </a>

        {buyNowPath && (
          <div className="relative px-3 sm:px-4 pb-3 sm:pb-4">
            <Link
              to={buyNowPath}
              className="flex items-center justify-center gap-1.5 w-full py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-colors"
            >
              {buyNowLabel || 'Buy Now'}
            </Link>
          </div>
        )}

        <div className={`absolute bottom-0 left-0 right-0 h-1 ${accentClass} opacity-70`} />
      </div>
    </div>
  )
}
