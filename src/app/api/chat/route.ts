import { NextResponse } from 'next/server'
import { buildSystemPrompt } from '@/data/profile'

// Optional real-AI mode.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
// Without a key, the frontend falls back to built-in answers — the site still works.

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ answer: null }, { status: 200 })
  }

  try {
    const { question } = await req.json()
    if (!question || typeof question !== 'string' || question.length > 500) {
      return NextResponse.json({ answer: null }, { status: 400 })
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 400,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: question }],
      }),
    })

    if (!res.ok) return NextResponse.json({ answer: null }, { status: 200 })

    const data = await res.json()
    const answer = Array.isArray(data.content)
      ? data.content
          .filter((b: any) => b.type === 'text')
          .map((b: any) => b.text)
          .join('\n')
      : null

    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json({ answer: null }, { status: 200 })
  }
}
