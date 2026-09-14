import { PageIntro } from '@/components/layout/page-intro';
import { ArrowUpRight } from 'lucide-react';

const formats = [
  {
    title: 'Workshops',
    description: 'Focused sessions on AI, systems, security, and practical engineering craft.',
  },
  {
    title: 'Talks',
    description: 'Practitioners share how they design, ship, and operate real products.',
  },
  {
    title: 'Office hours',
    description: 'Open time for questions on career paths, architecture, and technical decisions.',
  },
  {
    title: 'Community meetups',
    description: 'Lightweight gatherings to compare approaches and meet collaborators.',
  },
];

export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Events"
        title="Workshops, talks, and meetups"
        description="Coding Central hosts professional sessions on AI, engineering, and emerging technology. Confirmed dates appear here when scheduled."
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
                  Workshop
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-[-0.02em] text-neutral-950 sm:text-[1.75rem]">
                  Shipping Reliable AI Features
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  A working session on evaluation, guardrails, and production patterns for teams
                  adding AI to real products. Registration details are shared through Coding
                  Central channels when enrollment opens.
                </p>
              </div>
              <div className="shrink-0 rounded-xl border border-neutral-200 bg-[#f7f7f4] px-4 py-3 sm:min-w-[180px]">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                  When
                </p>
                <p className="mt-2 text-[15px] font-semibold tracking-[-0.01em] text-neutral-950">
                  October 8, 2026
                </p>
                <p className="mt-1 text-sm text-neutral-600">1:00 PM CT</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">What to expect</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Different formats. Same bar.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {formats.map((format, index) => (
              <article key={format.title}>
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
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
            Reach the events team
          </h2>
          <a href="mailto:events@codingcentral.org" className="btn-primary mt-8">
            Email events
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
