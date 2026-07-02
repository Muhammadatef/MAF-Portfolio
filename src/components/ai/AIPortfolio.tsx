'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Send,
  User,
  FolderGit2,
  Wrench,
  Briefcase,
  GraduationCap,
  Award,
  Gamepad2,
  Mail,
  FileText,
  ArrowLeft,
  Github,
  Linkedin,
  Terminal,
} from 'lucide-react'
import { profile } from '@/data/profile'
import { renderTopic, routeQuestion, TopicKey, FallbackAnswer } from './answers'

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
  bootcamp: 'Tell me about your bootcamp',
  certificates: 'What certifications do you have?',
  fun: 'What do you do for fun?',
  contact: 'How can I reach you?',
  resume: 'Can I see your resume?',
}

let nextId = 1

export default function AIPortfolio() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inChat = messages.length > 0

  // Rotate titles every 3 seconds
  useEffect(() => {
    if (!inChat && profile.titles && profile.titles.length > 1) {
      const interval = setInterval(() => {
        setTitleIndex((prev) => (prev + 1) % profile.titles.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [inChat])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const askTopic = (topic: TopicKey) => {
    if (thinking) return
    setThinking(true)
    setMessages((m) => [
      ...m,
      { id: nextId++, role: 'user', text: topicQuestion[topic] },
    ])
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId++, role: 'assistant', topic }])
      setThinking(false)
    }, 550)
  }

  const askFree = async (q: string) => {
    if (!q.trim() || thinking) return
    setInput('')
    setThinking(true)
    setMessages((m) => [...m, { id: nextId++, role: 'user', text: q }])

    const topic = routeQuestion(q)
    if (topic) {
      setTimeout(() => {
        setMessages((m) => [...m, { id: nextId++, role: 'assistant', topic }])
        setThinking(false)
      }, 550)
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
          setMessages((m) => [
            ...m,
            { id: nextId++, role: 'assistant', aiText: data.answer },
          ])
          setThinking(false)
          return
        }
      }
    } catch {
      /* fall through to fallback */
    }
    setMessages((m) => [
      ...m,
      { id: nextId++, role: 'assistant', topic: undefined, text: q },
    ])
    setThinking(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* top bar */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => setMessages([])}
          className="flex items-center gap-2 font-mono text-sm text-bright transition hover:text-accent"
          aria-label="Back to start"
        >
          <Terminal size={16} className="text-accent" />
          MAF
        </button>
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg border border-line p-2 text-muted transition hover:border-accent/50 hover:text-bright"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg border border-line p-2 text-muted transition hover:border-accent/50 hover:text-bright"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line px-3 py-2 font-mono text-xs text-muted transition hover:border-accent/50 hover:text-bright"
          >
            Resume
          </a>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!inChat ? (
          /* ------------------------ LANDING ------------------------ */
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-16 text-center"
          >
            <p className="mb-3 font-mono text-sm text-muted">
              Hey, I&apos;m {profile.shortName} 👋
            </p>
            <h1 className="font-display text-5xl font-bold tracking-tight text-bright sm:text-7xl">
              AI Portfolio
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-body">
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-medium text-accent"
              >
                {profile.titles ? profile.titles[titleIndex] : profile.title}
              </motion.span>{' '}
              · {profile.location}. Ask my AI anything about my work, projects or the
              bootcamp.
            </p>

            {/* avatar */}
            <div className="relative my-9">
              <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
              {/* Drop your photo/memoji at public/avatar.png to replace this */}
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-line bg-surface font-display text-5xl sm:h-44 sm:w-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar.png"
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                    ;(e.target as HTMLImageElement).parentElement!.append('🥷')
                  }}
                />
              </div>
            </div>

            {/* prompt input */}
            <PromptInput
              value={input}
              onChange={setInput}
              onSubmit={() => askFree(input)}
              autoFocus
            />

            {/* quick chips */}
            <div className="mt-6 flex max-w-xl flex-wrap items-center justify-center gap-2">
              {quickTopics.map((t) => (
                <button
                  key={t.key}
                  onClick={() => askTopic(t.key)}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm text-body transition hover:border-accent/60 hover:text-bright"
                >
                  <t.icon size={14} className="text-accent" />
                  {t.label}
                </button>
              ))}
            </div>
          </motion.main>
        ) : (
          /* ------------------------ CHAT ------------------------ */
          <motion.main
            key="chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-40"
          >
            <button
              onClick={() => setMessages([])}
              className="mb-6 flex items-center gap-1.5 self-start font-mono text-xs text-muted transition hover:text-bright"
            >
              <ArrowLeft size={13} /> back to start
            </button>

            <div className="space-y-6">
              {messages.map((m) =>
                m.role === 'user' ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent/15 px-4 py-2.5 text-[15px] text-bright">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm">
                      🥷
                    </div>
                    <div className="min-w-0 flex-1">
                      {m.topic ? (
                        renderTopic(m.topic)
                      ) : m.aiText ? (
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-body">
                          {m.aiText}
                        </p>
                      ) : (
                        <FallbackAnswer question={m.text || ''} />
                      )}
                    </div>
                  </motion.div>
                )
              )}

              {thinking && (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-sm">
                    🥷
                  </div>
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
              <div ref={bottomRef} />
            </div>

            {/* sticky bottom input + chips */}
            <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/95 to-transparent pb-5 pt-8">
              <div className="mx-auto w-full max-w-3xl px-5">
                <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
                  {quickTopics.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => askTopic(t.key)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-body transition hover:border-accent/60 hover:text-bright"
                    >
                      <t.icon size={12} className="text-accent" />
                      {t.label}
                    </button>
                  ))}
                </div>
                <PromptInput
                  value={input}
                  onChange={setInput}
                  onSubmit={() => askFree(input)}
                />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

function PromptInput({
  value,
  onChange,
  onSubmit,
  autoFocus,
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  autoFocus?: boolean
}) {
  return (
    <div className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-line bg-surface p-2 pl-4 focus-within:border-accent/60">
      <span className="hidden font-mono text-sm text-accent sm:block">
        fahmi@portfolio:~$
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        placeholder="Ask me anything…"
        autoFocus={autoFocus}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-bright outline-none placeholder:text-muted"
        aria-label="Ask a question"
      />
      <button
        onClick={onSubmit}
        aria-label="Send"
        className="rounded-xl bg-accent p-2.5 text-ink transition hover:opacity-85"
      >
        <Send size={16} />
      </button>
    </div>
  )
}
