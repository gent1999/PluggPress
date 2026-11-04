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
      <div className="relative flex flex-col sm:flex-row sm:h-60 overflow-hidden bg-zinc-950 rounded-[14px]">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full h-44 sm:h-full sm:w-[55%] flex-shrink-0 overflow-hidden"
        >
          <div className={`pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${glowClass}`} />
          <img
            src={image}
            alt={`${name} home page`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="ml-1.5 text-[9px] font-mono text-white/40">{domain}</span>
          </div>
        </a>

        <div className="relative flex flex-col flex-1 min-w-0 justify-between p-4 sm:p-5">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">{name}</h3>
            <p className="text-white/50 text-xs sm:text-sm mt-1.5 line-clamp-2">{description}</p>
          </div>

          <div className="mt-4 space-y-2.5">
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
    </div>
  )
}
