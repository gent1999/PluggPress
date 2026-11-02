import disc from '../assets/logo/pluggpress-disc.png'
import outline from '../assets/logo/pluggpress-outline.png'
import wordmark from '../assets/logo/pluggpress-wordmark.png'

export default function Logo({ className = '' }) {
  return (
    <div className={`relative isolate ${className}`} style={{ aspectRatio: '1672 / 941' }} aria-label="PluggPress">
      <img
        src={disc}
        alt=""
        className="absolute pointer-events-none animate-[logo-spin_7s_linear_infinite] motion-reduce:animate-none"
        style={{ width: '26.91%', left: '51.62%', top: '21.79%', transformOrigin: 'center center' }}
      />
      <img src={outline} alt="" className="absolute inset-0 w-full h-full pointer-events-none" />
      <img src={wordmark} alt="PluggPress" className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  )
}
