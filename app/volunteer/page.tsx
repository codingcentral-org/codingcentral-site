import { PageIntro } from '@/components/layout/page-intro';
import { ArrowUpRight } from 'lucide-react';

const ways = [
  {
    title: 'Technical office hours',
    description: 'Help someone reason through a technical problem without giving away the solution.',
  },
  {
    title: 'Writing review',
    description: 'Give feedback on drafts so articles stay clear, accurate, and useful.',
  },
  {
    title: 'Workshop support',
    description: 'Assist with sessions on AI, systems, security, and engineering craft.',
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageIntro
        eyebrow="Volunteer"
        title="Help builders turn questions into progress"
        description="People with technical or teaching experience can support Coding Central by sharing practical knowledge with the community."
      />

      <section className="section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">Ways to help</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Contribute your craft</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {ways.map((way, index) => (
              <article key={way.title}>
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
                  {way.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{way.description}</p>
              </article>
            ))}
          </div>

          <a href="mailto:volunteer@codingcentral.org" className="btn-primary mt-12 rounded-full">
            Volunteer with us
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
