function GlobeSvg({ fade }) {
  const maskImage =
    fade === 'left'
      ? 'linear-gradient(to right, black 35%, transparent 85%)'
      : 'linear-gradient(to left, black 35%, transparent 85%)'
  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      style={{ maskImage, WebkitMaskImage: maskImage }}
      fill="none"
      stroke="#c084fc"
      strokeWidth="1"
      aria-hidden="true"
    >
      {/* longitude lines */}
      <circle cx="200" cy="200" r="180" />
      <ellipse cx="200" cy="200" rx="70" ry="180" />
      <ellipse cx="200" cy="200" rx="130" ry="180" />
      {/* latitude lines */}
      <ellipse cx="200" cy="200" rx="180" ry="70" />
      <ellipse cx="200" cy="200" rx="180" ry="130" />
    </svg>
  )
}

export default function HeroGlobes() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div style={{ position: 'absolute', left: '-190px', top: '50px', width: '380px', height: '380px', opacity: 0.25 }}>
        <GlobeSvg fade="left" />
      </div>
      <div style={{ position: 'absolute', right: '-170px', top: '20px', width: '340px', height: '340px', opacity: 0.2 }}>
        <GlobeSvg fade="right" />
      </div>
    </div>
  )
}
