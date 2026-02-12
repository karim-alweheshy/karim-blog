import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import { format } from 'date-fns'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {siteConfig.author.name}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {siteConfig.author.bio}
        </p>
        <div className="flex gap-6 mt-6">
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition"
          >
            Twitter
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.email}
            className="text-gray-500 hover:text-gray-900 transition"
          >
            Email
          </a>
          <Link
            href="/rss.xml"
            className="text-gray-500 hover:text-gray-900 transition"
          >
            RSS
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-12">
          {posts.map(post => (
            <article key={post.slug} className="group">
              <Link href={`/posts/${post.slug}`}>
                <time className="text-sm text-gray-500 font-mono">
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
                <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex gap-2 mt-3">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-6 py-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} {siteConfig.author.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
