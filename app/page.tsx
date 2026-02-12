import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import { format } from 'date-fns'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      {/* Falling tetrominos background */}
      <div className="tetris-bg" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="tetromino"
            style={{
              left: `${i * 20}%`,
              animationDuration: `${15 + i * 3}s`,
              animationDelay: `${i * -5}s`,
              fontSize: `${20 + i * 5}px`,
              color: ['#00f0f0', '#0000f0', '#f0a000', '#f0f000', '#00f000', '#a000f0'][i % 6],
            }}
          >
            ▓
          </div>
        ))}
      </div>

      <div className="content-wrapper min-h-screen">
        <header className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
          {/* Tetris block decoration */}
          <div className="header-decoration">
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00f0f0] via-[#a000f0] to-[#f0a000] bg-clip-text text-transparent">
            {siteConfig.author.name}
          </h1>
          
          <p className="text-lg sm:text-xl text-[#a0a0b0] leading-relaxed mb-6 font-light">
            {siteConfig.author.bio}
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <span className="tetris-piece cyan"></span>
              <span className="group-hover:translate-x-1 transition-transform">Twitter</span>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <span className="tetris-piece purple"></span>
              <span className="group-hover:translate-x-1 transition-transform">GitHub</span>
            </a>
            <a
              href={siteConfig.links.email}
              className="flex items-center gap-2 group"
            >
              <span className="tetris-piece orange"></span>
              <span className="group-hover:translate-x-1 transition-transform">Email</span>
            </a>
            <Link
              href="/rss.xml"
              className="flex items-center gap-2 group"
            >
              <span className="tetris-piece green"></span>
              <span className="group-hover:translate-x-1 transition-transform">RSS</span>
            </Link>
          </div>
        </header>

        {/* Tetris divider */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="tetris-divider">
            <div className="blocks">
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
            </div>
          </div>
        </div>

        <main className="max-w-3xl mx-auto px-6 py-8 pb-20">
          <div className="space-y-8">
            {posts.map(post => (
              <article key={post.slug} className="post-card block-accent">
                <Link href={`/posts/${post.slug}`}>
                  <time className="text-xs font-mono text-[#a0a0b0] uppercase tracking-wider flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#00f0f0]"></span>
                    {format(new Date(post.date), 'yyyy.MM.dd')}
                  </time>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-4 leading-tight hover:text-[#00f0f0] transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-[#a0a0b0] leading-relaxed mb-4 font-light">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>

        <footer className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="tetris-divider mb-8">
            <div className="blocks">
              <div className="block"></div>
              <div className="block"></div>
            </div>
          </div>
          
          <p className="text-sm text-[#a0a0b0] font-mono">
            <span className="inline-block w-1 h-1 bg-[#00f0f0] mx-2"></span>
            © {new Date().getFullYear()} {siteConfig.author.name}
            <span className="inline-block w-1 h-1 bg-[#00f0f0] mx-2"></span>
          </p>
          
          <p className="text-xs text-[#606070] mt-2 font-mono">
            Powered by Next.js + Tetris ▓
          </p>
        </footer>
      </div>
    </>
  )
}
