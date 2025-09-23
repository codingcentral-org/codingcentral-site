# Coding Central - Nonprofit Website

A modern nonprofit website built with Next.js, TailwindCSS, Supabase, and Sanity CMS for Coding Central - empowering young programmers through free education and mentorship.

## Features

### Core Pages
- **Home**: Hero banner, impact counters, mission statement, partner logos
- **Learn**: Free course directory with curated programming resources
- **Tutoring**: 1:1 tutoring program with request form
- **Events & Competitions**: Upcoming hackathons, workshops, and competitions
- **Chapters**: University chapter directory with detailed chapter pages
- **About**: Mission, story, values, and contact form

### Authentication & Dashboard
- Supabase authentication with role-based access
- User roles: student, tutor, chapter_lead, admin
- Personalized dashboards for each role
- Progress tracking for students
- Session management for tutors
- Chapter management for leads

### Technical Features
- Responsive design with shadcn/ui components
- Light/dark mode toggle
- TypeScript for type safety
- Supabase for database and authentication
- Sanity CMS integration for content management
- Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **CMS**: Sanity
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Sanity account

### Setup

1. **Clone and install dependencies**
```bash
git clone <repository>
cd coding-central
npm install
```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the migrations in `supabase/migrations/`
   - Get your project URL and anon key

3. **Set up Sanity CMS**
   - Create a new Sanity project
   - Get your project ID

4. **Environment Variables**
   Update `.env.local` with your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

5. **Run the development server**
```bash
npm run dev
```

## Database Schema

### Tables
- `profiles` - User profiles with roles
- `chapters` - University chapters
- `events` - Events and competitions  
- `tutoring_requests` - Student tutoring requests
- `progress` - Student course progress

### Roles
- **Student**: Can view courses, request tutoring, join events, track progress
- **Tutor**: Can manage tutoring sessions, view assigned students
- **Chapter Lead**: Can manage their chapter, create events
- **Admin**: Full access to all features

## Deployment

The app is optimized for Vercel deployment:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Content Management

Content is managed through:
- **Sanity CMS**: For homepage content, mission statements, courses
- **Supabase**: For dynamic data like events, chapters, user progress

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, contact the development team or create an issue in the repository.