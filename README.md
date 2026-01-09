# Tech Insights Blog

![Tech Insights Blog](https://imgix.cosmicjs.com/fa6fa800-ed30-11f0-94f4-096f86bda01e-photo-1677442136019-21780ecad995-1767945500506.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, elegant blog platform built with Next.js 16 and Cosmic CMS. Features dynamic content rendering, category filtering, author profiles, and a beautiful responsive design.

## Features

- 📝 **Dynamic Blog Posts** - Rich markdown content with featured images
- 👤 **Author Profiles** - Dedicated pages for each author with their articles
- 🏷️ **Category Filtering** - Browse posts by category
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Server-Side Rendering** - Fast initial page loads with Next.js 16
- 🎨 **Beautiful Design** - Clean, modern UI with Tailwind CSS
- 🔍 **SEO Ready** - Proper meta tags and semantic structure

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6960b30a9966490ef62ff58d&clone_repository=6960b6d29966490ef62ff5c7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables (see below)
4. Run the development server:
   ```bash
   bun dev
   ```

### Environment Variables

Create a `.env.local` file with:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Posts with Related Data

```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1);
```

## Cosmic CMS Integration

This blog uses three object types from Cosmic:

- **Posts** - Blog articles with title, excerpt, content, featured image, publish date, author, and category
- **Authors** - Writer profiles with name, bio, avatar, and Twitter handle
- **Categories** - Content organization with name and description

Learn more at the [Cosmic Documentation](https://www.cosmicjs.com/docs).

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->