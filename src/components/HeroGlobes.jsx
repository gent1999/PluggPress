function GlobeSvg({ fade }) {
  const maskImage =
    fade === 'left'
      ? 'linear-gradient(to right, black 30%, transparent 80%)'
      : 'linear-gradient(to left, black 30%, transparent 80%)'
  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        filter: 'drop-shadow(0 0 4px rgba(217,70,239,0.35))',
      }}
      fill="none"
      stroke="#dcc9f5"
      strokeWidth="0.75"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="170" />
      {/* longitude (meridian) lines */}
      <ellipse cx="200" cy="200" rx="154" ry="170" />
      <ellipse cx="200" cy="200" rx="109" ry="170" />
      <ellipse cx="200" cy="200" rx="44" ry="170" />
      {/* latitude (parallel) lines */}
      <ellipse cx="200" cy="142" rx="160" ry="35" />
      <ellipse cx="200" cy="258" rx="160" ry="35" />
      <ellipse cx="200" cy="91" rx="130" ry="29" />
      <ellipse cx="200" cy="309" rx="130" ry="29" />
      <ellipse cx="200" cy="53" rx="85" ry="19" />
      <ellipse cx="200" cy="347" rx="85" ry="19" />
    </svg>
  )
}

export default function HeroGlobes() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {/* magenta/purple light anchored right on the visible edge of each globe --
          point-anchored radial glow so it fades smoothly with no box-edge seam */}
      <div
        className="absolute left-0 top-[60px] h-[320px] w-[320px]"
        style={{ transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(217,70,239,0.38) 0%, rgba(168,85,247,0.22) 35%, transparent 68%)' }}
      />
      <div
        className="absolute right-0 top-[180px] h-[380px] w-[380px]"
        style={{ transform: 'translate(50%, -50%)', background: 'radial-gradient(circle, rgba(217,70,239,0.34) 0%, rgba(168,85,247,0.2) 35%, transparent 68%)' }}
      />

      <div style={{ position: 'absolute', left: '-190px', top: '-100px', width: '340px', height: '340px', opacity: 0.7 }}>
        <GlobeSvg fade="left" />
      </div>
      <div style={{ position: 'absolute', right: '-230px', top: '10px', width: '380px', height: '380px', opacity: 0.62 }}>
        <GlobeSvg fade="right" />
      </div>
    </div>
  )
}
