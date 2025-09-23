'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, User, Calendar, Mail, Users, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Chapter {
  id: string;
  name: string;
  university: string;
  location: string;
  description: string;
  members_count: number;
  meeting_day: string;
  meeting_time: string;
  contact_email: string;
  president_name: string;
  president_image?: string;
  established_date: string;
  activities: string[];
}

export default function ChapterDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    // Mock data for demonstration
    const mockChapter: Chapter = {
      id: params.id,
      name: 'MIT Coding Central',
      university: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA',
      description: 'Our MIT chapter focuses on advanced algorithms, machine learning, and cutting-edge research projects. We host weekly coding sessions and collaborate with industry leaders.',
      members_count: 45,
      meeting_day: 'Wednesdays',
      meeting_time: '7:00 PM',
      contact_email: 'mit@codingcentral.org',
      president_name: 'Sarah Chen',
      president_image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      established_date: '2022',
      activities: ['Weekly Coding Sessions', 'Hackathons', 'Industry Talks', 'Research Projects', 'Peer Tutoring']
    };

    setChapter(mockChapter);
    setLoading(false);
  }, [params.id]);

  const handleJoinChapter = async () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    toast.success('Join request submitted! The chapter president will contact you soon.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24">
        <div className="container">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading chapter details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24">
        <div className="container">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Chapter Not Found</h1>
            <p className="text-gray-600 mb-8">The chapter you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/chapters')}>
              Back to Chapters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                Established {chapter.established_date}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {chapter.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{chapter.university}</p>
              <div className="flex items-center justify-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{chapter.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{chapter.members_count} members</span>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {chapter.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chapter Details */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Meeting Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Meeting Schedule</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Day</p>
                        <p className="font-semibold">{chapter.meeting_day}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Time</p>
                        <p className="font-semibold">{chapter.meeting_time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Chapter Activities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {chapter.activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <ArrowRight className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* President Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chapter President</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src={chapter.president_image} alt={chapter.president_name} />
                        <AvatarFallback>
                          {chapter.president_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-gray-900 mb-2">{chapter.president_name}</h3>
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{chapter.contact_email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Join Chapter */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Join This Chapter</CardTitle>
                    <CardDescription>
                      Connect with fellow students and start your coding journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={handleJoinChapter}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Join Chapter
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      {!user && 'Sign in required to join'}
                    </p>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Members</span>
                      <span className="font-semibold">{chapter.members_count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Activities</span>
                      <span className="font-semibold">{chapter.activities.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Established</span>
                      <span className="font-semibold">{chapter.established_date}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}