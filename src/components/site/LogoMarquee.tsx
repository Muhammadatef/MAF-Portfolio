'use client'

import { useEffect, useState } from 'react'
import { Logo, marqueeBottom, marqueeTop } from './logos'
import { PauseOffscreen } from './ui'

function Row({ items, reverse, duration }: { items: Logo[]; reverse?: boolean; duration: number }) {
  // The track holds the list twice; sliding it by -50% loops seamlessly.
  // The second copy is only added in the browser, which keeps ~150 KB of logo
  // markup out of the HTML the phone has to download and parse first.
  const [looping, setLooping] = useState(false)
  useEffect(() => setLooping(true), [])
  const doubled = looping ? items.concat(items) : items
  return (
    <div className="marquee overflow-hidden">
      <ul
        className={`marquee-track flex w-max gap-3 pr-3 ${looping ? 'animate-marquee' : ''}`}
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
      <PauseOffscreen className="space-y-3">
        <Row items={marqueeTop} duration={58} />
        <Row items={marqueeBottom} duration={66} reverse />
      </PauseOffscreen>
    </section>
  )
}
