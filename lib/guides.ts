export type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  code?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  type: 'Article' | 'Essay';
  stream: 'articles' | 'research';
  topic: string;
  author: string;
  role: string;
  readTime: string;
  cover: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: 'designing-reliable-ai-features',
    title: 'Designing Reliable AI Features',
    description:
      'A practical framework for shipping AI into products without sacrificing trust, latency budgets, or operational clarity.',
    type: 'Article',
    stream: 'articles',
    topic: 'Artificial Intelligence',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '9 min read',
    cover: '/covers/cover-deeplearning.jpg',
    sections: [
      {
        title: 'Start with the decision, not the model',
        paragraphs: [
          'Most failed AI features begin with a model search. Strong teams begin with a decision: what should change for the user if the system is right, and what should happen if it is wrong.',
          'Write the acceptance criteria as product behavior. For example, “suggest three follow-up actions with a confidence threshold” is clearer than “integrate an LLM.”',
        ],
        bullets: [
          'Define the user-visible outcome first',
          'List failure modes and fallbacks before choosing a model',
          'Decide what must stay deterministic versus probabilistic',
        ],
      },
      {
        title: 'Keep a thin, measurable interface',
        paragraphs: [
          'Wrap model calls behind a stable interface with typed inputs and outputs. That boundary lets you swap providers, add caching, and run evaluation suites without rewriting product code.',
          'Instrument every call with latency, token cost, and quality scores. If you cannot measure quality, you cannot improve it.',
        ],
        code: `type SuggestActionsInput = {
  context: string;
  maxActions: number;
};

type SuggestActionsResult = {
  actions: string[];
  confidence: number;
  model: string;
};`,
      },
      {
        title: 'Ship with guardrails',
        paragraphs: [
          'Reliable AI is boring by design. Rate limits, prompt versioning, content filters, and human escalation paths should be default infrastructure, not last-minute patches.',
          'Treat prompts and evaluation datasets as versioned artifacts. When quality regresses, you need to know what changed.',
        ],
      },
    ],
  },
  {
    slug: 'apis-that-survive-production',
    title: 'APIs That Survive Production',
    description:
      'How to design HTTP APIs that stay clear under load, evolve safely, and remain pleasant for client teams to consume.',
    type: 'Article',
    stream: 'articles',
    topic: 'Software Engineering',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '8 min read',
    cover: '/covers/cover-java.jpg',
    sections: [
      {
        title: 'Contracts over cleverness',
        paragraphs: [
          'A production API is a long-lived contract. Prefer explicit resource names, predictable error shapes, and pagination that clients can implement once.',
          'Avoid leaking internal storage details into URLs. Clients should depend on meaning, not on how you store rows today.',
        ],
      },
      {
        title: 'Errors clients can act on',
        paragraphs: [
          'Return structured errors with a stable code, a human message, and optional field details. Clients should branch on codes, not on English sentences.',
        ],
        code: `{
  "error": {
    "code": "rate_limited",
    "message": "Too many requests. Retry after 30 seconds.",
    "retryAfter": 30
  }
}`,
      },
      {
        title: 'Version with intent',
        paragraphs: [
          'Not every change needs a new version. Additive fields are usually safe. Breaking response shapes or removing fields should force a version bump and a migration window.',
          'Document deprecations with dates. Silence is how integrations rot.',
        ],
      },
    ],
  },
  {
    slug: 'systems-thinking-for-backends',
    title: 'Systems Thinking for Backends',
    description:
      'Latency, queues, and failure domains explained as design tools rather than after-the-fact incidents.',
    type: 'Article',
    stream: 'articles',
    topic: 'Systems',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '10 min read',
    cover: '/covers/cover-algorithms.jpg',
    sections: [
      {
        title: 'Draw the failure domains',
        paragraphs: [
          'Before optimizing queries, map what fails together. If your API, cache, and worker share one database credential pool, you do not have three systems. You have one.',
          'Separate read paths from write paths when traffic or risk profiles diverge. Isolation is often cheaper than clever retries.',
        ],
      },
      {
        title: 'Queues as pressure valves',
        paragraphs: [
          'Synchronous work that can wait should often wait. Queues absorb spikes, protect databases, and make retries explicit.',
          'Every queued job needs an idempotency key and a dead-letter strategy. Without those, queues become silent data loss.',
        ],
      },
      {
        title: 'Observe the path, not the box',
        paragraphs: [
          'Dashboards that show CPU on one machine rarely explain user pain. Trace the request path end to end and alert on customer-facing SLOs.',
        ],
      },
    ],
  },
  {
    slug: 'evaluating-machine-learning-models',
    title: 'Evaluating Machine Learning Models',
    description:
      'A clear approach to offline metrics, online experiments, and the gap between leaderboard scores and product value.',
    type: 'Article',
    stream: 'articles',
    topic: 'Machine Learning',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '7 min read',
    cover: '/covers/cover-loops.jpg',
    sections: [
      {
        title: 'Pick metrics that match the job',
        paragraphs: [
          'Accuracy is rarely enough. Ranking systems need ranking metrics. Fraud systems need precision at a fixed recall. Generative systems need task-specific rubrics plus human review samples.',
          'If stakeholders cannot explain why a metric moved, it will not drive good decisions.',
        ],
      },
      {
        title: 'Offline is necessary, online is decisive',
        paragraphs: [
          'Offline evaluation catches regressions quickly. Online experiments confirm whether users and revenue actually improve.',
          'Hold out realistic traffic segments. Models that win on yesterday’s data can still fail on tomorrow’s distribution shift.',
        ],
      },
      {
        title: 'Keep a living evaluation set',
        paragraphs: [
          'Curate hard cases from production failures and edge reports. Static benchmarks go stale the moment users change behavior.',
        ],
      },
    ],
  },
  {
    slug: 'practical-security-for-builders',
    title: 'Practical Security for Builders',
    description:
      'Security habits that fit inside normal engineering work: threat modeling, secrets, auth, and safe defaults.',
    type: 'Article',
    stream: 'articles',
    topic: 'Security',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '8 min read',
    cover: '/covers/cover-sorting.jpg',
    sections: [
      {
        title: 'Threat model the feature',
        paragraphs: [
          'Ask who might abuse the feature, what they gain, and which controls reduce that risk. Ten minutes of structured questions beats a month of vague worry.',
          'Document assumptions. Security reviews fail when teams disagree about what “authenticated” means.',
        ],
      },
      {
        title: 'Secrets and identity',
        paragraphs: [
          'Never ship secrets in client bundles or commit them to git. Prefer short-lived credentials, environment injection, and secret managers.',
          'Authorize on the server with explicit checks. UI hiding is not access control.',
        ],
      },
      {
        title: 'Safe defaults scale better than heroics',
        paragraphs: [
          'Template repositories with logging, auth middleware, and dependency scanning already enabled will outpace one-off audits.',
        ],
      },
    ],
  },
  {
    slug: 'product-sense-for-engineers',
    title: 'Product Sense for Engineers',
    description:
      'How engineers can shape roadmap quality by framing problems, measuring outcomes, and saying no with alternatives.',
    type: 'Essay',
    stream: 'articles',
    topic: 'Product',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '6 min read',
    cover: '/covers/cover-fundamentals.jpg',
    sections: [
      {
        title: 'Translate requests into problems',
        paragraphs: [
          '“Add a dashboard” is a solution. “Operators cannot see why jobs fail within five minutes” is a problem. Engineers who restate requests as problems unlock better options.',
        ],
      },
      {
        title: 'Define done with outcomes',
        paragraphs: [
          'Ship criteria should include a measurable outcome: reduced support tickets, faster activation, fewer incidents. If success is only “merged to main,” the feature is unfinished.',
        ],
      },
      {
        title: 'Offer a smaller path',
        paragraphs: [
          'Saying no without a next step stalls teams. Propose a thinner slice that validates the riskiest assumption first.',
        ],
      },
    ],
  },
  {
    slug: 'emerging-interfaces-for-agents',
    title: 'Emerging Interfaces for Agents',
    description:
      'Patterns for building agentic workflows that stay inspectable, interruptible, and useful in real products.',
    type: 'Essay',
    stream: 'articles',
    topic: 'Emerging Tech',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '9 min read',
    cover: '/covers/cover-ai-entertainment.jpg',
    sections: [
      {
        title: 'Make plans visible',
        paragraphs: [
          'Users trust agents more when they can see the proposed steps before irreversible actions. Show the plan, allow edits, then execute.',
        ],
      },
      {
        title: 'Separate tools from judgment',
        paragraphs: [
          'Give agents constrained tools with clear side effects. Keep high-risk actions behind confirmation. Logs should show which tool ran, with which arguments, and why.',
        ],
      },
      {
        title: 'Design for interruption',
        paragraphs: [
          'Long-running agent work must be pauseable and resumable. People leave mid-flow. State should survive that reality.',
        ],
      },
    ],
  },
  {
    slug: 'data-contracts-that-teams-keep',
    title: 'Data Contracts That Teams Keep',
    description:
      'How shared schemas, ownership, and change policies keep analytics and product pipelines from quietly breaking each other.',
    type: 'Article',
    stream: 'articles',
    topic: 'Data',
    author: 'Coding Central',
    role: 'Editorial',
    readTime: '7 min read',
    cover: '/covers/cover-space.jpg',
    sections: [
      {
        title: 'Name an owner',
        paragraphs: [
          'Every critical dataset needs a named owner and a support channel. Orphan tables become landmines.',
        ],
      },
      {
        title: 'Version the schema',
        paragraphs: [
          'Publish expected fields, types, and freshness guarantees. Breaking changes require notice and a dual-write or dual-read window when consumers are many.',
        ],
      },
      {
        title: 'Test the contract in CI',
        paragraphs: [
          'Schema checks in continuous integration catch accidental renames before they reach dashboards and models.',
        ],
      },
    ],
  },
];

export const guides = articles;
export type Guide = Article;

export const articleTopics = Array.from(
  new Set(articles.map((article) => article.topic))
).sort();

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getGuide(slug: string) {
  return getArticle(slug);
}

export function getArticlesByStream(stream: Article['stream']) {
  return articles.filter((article) => article.stream === stream);
}

export function getArticlesByTopic(topic: string) {
  return articles.filter((article) => article.topic === topic);
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return [];

  const sameTopic = articles.filter(
    (article) => article.slug !== slug && article.topic === current.topic
  );
  const others = articles.filter(
    (article) => article.slug !== slug && article.topic !== current.topic
  );

  return [...sameTopic, ...others].slice(0, limit);
}
