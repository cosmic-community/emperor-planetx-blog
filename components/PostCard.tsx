import Link from 'next/link';
import { Post } from '@/types';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const publishDate = post.metadata.publish_date
    ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;
  
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      {post.metadata.featured_image && (
        <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      
      <div className="p-6">
        {post.metadata.category && (
          <CategoryBadge category={post.metadata.category} size="sm" />
        )}
        
        <h3 className="text-xl font-bold text-secondary-900 mt-3 mb-2 line-clamp-2">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.metadata.title}
          </Link>
        </h3>
        
        {post.metadata.excerpt && (
          <p className="text-secondary-600 line-clamp-2 mb-4">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-secondary-100">
          {showAuthor && post.metadata.author && (
            <Link
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center group/author"
            >
              {post.metadata.author.metadata.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <span className="text-sm font-medium text-secondary-700 group-hover/author:text-primary-600 transition-colors">
                {post.metadata.author.metadata.name}
              </span>
            </Link>
          )}
          
          {publishDate && (
            <span className="text-sm text-secondary-500">
              {publishDate}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}