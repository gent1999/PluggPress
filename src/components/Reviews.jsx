import { useState, useRef, useEffect } from 'react'

const AUTO_ADVANCE_MS = 3500

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.914c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ username, image }) {
  if (image) {
    return <img src={image} alt={username} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
  }
  return (
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60 flex-shrink-0">
      {username.charAt(0).toUpperCase()}
    </div>
  )
}

export default function Reviews({ reviews }) {
  const rowRef = useRef(null)
  const intervalRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollButtons() {
    const el = rowRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  function stepWidth() {
    const el = rowRef.current
    if (!el || !el.firstElementChild) return 0
    const gap = parseFloat(window.getComputedStyle(el).columnGap || '0')
    return el.firstElementChild.getBoundingClientRect().width + gap
  }

  function advance() {
    const el = rowRef.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + stepWidth(), behavior: 'smooth' })
    setTimeout(updateScrollButtons, 400)
  }

  function restartAutoAdvance() {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(advance, AUTO_ADVANCE_MS)
  }

  useEffect(() => {
    restartAutoAdvance()
    return () => clearInterval(intervalRef.current)
  }, [])

  function scrollByOne(direction) {
    const el = rowRef.current
    if (!el) return
    el.scrollBy({ left: direction * stepWidth(), behavior: 'smooth' })
    setTimeout(updateScrollButtons, 400)
    restartAutoAdvance()
  }

  return (
    <section id="reviews" className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">Reviews</p>
        <h2 className="text-2xl sm:text-3xl font-bold">What clients are saying</h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={restartAutoAdvance}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-zinc-950 to-transparent z-[1]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-950 to-transparent z-[1]" />

        <button
          type="button"
          onClick={() => scrollByOne(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll reviews left"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-amber-400 hover:bg-amber-300 text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByOne(1)}
          disabled={!canScrollRight}
          aria-label="Scroll reviews right"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-amber-400 hover:bg-amber-300 text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>

        <div
          ref={node => { rowRef.current = node; if (node) updateScrollButtons() }}
          onScroll={updateScrollButtons}
          className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-[250px] sm:w-[270px] bg-white/[0.03] border border-white/10 rounded-xl p-3"
            >
              <div className="flex items-center gap-2">
                <Avatar username={r.username} image={r.avatar} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{r.username}</p>
                  <p className="text-[10px] text-white/40">{r.country}</p>
                </div>
              </div>
              <div className="mt-2">
                <Stars />
              </div>
              <p className="mt-2 text-xs text-white/60 leading-relaxed line-clamp-2">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
