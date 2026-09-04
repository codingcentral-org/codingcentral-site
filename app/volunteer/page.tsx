import { PageIntro } from '@/components/layout/page-intro';
import { ArrowUpRight } from 'lucide-react';

const waysToHelp = [
  {
    title: 'Answer questions',
    description: 'Help a student reason through a technical problem without giving away the solution.',
  },
  {
    title: 'Share a skill',
    description: 'Lead a focused, practical session on a tool or topic you understand well.',
  },
  {
    title: 'Review a project',
    description: 'Offer specific feedback on code, usability, documentation, or project scope.',
  },
  {
    title: 'Curate resources',
    description: 'Help identify accurate, accessible learning materials worth recommending.',
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageIntro
        eyebrow="Share what you know"
        title="Help students turn questions into progress."
        description="People with technical or teaching experience can support Coding Central by sharing practical knowledge through school-approved channels."
      />

      <section className="section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">Ways to contribute</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Small, specific help matters.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {waysToHelp.map((way, index) => (
              <article key={way.title} className="surface p-5 sm:p-6">
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
                  {way.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{way.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white section-space">
        <div className="site-container">
          <div className="surface flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-2">Express interest</p>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                Tell us what you could teach.
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Send a short note about your background and the topic you would like to share.
              </p>
            </div>
            <a
              href="mailto:events@codingcentral.org?subject=Coding%20Central%20volunteer%20interest"
              className="btn-primary"
            >
              Email the club
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
