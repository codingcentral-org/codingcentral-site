import Image from 'next/image';
import Link from 'next/link';
import type { Guide } from '@/lib/guides';

interface GuideHeaderProps {
  guide: Guide;
}

export function GuideHeader({ guide }: GuideHeaderProps) {
  return (
    <header className="border-b border-neutral-200 bg-[#f7f7f4]">
      <div className="site-container pt-10 sm:pt-12">
        <div className="mx-auto max-w-[42rem]">
          <Link
            href="/courses"
            className="text-[13px] font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            Back to Courses
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            <span>{guide.topic}</span>
            <span>{guide.readTime}</span>
          </div>

          <h1 className="mt-4 font-display text-[2.5rem] leading-[1.08] tracking-[-0.03em] text-neutral-950 sm:text-[3.25rem] lg:text-[3.6rem]">
            {guide.title}
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-8 text-neutral-600">
            {guide.description}
          </p>

          <div className="mt-8 flex items-center justify-between gap-4 border-y border-neutral-200 py-5">
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-neutral-950">
                By {guide.author}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{guide.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container py-8 sm:py-10">
        <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-[1.5rem] border border-black/5 bg-neutral-200 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]">
          <Image
            src={guide.cover}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </div>
    </header>
  );
}
