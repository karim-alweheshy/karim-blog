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
    <div className="min-h-screen bg-white">
      <header className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/" className="text-gray-500 hover:text-gray-900 transition">
          ← Back to home
        </Link>
      </header>

      <article className="max-w-3xl mx-auto px-6 pb-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time className="font-mono text-sm">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <div className="flex gap-2 mt-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-700 prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <footer className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Written by {post.author}
          </p>
          <div className="flex gap-6 justify-center">
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
          </div>
        </div>
      </footer>
    </div>
  )
}
