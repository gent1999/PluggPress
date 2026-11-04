function GlobeWireframe({ className, fade }) {
  const maskImage = `linear-gradient(${fade}deg, black 20%, black 55%, transparent 85%)`
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        filter: 'drop-shadow(0 0 16px rgba(168,85,247,0.45))',
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {/* outer silhouette + meridians (longitude) */}
      <circle cx="200" cy="200" r="170" />
      <ellipse cx="200" cy="200" rx="55" ry="170" />
      <ellipse cx="200" cy="200" rx="110" ry="170" />
      <ellipse cx="200" cy="200" rx="150" ry="170" />
      {/* parallels (latitude) */}
      <ellipse cx="200" cy="200" rx="170" ry="38" />
      <ellipse cx="200" cy="140" rx="160" ry="30" />
      <ellipse cx="200" cy="260" rx="160" ry="30" />
      <ellipse cx="200" cy="90" rx="110" ry="20" />
      <ellipse cx="200" cy="310" rx="110" ry="20" />
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

      {/* wireframe network-globe outlines, bleeding off the top corners */}
      <GlobeWireframe className="absolute -top-28 -left-28 w-[420px] h-[420px] text-purple-300/30" fade={135} />
      <GlobeWireframe className="absolute -top-28 -right-28 w-[420px] h-[420px] text-purple-300/30" fade={225} />
    </div>
  )
}
