import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  Callout,
  CodeBlock,
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Arrays and ArrayLists in Java',
  description:
    'A beginner-friendly walkthrough of Java arrays and ArrayLists by Jaimee Grubb of the North Garland H.S. Chapter.',
};

export default function ArraysGuidePage() {
  return (
    <ArticlePage slug="arrays-and-arraylists-in-java">
        <p>
          When I was first learning to code I found arrays to be one of the most
          confusing parts of programming, so hopefully this can help new
          programmers understand it better. The code examples below are
          specifically for Java.
        </p>

        <GuideSection title="What are Arrays?">
          <p>
            An array is a collection of values that have a fixed size, like a
            list of ingredients. Specifically for Java, arrays can only consist
            of one data type. So if you wanted to make an array that has all
            your friends&apos; names in it, then the data type would need to be
            a string.
          </p>
        </GuideSection>

        <GuideSection title="How to Create an Array">
          <p>
            There are multiple ways to create an array. It doesn&apos;t matter
            which way you create the array. There are specific situations where
            one approach may be better than the other, but it is up to your
            preference.
          </p>

          <h3>Example 1</h3>
          <CodeBlock>{`int[] ages = {12, 20, 16, 32};`}</CodeBlock>
          <ul>
            <li>
              <strong>int</strong> — data type
            </li>
            <li>
              <strong>[]</strong> — brackets show that we are creating an array
            </li>
            <li>
              <strong>ages</strong> — array name
            </li>
            <li>
              <strong>{'{12, 20, 16, 32}'}</strong> — the elements stored in the
              array
            </li>
          </ul>

          <CodeBlock>{`String[] names = {"Sarah", "Jerry", "Lilian"};`}</CodeBlock>
          <Callout>
            This is best when you already know what values need to be stored in
            the array.
          </Callout>

          <h3>Example 2</h3>
          <CodeBlock>{`String[] names = new String[5];`}</CodeBlock>
          <ul>
            <li>
              <strong>String</strong> — data type
            </li>
            <li>
              <strong>[]</strong> — brackets show that we are creating an array
            </li>
            <li>
              <strong>names</strong> — array name
            </li>
            <li>
              <strong>new String[5]</strong> — create a new string array with
              the size of 5 (the 5 elements will be null / 0 / false / 0.0)
            </li>
          </ul>
          <Callout>
            This is best when you only know how many values need to be stored in
            the array.
          </Callout>

          <p>To store a value in the array created, use:</p>
          <CodeBlock>{`names[0] = "Sarah";
names[4] = "Jerry";`}</CodeBlock>
          <p>
            This is how to store a value at a specific place in an array. The
            first element (index) in an array is at 0, not 1. So in this example
            the last value would be at 4 instead of 5.
          </p>
        </GuideSection>

        <GuideSection title="Ways to use an Array">
          <p>
            You can print an array, find the length of an array, find the value
            at an index, or set a value at an index (which was seen above).
          </p>
          <p>Given the following array for the examples below:</p>
          <CodeBlock>{`int[] array = {12, 20, 16, 32};`}</CodeBlock>

          <h3>Print an array</h3>
          <CodeBlock>{`System.out.println(array);`}</CodeBlock>

          <h3>Print a value at a certain index</h3>
          <CodeBlock>{`System.out.println(array[0]);`}</CodeBlock>

          <h3>Find the length of an array</h3>
          <CodeBlock>{`System.out.println(array.length);`}</CodeBlock>
        </GuideSection>

        <GuideSection title="Can you Add or Remove Elements in an Array?">
          <p>
            No. If you wanted to add or remove elements in a list, then you
            should use an ArrayList instead. Because arrays have fixed sizes,
            you can&apos;t add an element at an index higher than the set size.
            ArrayLists, on the other hand, don&apos;t have a set size, so
            elements can be added or removed.
          </p>
        </GuideSection>

        <GuideSection title="How to create an ArrayList">
          <p>
            To use ArrayLists you need to import the package{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              java.util.ArrayList
            </code>{' '}
            at the beginning of your code.
          </p>
          <CodeBlock>{`ArrayList<String> names = new ArrayList<String>();
names.add("Kenzie");
names.add("Ayden");`}</CodeBlock>
          <ul>
            <li>
              <strong>ArrayList&lt;String&gt;</strong> — ArrayList object of a
              string data type
            </li>
            <li>
              <strong>names</strong> — the name of the ArrayList
            </li>
            <li>
              <strong>new ArrayList&lt;String&gt;()</strong> — create a new
              object of the ArrayList
            </li>
            <li>
              <strong>add</strong> — adds an element to the end of the ArrayList
            </li>
          </ul>
          <p>
            ArrayLists use the wrapper class to define the data types.
          </p>
          <CodeBlock>{`ArrayList<Integer> list = new ArrayList<Integer>();`}</CodeBlock>

          <div className="mt-6 overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Data type</th>
                  <th>Wrapper Class</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>int</td>
                  <td>Integer</td>
                </tr>
                <tr>
                  <td>double</td>
                  <td>Double</td>
                </tr>
                <tr>
                  <td>boolean</td>
                  <td>Boolean</td>
                </tr>
                <tr>
                  <td>char</td>
                  <td>Character</td>
                </tr>
                <tr>
                  <td>float</td>
                  <td>Float</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="Ways to use an ArrayList">
          <p>Uses the ArrayList in the above example.</p>

          <h3>Get an element at a specific index</h3>
          <CodeBlock>{`names.get(0);`}</CodeBlock>

          <h3>Find the length of the ArrayList</h3>
          <CodeBlock>{`names.size();`}</CodeBlock>

          <h3>Changing an element</h3>
          <CodeBlock>{`names.set(1, "Olivia");`}</CodeBlock>

          <h3>Removing an element</h3>
          <CodeBlock>{`names.remove(0);`}</CodeBlock>

          <h3>Remove all the elements</h3>
          <CodeBlock>{`names.clear();`}</CodeBlock>
        </GuideSection>

        <div className="guide-citations">
          <h2>Citations</h2>
          <ul>
            <li>
              Research / Information:{' '}
              <a
                href="https://www.w3schools.com/programming/prog_arrays.php"
                target="_blank"
                rel="noreferrer"
              >
                What Is an Array? — W3Schools
              </a>
              . Accessed 30 Jan. 2026.
            </li>
            <li>
              <a
                href="https://www.geeksforgeeks.org/java/arrays-in-java/"
                target="_blank"
                rel="noreferrer"
              >
                Arrays in Java — GeeksforGeeks
              </a>
              . 30 Sept. 2025.
            </li>
            <li>
              <a
                href="https://www.w3schools.com/java/java_arraylist.asp"
                target="_blank"
                rel="noreferrer"
              >
                Java ArrayList — W3Schools
              </a>
              . Accessed 30 Jan. 2026.
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
