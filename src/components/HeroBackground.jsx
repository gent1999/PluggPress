function GlobeWireframe({ className, fade }) {
  const maskImage = `linear-gradient(${fade}deg, black 5%, transparent 72%)`
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={{ maskImage, WebkitMaskImage: maskImage }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="180" />
      <ellipse cx="200" cy="200" rx="70" ry="180" />
      <ellipse cx="200" cy="200" rx="130" ry="180" />
      <ellipse cx="200" cy="200" rx="180" ry="70" />
      <ellipse cx="200" cy="200" rx="180" ry="130" />
      <line x1="20" y1="200" x2="380" y2="200" />
    </svg>
  )
}

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* purple/magenta glow behind the hero heading */}
      <div
        className="absolute left-1/2 top-[-160px] h-[460px] w-[1200px] max-w-[160%] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(168,85,247,0.32) 0%, rgba(217,70,239,0.16) 38%, rgba(168,85,247,0) 70%)',
        }}
      />

      {/* ambient yellow/orange glow, anchored exactly on the lower corners so it fades
          to transparent before the overflow-hidden clip (avoids a hard seam) */}
      <div
        className="absolute bottom-0 left-0 h-[460px] w-[460px]"
        style={{
          transform: 'translate(-50%, 50%)',
          background: 'radial-gradient(circle, rgba(251,146,60,0.18) 0%, rgba(251,146,60,0) 65%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[460px] w-[460px]"
        style={{
          transform: 'translate(50%, 50%)',
          background: 'radial-gradient(circle, rgba(250,204,21,0.16) 0%, rgba(250,204,21,0) 65%)',
        }}
      />

      {/* wireframe network-globe outlines, bleeding off the top corners */}
      <GlobeWireframe className="absolute -top-32 -left-32 w-[420px] h-[420px] text-purple-300/40" fade={135} />
      <GlobeWireframe className="absolute -top-32 -right-32 w-[420px] h-[420px] text-purple-300/40" fade={225} />
    </div>
  )
}
