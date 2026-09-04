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
          <div className="mb-6">
            <p className="eyebrow mb-2">Current schedule</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Upcoming</h2>
          </div>

          <article className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                  Club meeting
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-[-0.02em] text-neutral-950 sm:text-[1.75rem]">
                  North Garland H.S. Chapter General Meeting
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  Join the chapter for updates, planning, and more information. School announcements
                  and approved club channels remain the source of truth for schedule changes.
                </p>
              </div>
              <div className="shrink-0 rounded-xl border border-neutral-200 bg-[#f7f7f4] px-4 py-3 sm:min-w-[180px]">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                  When
                </p>
                <p className="mt-2 text-[15px] font-semibold tracking-[-0.01em] text-neutral-950">
                  September 17, 2026
                </p>
                <p className="mt-1 text-sm text-neutral-600">3:00 PM CT</p>
              </div>
            </div>
          </article>
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
