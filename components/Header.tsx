import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-secondary-900">
              Tech<span className="text-primary-600">Insights</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories/technology"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors"
            >
              Technology
            </Link>
            <Link
              href="/categories/business"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors"
            >
              Business
            </Link>
            <Link
              href="/categories/lifestyle"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors"
            >
              Lifestyle
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-secondary-600 hover:text-secondary-900"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}