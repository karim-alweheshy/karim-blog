import { NextResponse } from 'next/server'
import { Feed } from 'feed'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'

export async function GET() {
  const posts = getAllPosts()

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    image: `${siteConfig.url}/og-image.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    updated: new Date(posts[0]?.date || new Date()),
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
      json: `${siteConfig.url}/feed.json`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  })

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/posts/${post.slug}`,
      link: `${siteConfig.url}/posts/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: post.author,
          email: siteConfig.author.email,
          link: siteConfig.url,
        },
      ],
      date: new Date(post.date),
    })
  })

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
