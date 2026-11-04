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
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        filter: 'drop-shadow(0 0 3px rgba(155,112,201,0.35))',
      }}
      fill="none"
      stroke="#9B70C9"
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
      {/* purple + yellow light anchored right on the visible edge of each globe,
          using the same point-anchored radial technique as the page's other
          corner glows so it fades smoothly with no box-edge seam */}
      <div
        className="absolute left-0 top-[150px] h-[320px] w-[320px]"
        style={{ transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 65%)' }}
      />
      <div
        className="absolute left-0 top-[340px] h-[300px] w-[300px]"
        style={{ transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(250,204,21,0.32) 0%, transparent 65%)' }}
      />
      <div
        className="absolute right-0 top-[110px] h-[300px] w-[300px]"
        style={{ transform: 'translate(50%, -50%)', background: 'radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 65%)' }}
      />
      <div
        className="absolute right-0 top-[290px] h-[280px] w-[280px]"
        style={{ transform: 'translate(50%, -50%)', background: 'radial-gradient(circle, rgba(250,204,21,0.28) 0%, transparent 65%)' }}
      />

      <div style={{ position: 'absolute', left: '-190px', top: '50px', width: '380px', height: '380px', opacity: 0.38 }}>
        <GlobeSvg fade="left" />
      </div>
      <div style={{ position: 'absolute', right: '-170px', top: '20px', width: '340px', height: '340px', opacity: 0.32 }}>
        <GlobeSvg fade="right" />
      </div>
    </div>
  )
}
