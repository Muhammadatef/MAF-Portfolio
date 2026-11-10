'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Award,
  Briefcase,
  FileText,
  FolderGit2,
  Gamepad2,
  GraduationCap,
  Mail,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Trophy,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { profile } from '@/data/profile'
import { FallbackAnswer, TopicKey, renderTopic, routeQuestion } from './answers'

type Message = {
  id: number
  role: 'user' | 'assistant'
  text?: string
  topic?: TopicKey
  aiText?: string
}

const quickTopics: { key: TopicKey; label: string; icon: any }[] = [
  { key: 'me', label: 'Me', icon: User },
  { key: 'projects', label: 'Projects', icon: FolderGit2 },
  { key: 'skills', label: 'Skills', icon: Wrench },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'achievements', label: 'Achievements', icon: Trophy },
  { key: 'bootcamp', label: 'Bootcamp', icon: GraduationCap },
  { key: 'certificates', label: 'Certificates', icon: Award },
  { key: 'fun', label: 'Fun', icon: Gamepad2 },
  { key: 'contact', label: 'Contact', icon: Mail },
  { key: 'resume', label: 'Resume', icon: FileText },
]

const topicQuestion: Record<TopicKey, string> = {
  me: 'Who are you?',
  projects: 'What have you built?',
  skills: "What's your tech stack?",
  experience: 'Walk me through your experience',
  achievements: 'What are your key achievements?',
  bootcamp: 'Tell me about your bootcamp',
  certificates: 'What certifications do you have?',
  fun: 'What do you do for fun?',
  contact: 'How can I reach you?',
  resume: 'Can I see your resume?',
}

// What the flying avatar says as you move through the page.
const sectionHints: Record<string, { text: string; topic: TopicKey }> = {
  top: { text: "Hi, I'm Fahmi's AI. Ask me anything.", topic: 'me' },
  impact: { text: 'Want the story behind 16h → 2h?', topic: 'achievements' },
  work: { text: 'Ask me what else I have built.', topic: 'projects' },
  experience: { text: 'I can walk you through my career.', topic: 'experience' },
  stack: { text: 'Curious about my full toolbox?', topic: 'skills' },
  beyond: { text: 'Piano, Arsenal, anime… ask me.', topic: 'fun' },
  teaching: { text: 'Thinking about the bootcamp?', topic: 'bootcamp' },
  contact: { text: 'Want my details in one place?', topic: 'contact' },
}

const OPEN_EVENT = 'maf:chat'

/** Open the chat from anywhere on the page, optionally asking a topic straight away. */
export function openChat(topic?: TopicKey) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { topic } }))
}

let nextId = 1

function Avatar({ size }: { size: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/avatar-168.webp"
      decoding="async"
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover"
      style={{ width: size, height: size, objectPosition: '50% 38%' }}
    />
  )
}

