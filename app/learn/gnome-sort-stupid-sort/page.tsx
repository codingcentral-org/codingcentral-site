import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  Callout,
  CodeBlock,
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Gnome Sort / "Stupid" Sort',
  description:
    'A guide to Gnome Sort by Thai Nguyen of the North Garland H.S. Chapter.',
};

export default function GnomeSortPage() {
  return (
    <ArticlePage slug="gnome-sort-stupid-sort">
        <GuideSection title="What is it">
          <p>
            Although it is sometimes referred to as the &quot;stupid sort,&quot;
            the Gnome sort is a legitimate comparison-based sorting algorithm.
            In essence, the sort is very simplistic: a given list is sequenced
            through, one element at a time. If the current element is less than
            the last element, they swap positions.
          </p>
        </GuideSection>

        <GuideSection title="History">
          <p>
            Before it was known as the Gnome Sort, Iranian computer scientist
            Hamid Sarbazi-Azad originally described it as &quot;Stupid Sort&quot;
            in a 2000 university newsletter. Due to discontent with its academic
            wording, Dutch computer scientist Dick Grune later renamed it based
            on a Dutch garden gnome (tuinkabouter) sorting flower pots. In his
            visualization, the gnome only looks at 2 &quot;pots.&quot; If they
            are in order, he steps forward; if not, he steps back and
            re-evaluates the previous pots.
          </p>
        </GuideSection>

        <GuideSection title="Problem in Implementation">
          <p>
            Unlike the more commonly used Bubble or Insertion Sort, Gnome Sort
            can be implemented in a single while loop and no nested structures.
            While it does lack the nested loop found in more popular sorting
            algorithms, its time complexity — a mathematical way to describe how
            much time an algorithm takes to run as the size of its input
            increases — of O(n²) is incredibly abysmal. This is caused by the
            fact that the &quot;gnome&quot; must constantly move backwards in
            large unordered lists.
          </p>

          <CodeBlock>{`procedure gnomeSort(a[]):
    pos := 0
    while pos < length(a):
        if pos == 0 or a[pos] >= a[pos-1]:
            pos := pos + 1
        else:
            swap a[pos] and a[pos-1]
            pos := pos - 1`}</CodeBlock>

          <p>
            Despite the speed flaws that it has, the Gnome Sort is very
            space-efficient, being classified as an O(1) auxiliary space
            algorithm. Gnome Sort utilizes an in-place system, meaning it
            rearranges the elements directly within the original array, not
            needing to create a &quot;working&quot; array to hold sorted data
            (for example, Merge Sort). In addition, the auxiliary space used by
            Gnome Sort is constant because it uses minimal variables, only
            needing:
          </p>
          <ul>
            <li>
              One index variable (usually called{' '}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
                pos
              </code>{' '}
              or{' '}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
                i
              </code>
              ) to track the gnome&apos;s position
            </li>
            <li>One temporary variable used to swap elements</li>
          </ul>
          <p>
            This distinct advantage is, of course, counteracted by the time
            needed per operation. However, this still makes it attractive to
            environments where memory / RAM is a big limiting factor.
          </p>

          <CodeBlock>{`def gnome_sort(arr):
    index = 0
    while index < len(arr):
        if index == 0:
            index = index + 1
        if arr[index] >= arr[index - 1]:
            index = index + 1
        else:
            # The swap: moving the "pot" back one step
            arr[index], arr[index - 1] = arr[index - 1], arr[index]
            index = index - 1
    return arr

# Example usage:
my_list = [34, 2, 10, -9]
print(gnome_sort(my_list))`}</CodeBlock>
        </GuideSection>

        <GuideSection title="Comparing Performance">
          <p>
            In many studies, it is referred to as a hybrid that behaves similar
            to an Insertion Sort but uses the pairwise swap mechanism of the
            Bubble Sort. The Gnome Sort sees its most performative usage when
            the list is already sorted, allowing the &quot;gnome&quot; to simply
            walk all the way to the end without ever stepping back.
          </p>
          <p>
            In a reverse-sorted list, however, the Gnome Sort really shows why
            it&apos;s called the &quot;Stupid Sort.&quot; This is the worst
            possible scenario as the number of swaps is maximized. Empirical
            studies show that Bubble Sort actually outperforms Gnome Sort as
            data size increases in worst-case scenarios.
          </p>
        </GuideSection>

        <GuideSection title="Why Study It Then?">
          <p>
            This sorting algorithm is a prime example of a pathological
            algorithm — one that is logically simple but computationally
            expensive. While it is absolutely useless for large datasets, it is
            a useful teaching tool for understanding the way index movement
            affects algorithms, serving as a baseline that often leads to other,
            more effective algorithms.
          </p>
          <Callout>
            Additional material:{' '}
            <a
              href="https://go.algorithmexamples.com/web/sorting/gnome_sort.html"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Gnome Sort visualization
            </a>
          </Callout>
        </GuideSection>

        <div className="guide-citations">
          <h2>Works Cited</h2>
          <ul>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Gnome_sort"
                target="_blank"
                rel="noreferrer"
              >
                Gnome sort — Wikipedia
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/In-place_algorithm"
                target="_blank"
                rel="noreferrer"
              >
                In-place algorithm — Wikipedia
              </a>
            </li>
            <li>
              <a
                href="https://dickgrune.com/Programs/gnomesort.html"
                target="_blank"
                rel="noreferrer"
              >
                Gnome Sort — Dick Grune
              </a>
            </li>
            <li>
              <a
                href="https://go.algorithmexamples.com/web/sorting/gnome_sort.html"
                target="_blank"
                rel="noreferrer"
              >
                Gnome Sort visualization — Algorithm Examples
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link href="/learn" className="btn-secondary">
            ← Back to Articles
          </Link>
        </div>
    </ArticlePage>
  );
}
