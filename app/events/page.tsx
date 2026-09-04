import { PageIntro } from '@/components/layout/page-intro';
import { ArrowUpRight } from 'lucide-react';

const formats = [
  {
    title: 'Build sessions',
    description: 'Focused time to work on projects, compare approaches, and debug together.',
  },
  {
    title: 'Skill workshops',
    description: 'Hands-on introductions to tools and topics students want to understand better.',
  },
  {
    title: 'Project shares',
    description: 'Low-pressure opportunities to explain a work in progress and receive useful feedback.',
  },
  {
    title: 'Club meetings',
    description: 'Plan upcoming activities, meet other members, and find a project partner.',
  },
];

export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Meet, learn, build"
        title="Club events, clearly listed."
        description="Meetings, workshops, and project sessions coordinated through school-approved channels. Confirmed dates appear here when available."
      />

      <section className="section-space">
        <div className="site-container">
          <div className="surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="eyebrow mb-2">Current schedule</p>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                New dates are being organized.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                School announcements and approved club channels remain the source of truth for schedule changes.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-600">
              Update pending
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">What to expect</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Different formats. Same goal.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {formats.map((format, index) => (
              <article key={format.title} className="surface p-5 sm:p-6">
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
                  {format.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{format.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 section-space">
        <div className="site-container text-center">
          <p className="eyebrow mb-3">Have a question?</p>
          <h2 className="section-title mx-auto max-w-2xl text-[2rem] sm:text-[2.4rem]">
            Ask through an approved club channel.
          </h2>
          <a href="mailto:events@codingcentral.org" className="btn-primary mt-8">
            Email the club
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
