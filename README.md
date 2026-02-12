# Karim Alweheshy's Blog

A modern, minimalist blog built with Next.js 14, TypeScript, and Tailwind CSS.

## Adding a New Post

1. Create a new markdown file in `content/posts/` with a URL-friendly filename (e.g., `my-new-post.md`)

2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2026-02-12"
excerpt: "A brief description that appears in the post list and RSS feed"
author: "Karim Alweheshy"
tags: ["tag1", "tag2"]
---

Your content starts here...
```

3. Write your content in Markdown below the frontmatter

4. Commit and push to GitHub - the site will automatically redeploy on Cloudflare Pages

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## Project Structure

```
karim-blog/
├── app/                    # Next.js app directory
│   ├── posts/[slug]/      # Individual post pages
│   ├── rss.xml/           # RSS feed route
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage with post list
├── content/
│   └── posts/             # Markdown blog posts
├── lib/
│   ├── config.ts          # Site configuration
│   └── posts.ts           # Post utilities (parsing, listing)
└── public/                # Static assets
```

## Features

- ✅ Static site generation with Next.js 14
- ✅ Markdown support with frontmatter
- ✅ RSS feed
- ✅ SEO optimized with metadata
- ✅ Responsive design
- ✅ Fast and lightweight
- ✅ TypeScript
- ✅ Tailwind CSS

## Deployment

This blog is automatically deployed to Cloudflare Pages on every push to the main branch.

### Deploy Settings
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Root directory:** `/`
- **Node version:** 18+

## License

© 2026 Karim Alweheshy. All rights reserved.
