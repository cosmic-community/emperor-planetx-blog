import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-extrabold">
                Tech<span className="text-primary-400">Insights</span>
              </span>
            </Link>
            <p className="text-secondary-400 max-w-md">
              Exploring technology, business, and lifestyle through thoughtful articles from our expert writers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/technology"
                  className="text-secondary-400 hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/business"
                  className="text-secondary-400 hover:text-white transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/lifestyle"
                  className="text-secondary-400 hover:text-white transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-secondary-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-white transition-colors"
                >
                  Powered by Cosmic
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-800 text-center text-secondary-400">
          <p>&copy; {currentYear} Tech Insights Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}