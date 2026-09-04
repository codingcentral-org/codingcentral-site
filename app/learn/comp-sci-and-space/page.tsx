import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Comp Sci and Space',
  description:
    'How computer science supports space exploration, by Jaimee Grubb of the North Garland H.S. Chapter.',
};

export default function CompSciAndSpacePage() {
  return (
    <ArticlePage slug="comp-sci-and-space">
        <p>
          When you really think about it, computer science and space exploration
          started not that long ago. The 1960s was the well-known use of
          computer science in the space industry because of the program for
          Apollo 11. Back then you had to write code on paper and punch holes
          through cards to create programs. There is a lot more to how code was
          created than those two things — it was a tedious and long process.
        </p>

        <p>
          Computer science is an extremely necessary part of the space industry
          and helps it develop more over the years. Some ways computer science
          is used include:
        </p>
        <ul>
          <li>Weather forecasting</li>
          <li>Data generating</li>
          <li>Rocket trajectory</li>
          <li>Simulations</li>
          <li>Robotics</li>
          <li>Spacecrafts</li>
        </ul>

        <GuideSection title="Weather forecasting">
          <p>
            Computers help create weather predictions based off of their given
            data and make calculations. Computers were first used in weather
            forecasting in 1955 and were only correct about 30% of the time, but
            as of 2024 that has improved to around 60%.
          </p>
        </GuideSection>

        <GuideSection title="Rocket trajectory">
          <p>
            Computer science helped speed up and deal with complex tasks like
            calculating rocket trajectory. A NASA public affairs specialist,
            Phillip Hargrove, was a trajectory analyst and ensured that rockets
            launched at the correct trajectory, speed, and direction with
            computer science. He used computers to do the math needed to make
            the correct decisions.
          </p>
        </GuideSection>

        <GuideSection title="Simulations">
          <p>
            There are different simulations that are made to help train
            astronauts and show mission performance predictions. Computer
            science is used to create these simulations to help astronauts and
            avoid possible dangers. These simulations also give data on how
            different vehicles work.
          </p>
        </GuideSection>

        <GuideSection title="Robotics">
          <p>
            Robots are being sent to space, so something has to control and
            create them. If you didn&apos;t guess — it&apos;s computers.
            Computers and programs are necessary to create robots and collect
            data through them.
          </p>
        </GuideSection>

        <GuideSection title="Data">
          <p>
            Storing data is an important part of computer science in the space
            industry because of how much information is needed to keep missions
            safe and increase our knowledge of the vast unknown. This allows
            scientists to keep up with new information without being overwhelmed
            by it. Computer science is also used to sort and find patterns in
            data, allowing information to be maintained in the best way
            possible.
          </p>
        </GuideSection>

        <GuideSection title="Spacecraft">
          <p>
            Computer science is used to calculate things like fuel for the
            spacecraft and other values that help engineers design spacecraft.
            It is also used to create automated tests that check whether a
            spacecraft can endure different environments, vacuums, and
            vibrations.
          </p>
        </GuideSection>

        <GuideSection title="Conclusion">
          <p>
            Computer science plays a major role in the success of space
            exploration and is used in many different areas to ensure safe
            missions, collect data, and create spacecraft.
          </p>
        </GuideSection>

        <div className="guide-citations">
          <h2>Citations</h2>
          <ul>
            <li>
              <a
                href="https://www.planetary.org/articles/computing-in-space-exploration-history"
                target="_blank"
                rel="noreferrer"
              >
                Computing in Space Exploration History — The Planetary Society
              </a>
              . Accessed 22 Mar. 2026.
            </li>
            <li>
              <a
                href="https://explorespace360.com/the-role-of-computers-in-space-exploration/"
                target="_blank"
                rel="noreferrer"
              >
                The Role of Computers in Space Exploration — ExploreSpace360
              </a>
              . Accessed 22 Mar. 2026.
            </li>
            <li>
              <a
                href="https://www.nasa.gov/reference/jsc-simulation-modeling/"
                target="_blank"
                rel="noreferrer"
              >
                Simulation &amp; Modeling — NASA
              </a>
              . 22 Jan. 2026.
            </li>
            <li>
              <a
                href="https://www.nasa.gov/centers-and-facilities/kennedy/build-your-computer-science-skills-with-nasa/"
                target="_blank"
                rel="noreferrer"
              >
                Build Your Computer Science Skills with NASA — NASA
              </a>
              . 5 June 2024.
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
