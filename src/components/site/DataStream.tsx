'use client'

import { useEffect, useRef } from 'react'

type Lane = { y: number; amp: number; k: number; phase: number; drift: number }
type Particle = { lane: number; x: number; v: number; len: number; tone: 0 | 1 | 2 }

/**
 * Hero background: lanes of data flowing left → right.
 * Lanes bend away from the cursor. Pauses when off-screen.
 */
export default function DataStream() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Phones get a lighter scene: fewer lanes and packets, 1x resolution, ~30 fps.
    const lite = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches
    const FRAME_MS = lite ? 1000 / 30 : 0
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      const g = (n: string) => s.getPropertyValue(n).trim().split(/\s+/).join(',')
      return [g('--color-accent'), g('--color-flow'), g('--color-bright')]
    }
    let colors = readColors()
    const themeObserver = new MutationObserver(() => {
      colors = readColors()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const LANES = lite ? 9 : 18
    const lanes: Lane[] = []
    for (let i = 0; i < LANES; i++) {
      lanes.push({
        y: (i + 0.5) / LANES,
        amp: 14 + Math.random() * 26,
        k: 0.0016 + Math.random() * 0.0022,
        phase: Math.random() * Math.PI * 2,
        drift: 0.12 + Math.random() * 0.22,
      })
    }
    const particles: Particle[] = []
    for (let i = 0; i < (lite ? 20 : 64); i++) {
      const r = Math.random()
      particles.push({
        lane: Math.floor(Math.random() * LANES),
        x: Math.random(),
        v: 0.035 + Math.random() * 0.075,
        len: 40 + Math.random() * 90,
        tone: r < 0.45 ? 0 : r < 0.8 ? 1 : 2,
      })
    }

    const resize = () => {
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const laneY = (l: Lane, x: number, t: number) => {
      const base = l.y * h
      let y = base + l.amp * Math.sin(x * l.k + l.phase + t * l.drift)
      const dx = x - mouse.x
      const dy = base - mouse.y
      const push = Math.exp(-(dx * dx) / 52000) * Math.exp(-(dy * dy) / 30000)
      y += push * 46 * (dy >= 0 ? 1 : -1)
      return y
    }

    let last = performance.now()
    const frame = (now: number) => {
      // skip frames on phones, and do nothing at all while the chat covers the page
      if (now - last < FRAME_MS - 1 || document.documentElement.dataset.chat === 'open') {
        if (visible && !reduce) raf = requestAnimationFrame(frame)
        return
      }
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = now / 1000
      ctx.clearRect(0, 0, w, h)

      // faint lanes
      ctx.lineWidth = 1
      for (let i = 0; i < lanes.length; i++) {
        ctx.beginPath()
        const stepX = lite ? 48 : 24
        for (let x = 0; x <= w + stepX; x += stepX) {
          const y = laneY(lanes[i], x, t)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${colors[2]},0.05)`
        ctx.stroke()
      }

      // packets travelling along the lanes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.v * dt
        if (p.x > 1.15) {
          p.x = -0.15
          p.lane = Math.floor(Math.random() * LANES)
        }
        const l = lanes[p.lane]
        const head = p.x * w
        const tail = head - p.len
        const c = colors[p.tone]
        let stroke: string | CanvasGradient
        if (lite) {
          stroke = `rgba(${c},${p.tone === 2 ? 0.3 : 0.5})` // flat colour: no gradient object per packet per frame
        } else {
          const grad = ctx.createLinearGradient(tail, 0, head, 0)
          grad.addColorStop(0, `rgba(${c},0)`)
          grad.addColorStop(1, `rgba(${c},${p.tone === 2 ? 0.5 : 0.85})`)
          stroke = grad
        }
        ctx.beginPath()
        const segs = lite ? 3 : 6
        for (let s = 0; s <= segs; s++) {
          const x = tail + (p.len * s) / segs
          const y = laneY(l, x, t)
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = stroke
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(head, laneY(l, head, t), 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c},0.95)`
        ctx.fill()
      }

      if (visible && !reduce) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (visible && !was && !reduce) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{
        maskImage: 'linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent)',
      }}
    />
  )
}
