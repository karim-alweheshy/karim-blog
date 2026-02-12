# Publishing Workflow

## Quick Start: Adding a New Post

### 1. Create the markdown file

```bash
cd /Users/m1/.clawdbot/workspace/karim-blog
touch content/posts/my-new-post.md
```

### 2. Add frontmatter and content

```markdown
---
title: "My Post Title"
date: "2026-02-13"
excerpt: "A compelling excerpt that draws readers in"
author: "Karim Alweheshy"
tags: ["ios", "parenting", "ai"]
---

Your content starts here...

## Your First Heading

Write naturally. Use markdown.

- Bullet points work
- Lists are automatic
- Links [work like this](https://example.com)

**Bold** and *italic* text are supported.

Code blocks too:

\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`
```

### 3. Preview locally

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Publish

```bash
git add content/posts/my-new-post.md
git commit -m "Add new post: My Post Title"
git push origin main
```

That's it! Cloudflare Pages will automatically rebuild and deploy in ~2 minutes.

## Writing Tips

### Filename conventions
- Use lowercase
- Separate words with hyphens
- Make it URL-friendly
- Example: `building-with-ai.md` → `/posts/building-with-ai`

### Date format
Always use `YYYY-MM-DD` format in the frontmatter.

### Excerpts
- 1-2 sentences max
- Should work standalone
- Used in RSS feeds and post listings
- Think of it as a tweet promoting the post

### Tags
Common tags to use:
- `ios` - iOS development
- `ai` - AI and automation
- `parenting` - Parenting and family
- `automation` - Tools and workflows
- `devtools` - Developer tools
- `opinion` - Opinion pieces

Keep it to 2-4 tags per post.

## Advanced: Editing Existing Posts

```bash
# Edit the post
vim content/posts/the-night-i-stopped-writing-code.md

# Commit with a descriptive message
git commit -am "Fix typo in baby log article"

# Push to deploy
git push origin main
```

## Site Configuration

To update author info, social links, or site metadata:

Edit `lib/config.ts`:

```typescript
export const siteConfig = {
  name: 'Karim Alweheshy',
  title: 'Karim Alweheshy - Developer, Builder, Parent',
  description: 'Thoughts on iOS development, AI, automation, and parenting',
  url: 'https://your-domain.com', // Update this!
  author: {
    name: 'Karim Alweheshy',
    bio: 'Your bio here',
    email: 'your-email@example.com',
    twitter: '@your-handle',
    github: 'your-username',
  },
  // ...
}
```

Then commit and push as usual.

## Publishing Checklist

Before pushing a new post:

- [ ] Frontmatter is complete (title, date, excerpt, author, tags)
- [ ] No typos (run a spell check)
- [ ] Links work (test them!)
- [ ] Code blocks are properly formatted
- [ ] Images are optimized (if any)
- [ ] Date is set correctly
- [ ] Preview looks good locally (`npm run dev`)

## Troubleshooting

### Post doesn't appear
- Check that the file is in `content/posts/`
- Verify the frontmatter is valid YAML
- Make sure the date isn't in the future
- Rebuild: `npm run build`

### Formatting issues
- Check that code blocks use triple backticks
- Verify markdown syntax
- Test locally before pushing

### Build errors
- Check the GitHub Actions tab for error logs
- Run `npm run build` locally to catch errors early
- Common issues: missing frontmatter fields, invalid YAML syntax

## One-Command Publishing

Create an alias for faster publishing:

```bash
# Add to ~/.zshrc or ~/.bashrc
alias blog-new='cd /Users/m1/.clawdbot/workspace/karim-blog && touch content/posts/$1.md && vim content/posts/$1.md'
alias blog-publish='cd /Users/m1/.clawdbot/workspace/karim-blog && git add . && git commit -m "$(date +%Y-%m-%d): New post" && git push origin main'
```

Then:
```bash
blog-new my-new-post
# Write your post...
blog-publish
```

## Future Ideas

Consider adding:
- **Newsletter integration** - Collect email subscribers
- **Comments** - Add Giscus (GitHub-based comments)
- **Analytics** - Cloudflare Web Analytics (privacy-friendly)
- **Search** - Full-text search with Pagefind
- **Series** - Group related posts together
- **Draft posts** - Add `published: false` to frontmatter to hide posts

For any of these, just ask your AI assistant to help implement them!
