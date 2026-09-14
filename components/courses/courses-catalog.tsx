'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Article } from '@/lib/guides';

type CoursesCatalogProps = {
  courses: Article[];
  topics: string[];
};

export function CoursesCatalog({ courses, topics }: CoursesCatalogProps) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<string>('All');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesTopic = topic === 'All' || course.topic === topic;
      if (!matchesTopic) return false;
      if (!deferredQuery) return true;

      const haystack = [
        course.title,
        course.description,
        course.topic,
        course.author,
        course.role,
        ...course.sections.map((section) => section.title),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(deferredQuery);
    });
  }, [courses, deferredQuery, topic]);

  const clearFilters = () => {
    setQuery('');
    setTopic('All');
  };

  const hasFilters = query.trim().length > 0 || topic !== 'All';

  return (
    <div>
      <section className="border-b border-neutral-200 bg-white">
        <div className="site-container space-y-5 py-6 sm:py-7">
          <div className="relative mx-auto max-w-2xl">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses by topic, title, or keyword"
              aria-label="Search courses"
              className="h-12 w-full rounded-full border border-neutral-200 bg-[#f7f7f4] pl-11 pr-12 text-[15px] text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', ...topics].map((item) => {
              const active = topic === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTopic(item)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.01em] transition',
                    active
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'border border-neutral-200 bg-[#f7f7f4] text-neutral-600 hover:border-neutral-300 hover:bg-white hover:text-neutral-950'
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-neutral-500">
            <p>
                  {filtered.length} {filtered.length === 1 ? 'course' : 'courses'}
              {topic !== 'All' ? ` in ${topic}` : ''}
              {deferredQuery ? ` matching "${query.trim()}"` : ''}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[13px] font-medium text-neutral-950 transition hover:opacity-70"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container max-w-4xl">
          {filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-neutral-200 bg-white px-6 py-16 text-center">
              <p className="font-display text-2xl tracking-[-0.02em] text-neutral-950">
                No courses found
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Try another keyword or category. You can also clear filters and browse the full
                catalog.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Reset catalog
              </button>
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2">
              {filtered.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group block rounded-3xl outline-none transition focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/5 bg-neutral-100">
                    <Image
                      src={course.cover}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                    <span>{course.topic}</span>
                    <span>{course.readTime}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl leading-snug tracking-[-0.02em] text-neutral-950 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4">
                    {course.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                    {course.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
