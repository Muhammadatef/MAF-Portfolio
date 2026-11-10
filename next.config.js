/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build go to its own folder so it never clobbers a running `next dev`
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
  },
  env: {
    GITHUB_USERNAME: 'Muhammadatef',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
    // tree-shake the big icon packs so only the logos in use are shipped
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
