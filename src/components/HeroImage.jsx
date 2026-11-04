import mobileBg from '../assets/background-mobile.webp'
import tabletBg from '../assets/background-tablet.webp'
import desktopBg from '../assets/background-desktop.webp'

export default function HeroImage() {
  const maskImage = 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
  return (
    <>
      {/* Plain CSS (not a Tailwind utility) so the per-breakpoint, Vite-hashed
          asset URLs actually land in the stylesheet -- a dynamic
          bg-[url(...)] className wouldn't survive Tailwind's static scan. */}
      <style>{`
        .pp-hero-bg {
          background-image: url(${mobileBg});
        }
        @media (min-width: 768px) {
          .pp-hero-bg { background-image: url(${tabletBg}); }
        }
        @media (min-width: 1024px) {
          .pp-hero-bg { background-image: url(${desktopBg}); }
        }
      `}</style>
      <div
        className="pp-hero-bg pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          maskImage,
          WebkitMaskImage: maskImage,
        }}
        aria-hidden="true"
      />
    </>
  )
}
