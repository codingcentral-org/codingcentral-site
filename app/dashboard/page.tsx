'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Python Programming</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chapter Stats</CardTitle>
                  <CardDescription>Your chapter&apos;s current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Active Members</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month&apos;s Events</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance Rate</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  <CardDescription>Events you&apos;re organizing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Algorithm Workshop</p>
                      <p className="text-muted-foreground">February 25, 2025</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Manage Events
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chapter Management</CardTitle>
                  <CardDescription>Quick actions for your chapter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Edit Chapter Info
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    View Members
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Schedule Event
                  </Button>
                </CardContent>
              </Card>
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
                        <Progress value={75} className="mb-2" />
                        <p className="text-sm text-muted-foreground">6 of 8 modules completed</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Python Programming</h5>
                          <Badge variant="secondary">In Progress</Badge>
                        </div>
                        <Progress value={45} className="mb-2" />
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
        .select(`
          *,
          events(title, date),
          profiles(full_name, email)
        `)
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
                          onClick={() => handleApproval('tutoring_requests', request.id, 'assigned')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApproval('tutoring_requests', request.id, 'cancelled')}
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