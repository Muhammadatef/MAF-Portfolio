'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { ArchNode, ArchTone, Architecture } from '@/data/profile'

const W = 164
const H = 58

// tone → colour token. Brass for compute, teal for storage/serving, ivory for sources.
const toneVar: Record<ArchTone, string> = {
  source: 'var(--color-bright)',
  process: 'var(--color-accent)',
  store: 'var(--color-flow)',
  serve: 'var(--color-flow)',
  ai: 'var(--color-accent)',
  ops: 'var(--color-muted)',
}

function edgePath(a: ArchNode, b: ArchNode) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (Math.abs(dx) < W * 0.6) {
    // same column → straight vertical
    const s = dy > 0 ? 1 : -1
    return `M ${a.x} ${a.y + (s * H) / 2} L ${b.x} ${b.y - (s * H) / 2}`
  }
  const s = dx > 0 ? 1 : -1
  const x1 = a.x + (s * W) / 2
  const x2 = b.x - (s * W) / 2
  const mid = (x1 + x2) / 2
  return `M ${x1} ${a.y} C ${mid} ${a.y}, ${mid} ${b.y}, ${x2} ${b.y}`
}

export default function ArchDiagram({ arch, step }: { arch: Architecture; step: number }) {
  const byId = useMemo(() => {
    const m: Record<string, ArchNode> = {}
    arch.nodes.forEach((n) => {
      m[n.id] = n
    })
    return m
  }, [arch])

  const activeNodes = arch.steps[step]?.nodes ?? []
  const isActive = (id: string) => activeNodes.indexOf(id) !== -1

  return (
    <svg
      viewBox="0 0 1000 400"
      className="h-auto w-full min-w-[720px]"
      role="img"
      aria-label={`Architecture diagram: ${arch.name}. ${arch.steps.map((s) => `${s.title}: ${s.text}`).join(' ')}`}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="arrow" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0.8 L7 4 L0 7.2" fill="none" stroke="rgb(var(--color-muted))" strokeWidth="1.2" />
        </marker>
        <marker id="arrow-on" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0.8 L7 4 L0 7.2" fill="none" stroke="rgb(var(--color-accent))" strokeWidth="1.4" />
        </marker>
      </defs>

      {/* edges */}
      {arch.edges.map((e, i) => {
        const a = byId[e.from]
        const b = byId[e.to]
        if (!a || !b) return null
        const d = edgePath(a, b)
        const on = isActive(e.from) && isActive(e.to)
        return (
          <g key={`${arch.id}-${e.from}-${e.to}`}>
            <motion.path
              d={d}
              fill="none"
              stroke={on ? 'rgb(var(--color-accent))' : 'rgb(var(--color-line))'}
              strokeWidth={on ? 1.8 : 1.3}
              strokeDasharray={e.dashed ? '5 7' : undefined}
              className={e.dashed && on ? 'animate-dash' : undefined}
              markerEnd={on ? 'url(#arrow-on)' : 'url(#arrow)'}
              // framer's pathLength drives stroke-dasharray, so dashed edges only fade in
              initial={e.dashed ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
              animate={e.dashed ? { opacity: on ? 1 : 0.75 } : { pathLength: 1, opacity: on ? 1 : 0.75 }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: 'easeOut' }}
            />
            {on &&
              [0, 0.5].map((offset) => (
                <circle key={offset} className="packet" r="3.6" fill="rgb(var(--color-flow))" filter="url(#glow)">
                  <animateMotion dur="1.5s" begin={`${-offset * 1.5}s`} repeatCount="indefinite" path={d} />
                </circle>
              ))}
          </g>
        )
      })}

      {/* nodes */}
      {arch.nodes.map((n, i) => {
        const on = isActive(n.id)
        const tone = toneVar[n.tone]
        return (
          <motion.g
            key={`${arch.id}-${n.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: on ? 1 : 0.5, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.045 }}
          >
            {on && (
              <rect
                x={n.x - W / 2 - 4}
                y={n.y - H / 2 - 4}
                width={W + 8}
                height={H + 8}
                rx={18}
                fill="rgb(var(--color-accent) / 0.12)"
                filter="url(#glow)"
              />
            )}
            <rect
              x={n.x - W / 2}
              y={n.y - H / 2}
              width={W}
              height={H}
              rx={14}
              fill="rgb(var(--color-surface))"
              stroke={on ? 'rgb(var(--color-accent))' : 'rgb(var(--color-line))'}
              strokeWidth={on ? 1.6 : 1}
            />
            {/* tone tick */}
            <rect x={n.x - W / 2 + 10} y={n.y - 13} width={3} height={26} rx={1.5} fill={`rgb(${tone})`} />
            <text
              x={n.x - W / 2 + 22}
              y={n.sub ? n.y - 3 : n.y + 5}
              fill="rgb(var(--color-bright))"
              fontSize="13.5"
              fontWeight={600}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x - W / 2 + 22}
                y={n.y + 14}
                fill="rgb(var(--color-muted))"
                fontSize="10"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {n.sub}
              </text>
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}