export default function ChatWidget() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [large, setLarge] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [section, setSection] = useState('top')
  const [hint, setHint] = useState<string | null>(null)
  const [moved, setMoved] = useState(false)
  const seenHints = useRef<Record<string, boolean>>({})
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // phone / touch-first device: full-screen sheet, no drag, no auto-keyboard
  const [touch, setTouch] = useState(false)
  useEffect(() => setTouch(window.matchMedia('(pointer: coarse), (max-width: 639px)').matches), [])
  const boundsRef = useRef<HTMLDivElement>(null)
  const thinkingRef = useRef(false)

  const setBusy = (v: boolean) => {
    thinkingRef.current = v
    setThinking(v)
  }

  const askTopic = useCallback((topic: TopicKey) => {
    if (thinkingRef.current) return
    setBusy(true)
    setMessages((m) => [...m, { id: nextId++, role: 'user', text: topicQuestion[topic] }])
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId++, role: 'assistant', topic }])
      setBusy(false)
    }, 320)
  }, [])

  const askFree = async (q: string) => {
    if (!q.trim() || thinkingRef.current) return
    setInput('')
    if (touch) inputRef.current?.blur() // drop the keyboard so the answer has room
    setBusy(true)
    setMessages((m) => [...m, { id: nextId++, role: 'user', text: q }])

    const topic = routeQuestion(q)
    if (topic) {
      setTimeout(() => {
        setMessages((m) => [...m, { id: nextId++, role: 'assistant', topic }])
        setBusy(false)
      }, 320)
      return
    }

    // No keyword match → try the real-AI route (works if ANTHROPIC_API_KEY is set)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.answer) {
          setMessages((m) => [...m, { id: nextId++, role: 'assistant', aiText: data.answer }])
          setBusy(false)
          return
        }
      }
    } catch {
      /* fall through to fallback */
    }
    setMessages((m) => [...m, { id: nextId++, role: 'assistant', text: q }])
    setBusy(false)
  }

  // open from elsewhere on the page
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true)
      const topic = (e as CustomEvent).detail?.topic as TopicKey | undefined
      if (topic) askTopic(topic)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [askTopic])

  // which section is on screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    Object.keys(sectionHints).forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // say something relevant, once per section
  useEffect(() => {
    if (open || moved || seenHints.current[section] || !sectionHints[section]) return
    const show = setTimeout(() => {
      seenHints.current[section] = true
      setHint(section)
    }, 1600)
    const hide = setTimeout(() => setHint(null), 9500)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
      setHint(null)
    }
  }, [section, open, moved])

  useEffect(() => {
    if (!open) return
    // Tells the page the chat is up: locks background scroll on phones and pauses the hero canvas.
    document.documentElement.dataset.chat = 'open'
    // On a phone, focusing would throw the keyboard over half the answers. Let the visitor tap in.
    const t = touch ? 0 : window.setTimeout(() => inputRef.current?.focus(), 250)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)

    // Phones: size the sheet to the *visible* area, so the input stays above the on-screen keyboard.
    const vv = window.visualViewport
    const fit = () => {
      const el = panelRef.current
      if (!el || !vv) return
      if (window.matchMedia('(max-width: 639px)').matches) {
        el.style.height = `${vv.height}px`
        el.style.top = `${vv.offsetTop}px`
        el.style.bottom = 'auto'
      } else {
        el.style.height = ''
        el.style.top = ''
        el.style.bottom = ''
      }
    }
    fit()
    const raf = requestAnimationFrame(fit)
    if (vv) {
      vv.addEventListener('resize', fit)
      vv.addEventListener('scroll', fit)
    }
    return () => {
      delete document.documentElement.dataset.chat
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      if (vv) {
        vv.removeEventListener('resize', fit)
        vv.removeEventListener('scroll', fit)
      }
    }
  }, [open, touch])

  // Keep the conversation in view by scrolling the list itself — never the page.
  // A new answer is shown from its question downward, so long answers start at their beginning.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const questions = list.querySelectorAll<HTMLElement>('[data-role="user"]')
    const lastQuestion = questions[questions.length - 1]
    const top = lastQuestion ? Math.max(0, lastQuestion.offsetTop - 12) : list.scrollHeight
    list.scrollTo({ top, behavior: reduce || touch ? 'auto' : 'smooth' })
  }, [messages, thinking, reduce, touch])

  const activeHint = hint ? sectionHints[hint] : null

  return (
    <>
      {/* drag bounds for the flying avatar */}
      <div ref={boundsRef} className="pointer-events-none fixed inset-3 z-[69]" aria-hidden />

      {/* ---------------- the flying avatar ---------------- */}
      <motion.div
        drag={!touch}
        dragConstraints={boundsRef}
        dragElastic={0.18}
        dragMomentum
        onDragStart={() => {
          setMoved(true)
          setHint(null)
        }}
        whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
        initial={reduce ? false : { opacity: 0, scale: 0, y: 40 }}
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, delay: open ? 0 : 0.2 }}
        className={`fixed bottom-5 right-5 z-[70] ${open ? 'pointer-events-none' : ''}`}
      >
        <AnimatePresence>
          {activeHint && !open && (
            <motion.button
              key={hint}
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={() => {
                setOpen(true)
                askTopic(activeHint.topic)
              }}
              className="absolute bottom-3 right-[calc(100%+12px)] hidden w-max max-w-[220px] sm:block rounded-2xl rounded-br-sm border border-accent/40 bg-surface px-4 py-2.5 text-left text-sm leading-snug text-bright shadow-xl shadow-black/30"
            >
              {activeHint.text}
            </motion.button>
          )}
        </AnimatePresence>

        <div className={reduce ? '' : 'animate-floaty'}>
          <motion.button
            onTap={() => setOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open chat with Fahmi's AI"
            title={touch ? 'Ask my AI' : 'Ask my AI (drag me anywhere)'}
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-surface shadow-2xl shadow-black/40"
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-accent" aria-hidden />
            <Avatar size={56} />
            <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 py-0.5 font-mono text-[9px] font-bold text-ink">
              AI
            </span>
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-flow" aria-hidden />
          </motion.button>
        </div>
      </motion.div>

      {/* ---------------- the panel ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Fahmi's AI"
            ref={panelRef}
            // phones: a short slide-up; scaling a full-screen sheet is what made it stutter
            initial={touch ? { opacity: 0, y: 24 } : { opacity: 0, y: 30, scale: 0.94 }}
            animate={touch ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={touch ? { opacity: 0, y: 16 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={touch ? { duration: 0.2, ease: 'easeOut' } : { type: 'spring', stiffness: 320, damping: 30 }}
            style={{ transformOrigin: 'bottom right' }}
            className={`fixed z-[80] flex flex-col overflow-hidden border-line bg-ink shadow-2xl shadow-black/50 max-sm:inset-0 sm:bottom-5 sm:right-5 sm:rounded-3xl sm:border ${
              large
                ? 'sm:h-[min(820px,calc(100dvh-40px))] sm:w-[min(760px,calc(100vw-40px))]'
                : 'sm:h-[min(640px,calc(100dvh-40px))] sm:w-[420px]'
            }`}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 max-sm:pt-[max(0.75rem,env(safe-area-inset-top))]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar size={38} />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-flow" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-bright">Fahmi&apos;s AI</div>
                  <div className="font-mono text-[10px] text-muted">answers from my real profile</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="rounded-lg p-2 text-muted transition hover:bg-raised hover:text-bright max-sm:p-3"
                    aria-label="Start over"
                    title="Start over"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
                <button
                  onClick={() => setLarge((l) => !l)}
                  className="hidden rounded-lg p-2 text-muted transition hover:bg-raised hover:text-bright max-sm:p-3 sm:block"
                  aria-label={large ? 'Shrink chat' : 'Expand chat'}
                >
                  {large ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-muted transition hover:bg-raised hover:text-bright max-sm:p-3"
                  aria-label="Close chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* messages */}
            <div ref={listRef} className="thin-scrollbar relative flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Avatar size={84} />
                  <p className="mt-4 font-display text-xl font-semibold text-bright">
                    Hey, I&apos;m {profile.shortName} 👋
                  </p>
                  <p className="mt-1.5 max-w-[280px] text-sm leading-relaxed text-body">
                    Ask about my work, projects, the bootcamp, or what I do away from the keyboard.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {quickTopics.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => askTopic(t.key)}
                        className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-body transition hover:border-accent/60 hover:text-bright"
                      >
                        <t.icon size={13} className="text-accent" />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {messages.map((m) =>
                    m.role === 'user' ? (
                      <div key={m.id} data-role="user" className="flex justify-end">
                        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent/15 px-4 py-2.5 text-[15px] text-bright">
                          {m.text}
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2.5"
                      >
                        <div className="mt-1 shrink-0">
                          <Avatar size={28} />
                        </div>
                        <div className="min-w-0 flex-1">
                          {m.topic ? (
                            renderTopic(m.topic)
                          ) : m.aiText ? (
                            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-body">{m.aiText}</p>
                          ) : (
                            <FallbackAnswer question={m.text || ''} />
                          )}
                        </div>
                      </motion.div>
                    )
                  )}
                  {thinking && (
                    <div className="flex items-center gap-2.5">
                      <Avatar size={28} />
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="typing-dot h-1.5 w-1.5 rounded-full bg-accent"
                            style={{ animationDelay: `${i * 0.18}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* chips + input */}
            <div className="border-t border-line bg-surface px-3 pb-3 pt-2.5 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {messages.length > 0 && (
                <div className="no-scrollbar mb-2.5 flex gap-1.5 overflow-x-auto">
                  {quickTopics.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => askTopic(t.key)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-ink px-3 py-1.5 text-xs text-body transition hover:border-accent/60 hover:text-bright"
                    >
                      <t.icon size={12} className="text-accent" />
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  askFree(input)
                }}
                className="flex items-center gap-2 rounded-2xl border border-line bg-ink p-1.5 pl-3.5 focus-within:border-accent/60"
              >
                <span className="font-mono text-sm text-accent">~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  maxLength={500}
                  enterKeyHint="send"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-base text-bright outline-none placeholder:text-muted sm:text-[15px]"
                  aria-label="Ask a question"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="rounded-xl bg-accent p-2.5 text-ink transition hover:brightness-110"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
