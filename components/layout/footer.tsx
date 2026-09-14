import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="site-container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <img
                src="/codingcentral_logo.jpg"
                alt=""
                className="h-8 w-8 rounded-lg object-contain"
              />
              <span className="text-[15px] font-semibold tracking-[-0.02em]">Coding Central</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-neutral-500">
              A next-gen platform for AI and emerging technologies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm text-neutral-600">
              <li><Link href="/courses" className="hover:text-neutral-950">Courses</Link></li>
              <li><Link href="/research" className="hover:text-neutral-950">Research</Link></li>
              <li><Link href="/events" className="hover:text-neutral-950">Events</Link></li>
              <li><Link href="/tutoring" className="hover:text-neutral-950">Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Community
            </h2>
            <ul className="space-y-2.5 text-sm text-neutral-600">
              <li><Link href="/about" className="hover:text-neutral-950">About</Link></li>
              <li><Link href="/volunteer" className="hover:text-neutral-950">Volunteer</Link></li>
              <li>
                <a href="mailto:events@codingcentral.org" className="hover:text-neutral-950">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Coding Central</p>
          <p>Built for AI, computer science, and emerging technology.</p>
        </div>
      </div>
    </footer>
  );
}
