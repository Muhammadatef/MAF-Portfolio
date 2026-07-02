'use client'

import {
  profile,
  experience,
  projects,
  skills,
  certifications,
  bootcamp,
} from '@/data/profile'
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  GraduationCap,
  MapPin,
  Sparkles,
  BookOpen,
} from 'lucide-react'

export type TopicKey =
  | 'me'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'bootcamp'
  | 'certificates'
  | 'fun'
  | 'contact'
  | 'resume'

// ---------- shared bits ----------

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">{children}</div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-muted">
      {label}
    </span>
  )
}

function LinkBtn({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 px-3 py-1.5 text-sm text-accent transition hover:bg-accent/10"
    >
      {children}
    </a>
  )
}

// ---------- answers ----------

export function MeAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">
        Hey! I&apos;m {profile.shortName} 👋 — {profile.title} in {profile.location}.
      </p>
      {profile.about.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-body">
          {p}
        </p>
      ))}
    </div>
  )
}

export function ProjectsAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">
        Here&apos;s what I&apos;ve been building — from open source to national-scale
        production systems:
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.name}>
            <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-accent">
              {p.kind}
            </div>
            <div className="mb-1.5 font-display text-lg font-semibold text-bright">
              {p.name}
            </div>
            <p className="mb-3 text-sm leading-relaxed text-body">{p.description}</p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>
            {p.link && (
              <LinkBtn href={p.link}>
                {p.link.includes('github') ? (
                  <Github size={14} />
                ) : (
                  <ExternalLink size={14} />
                )}
                {p.link.includes('github') ? 'View on GitHub' : 'Visit site'}
              </LinkBtn>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export function SkillsAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">My toolbox, grouped the way I actually use it:</p>
      <div className="space-y-3">
        {skills.map((s) => (
          <Card key={s.group}>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">
              {s.group}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <Chip key={i} label={i} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ExperienceAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">
        6+ years across government statistics, telecom and enterprise data:
      </p>
      <div className="space-y-3">
        {experience.map((e) => (
          <Card key={e.company + e.period}>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-lg font-semibold text-bright">
                {e.role}
              </span>
              <span className="font-mono text-xs text-muted">{e.period}</span>
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-accent">
              <span>{e.company}</span>
              {e.via && <span className="text-muted">· {e.via}</span>}
              <span className="inline-flex items-center gap-1 text-muted">
                <MapPin size={12} /> {e.location}
              </span>
            </div>
            <ul className="space-y-1.5">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm leading-relaxed text-body">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function BootcampAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">
        Beyond my day job, I run a Data Engineering bootcamp in Abu Dhabi:
      </p>
      <Card>
        <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-accent">
          Workshop · On-site · Abu Dhabi
        </div>
        <div className="mb-1.5 font-display text-xl font-semibold text-bright">
          {bootcamp.headline}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-body">{bootcamp.description}</p>
        <div className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted">
          {bootcamp.curriculum.map((c, i) => (
            <span key={c} className="flex items-center gap-1.5">
              <span className="rounded-md border border-line bg-ink px-2 py-1 text-body">
                {c}
              </span>
              {i < bootcamp.curriculum.length - 1 && (
                <span className="text-accent">→</span>
              )}
            </span>
          ))}
        </div>
        <LinkBtn href={bootcamp.url}>
          <GraduationCap size={14} /> mafbootcamp.com
        </LinkBtn>
      </Card>
    </div>
  )
}

export function CertificatesAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">Certifications I hold:</p>
      <div className="space-y-2">
        {certifications.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
          >
            <GraduationCap size={16} className="shrink-0 text-accent" />
            <div>
              <div className="text-sm font-medium text-bright">{c.name}</div>
              <div className="font-mono text-xs text-muted">{c.org}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FunAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">Life outside the terminal:</p>
      <div className="space-y-2">
        {profile.fun.map((f) => (
          <div
            key={f}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-body"
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContactAnswer() {
  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: 'github.com/Muhammadatef', href: profile.github },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: BookOpen, label: 'Medium', href: profile.medium },
  ]
  return (
    <div className="space-y-3">
      <p className="answer-lead">
        Always happy to talk data, football analytics or the bootcamp. Reach me here:
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-body transition hover:border-accent/50 hover:text-bright"
          >
            <l.icon size={16} className="text-accent" />
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export function ResumeAnswer() {
  return (
    <div className="space-y-3">
      <p className="answer-lead">Grab the full details here:</p>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-accent" />
            <div>
              <div className="font-medium text-bright">
                {profile.name} — Resume
              </div>
              <div className="font-mono text-xs text-muted">PDF</div>
            </div>
          </div>
          <LinkBtn href={profile.resume}>
            <ExternalLink size={14} /> Open resume
          </LinkBtn>
        </div>
      </Card>
    </div>
  )
}

export function FallbackAnswer({ question }: { question: string }) {
  return (
    <div className="space-y-3">
      <p className="answer-lead">
        Good question! I&apos;m not sure I have a perfect answer for &quot;{question}
        &quot; — but here&apos;s what people usually ask me about:
      </p>
      <div className="flex items-center gap-2 text-sm text-muted">
        <Sparkles size={14} className="text-accent" />
        Try the quick topics below, or ask about my projects, experience, skills or the
        bootcamp.
      </div>
    </div>
  )
}

export function renderTopic(topic: TopicKey, question?: string) {
  switch (topic) {
    case 'me':
      return <MeAnswer />
    case 'projects':
      return <ProjectsAnswer />
    case 'skills':
      return <SkillsAnswer />
    case 'experience':
      return <ExperienceAnswer />
    case 'bootcamp':
      return <BootcampAnswer />
    case 'certificates':
      return <CertificatesAnswer />
    case 'fun':
      return <FunAnswer />
    case 'contact':
      return <ContactAnswer />
    case 'resume':
      return <ResumeAnswer />
    default:
      return <FallbackAnswer question={question || ''} />
  }
}

// ---------- keyword router (works with no API key) ----------

const routes: { topic: TopicKey; words: string[] }[] = [
  {
    topic: 'bootcamp',
    words: ['bootcamp', 'workshop', 'course', 'teach', 'mentor', 'learn data', 'training', 'cohort'],
  },
  {
    topic: 'projects',
    words: ['project', 'kakashi', 'epl', 'marsad', 'arsenal', 'built', 'build', 'github', 'open source', 'portfolio'],
  },
  {
    topic: 'experience',
    words: ['experience', 'work', 'job', 'scad', 'etisalat', 'ligadata', 'career', 'company', 'statistics centre', 'e&'],
  },
  {
    topic: 'skills',
    words: ['skill', 'stack', 'tech', 'tool', 'spark', 'airflow', 'kafka', 'python', 'databricks', 'sql', 'cloud'],
  },
  {
    topic: 'certificates',
    words: ['cert', 'dp-203', 'azure certified', 'nanodegree', 'zoomcamp'],
  },
  {
    topic: 'contact',
    words: ['contact', 'email', 'reach', 'linkedin', 'hire', 'talk', 'medium', 'connect'],
  },
  { topic: 'resume', words: ['resume', 'cv', 'pdf'] },
  {
    topic: 'fun',
    words: ['fun', 'hobby', 'hobbies', 'football', 'naruto', 'anime', 'piano', 'meditat', 'outside work', 'free time'],
  },
  {
    topic: 'me',
    words: ['who are you', 'about', 'yourself', 'intro', 'fahmi', 'mohamed', 'background', 'who is'],
  },
]

export function routeQuestion(q: string): TopicKey | null {
  const s = q.toLowerCase()
  for (const r of routes) {
    if (r.words.some((w) => s.includes(w))) return r.topic
  }
  return null
}
