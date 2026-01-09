import { getPosts, getCategories } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';
import CategoryBadge from '@/components/CategoryBadge';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await getPosts();
  const categories = await getCategories();
  
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-balance">
              Tech Insights Blog
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Exploring technology, business, and lifestyle through thoughtful articles from our expert writers.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {category.metadata.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {featuredPost.metadata.featured_image && (
                <div className="md:w-1/2">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              )}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-2">
                  Featured Article
                </span>
                {featuredPost.metadata.category && (
                  <CategoryBadge category={featuredPost.metadata.category} />
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mt-3 mb-4">
                  <Link href={`/posts/${featuredPost.slug}`} className="hover:text-primary-600 transition-colors">
                    {featuredPost.metadata.title}
                  </Link>
                </h2>
                <p className="text-secondary-600 mb-6 line-clamp-3">
                  {featuredPost.metadata.excerpt}
                </p>
                {featuredPost.metadata.author && (
                  <div className="flex items-center">
                    {featuredPost.metadata.author.metadata.avatar && (
                      <img
                        src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={featuredPost.metadata.author.metadata.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <Link
                        href={`/authors/${featuredPost.metadata.author.slug}`}
                        className="font-medium text-secondary-900 hover:text-primary-600"
                      >
                        {featuredPost.metadata.author.metadata.name}
                      </Link>
                      {featuredPost.metadata.publish_date && (
                        <p className="text-sm text-secondary-500">
                          {new Date(featuredPost.metadata.publish_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
      
      {/* Categories Section */}
      <section className="bg-secondary-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {category.metadata.name}
                </h3>
                {category.metadata.description && (
                  <p className="text-secondary-600">
                    {category.metadata.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}