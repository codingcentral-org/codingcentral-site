'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase, type Profile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData.user) {
        router.push('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profile) {
        setUser(profile);
      }
      setIsLoading(false);
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    toast.success('Signed out successfully');
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <p>Please sign in to access your dashboard.</p>
          <Button onClick={() => router.push('/auth')} className="mt-4">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user.full_name || 'User'}!
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ')}
            </Badge>
          </div>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      {/* Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {user.role === 'student' && <TabsTrigger value="progress">My Progress</TabsTrigger>}
          {user.role === 'tutor' && <TabsTrigger value="sessions">My Sessions</TabsTrigger>}
          {user.role === 'chapter_lead' && <TabsTrigger value="chapter">My Chapter</TabsTrigger>}
          {(user.role === 'admin' || user.role === 'chapter_lead') && <TabsTrigger value="approvals">Approvals</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Student Dashboard */}
          {user.role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Progress</CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Web Development Fundamentals</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Python Programming</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  <CardDescription>Events you&apos;ve registered for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Spring Hackathon 2025</p>
                      <p className="text-muted-foreground">March 15, 2025</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Algorithm Contest</p>
                      <p className="text-muted-foreground">March 5, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tutoring Sessions</CardTitle>
                  <CardDescription>Your tutoring requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>JavaScript Help</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>React Project Review</span>
                      <Badge variant="default">Assigned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tutor Dashboard */}
          {user.role === 'tutor' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Sessions</CardTitle>
                  <CardDescription>Students you&apos;re currently helping</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Alice Johnson</p>
                      <p className="text-muted-foreground">Python Programming</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Bob Smith</p>
                      <p className="text-muted-foreground">Web Development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pending Requests</CardTitle>
                  <CardDescription>New tutoring requests to review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">React Help Needed</p>
                      <p className="text-muted-foreground">From: Charlie Wilson</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      View All Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Month</CardTitle>
                  <CardDescription>Your tutoring stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sessions Completed</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours Tutored</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students Helped</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chapter Lead Dashboard */}
          {user.role === 'chapter_lead' && (
            <div className="space-y-8">
              {/* Header Section */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-8 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xl font-bold">CC</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">UTD Coding Central</h1>
                      <p className="text-blue-100">Chapter Leadership Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Active Chapter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>•</span>
                      <span>University of Texas at Dallas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-700 mb-1">Active Members</p>
                        <p className="text-3xl font-bold text-emerald-900">45</p>
                        <p className="text-xs text-emerald-600 mt-1">+5 this month</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">👥</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700 mb-1">This Month&apos;s Events</p>
                        <p className="text-3xl font-bold text-blue-900">3</p>
                        <p className="text-xs text-blue-600 mt-1">2 upcoming</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">📅</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700 mb-1">Attendance Rate</p>
                        <p className="text-3xl font-bold text-purple-900">78%</p>
                        <p className="text-xs text-purple-600 mt-1">Above average</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">📊</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-700 mb-1">Pending Requests</p>
                        <p className="text-3xl font-bold text-amber-900">7</p>
                        <p className="text-xs text-amber-600 mt-1">Needs review</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">⏳</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Events */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">Upcoming Events</CardTitle>
                          <CardDescription className="text-gray-600">Events you&apos;re organizing</CardDescription>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6">
                          + New Event
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                              <span className="text-white text-lg">🧮</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Algorithm Workshop</h3>
                              <p className="text-sm text-gray-600">Interactive coding session</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Upcoming</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📅 Feb 25, 2025</span>
                            <span>⏰ 6:00 PM</span>
                            <span>📍 ECSS 2.306</span>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-lg">
                            Manage
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                              <span className="text-white text-lg">💼</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Career Fair Prep</h3>
                              <p className="text-sm text-gray-600">Resume review & mock interviews</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Upcoming</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📅 Mar 5, 2025</span>
                            <span>⏰ 5:30 PM</span>
                            <span>📍 SU Ballroom</span>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-lg">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
                      <CardDescription>Manage your chapter efficiently</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg">
                        <span className="mr-3 text-lg">📝</span>
                        <div className="text-left">
                          <div className="font-medium">Schedule Event</div>
                          <div className="text-xs text-blue-100">Create new chapter event</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start h-14 border-2 hover:bg-gray-50 rounded-xl">
                        <span className="mr-3 text-lg">👥</span>
                        <div className="text-left">
                          <div className="font-medium">View Members</div>
                          <div className="text-xs text-gray-500">Manage chapter roster</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start h-14 border-2 hover:bg-gray-50 rounded-xl">
                        <span className="mr-3 text-lg">⚙️</span>
                        <div className="text-left">
                          <div className="font-medium">Chapter Settings</div>
                          <div className="text-xs text-gray-500">Edit chapter information</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start h-14 border-2 hover:bg-gray-50 rounded-xl">
                        <span className="mr-3 text-lg">📊</span>
                        <div className="text-left">
                          <div className="font-medium">Analytics</div>
                          <div className="text-xs text-gray-500">View detailed reports</div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-900">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <p className="font-medium">New member joined</p>
                          <p className="text-gray-500 text-xs">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs">📅</span>
                        </div>
                        <div>
                          <p className="font-medium">Event created</p>
                          <p className="text-gray-500 text-xs">1 day ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-xs">🎯</span>
                        </div>
                        <div>
                          <p className="font-medium">Goal achieved</p>
                          <p className="text-gray-500 text-xs">3 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Approvals Tab for Admins and Chapter Leads */}
        {(user.role === 'admin' || user.role === 'chapter_lead') && (
          <TabsContent value="approvals" className="space-y-6">
            <ApprovalManagement userRole={user.role} />
          </TabsContent>
        )}

        {/* Additional tabs for different roles */}
        {user.role === 'student' && (
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>This Month&apos;s Events</CardTitle>
                <CardDescription>Track your progress across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Currently Enrolled</h4>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Web Development Fundamentals</h5>
                          <Badge>In Progress</Badge>
                        </div>
                        <div className="mb-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">6 of 8 modules completed</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Python Programming</h5>
                          <Badge variant="secondary">In Progress</Badge>
                        </div>
                        <div className="mb-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">4.5 of 10 modules completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function ApprovalManagement({ userRole }: { userRole: string }) {
  const [eventRegistrations, setEventRegistrations] = useState<any[]>([]);
  const [volunteerApplications, setVolunteerApplications] = useState<any[]>([]);
  const [tutoringRequests, setTutoringRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    try {
      // Fetch pending event registrations
      const { data: events } = await supabase
        .from('event_registrations')
        .select('*, events(title, date), profiles(full_name, email)')
        .eq('status', 'pending');

      // Fetch pending volunteer applications
      const { data: volunteers } = await supabase
        .from('volunteer_applications')
        .select('*')
        .eq('status', 'pending');

      // Fetch pending tutoring requests
      const { data: tutoring } = await supabase
        .from('tutoring_requests')
        .select('*')
        .eq('status', 'pending');

      setEventRegistrations(events || []);
      setVolunteerApplications(volunteers || []);
      setTutoringRequests(tutoring || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load pending applications');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (table: string, id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Application ${status} successfully!`);
      fetchPendingApplications(); // Refresh the list
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application status');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading pending applications...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>
        
        {/* Event Registrations */}
        {eventRegistrations.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Event Registrations ({eventRegistrations.length})</CardTitle>
              <CardDescription>Users waiting for event approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventRegistrations.map((registration) => (
                  <div key={registration.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{registration.events?.title}</h4>
                        <p className="text-sm text-gray-600">
                          User: {registration.profiles?.full_name || registration.user_name} ({registration.user_email})
                        </p>
                        <p className="text-sm text-gray-500">
                          Registered: {format(new Date(registration.registered_at), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval('event_registrations', registration.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApproval('event_registrations', registration.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Volunteer Applications */}
        {volunteerApplications.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Volunteer Applications ({volunteerApplications.length})</CardTitle>
              <CardDescription>Users wanting to volunteer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteerApplications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{application.full_name}</h4>
                        <p className="text-sm text-gray-600">{application.email}</p>
                        <p className="text-sm text-gray-600">{application.university} - {application.major}</p>
                        <p className="text-sm text-gray-500 mt-2">{application.motivation}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval('volunteer_applications', application.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApproval('volunteer_applications', application.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tutoring Requests */}
        {tutoringRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Tutoring Requests ({tutoringRequests.length})</CardTitle>
              <CardDescription>Students requesting tutoring help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tutoringRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{request.student_name}</h4>
                        <p className="text-sm text-gray-600">{request.student_email}</p>
                        <p className="text-sm text-gray-600">Subject: {request.subject}</p>
                        <p className="text-sm text-gray-500 mt-2">{request.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval('tutoring_requests', request.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApproval('tutoring_requests', request.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {eventRegistrations.length === 0 && volunteerApplications.length === 0 && tutoringRequests.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No pending applications to review.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}