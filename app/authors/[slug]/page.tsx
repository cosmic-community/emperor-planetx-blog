// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getAuthors, getPostsByAuthor } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    notFound();
  }
  
  const posts = await getPostsByAuthor(author.id);
  
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary-800 to-secondary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center text-secondary-300 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            {author.metadata.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 shadow-xl mb-6 md:mb-0 md:mr-8"
              />
            )}
            
            <div>
              <p className="text-secondary-400 uppercase tracking-wide text-sm mb-2">Author</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
                {author.metadata.name}
              </h1>
              
              {author.metadata.bio && (
                <p className="text-lg text-secondary-300 max-w-xl mb-4">
                  {author.metadata.bio}
                </p>
              )}
              
              {author.metadata.twitter && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  {author.metadata.twitter}
                </a>
              )}
              
              <p className="mt-4 text-secondary-400">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-secondary-900 mb-8">
          Articles by {author.metadata.name}
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">
              No articles published yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}