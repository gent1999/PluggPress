import { Link } from 'react-router-dom'
import navbarBg from '../assets/yellow-navbar-background.png'
import Logo from './Logo.jsx'

const chipBgStyle = {
  backgroundImage: `url(${navbarBg})`,
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
}

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 pt-3 px-3 sm:pt-4 sm:px-6 flex items-center justify-between w-full max-w-6xl mx-auto">
      <Link to="/" className="flex items-center">
        <Logo className="h-20 sm:h-28 w-auto" />
      </Link>
      <nav
        className="flex items-center gap-1 rounded-2xl px-2 py-2 text-sm font-medium text-white/70 shadow-lg shadow-black/60"
        style={{
          backgroundImage: `url(${navbarBg}), conic-gradient(from var(--border-angle), #d97706 0%, #d97706 40%, #fde68a 47%, #fffbeb 50%, #fde68a 53%, #d97706 60%, #d97706 100%)`,
          backgroundOrigin: 'padding-box, border-box',
          backgroundClip: 'padding-box, border-box',
          backgroundSize: 'cover, 100% 100%',
          backgroundPosition: 'center top, 0 0',
          backgroundAttachment: 'fixed, scroll',
          backgroundRepeat: 'no-repeat, no-repeat',
          border: '2px solid transparent',
          animation: 'spin-border-angle 3s linear infinite',
        }}
      >
        <a href="/#services" className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors">Network</a>
        <Link to="/contact" className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors">Contact</Link>
        <a
          href="https://instagram.com/pluggpress"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow PluggPress on Instagram"
          className="p-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.4 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.4-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.4-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.4 2.5-.5C8.9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.4 6.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
          </svg>
        </a>
      </nav>
    </div>
  )
}
