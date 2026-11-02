export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
        <span>© {new Date().getFullYear()} PluggPress. All rights reserved.</span>
        <span>Cry808 · ArtistHeat · Genius</span>
      </div>
    </footer>
  )
}
