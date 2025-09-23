'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Trophy, Brain, Shield, BarChart3, Code, Briefcase } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const eventCategories = {
  'chapters': {
    title: 'Chapters',
    icon: Users,
    description: 'Local chapter meetings and university-specific events',
  },
  'hackathons': {
    title: 'Hackathons',
    icon: Trophy,
    description: 'Competitive coding events and innovation challenges',
  },
  'workshops': {
    title: 'Workshops',
    icon: Code,
    description: 'Hands-on learning sessions and skill-building workshops',
  },
  'competitions': {
    title: 'Competitions',
    icon: Brain,
    description: 'Algorithm contests and technical challenges',
  },
  'career': {
    title: 'Career Events',
    icon: Briefcase,
    description: 'Networking, panels, and professional development',
  },
  'security': {
    title: 'Cybersecurity',
    icon: Shield,
    description: 'Security challenges and ethical hacking events',
  },
};

const events = [
  {
    id: '1',
    title: 'North Garland H.S - Orientation Meeting',
    description: 'Welcome meeting for North Garland High School students interested in joining our coding community. Learn about our programs, meet fellow students, and get started on your coding journey.',
    date: '2025-02-25T15:00:00',
    location: 'North Garland High School',
    maxParticipants: 50,
    registeredCount: 23,
    category: 'chapters',
    prizes: 'Welcome Kit & Resources',
    difficulty: 'All Levels',
  },
];

function getEventTypeBadge(category: string) {
  const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    hackathons: 'destructive',
    workshops: 'default',
    competitions: 'outline',
    career: 'secondary',
    security: 'destructive',
  };
  
  return (
    <Badge variant={variants[category] || 'default'}>
      {eventCategories[category as keyof typeof eventCategories]?.title || category}
    </Badge>
  );
}

function getDifficultyBadge(difficulty: string) {
  const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    'Beginner': 'secondary',
    'Intermediate': 'default',
    'Advanced': 'destructive',
    'All Levels': 'outline',
  };
  
  return (
    <Badge variant={variants[difficulty] || 'outline'} className="ml-2">
      {difficulty}
    </Badge>
  );
}

export default function EventsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch user's event registrations
        const { data } = await supabase
          .from('event_registrations')
          .select('*')
          .eq('user_id', user.id);
        setRegistrations(data || []);
      }
    };
    getUser();
  }, []);

  const handleEventRegistration = async (eventId: string, eventTitle: string) => {
    if (!user) {
      toast.error('Please sign in to register for events');
      router.push('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{
          user_id: user.id,
          event_id: eventId,
          user_name: user.user_metadata?.full_name || user.email,
          user_email: user.email,
          status: 'pending'
        }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('You have already registered for this event');
        } else {
          throw error;
        }
      } else {
        toast.success('Registration submitted! Awaiting approval.');
        // Refresh registrations
        const { data } = await supabase
          .from('event_registrations')
          .select('*')
          .eq('user_id', user.id);
        setRegistrations(data || []);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Failed to register for event. Please try again.');
    }
  };

  const getRegistrationStatus = (eventId: string) => {
    const registration = registrations.find(r => r.event_id === eventId);
    return registration?.status || null;
  };

  const getButtonText = (eventId: string) => {
    const status = getRegistrationStatus(eventId);
    switch (status) {
      case 'pending': return 'Pending Approval';
      case 'approved': return 'Registered';
      case 'rejected': return 'Registration Denied';
      default: return 'Register Now';
    }
  };

  const isButtonDisabled = (eventId: string) => {
    const status = getRegistrationStatus(eventId);
    return status !== null; // Disable if already registered in any state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-100 shadow-sm">
              <Trophy className="w-4 h-4 text-blue-500" />
              <span className="text-gray-900">
                Empowering Minds, Unlocking Potential
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Events where everyone has{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                the opportunity to compete and excel
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full mx-auto"></div>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Join hackathons, workshops, and competitions at no cost. From AI to cybersecurity, 
              connect with industry leaders and showcase your skills while unlocking your potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Active Community</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Learning Focused</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Skill Building</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <p className="text-sm text-gray-600">Events This Year</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">2K+</div>
              <p className="text-sm text-gray-600">Participants</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">25+</div>
              <p className="text-sm text-gray-600">School Chapters</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <p className="text-sm text-gray-600">Free Access</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-12">
        {/* Event Categories */}
        <Tabs defaultValue="hackathons" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-5xl grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl">
              {Object.entries(eventCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex flex-col items-center space-y-2 p-4 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-sm font-semibold text-center leading-tight">
                      {category.title}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {Object.entries(eventCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {category.title}
                  </h2>
                </div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  We&apos;re planning exciting {category.title.toLowerCase()} events. Check back soon or contact us to suggest an event!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events
                  .filter(event => event.category === key)
                  .map((event) => (
                    <Card key={event.id} className="group h-full flex flex-col bg-white/80 backdrop-blur-sm border border-white/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            {getEventTypeBadge(event.category)}
                            {getDifficultyBadge(event.difficulty)}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(event.date), 'MMM dd')}
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 leading-relaxed line-clamp-3">
                          {event.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                            {event.location}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-slate-600">
                              <Users className="w-4 h-4 mr-2 text-slate-400" />
                              {event.registeredCount} / {event.maxParticipants} registered
                            </div>
                            <div className="flex items-center text-green-600 font-semibold">
                              <Trophy className="w-4 h-4 mr-1" />
                              {event.prizes}
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min((event.registeredCount / event.maxParticipants) * 100, 100)}%`
                              }}
                            />
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleEventRegistration(event.id, event.title)}
                          disabled={isButtonDisabled(event.id)}
                          className={`w-full font-semibold rounded-xl transition-all duration-200 group-hover:scale-105 ${
                            getRegistrationStatus(event.id) === 'approved' 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : getRegistrationStatus(event.id) === 'pending'
                              ? 'bg-yellow-600 hover:bg-yellow-700'
                              : getRegistrationStatus(event.id) === 'rejected'
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                          } text-white`}
                        >
                          {getButtonText(event.id)}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Show message when no events in category */}
              {events.filter(event => event.category === key).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <category.icon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No {category.title} Events Yet
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We&apos;re planning exciting {category.title.toLowerCase()} events. Check back soon or contact us to suggest an event!
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Want to Host an Event?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              If you&apos;re a chapter lead or want to organize an event in your area, we provide 
              full support including funding, mentors, and promotional resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => router.push('/volunteer')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Host an Event
              </Button>
              <Button 
                onClick={() => {
                  window.open('mailto:events@codingcentral.org', '_blank');
                }}
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}