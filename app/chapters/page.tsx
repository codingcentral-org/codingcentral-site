import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, User } from 'lucide-react';
import Link from 'next/link';

const chapters = [
  {
    id: '1',
    name: 'MIT CodeCentral',
    school: 'Massachusetts Institute of Technology',
    city: 'Cambridge, MA',
    chapterLeadName: 'Sarah Chen',
    memberCount: 45,
    description: 'Our flagship chapter at MIT focuses on advanced algorithms and research projects.',
    status: 'active',
  },
  {
    id: '2',
    name: 'Stanford Coding Hub',
    school: 'Stanford University',
    city: 'Palo Alto, CA',
    chapterLeadName: 'Marcus Rodriguez',
    memberCount: 62,
    description: 'Silicon Valley chapter specializing in startup projects and entrepreneurship.',
    status: 'active',
  },
  {
    id: '3',
    name: 'Berkeley Bytes',
    school: 'UC Berkeley',
    city: 'Berkeley, CA',
    chapterLeadName: 'Emily Wang',
    memberCount: 38,
    description: 'Open source enthusiasts working on community impact projects.',
    status: 'active',
  },
  {
    id: '4',
    name: 'Harvard Tech Collective',
    school: 'Harvard University',
    city: 'Cambridge, MA',
    chapterLeadName: 'David Kim',
    memberCount: 29,
    description: 'Interdisciplinary approach combining computer science with liberal arts.',
    status: 'active',
  },
  {
    id: '5',
    name: 'Carnegie Mellon Coders',
    school: 'Carnegie Mellon University',
    city: 'Pittsburgh, PA',
    chapterLeadName: 'Jessica Liu',
    memberCount: 51,
    description: 'Machine learning and AI-focused chapter with industry partnerships.',
    status: 'active',
  },
  {
    id: '6',
    name: 'UT Austin Developers',
    school: 'University of Texas at Austin',
    city: 'Austin, TX',
    chapterLeadName: 'Alex Thompson',
    memberCount: 33,
    description: 'Full-stack development and web technologies focus.',
    status: 'active',
  },
  {
    id: '7',
    name: 'Georgia Tech Innovators',
    school: 'Georgia Institute of Technology',
    city: 'Atlanta, GA',
    chapterLeadName: 'Maya Patel',
    memberCount: 27,
    description: 'Mobile app development and user experience design.',
    status: 'recruiting',
  },
  {
    id: '8',
    name: 'UCLA Code Lab',
    school: 'University of California, Los Angeles',
    city: 'Los Angeles, CA',
    chapterLeadName: 'Ryan Foster',
    memberCount: 19,
    description: 'New chapter focusing on game development and graphics programming.',
    status: 'recruiting',
  },
];

export default function ChaptersPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Our Chapters
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Coding Central has active chapters at universities across the country. 
          Find a chapter near you or learn how to start one at your school.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">{chapters.length}</div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Active Chapters
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">
            {chapters.reduce((total, chapter) => total + chapter.memberCount, 0)}
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Chapter Members
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">15</div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            States Covered
          </p>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant={chapter.status === 'active' ? 'default' : 'secondary'}
                >
                  {chapter.status === 'active' ? 'Active' : 'Recruiting'}
                </Badge>
                <div className="text-sm text-muted-foreground flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {chapter.memberCount}
                </div>
              </div>
              <CardTitle className="text-xl">{chapter.name}</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <div className="font-medium">{chapter.school}</div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {chapter.city}
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {chapter.description}
                </p>
                <div className="text-sm">
                  <span className="text-muted-foreground">Chapter Lead: </span>
                  <span className="font-medium">{chapter.chapterLeadName}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/chapters/${chapter.id}`}>
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 space-y-4">
        <h2 className="text-xl font-bold">Don&apos;t See Your School?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Starting a chapter is easier than you think! We provide all the resources, 
          training, and support you need to bring Coding Central to your campus.
        </p>
        <div className="space-x-4">
          <Button>
            Start a Chapter
          </Button>
          <Button variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}