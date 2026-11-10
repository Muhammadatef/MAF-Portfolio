import { Logo, marqueeBottom, marqueeTop } from './logos'

function Row({ items, reverse, duration }: { items: Logo[]; reverse?: boolean; duration: number }) {
  // Track holds the list twice; sliding it by -50% loops seamlessly.
  const doubled = items.concat(items)
  return (
    <div className="marquee overflow-hidden">
      <ul
        className="marquee-track flex w-max animate-marquee gap-3 pr-3"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {doubled.map((l, i) => (
          <li
            key={l.name + i}
            aria-hidden={i >= items.length}
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3.5 transition hover:-translate-y-0.5 hover:border-accent/50"
          >
            <l.Icon
              size={26}
              style={{ color: l.color }}
              className={`transition-transform duration-300 group-hover:scale-125 ${l.color ? '' : 'text-bright'}`}
            />
            <span className="whitespace-nowrap font-display text-base font-medium text-bright">
              {l.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function LogoMarquee() {
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-line/70 bg-surface/30 py-8">
      <div className="space-y-3">
        <Row items={marqueeTop} duration={58} />
        <Row items={marqueeBottom} duration={66} reverse />
      </div>
    </section>
  )
}
