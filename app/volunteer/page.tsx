'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Code, BookOpen, Calendar, Clock, MapPin, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function VolunteerPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    graduationYear: '',
    programmingLanguages: '',
    availability: '',
    motivation: '',
    experience: '',
    interests: [] as string[]
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setFormData(prev => ({ ...prev, email: user.email || '' }));
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit your volunteer application');
      router.push('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .insert([{
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          university: formData.university,
          major: formData.major,
          graduation_year: formData.graduationYear,
          programming_languages: formData.programmingLanguages,
          availability: formData.availability,
          motivation: formData.motivation,
          experience: formData.experience,
          interests: formData.interests
        }]);

      if (error) throw error;

      toast.success('Volunteer application submitted successfully! Awaiting approval.');
      setFormData({
        fullName: '',
        email: user.email || '',
        phone: '',
        university: '',
        major: '',
        graduationYear: '',
        programmingLanguages: '',
        availability: '',
        motivation: '',
        experience: '',
        interests: []
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const opportunities = [
    {
      title: 'Software Engineer',
      description: 'Develop and maintain our learning platform, build new features, and improve user experience',
      commitment: '4-6 hours/week',
      skills: ['Full-Stack Development', 'React/Next.js', 'Node.js'],
      icon: Code
    },
    {
      title: 'UI/UX Designer',
      description: 'Design intuitive user interfaces and improve the overall user experience of our platform',
      commitment: '4-6 hours/week',
      skills: ['Figma', 'User Research', 'Prototyping'],
      icon: BookOpen
    },
    {
      title: 'Technical Writer',
      description: 'Create documentation, tutorials, and educational content for our learning materials',
      commitment: '3-5 hours/week',
      skills: ['Technical Writing', 'Documentation', 'Content Creation'],
      icon: Calendar
    },
    {
      title: 'DevOps Engineer',
      description: 'Manage deployment pipelines, infrastructure, and ensure platform reliability and scalability',
      commitment: '2-3 hours/week',
      skills: ['AWS/Cloud', 'CI/CD', 'Infrastructure'],
      icon: BookOpen
    },
    {
      title: 'Coding Mentor',
      description: 'Guide students through programming challenges and provide 1-on-1 tutoring support',
      commitment: '2-4 hours/week',
      skills: ['Programming', 'Teaching', 'Communication'],
      icon: Users
    },
    {
      title: 'Event Coordinator',
      description: 'Help organize hackathons, workshops, and community events',
      commitment: '3-5 hours/week',
      skills: ['Event Planning', 'Organization', 'Communication'],
      icon: Calendar
    }
  ];

  const interestOptions = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Game Development',
    'UI/UX Design',
    'DevOps',
    'Blockchain',
    'AI/Robotics'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Make a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Difference</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our community of passionate volunteers and help shape the next generation of coders. 
              Share your knowledge, build meaningful connections, and create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Start Volunteering
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from various ways to contribute and make an impact in our coding community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {opportunity.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center justify-center text-sm text-blue-600 font-medium mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      {opportunity.commitment}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {opportunity.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Volunteer Application
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Ready to make a difference? Fill out the form below to join our volunteer team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      University/School
                    </label>
                    <Input
                      value={formData.university}
                      onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your university"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Major/Field of Study
                    </label>
                    <Input
                      value={formData.major}
                      onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Graduation Year
                    </label>
                    <Input
                      value={formData.graduationYear}
                      onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Programming Languages & Technologies
                  </label>
                  <Input
                    value={formData.programmingLanguages}
                    onChange={(e) => setFormData(prev => ({ ...prev, programmingLanguages: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Python, JavaScript, React, Node.js"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Areas of Interest
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <Textarea
                    value={formData.availability}
                    onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Please describe your availability (days, times, hours per week)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to volunteer with us?
                  </label>
                  <Textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about your motivation and what you hope to achieve"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Relevant Experience
                  </label>
                  <Textarea
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Share any relevant experience in teaching, mentoring, or community involvement"
                    rows={4}
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Volunteer Impact
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              See the difference our amazing volunteers are making in the coding community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Active Volunteers', icon: Users },
              { number: '2,000+', label: 'Students Helped', icon: BookOpen },
              { number: '150+', label: 'Workshops Led', icon: Calendar },
              { number: '50+', label: 'Universities', icon: MapPin }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto p-4 bg-white/20 rounded-full mb-4 w-fit">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}