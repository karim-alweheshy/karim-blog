import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import { format } from 'date-fns'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return {
    title: `${post.title} - ${siteConfig.author.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return (
    <>
      {/* Falling tetrominos background */}
      <div className="tetris-bg" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="tetromino"
            style={{
              left: `${i * 15}%`,
              animationDuration: `${20 + i * 4}s`,
              animationDelay: `${i * -7}s`,
              fontSize: `${15 + i * 4}px`,
              color: ['#00f0f0', '#a000f0', '#f0a000', '#00f000', '#f00000', '#f0f000', '#0000f0', '#00f0f0'][i % 8],
            }}
          >
            ▓
          </div>
        ))}
      </div>

      <div className="content-wrapper min-h-screen">
        <header className="max-w-3xl mx-auto px-6 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-mono group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="tetris-piece cyan"></span>
            <span>Back to home</span>
          </Link>
        </header>

        <article className="max-w-3xl mx-auto px-6 pb-16">
          <header className="mb-12">
            {/* Block decoration */}
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 bg-[#00f0f0]"></div>
              <div className="w-3 h-3 bg-[#a000f0]"></div>
              <div className="w-3 h-3 bg-[#f0a000]"></div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#a0a0b0] font-mono mb-6">
              <time className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#00f0f0]"></span>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              <span className="text-[#606070]">▓</span>
              <span>{post.author}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Prose content with Tetris styling */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[#e0e0e8]
              prose-headings:font-['JetBrains_Mono']
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 
              prose-h2:border-l-4 prose-h2:border-[#00f0f0] prose-h2:pl-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-[#c0c0d0] prose-p:leading-relaxed prose-p:mb-6
              prose-p:font-light
              prose-a:text-[#00f0f0] prose-a:no-underline hover:prose-a:text-[#a000f0]
              prose-strong:text-[#e0e0e8] prose-strong:font-semibold
              prose-code:text-[#00f0f0] prose-code:font-['JetBrains_Mono']
              prose-pre:bg-[#141420] prose-pre:border-2 prose-pre:border-[#2a2a40]
              prose-pre:shadow-lg
              prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
              prose-ol:my-6 prose-ol:list-none prose-ol:pl-0
              prose-li:text-[#c0c0d0] prose-li:my-2 prose-li:pl-6 prose-li:relative
              prose-li:before:absolute prose-li:before:left-0 prose-li:before:content-['▓']
              prose-li:before:text-[#00f0f0] prose-li:before:text-xs
              prose-blockquote:border-l-4 prose-blockquote:border-[#a000f0] 
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#a0a0b0]
              prose-hr:border-[#2a2a40] prose-hr:my-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Tetris divider */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="tetris-divider">
            <div className="blocks">
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
            </div>
          </div>
        </div>

        <footer className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <p className="text-[#a0a0b0] mb-4 font-mono text-sm">
              Written by {post.author}
            </p>
            <div className="flex gap-6 justify-center text-sm">
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
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-[#606070] font-mono">
              © {new Date().getFullYear()} {siteConfig.author.name}
              <span className="inline-block mx-2">▓</span>
              Powered by Next.js + Tetris
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
