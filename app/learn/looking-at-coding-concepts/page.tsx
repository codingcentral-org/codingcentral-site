import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  Callout,
  CodeBlock,
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Looking at Coding Concepts',
  description:
    'An introduction to message passing and variables by Henry Pham of the North Garland H.S. Chapter.',
};

export default function LookingAtCodingConceptsPage() {
  return (
    <ArticlePage slug="looking-at-coding-concepts">
        <p>
          Do you remember the last time you used any bit of technology? It
          probably wasn&apos;t more than a minute ago. Coding, while a vital
          part of our world, remains unknown to a vast majority of the
          population. Technology runs rampant and the progress of technology has
          become our new norm. Something as simple as jumping up and down in a
          video game can be complicated to replicate in code. In this article,
          you&apos;ll learn about important coding concepts that show the
          complicated side of simple actions.
        </p>

        <GuideSection title="Message Passing">
          <p>
            Message passing is when one object of your code sends code to
            another object of your code. This usually precipitates an action. To
            put it in simple terms, it&apos;s like when you swing a bat against
            a ball and the ball flies backwards. This is used in the outside
            world such as pressing keys on a device to type something up or
            motion-detected sensors triggering an alarm. Let&apos;s look at a
            real coding example in Scratch.
          </p>

          <h3>Message Passing Demonstration</h3>
          <p>
            In the Scratch project linked below, the cat moves according to the
            areas on the screen. When the up arrow is clicked, the cat faces up
            and moves in that direction.
          </p>
          <p>
            The code shows that when the arrow is clicked, a message —
            <strong> Up</strong> — is broadcasted to all sprites (message
            passing in Scratch). When the cat receives the message, it looks in
            the up direction and moves 10 steps.
          </p>
          <Callout>
            Try the Scratch demo:{' '}
            <a
              href="https://scratch.mit.edu/projects/1272435518/editor/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Message Passing project
            </a>
          </Callout>
        </GuideSection>

        <GuideSection title="Variables">
          <p>
            Variables are placeholders that can store information. They have a
            name, and in most programming languages, a data type. To put it
            another way, it&apos;s like the amount of money in your bank
            account. It&apos;s not at a set value. It is used in computing like
            the set password for a computer and the amount of storage space on
            your phone. Let&apos;s look at how it can be used in the programming
            language Java.
          </p>

          <CodeBlock>{`int number = 0;
String animal = "cat";

System.out.println(number);
System.out.println(animal);

number = number + 1;
animal = "dog";

System.out.println(number);
System.out.println(animal);`}</CodeBlock>

          <p>
            The code starts off by declaring the variables, or in other words
            setting an initial value for new variables. The{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              number
            </code>{' '}
            variable is set to zero and the{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              animal
            </code>{' '}
            variable is set to cat. This is shown as the variables are then
            printed to the output. Then, the number variable is increased by 1
            and the animal variable is set to dog. This is shown by the last two
            outputs.
          </p>

          <Callout>
            Expected output:
            <CodeBlock>{`0
cat
1
dog`}</CodeBlock>
          </Callout>
        </GuideSection>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link href="/learn" className="btn-secondary">
            ← Back to Articles
          </Link>
        </div>
    </ArticlePage>
  );
}
