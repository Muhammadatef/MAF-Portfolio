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
 *  - on iPhone / iPad, Web Audio is treated as "ambient" sound and is muted by the
 *    ring/silent switch. Declaring the page as media playback (and, on older iOS,
 *    keeping a silent <audio> element playing) routes it like music instead, so the
 *    piano is audible with the switch on silent.
 */

type Engine = { ctx: AudioContext; out: GainNode }

const GESTURES = ['pointerdown', 'pointerup', 'mousedown', 'touchend', 'keydown', 'click'] as const
const LATE_NOTE_MS = 1500 // a note older than this is dropped rather than played late

let listening = false
let stuckSince = 0

let silentTrack: HTMLAudioElement | null = null

function isIOS() {
  const ua = navigator.userAgent
  return /iPad|iPhone|iPod/.test(ua) || (ua.indexOf('Macintosh') !== -1 && navigator.maxTouchPoints > 1)
}

/** One second of silence as a WAV data URI. */
function silentWav() {
  const rate = 8000
  const bytes = new Uint8Array(44 + rate)
  const view = new DataView(bytes.buffer)
  const text = (at: number, t: string) => {
    for (let i = 0; i < t.length; i++) bytes[at + i] = t.charCodeAt(i)
  }
  text(0, 'RIFF')
  view.setUint32(4, 36 + rate, true)
  text(8, 'WAVEfmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, 1, true) // mono
  view.setUint32(24, rate, true)
  view.setUint32(28, rate, true)
  view.setUint16(32, 1, true)
  view.setUint16(34, 8, true) // 8-bit
  text(36, 'data')
  view.setUint32(40, rate, true)
  for (let i = 44; i < bytes.length; i++) bytes[i] = 128 // 8-bit silence
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return 'data:audio/wav;base64,' + window.btoa(bin)
}

/** Must run inside a user gesture. Makes iOS play Web Audio even on silent. */
function useMediaChannel() {
  try {
    const session = (navigator as any).audioSession
    if (session) {
      // Safari 16.4+: say outright that this page plays media
      if (session.type !== 'playback') session.type = 'playback'
      return
    }
    if (!isIOS()) return
    // Older iOS: a playing <audio> element switches the whole page to the media channel
    if (!silentTrack) {
      silentTrack = document.createElement('audio')
      silentTrack.src = silentWav()
      silentTrack.loop = true
      silentTrack.preload = 'auto'
      silentTrack.setAttribute('playsinline', '')
      silentTrack.setAttribute('x-webkit-airplay', 'deny')
    }
    if (silentTrack.paused) {
      const p = silentTrack.play()
      if (p && p.catch) p.catch(() => {})
    }
  } catch {
    /* best effort */
  }
}

function build(): Engine | null {
  const w = window as any
  const AC = window.AudioContext || w.webkitAudioContext
  if (!AC) return null
  const ctx: AudioContext = new AC()
  const out = ctx.createGain()
  out.gain.value = 0.9
  // a limiter, so fast playing with many overlapping notes never clips
  const limiter = ctx.createDynamicsCompressor()
  limiter.threshold.value = -9
  limiter.knee.value = 6
  limiter.ratio.value = 14
  limiter.attack.value = 0.002
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
  useMediaChannel()
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
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && silentTrack && !silentTrack.paused) silentTrack.pause()
  })
  GESTURES.forEach((type) => window.addEventListener(type, unlockAudio, { capture: true, passive: true }))
}

function schedule(e: Engine, midi: number, length: number) {
  const { ctx, out } = e
  const f = 440 * Math.pow(2, (midi - 69) / 12)
  const now = ctx.currentTime + 0.005
  const env = ctx.createGain()
  env.gain.setValueAtTime(0.0001, now)
  // Loud enough for a phone speaker; the limiter on the output stops chords clipping
  env.gain.exponentialRampToValueAtTime(0.42, now + 0.012)
  env.gain.exponentialRampToValueAtTime(0.0001, now + length)
  env.connect(out)
  const partials: [OscillatorType, number, number][] = [
    // Upper partials matter on phones: their small speakers barely reproduce the
    // fundamental of the lower keys, so the harmonics are what you actually hear.
    ['triangle', 1, 1],
    ['sine', 2, 0.45],
    ['sine', 3, 0.22],
    ['sine', 4, 0.1],
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
