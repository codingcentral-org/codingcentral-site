import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <img 
                src="/codingcentral_logo.jpg" 
                alt="Coding Central Logo" 
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">Coding Central</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Democratizing technology education through world-class curriculum, 
              personalized mentorship, and a global community of learners.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Learn</h3>
            <ul className="space-y-3">
              <li><Link href="/learn" className="text-sm text-gray-600 hover:text-gray-900">Courses</Link></li>
              <li><Link href="/tutoring" className="text-sm text-gray-600 hover:text-gray-900">Mentorship</Link></li>
              <li><Link href="/events" className="text-sm text-gray-600 hover:text-gray-900">Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link href="/auth" className="text-sm text-gray-600 hover:text-gray-900">Join Community</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-500">
            © 2025 Coding Central. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}