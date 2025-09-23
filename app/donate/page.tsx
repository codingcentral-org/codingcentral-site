import { Heart } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-100 shadow-sm">
              <Heart className="w-4 h-4 text-purple-500" />
              <span className="text-gray-900">
                Support Our Mission
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Help us democratize{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                computer science education
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full mx-auto"></div>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your donation helps us provide free computer science education, mentorship, 
              and career opportunities to students worldwide. Every contribution makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <p className="text-sm text-gray-600">Students Supported</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">250+</div>
              <p className="text-sm text-gray-600">Volunteer Mentors</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">7+</div>
              <p className="text-sm text-gray-600">Counties Reached</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <p className="text-sm text-gray-600">Free Education</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Donation Page Coming Soon
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re working on setting up secure donation processing. 
            In the meantime, you can support us by volunteering or spreading the word!
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Contact us at <a href="mailto:outreach@codingcentral.org" className="text-blue-600 hover:underline">outreach@codingcentral.org</a> for partnership opportunities.
          </p>
          <div className="space-y-4">
            <a 
              href="/volunteer" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Volunteer to Teach
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}