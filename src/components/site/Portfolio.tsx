import Nav from './Nav'
import Hero from './Hero'
import LogoMarquee from './LogoMarquee'
import Impact from './Impact'
import Work from './Work'
import Experience from './Experience'
import Stack from './Stack'
import Beyond from './Beyond'
import Teaching from './Teaching'
import Contact from './Contact'
import ChatWidget from '../ai/ChatWidget'

export default function Portfolio() {
  return (
    <>
      <a
        href="#impact"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Impact />
        <Work />
        <Experience />
        <Stack />
        <Beyond />
        <Teaching />
      </main>
      <Contact />
      <ChatWidget />
    </>
  )
}
