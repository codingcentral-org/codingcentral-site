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
              {/* Dashboard Preview Mockup */}
              <div className="relative w-full max-w-lg mx-auto">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex space-x-6">
                          <div className="text-white font-medium text-sm bg-white/20 px-3 py-1 rounded-lg">Dashboard</div>
                          <div className="text-white/70 text-sm hover:text-white cursor-pointer">Courses</div>
                          <div className="text-white/70 text-sm hover:text-white cursor-pointer">Progress</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 text-xs font-bold">AC</span>
                        </div>
                        <span className="text-white text-sm font-medium">Alex Chen</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6">
                    {/* Progress Cards */}
                    <div className="space-y-4">
                      {/* AI Fundamentals Card */}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl">
                            🤖
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2">AI Fundamentals</h4>
                            <div className="relative">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{width: '75%'}}
                                ></div>
                              </div>
                              <span className="text-sm text-purple-600 font-medium mt-1 block">75% Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cybersecurity Card */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                            🛡️
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2">Cybersecurity</h4>
                            <div className="relative">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{width: '40%'}}
                                ></div>
                              </div>
                              <span className="text-sm text-green-600 font-medium mt-1 block">40% Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Stats */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
                          <div className="text-sm text-gray-600">Courses Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-600 mb-1">120h</div>
                          <div className="text-sm text-gray-600">Learning Time</div>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          🏆
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Top Performer</div>
                          <div className="text-sm text-gray-600">Earned this week</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-pulse">
                  <Trophy className="w-6 h-6 text-yellow-600" />
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