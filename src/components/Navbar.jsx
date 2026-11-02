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
    <div className="sticky top-0 z-50 pt-3 px-3 sm:pt-4 sm:px-6 flex items-center justify-between max-w-6xl mx-auto">
      <a href="#top" className="flex items-center">
        <Logo className="h-20 sm:h-28 w-auto" />
      </a>
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
        <a href="#services" className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors">Network</a>
        <a href="#contact" className="px-3 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors">Contact</a>
      </nav>
    </div>
  )
}
