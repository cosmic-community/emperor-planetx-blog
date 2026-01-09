// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getCategories, getPostsByCategory } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }
  
  const posts = await getPostsByCategory(category.id);
  
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center text-primary-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">🏷️</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              {category.metadata.name}
            </h1>
          </div>
          
          {category.metadata.description && (
            <p className="text-xl text-primary-100 max-w-2xl">
              {category.metadata.description}
            </p>
          )}
          
          <p className="mt-6 text-primary-200">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </section>
      
      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">
              No articles in this category yet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Browse all articles
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}