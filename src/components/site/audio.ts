/**
 * Piano audio engine.
 *
 * Browsers only let a page make sound after a real user gesture, and they differ on
 * which events count (a mouse press does, the start of a touch does not, Safari can
 * "interrupt" a context when the tab loses focus). So:
 *
 *  - there is exactly one AudioContext for the page, kept on window
 *  - every gesture anywhere on the page unlocks / resumes it
 *  - a note is only scheduled once the context is really running; if it is not yet,
 *    the note waits for the resume and then plays
 *  - a context that refuses to come back is thrown away and rebuilt
 */

type Engine = { ctx: AudioContext; out: GainNode }

const GESTURES = ['pointerdown', 'pointerup', 'mousedown', 'touchend', 'keydown', 'click'] as const
const LATE_NOTE_MS = 1200 // a note older than this is dropped rather than played late

let listening = false
let stuckSince = 0

function build(): Engine | null {
  const w = window as any
  const AC = window.AudioContext || w.webkitAudioContext
  if (!AC) return null
  const ctx: AudioContext = new AC()
  const out = ctx.createGain()
  out.gain.value = 0.9
  // a limiter, so fast playing with many overlapping notes never clips
  const limiter = ctx.createDynamicsCompressor()
  limiter.threshold.value = -10
  limiter.ratio.value = 12
  out.connect(limiter)
  limiter.connect(ctx.destination)
  const engine = { ctx, out }
  w.__mafAudio = engine
  return engine
}

function engine(): Engine | null {
  const w = window as any
  const current: Engine | undefined = w.__mafAudio
  if (current && current.ctx && current.out && current.ctx.state !== 'closed') return current
  try {
    return build()
  } catch {
    return null
  }
}

/** Call from inside a user gesture: makes sure the context exists and is running. */
export function unlockAudio() {
  const e = engine()
  if (!e) return
  if (e.ctx.state === 'running') {
    stuckSince = 0
    return
  }
  // Not running although we are inside a gesture. Ask it to resume; if it has been
  // refusing for a while (dead device, exhausted context), replace it.
  const now = Date.now()
  if (!stuckSince) stuckSince = now
  if (now - stuckSince > 2500) {
    stuckSince = 0
    try {
      e.ctx.close()
    } catch {
      /* ignore */
    }
    try {
      const fresh = build()
      if (fresh && fresh.ctx.state !== 'running') fresh.ctx.resume().catch(() => {})
    } catch {
      /* ignore */
    }
    return
  }
  e.ctx.resume().catch(() => {})
}

/** Start listening for gestures page-wide, so audio is usually unlocked before the piano is touched. */
export function armAudio() {
  if (listening || typeof window === 'undefined') return
  listening = true
  GESTURES.forEach((type) => window.addEventListener(type, unlockAudio, { capture: true, passive: true }))
}

function schedule(e: Engine, midi: number, length: number) {
  const { ctx, out } = e
  const f = 440 * Math.pow(2, (midi - 69) / 12)
  const now = ctx.currentTime + 0.005
  const env = ctx.createGain()
  env.gain.setValueAtTime(0.0001, now)
  env.gain.exponentialRampToValueAtTime(0.24, now + 0.012)
  env.gain.exponentialRampToValueAtTime(0.0001, now + length)
  env.connect(out)
  const partials: [OscillatorType, number, number][] = [
    ['triangle', 1, 1],
    ['sine', 2, 0.28],
    ['sine', 3, 0.08],
  ]
  partials.forEach(([type, mult, vol], i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = f * mult
    g.gain.value = vol
    o.connect(g)
    g.connect(env)
    o.start(now)
    o.stop(now + length + 0.05)
    // free the nodes when the note ends, so long sessions never pile them up
    if (i === 0) {
      o.onended = () => {
        try {
          env.disconnect()
        } catch {
          /* ignore */
        }
      }
    }
  })
}

/** Play one note. Safe to call at any time; never throws. */
export function playNote(midi: number, length = 1.4) {
  try {
    const e = engine()
    if (!e) return
    if (e.ctx.state === 'running') {
      schedule(e, midi, length)
      return
    }
    // Suspended or interrupted: ask it to resume, then play as soon as it is running,
    // whichever signal arrives first (the resume promise or a statechange event —
    // some browsers only resume on the *next* gesture event, e.g. touchend).
    const asked = Date.now()
    let done = false
    const ctx = e.ctx
    const finish = () => {
      ctx.removeEventListener('statechange', tryPlay)
      window.clearTimeout(timer)
    }
    const tryPlay = () => {
      if (done || ctx.state !== 'running') return
      done = true
      finish()
      if (Date.now() - asked < LATE_NOTE_MS) schedule(e, midi, length)
    }
    const timer = window.setTimeout(() => {
      done = true
      finish()
    }, LATE_NOTE_MS)
    ctx.addEventListener('statechange', tryPlay)
    ctx.resume().then(tryPlay).catch(() => {})
  } catch {
    /* audio unavailable — keys still animate */
  }
}
