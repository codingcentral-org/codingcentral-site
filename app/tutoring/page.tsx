import { PageIntro } from '@/components/layout/page-intro';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  {
    title: 'Builders with ambition',
    description:
      'People preparing for careers in computer science, AI, and emerging technology who want real-world guidance.',
  },
  {
    title: 'Industry mentors',
    description:
      'Professionals who share practical advice on skills, portfolios, interviews, and what the work actually looks like.',
  },
  {
    title: 'Clear connections',
    description:
      'Structured introductions that help mentees ask better questions and mentors give useful, actionable feedback.',
  },
];

export default function MentorshipPage() {
  return (
    <>
      <PageIntro
        eyebrow="Mentorship"
        title="Connect industry mentors to rising talent"
        description="Coding Central links people pursuing computer science careers with mentors who work in the field, so ambition meets experience."
      />

      <section className="section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">How it works</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              Career-minded talent. Mentors who ship.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <article key={item.title}>
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white section-space">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">For mentees</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Ask better questions</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Bring a concrete goal: a portfolio review, interview prep, or feedback on a technical
              direction. Mentors help most when the ask is specific.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">For mentors</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Share what compounds</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Share what you wish someone had told you earlier. Help sharp builders turn curiosity
              into durable skill.
            </p>
          </div>
        </div>

        <div className="site-container mt-12">
          <a href="mailto:mentorship@codingcentral.org" className="btn-primary rounded-full">
            Contact mentorship
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 max-w-xl text-sm text-neutral-500">
            Reach out if you are seeking guidance or a professional ready to mentor.
          </p>
        </div>
      </section>
    </>
  );
}
