import background1 from '../assets/background1.png'

export default function HeroImage() {
  const maskImage = 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10"
      style={{
        // Keep the box close to the image's own aspect ratio so "cover" only
        // ever has to crop a little off the bottom (plain black anyway),
        // instead of zooming in on tall/narrow mobile layouts and cropping
        // the globes off the left/right edges.
        aspectRatio: '1672 / 941',
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      aria-hidden="true"
    />
  )
}
