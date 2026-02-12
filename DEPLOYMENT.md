# Deployment Guide

## Cloudflare Pages Setup

### 1. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project** → **Connect to Git**
4. Select **GitHub** and authorize Cloudflare to access your repositories
5. Choose the **karim-blog** repository

### 2. Configure Build Settings

Use these settings:

- **Project name:** `karim-blog` (or choose your preferred name)
- **Production branch:** `main`
- **Framework preset:** `Next.js`
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Root directory:** `/` (leave blank)

### 3. Environment Variables

No environment variables are required for the initial setup.

### 4. Deploy

Click **Save and Deploy**. The first deployment will take 2-3 minutes.

## Custom Domain Setup

### Option 1: If you have a domain in Cloudflare

1. After deployment, go to your Pages project settings
2. Click **Custom domains** → **Set up a custom domain**
3. Enter your domain (e.g., `karim.alweheshy.com` or `blog.alweheshy.com`)
4. Cloudflare will automatically create DNS records
5. Wait for DNS propagation (usually instant if the domain is already in Cloudflare)

### Option 2: If you need to check available domains

1. Go to **Domain Registration** in Cloudflare
2. Check which domains are registered under your account
3. Use one of these:
   - Add a subdomain: `blog.yourdomain.com`
   - Use the domain directly: `yourdomain.com`

### Recommended domains:
- `blog.alweheshy.com` - Clean and focused
- `karim.alweheshy.com` - Personal brand
- `alweheshy.com` - Main domain (if available)

## Post-Deployment Checklist

- [ ] Custom domain configured
- [ ] HTTPS enabled (automatic with Cloudflare)
- [ ] RSS feed working at `/rss.xml`
- [ ] Test the article loads correctly
- [ ] Verify metadata and SEO tags
- [ ] Check mobile responsiveness

## Continuous Deployment

Every push to the `main` branch will automatically trigger a new deployment.

To publish a new article:
1. Add a new `.md` file to `content/posts/`
2. Commit and push to GitHub
3. Cloudflare Pages will automatically rebuild and deploy

## Troubleshooting

### Build fails
- Check that Node.js version is 18+ in Cloudflare settings
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Custom domain not working
- Verify DNS records are pointing to Cloudflare
- Wait 5-10 minutes for DNS propagation
- Clear browser cache and try again

### RSS feed not generating
- Build the site locally with `npm run build`
- Check for errors in the console
- Verify posts exist in `content/posts/`

## Support

For issues with:
- **Cloudflare Pages:** [Cloudflare Docs](https://developers.cloudflare.com/pages/)
- **Next.js:** [Next.js Docs](https://nextjs.org/docs)
- **This blog:** Open an issue on [GitHub](https://github.com/karim-alweheshy/karim-blog/issues)
