import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'How Recommendation Algorithms Work',
  description:
    'How recommendation algorithms sort endless options into relevant suggestions, by Bisrat Andrew of the North Garland H.S. Chapter.',
};

export default function HowRecommendationAlgorithmsWorkPage() {
  return (
    <ArticlePage slug="how-recommendation-algorithms-work">
        <p>
          Recommendation algorithms form an essential part of every user
          experience today. The algorithmic processes analyze user interactions
          and compare them with the millions of interactions of other users for
          making predictions.
        </p>
        <p>
          From the viewpoint of logic, the recommendation algorithm aims at
          reducing the number of options and organizing them. In other words,
          instead of offering endless amounts of possibilities, the computer
          sorts out all available items according to relevance.
        </p>

        <GuideSection title="Machine learning at the core">
          <p>
            Machine learning serves as the core of every recommendation
            algorithm. This way, recommendation algorithms recognize patterns,
            rather than strictly adhering to pre-programmed rules. For instance,
            if a user frequently plays upbeat tracks late in the evening, then
            they will get recommended similar tunes at the same time of day.
          </p>
        </GuideSection>

        <GuideSection title="Two common approaches">
          <p>
            There are two common approaches to recommendation algorithms.
            Collaborative filtering relies on finding out what similar people
            found interesting. If some songs, videos, or products gained much
            attention from students sharing some traits with a particular person,
            then this individual would receive recommendations related to these
            items as well. In contrast, content-based filtering is all about
            finding similar characteristics of items. For example, if a user
            regularly listens to songs performed by rock stars, then their
            recommendations will include similar content.
          </p>
        </GuideSection>

        <GuideSection title="Speed and scale">
          <p>
            In addition, every recommendation algorithm must work fast. There is
            simply no point in comparing each available option to each registered
            user in real time since there are thousands or even millions of
            options and millions of users. Therefore, most recommendation
            algorithms operate in two phases: gathering the list of items to be
            considered and prioritizing these recommendations.
          </p>
        </GuideSection>

        <GuideSection title="Learning from interaction">
          <p>
            User interaction becomes crucial for learning the recommendation
            algorithms. Whenever you press play, finish watching a video, switch
            off the current track, or purchase something, you teach the software
            to offer something more similar or more interesting to you.
          </p>
          <p>
            For instance, Spotify uses listening and content information to
            propose suitable songs, playlists, or artists to its user base.
            Similarly, Snapchat uses ranking algorithms for its Discover feed but
            tries to keep its users&apos; streams diverse.
          </p>
        </GuideSection>

        <GuideSection title="Why it matters">
          <p>
            Recommendation algorithms significantly contribute to user experience
            in terms of making technology more accessible to everyone. They help
            people save time, avoid dealing with numerous irrelevant options, and
            find content they might otherwise miss. On the other hand,
            recommendation algorithms influence the exposure to particular
            content. That is why every platform is continually improving its
            recommendation engines.
          </p>
          <p>
            To sum up, a recommendation algorithm may be described as a
            pattern-finding device.
          </p>
        </GuideSection>

        <div className="guide-citations">
          <h2>Citations</h2>
          <ul>
            <li>
              <a
                href="https://aerospike.com/blog/recommendation-engines-how-they-work/"
                target="_blank"
                rel="noreferrer"
              >
                Recommendation Engines: How They Work — Aerospike
              </a>
            </li>
            <li>
              <a
                href="https://www.scientificamerican.com/article/how-recommendation-algorithms-work-and-why-they-may-miss-the-mark/"
                target="_blank"
                rel="noreferrer"
              >
                How Recommendation Algorithms Work — Scientific American
              </a>
            </li>
            <li>
              <a
                href="https://help.snapchat.com/hc/en-us/articles/8961631424020-How-We-Rank-Content-on-Discover"
                target="_blank"
                rel="noreferrer"
              >
                How We Rank Content on Discover — Snapchat
              </a>
            </li>
            <li>
              <a
                href="https://www.brookings.edu/articles/how-do-recommender-systems-work-on-digital-platforms-social-media-recommendation-algorithms/"
                target="_blank"
                rel="noreferrer"
              >
                How Do Recommender Systems Work on Digital Platforms? — Brookings
              </a>
            </li>
            <li>
              <a
                href="https://www.nvidia.com/en-us/glossary/recommendation-system/"
                target="_blank"
                rel="noreferrer"
              >
                Recommendation System — NVIDIA Glossary
              </a>
            </li>
            <li>
              <a
                href="https://d3.harvard.edu/platform-rctom/submission/discover-weekly-how-spotify-is-changing-the-way-we-consume-music/"
                target="_blank"
                rel="noreferrer"
              >
                Discover Weekly: How Spotify Is Changing the Way We Consume Music — Harvard
              </a>
            </li>
            <li>
              <a
                href="https://warrington.ufl.edu/news/how-valuable-are-online-product-recommendations-to-consumers/"
                target="_blank"
                rel="noreferrer"
              >
                How Valuable Are Online Product Recommendations to Consumers? — UF Warrington
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
