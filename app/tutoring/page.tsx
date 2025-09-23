'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Calendar, 
  Video, 
  MessageCircle, 
  Award,
  User,
  GraduationCap,
  Code,
  Lightbulb
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function TutoringPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    currentLevel: '',
    subjects: [] as string[],
    preferredSchedule: '',
    learningGoals: '',
    additionalInfo: ''
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
    
    if (formData.subjects.length === 0) {
      toast.error('Please select at least one subject you need help with');
      return;
    }
    
    if (!user) {
      toast.error('Please sign in to request tutoring');
      router.push('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('tutoring_requests')
        .insert([{
          user_id: user.id,
          student_name: formData.studentName,
          email: formData.email,
          phone: formData.phone,
          university: formData.university,
          major: formData.major,
          current_level: formData.currentLevel,
          subjects: formData.subjects,
          preferred_schedule: formData.preferredSchedule,
          learning_goals: formData.learningGoals,
          additional_info: formData.additionalInfo
        }]);

      if (error) throw error;

      toast.success('Tutoring request submitted successfully! We\'ll match you with a mentor soon.');
      setFormData({
        studentName: '',
        email: user.email || '',
        phone: '',
        university: '',
        major: '',
        currentLevel: '',
        subjects: [],
        preferredSchedule: '',
        learningGoals: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const subjects = [
    'Python', 'JavaScript', 'Java', 'C++', 'C#', 'React', 'Node.js', 
    'Data Structures', 'Algorithms', 'Web Development', 'Mobile Development',
    'Database Design', 'Machine Learning', 'Data Science', 'Cybersecurity'
  ];

  const features = [
    {
      icon: Video,
      title: '1-on-1 Sessions',
      description: 'Personalized tutoring sessions tailored to your learning pace and style'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule, with options for recurring meetings'
    },
    {
      icon: MessageCircle,
      title: 'Ongoing Support',
      description: 'Get help between sessions through our messaging platform'
    },
    {
      icon: Award,
      title: 'Expert Mentors',
      description: 'Learn from experienced developers and computer science professionals'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Computer Science Student',
      university: 'Stanford University',
      content: 'The tutoring program helped me understand complex algorithms and land my dream internship at Google!',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Bootcamp Graduate',
      university: 'General Assembly',
      content: 'My mentor guided me through React and helped me build an amazing portfolio. I got hired within 2 months!',
      rating: 5,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kim',
      role: 'High School Student',
      university: 'Lincoln High School',
      content: 'Started with zero coding knowledge. Now I\'m building my own apps and planning to study CS in college!',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const stats = [
    { number: '2,000+', label: 'Students Mentored', icon: Users },
    { number: '500+', label: 'Expert Tutors', icon: GraduationCap },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Personal Tutoring</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with expert mentors who will guide you through your coding journey. 
              From beginner concepts to advanced topics, we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Request a Tutor
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold">
                Browse Mentors
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Tutoring?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience personalized learning with industry professionals who care about your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full group-hover:from-green-200 group-hover:to-blue-200 transition-all duration-300 mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Request a Tutor
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Tell us about your learning goals and we&apos;ll match you with the perfect mentor
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
                      value={formData.studentName}
                      onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Level
                    </label>
                    <select
                      value={formData.currentLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentLevel: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="">Select your level</option>
                      <option value="beginner">Complete Beginner</option>
                      <option value="some-experience">Some Experience</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subjects You Want Help With *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {subjects.map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(subject)}
                          onChange={() => handleSubjectToggle(subject)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Schedule
                  </label>
                  <Textarea
                    value={formData.preferredSchedule}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredSchedule: e.target.value }))}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="When are you available? (days, times, frequency)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Learning Goals *
                  </label>
                  <Textarea
                    required
                    value={formData.learningGoals}
                    onChange={(e) => setFormData(prev => ({ ...prev, learningGoals: e.target.value }))}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="What do you want to achieve? (e.g., build a project, prepare for interviews, understand concepts)"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="Anything else we should know about your learning style or specific needs?"
                    rows={3}
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Our tutoring program has helped thousands of students achieve their coding goals
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto p-4 bg-white/20 rounded-full mb-4 w-fit">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-green-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from students who transformed their coding skills with our tutoring program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </CardTitle>
                  <CardDescription className="text-green-600 font-medium">
                    {testimonial.role}
                  </CardDescription>
                  <CardDescription className="text-gray-500 text-sm">
                    {testimonial.university}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 italic leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}