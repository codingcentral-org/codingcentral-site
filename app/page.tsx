'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, BookOpen, Users, Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleStartLearning = () => {
    if (!user) {
      router.push('/auth');
    } else {
      router.push('/learn');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Social Proof Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-100 shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-gray-900">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                    Coding Central
                  </span>
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                  Learn Computer Science with{' '}
                  <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                    Coding Central
                  </span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full"></div>
                
                <div className="space-y-4">
                  <p className="text-xl font-semibold text-gray-800 leading-relaxed max-w-2xl">
                    Empowering Minds, Unlocking Potential.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                    Where everyone has the opportunity to learn and build a career in computer science and engineering at no cost.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleStartLearning}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading ? 'Loading...' : (user ? 'Start Learning Free' : 'Sign Up to Learn Free')}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild 
                  className="border-2 border-gray-200 text-gray-700 bg-white/80 hover:bg-white hover:border-gray-300 backdrop-blur-sm px-8 py-4 rounded-xl transition-all duration-200 group"
                >
                  <Link href="/events">
                    Events
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8">
                <p className="text-sm text-gray-500 text-center mb-6">
                  Trusted by students from
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">MIT</span>
                  </div>
                  <div className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">UT Austin</span>
                  </div>
                  <div className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">UChicago</span>
                  </div>
                  <div className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">UT Dallas</span>
                  </div>
                  <div className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Kenyatta University</span>
                  </div>
                  <div className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">& More...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="hero-visual">
                <div className="dashboard-preview">
                  <div className="preview-header">
                    <div className="preview-tabs">
                      <div className="tab active">Dashboard</div>
                      <div className="tab">Courses</div>
                      <div className="tab">Progress</div>
                    </div>
                    <div className="preview-user">
                      <div className="user-avatar"></div>
                      <span>Alex Chen</span>
                    </div>
                  </div>
                  <div className="preview-content">
                    <div className="progress-cards">
                      <div className="progress-card ai">
                        <div className="card-icon">🤖</div>
                        <div className="card-info">
                          <h4>AI Fundamentals</h4>
                          <div className="progress-bar">
                            <div className="progress" style={{width: '75%'}}></div>
                          </div>
                          <span>75% Complete</span>
                        </div>
                      </div>
                      <div className="progress-card cyber">
                        <div className="card-icon">🛡️</div>
                        <div className="card-info">
                          <h4>Cybersecurity</h4>
                          <div className="progress-bar">
                            <div className="progress" style={{width: '40%'}}></div>
                          </div>
                          <span>40% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="live-stats">
                      <div className="stat-item">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Courses Completed</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">120h</div>
                        <div className="stat-label">Learning Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <p className="text-sm text-gray-600">Students Empowered</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">300+</div>
              <p className="text-sm text-gray-600">Global Mentors</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">10+</div>
              <p className="text-sm text-gray-600">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From beginner-friendly courses to advanced specializations, we provide the complete learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Curriculum</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality computer science education covering programming fundamentals, algorithms, and modern technologies.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with volunteer tutors and industry professionals from around the world. Learn together and support each other.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hands-On Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Build real projects and participate in hackathons and industry talks. Apply what you learn in practical ways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Learn Computer Science?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our global community of learners, volunteer tutors, and industry professionals. Start your computer science journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleStartLearning}
              disabled={loading}
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? 'Loading...' : (user ? 'Start Learning Free' : 'Sign Up to Learn Free')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild 
              className="border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              <Link href="/volunteer">Volunteer to Teach</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}