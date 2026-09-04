import Link from 'next/link';
import { PageIntro } from '@/components/layout/page-intro';
import { ArrowRight } from 'lucide-react';

const principles = [
  {
    title: 'Brightest minds first',
    description: 'We elevate ambitious students who want to lead in AI and emerging technology.',
  },
  {
    title: 'Learn by building',
    description: 'Ideas get sharper through prototypes, writing, feedback, and iteration.',
  },
  {
    title: 'Connect to industry',
    description: 'Mentorship bridges students pursuing CS careers with people already doing the work.',
  },
  {
    title: 'Publish what matters',
    description: 'Articles teach. Research explores. Both should help the next builder go further.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="A next-gen platform for AI and emerging tech"
        description="Coding Central is a platform for people exploring computer science, artificial intelligence, and the technologies shaping what comes next."
      />

      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow mb-2">Why we exist</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              From curiosity to career and innovation
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-neutral-600 sm:text-base">
            <p>
              Coding Central brings together student writers, builders, and researchers with
              industry mentors who can open doors. Articles make hard ideas clear. Research
              pushes toward innovation. Mentorship connects ambition to experience.
            </p>
            <p>
              Club activities are coordinated through school-approved channels, while the
              platform itself is built for a next generation of talent in AI and emerging tech.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">How we work</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">What we optimize for</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 section-space">
        <div className="site-container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2">Explore</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              Start with writing, mentorship, or research
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/learn" className="btn-primary rounded-full">
              Articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tutoring" className="btn-secondary rounded-full">
              Mentorship
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
