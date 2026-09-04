import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Deep Learning vs. Machine Learning',
  description:
    'A comparison of machine learning and deep learning by Sarah George of the North Garland H.S. Chapter.',
};

export default function DeepLearningVsMachineLearningPage() {
  return (
    <ArticlePage slug="deep-learning-vs-machine-learning">
        <p>
          Machine learning and deep learning are closely related, but they are
          not the same thing. Machine learning is a broader field focused on
          algorithms that learn from data. Deep learning is a specialized
          approach inside that field, built around neural networks with many
          layers.
        </p>

        <GuideSection title="What is Machine Learning?">
          <p>
            Machine learning focuses on the development of algorithms and models
            that enable computers to learn from data and make predictions or
            decisions without being explicitly programmed for every case. Key
            characteristics include:
          </p>
          <ul>
            <li>
              <strong>Feature engineering:</strong> Experts often manually
              select or design the most useful features from the input data so
              the algorithm can make accurate predictions.
            </li>
            <li>
              <strong>Supervised and unsupervised learning:</strong> In
              supervised learning, models train on labeled examples with known
              outcomes. In unsupervised learning, algorithms look for patterns
              and structure in unlabeled data.
            </li>
            <li>
              <strong>Broad applicability:</strong> Machine learning shows up in
              image and speech recognition, natural language processing,
              recommendation systems, and many other domains.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="What is Deep Learning?">
          <p>
            Deep learning is a subset of machine learning that trains artificial
            neural networks inspired by the structure and functioning of the
            human brain. Key characteristics include:
          </p>
          <ul>
            <li>
              <strong>Automatic feature extraction:</strong> Deep learning can
              pull useful features out of raw data on its own, reducing the need
              for hand-built feature engineering.
            </li>
            <li>
              <strong>Deep neural networks:</strong> These models use multiple
              layers of interconnected nodes (neurons), which helps them learn
              complex hierarchical representations of data.
            </li>
            <li>
              <strong>High performance:</strong> Deep learning has been
              especially strong in computer vision, natural language processing,
              and speech recognition — often outperforming more traditional
              machine learning approaches in those areas.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Side-by-side comparison">
          <table>
            <thead>
              <tr>
                <th>Machine Learning</th>
                <th>Deep Learning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A subset of AI</td>
                <td>A subset of machine learning</td>
              </tr>
              <tr>
                <td>Can train on smaller data sets</td>
                <td>Requires large amounts of data</td>
              </tr>
              <tr>
                <td>Needs more human intervention to correct and learn</td>
                <td>Learns on its own from environment and past mistakes</td>
              </tr>
              <tr>
                <td>Shorter training and often lower accuracy</td>
                <td>Longer training and often higher accuracy</td>
              </tr>
              <tr>
                <td>Makes simpler, more linear correlations</td>
                <td>Makes non-linear, complex correlations</td>
              </tr>
              <tr>
                <td>Can train on a CPU</td>
                <td>Often needs a specialized GPU to train</td>
              </tr>
            </tbody>
          </table>
        </GuideSection>

        <GuideSection title="Takeaway">
          <p>
            If you need a flexible approach that can work with smaller datasets
            and more human-guided features, classic machine learning may be the
            right fit. If the problem involves huge amounts of raw data and
            complex patterns — like vision or speech — deep learning is often
            the stronger tool.
          </p>
        </GuideSection>

        <div className="guide-citations">
          <h2>Resources</h2>
          <ul>
            <li>
              <a
                href="https://www.coursera.org/articles/ai-vs-deep-learning-vs-machine-learning-beginners-guide"
                target="_blank"
                rel="noreferrer"
              >
                Coursera — AI vs. Deep Learning vs. Machine Learning
              </a>
            </li>
            <li>
              <a
                href="https://levity.ai/blog/difference-machine-learning-deep-learning"
                target="_blank"
                rel="noreferrer"
              >
                Levity — Difference between machine learning and deep learning
              </a>
            </li>
            <li>
              <a
                href="https://www.zendesk.com/blog/machine-learning-and-deep-learning/"
                target="_blank"
                rel="noreferrer"
              >
                Zendesk — Machine learning and deep learning
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-14">
          <Link href="/learn" className="btn-secondary">
            ← Back to Articles
          </Link>
        </div>
    </ArticlePage>
  );
}
