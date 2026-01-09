import Link from 'next/link';
import { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
  variant?: 'default' | 'light';
}

export default function CategoryBadge({ 
  category, 
  size = 'md',
  variant = 'default' 
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  const variantClasses = {
    default: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
    light: 'bg-white/20 text-white hover:bg-white/30',
  };
  
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block font-medium rounded-full transition-colors ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {category.metadata.name}
    </Link>
  );
}