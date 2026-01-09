// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
  status?: string;
  thumbnail?: string;
}

// File/Image metafield
export interface CosmicMedia {
  url: string;
  imgix_url: string;
}

// Author object type
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: CosmicMedia;
    twitter?: string;
  };
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Post object type
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    excerpt?: string;
    content: string;
    featured_image?: CosmicMedia;
    publish_date?: string;
    author?: Author;
    category?: Category;
  };
}

// Type guard for checking if error has status
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}