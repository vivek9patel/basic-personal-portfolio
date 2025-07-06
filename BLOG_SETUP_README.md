# Modern Blog System with Next.js 15 + App Router

## Overview

This project has been completely rebuilt with a modern blog system using:

- **Next.js 15** with App Router
- **@next/mdx** for MDX support
- **Tailwind CSS** with **shadcn/ui** components
- **TypeScript** for type safety
- **Shiki** for syntax highlighting
- **Gray-matter** for frontmatter parsing

## 🚀 New Features

### ✅ Modern MDX Integration
- Latest `@next/mdx` with App Router support
- React components can be used directly in MDX files
- Automatic syntax highlighting with Shiki
- Theme-aware code blocks (light/dark)

### ✅ Improved Developer Experience
- Type-safe blog post interfaces
- Automatic route generation
- Hot reload support for MDX files
- Built-in error handling

### ✅ Enhanced Performance
- Static site generation (SSG)
- Server-side rendering (SSR)
- Image optimization with Next.js Image
- Optimized bundle sizes

### ✅ Better SEO & Metadata
- Dynamic metadata generation
- OpenGraph support
- Structured data for blog posts
- Proper heading hierarchy

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   └── blog/
│       ├── page.tsx            # Blog listing page
│       └── [slug]/
│           └── page.tsx        # Individual blog post page
├── components/
│   ├── blog-layout.tsx         # Blog post layout component
│   ├── blog-card.tsx           # Blog card component for listings
│   ├── mdx-components.tsx      # Custom MDX components
│   └── ui/                     # shadcn/ui components
├── content/
│   └── blog/
│       ├── sample.mdx          # Sample blog post
│       └── next-js-app-router-guide.mdx
├── lib/
│   └── blog.ts                 # Blog utilities and functions
├── mdx-components.tsx          # Root MDX components config
└── next.config.js              # Next.js configuration
```

## 📝 Writing Blog Posts

### 1. Create a new MDX file

Create a new `.mdx` file in the `content/blog/` directory:

```bash
touch content/blog/my-new-post.mdx
```

### 2. Add frontmatter

Every blog post needs frontmatter at the top:

```mdx
---
title: "Your Blog Post Title"
description: "A brief description of your post"
publishedAt: "2024-01-15"
tags: ["tag1", "tag2", "tag3"]
---

# Your Blog Post Title

Your content goes here...
```

### 3. Write your content

Use standard Markdown syntax with JSX components:

```mdx
## Code Examples

Here's a JavaScript example:

```javascript
function hello() {
  console.log("Hello, World!");
}
```

You can also use React components:

<Badge variant="secondary">Next.js</Badge>

Or Next.js Image component:

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={400}
/>
```

### 4. Available Components

The following components are available in MDX files:

- **Badge**: `<Badge variant="secondary">Text</Badge>`
- **Separator**: `<Separator />`
- **Image**: `<Image src="..." alt="..." width={800} height={400} />`
- All standard HTML elements with custom styling

## 🎨 Styling & Theming

### Dark/Light Mode
- Automatic theme detection
- Custom styled components for both themes
- Syntax highlighting adapts to theme
- shadcn/ui components with theme support

### Customization
- Edit `components/mdx-components.tsx` to customize component styling
- Modify `tailwind.config.js` for theme customization
- Update `components/blog-layout.tsx` for layout changes

## 🔧 Configuration

### MDX Configuration
The `next.config.js` includes:
- `@next/mdx` integration
- Remark and Rehype plugins
- Syntax highlighting with Shiki
- Theme configuration

### TypeScript Support
- Full TypeScript support
- Type-safe blog post interfaces
- Proper MDX component typing

## 🚀 Deployment

### Build the project:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Development:
```bash
npm run dev
```

## 📚 Key Improvements Over Old System

### Before (Pages Router + next-mdx-remote):
- ❌ Complex setup with multiple packages
- ❌ Slower build times
- ❌ Limited component integration
- ❌ Manual route configuration

### After (App Router + @next/mdx):
- ✅ Simple, modern setup
- ✅ Faster build and runtime performance
- ✅ Seamless React component integration
- ✅ Automatic route generation
- ✅ Better SEO and metadata handling
- ✅ Enhanced developer experience

## 🔗 URLs

- Blog listing: `/blog`
- Individual posts: `/blog/[slug]` (e.g., `/blog/sample`)

## 🛠️ Adding New Features

### Custom MDX Components
Add new components to `components/mdx-components.tsx`:

```typescript
const components: MDXComponents = {
  // ... existing components
  CustomAlert: ({ children, type }) => (
    <div className={`alert alert-${type}`}>
      {children}
    </div>
  ),
};
```

### Blog Categories
Extend the `BlogPost` interface in `lib/blog.ts`:

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  category: string; // Add this
  content: string;
}
```

### Search Functionality
Add search by extending the blog utilities and creating a search component.

## 🐛 Troubleshooting

### Common Issues:

1. **MDX file not found**: Ensure the file exists in `content/blog/`
2. **Styling issues**: Check that Tailwind classes are properly configured
3. **Build errors**: Verify all frontmatter is properly formatted
4. **Component not found**: Ensure custom components are exported in `mdx-components.tsx`

### Debug Mode:
Enable debug logging in `next.config.js`:

```javascript
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

## 📖 Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [MDX Documentation](https://mdxjs.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Ready to start blogging!** 🎉

Simply add your `.mdx` files to the `content/blog/` directory and they'll automatically be available at `/blog/[filename]`.