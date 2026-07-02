/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0f',      // page background
        surface: '#12121c',  // cards
        line: '#23233a',     // borders
        accent: '#00d4ff',   // pipeline cyan
        violet: '#a78bfa',
        bright: '#eef0f8',   // headings / strong text
        body: '#b8bdd0',     // body text
        muted: '#7d8299',    // secondary text
      },
      fontFamily: {
        display: ["'Space Grotesk'", 'sans-serif'],
        sans: ["'Space Grotesk'", 'sans-serif'],
        mono: ["'IBM Plex Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
}
