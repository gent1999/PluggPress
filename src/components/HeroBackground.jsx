function GlobeWireframe({ className, cornerX }) {
  const maskImage = `radial-gradient(circle at ${cornerX}% 53%, black 0%, black 30%, transparent 72%)`
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={{ maskImage, WebkitMaskImage: maskImage }}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* silhouette + a couple of off-axis meridians -- slightly rotated and
          uneven so it doesn't read as a perfectly regular cage */}
      <circle cx="200" cy="200" r="150" strokeWidth="0.6" opacity="0.55" />
      <ellipse cx="188" cy="208" rx="65" ry="150" strokeWidth="0.5" opacity="0.4" transform="rotate(-7 188 208)" />
      <ellipse cx="214" cy="192" rx="112" ry="150" strokeWidth="0.5" opacity="0.35" transform="rotate(6 214 192)" />
      {/* a couple of small, tilted latitude arcs -- no wide horizontal rings */}
      <ellipse cx="195" cy="235" rx="95" ry="26" strokeWidth="0.5" opacity="0.3" transform="rotate(-9 195 235)" />
      <ellipse cx="208" cy="120" rx="80" ry="20" strokeWidth="0.5" opacity="0.3" transform="rotate(10 208 120)" />
    </svg>
  )
}

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* purple/magenta glow behind the hero heading -- fades out well above the
          cards, so there's nothing left to clip into a hard edge further down */}
      <div
        className="absolute left-1/2 top-[-160px] h-[460px] w-[1200px] max-w-[160%] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(168,85,247,0.30) 0%, rgba(217,70,239,0.15) 35%, rgba(168,85,247,0) 68%)',
        }}
      />

      {/* ambient yellow/orange glow, centered right at the lower corners of the
          hero/cards area -- anchored to a point (not an edge) so it radiates and
          fades evenly with no boundary anywhere to clip against */}
      <div
        className="absolute left-0 top-[460px] h-[460px] w-[460px]"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251,146,60,0.14) 0%, rgba(251,146,60,0) 65%)',
        }}
      />
      <div
        className="absolute right-0 top-[460px] h-[460px] w-[460px]"
        style={{
          transform: 'translate(50%, -50%)',
          background: 'radial-gradient(circle, rgba(250,204,21,0.12) 0%, rgba(250,204,21,0) 65%)',
        }}
      />

      {/* wireframe network-globe details -- mostly off-screen, just a faint
          sliver showing near each top corner, well clear of the logo/nav/hero */}
      <GlobeWireframe className="absolute -top-28 -left-28 w-[210px] h-[210px] text-purple-400/20" cornerX={53} />
      <GlobeWireframe className="absolute -top-28 -right-28 w-[210px] h-[210px] text-purple-400/20" cornerX={47} />
    </div>
  )
}
