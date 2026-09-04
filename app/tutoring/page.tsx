import { PageIntro } from '@/components/layout/page-intro';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  {
    title: 'Students with ambition',
    description:
      'Learners preparing for careers in computer science, AI, and emerging technology who want real-world guidance.',
  },
  {
    title: 'Industry mentors',
    description:
      'Professionals who share practical advice on skills, portfolios, interviews, and what the work actually looks like.',
  },
  {
    title: 'Clear connections',
    description:
      'Structured introductions that help students ask better questions and mentors give useful, actionable feedback.',
  },
];

export default function MentorshipPage() {
  return (
    <>
      <PageIntro
        eyebrow="Mentorship"
        title="Connect industry mentors to students"
        description="Coding Central links students pursuing computer science careers with mentors who work in the field, so ambition meets experience."
      />

      <section className="section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">How it works</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              Career-minded students. Mentors who ship.
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
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow mb-2">For students</p>
            <h2 className="section-title text-[1.75rem] sm:text-[2.1rem]">
              Get advice for the path ahead
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
              Whether you are exploring AI, software engineering, research, or product,
              mentorship helps you understand what to learn next and how professionals
              actually grow in the field.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">For mentors</p>
            <h2 className="section-title text-[1.75rem] sm:text-[2.1rem]">
              Invest in the next generation
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
              Share what you wish someone had told you earlier. Help sharp students turn
              curiosity into a career plan grounded in real industry practice.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 section-space">
        <div className="site-container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2">Get involved</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              Interested in mentorship?
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Reach out if you are a student seeking guidance or a professional ready to mentor.
            </p>
          </div>
          <a
            href="mailto:events@codingcentral.org?subject=Coding%20Central%20mentorship"
            className="btn-primary rounded-full"
          >
            Contact mentorship
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
