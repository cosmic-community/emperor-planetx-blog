// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import CategoryBadge from '@/components/CategoryBadge';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const publishDate = post.metadata.publish_date
    ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;
  
  return (
    <article>
      {/* Hero */}
      <div className="bg-gradient-to-br from-secondary-800 to-secondary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center text-secondary-300 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
          
          {post.metadata.category && (
            <div className="mb-4">
              <CategoryBadge category={post.metadata.category} variant="light" />
            </div>
          )}
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-balance">
            {post.metadata.title}
          </h1>
          
          {post.metadata.excerpt && (
            <p className="text-xl text-secondary-300 mb-8">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center">
            {post.metadata.author && (
              <>
                {post.metadata.author.metadata.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <Link
                    href={`/authors/${post.metadata.author.slug}`}
                    className="font-medium text-white hover:text-primary-300 transition-colors"
                  >
                    {post.metadata.author.metadata.name}
                  </Link>
                  {publishDate && (
                    <p className="text-secondary-400">
                      {publishDate}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      {post.metadata.featured_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-xl"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg">
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        </div>
        
        {/* Author Bio */}
        {post.metadata.author && (
          <div className="mt-12 pt-8 border-t border-secondary-200">
            <div className="flex items-start">
              {post.metadata.author.metadata.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  className="w-20 h-20 rounded-full mr-6"
                />
              )}
              <div>
                <p className="text-sm text-secondary-500 uppercase tracking-wide mb-1">Written by</p>
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="text-xl font-bold text-secondary-900 hover:text-primary-600 transition-colors"
                >
                  {post.metadata.author.metadata.name}
                </Link>
                {post.metadata.author.metadata.bio && (
                  <p className="text-secondary-600 mt-2">
                    {post.metadata.author.metadata.bio}
                  </p>
                )}
                {post.metadata.author.metadata.twitter && (
                  <a
                    href={`https://twitter.com/${post.metadata.author.metadata.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 mt-3"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    {post.metadata.author.metadata.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}