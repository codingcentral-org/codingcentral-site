export type Article = {
  slug: string;
  title: string;
  description: string;
  type: 'Article' | 'Essay';
  stream: 'articles' | 'research';
  topic: string;
  author: string;
  chapter: string;
  readTime: string;
  cover: string;
};

export const articles: Article[] = [
  {
    slug: 'arrays-and-arraylists-in-java',
    title: 'Arrays and ArrayLists in Java',
    description:
      'A beginner-friendly walkthrough of Java arrays and ArrayLists, written for students who found arrays confusing at first.',
    type: 'Article',
    stream: 'articles',
    topic: 'Java',
    author: 'Jaimee Grubb',
    chapter: 'North Garland H.S. Chapter',
    readTime: '8 min read',
    cover: '/covers/cover-java.jpg',
  },
  {
    slug: 'comp-sci-and-space',
    title: 'Comp Sci and Space',
    description:
      'How computer science supports space exploration, from Apollo-era programming to modern simulations, robotics, and data.',
    type: 'Essay',
    stream: 'articles',
    topic: 'Computer Science',
    author: 'Jaimee Grubb',
    chapter: 'North Garland H.S. Chapter',
    readTime: '6 min read',
    cover: '/covers/cover-space.jpg',
  },
  {
    slug: 'looking-at-coding-concepts',
    title: 'Looking at Coding Concepts',
    description:
      'An introduction to message passing and variables, using Scratch and Java examples to show the complicated side of simple actions.',
    type: 'Article',
    stream: 'articles',
    topic: 'Fundamentals',
    author: 'Henry Pham',
    chapter: 'North Garland H.S. Chapter',
    readTime: '7 min read',
    cover: '/covers/cover-fundamentals.jpg',
  },
  {
    slug: 'role-of-ai-in-the-entertainment-industry',
    title: 'Role of AI in the Entertainment Industry',
    description:
      'How AI is reshaping games, content creation, and social platforms, and the ethical, privacy, and creative concerns that come with it.',
    type: 'Essay',
    stream: 'articles',
    topic: 'Artificial Intelligence',
    author: 'Henry Pham',
    chapter: 'North Garland H.S. Chapter',
    readTime: '9 min read',
    cover: '/covers/cover-ai-entertainment.jpg',
  },
  {
    slug: 'understanding-loops-in-java',
    title: 'Understanding Loops in Java',
    description:
      'Why loops keep games and apps running smoothly, how for, while, and do-while loops work, and a mini number-guessing project.',
    type: 'Article',
    stream: 'articles',
    topic: 'Java',
    author: 'Bisrat Andrew',
    chapter: 'North Garland H.S. Chapter',
    readTime: '10 min read',
    cover: '/covers/cover-loops.jpg',
  },
  {
    slug: 'how-recommendation-algorithms-work',
    title: 'How Recommendation Algorithms Work',
    description:
      'A clear look at how platforms sort endless options into relevant recommendations using machine learning and user interaction.',
    type: 'Essay',
    stream: 'articles',
    topic: 'Algorithms',
    author: 'Bisrat Andrew',
    chapter: 'North Garland H.S. Chapter',
    readTime: '6 min read',
    cover: '/covers/cover-algorithms.jpg',
  },
  {
    slug: 'gnome-sort-stupid-sort',
    title: 'Gnome Sort / "Stupid" Sort',
    description:
      'A look at the deceptively simple Gnome Sort: how it works, why it is slow, and why it is still worth studying.',
    type: 'Article',
    stream: 'articles',
    topic: 'Algorithms',
    author: 'Thai Nguyen',
    chapter: 'North Garland H.S. Chapter',
    readTime: '7 min read',
    cover: '/covers/cover-sorting.jpg',
  },
  {
    slug: 'teaching-technology-tic-tac-toe',
    title: 'Teaching Technology to the Next Generation: Tic-Tac-Toe',
    description:
      'Build a complete Tic-Tac-Toe game in Python while learning initialization, loops, state management, and error handling.',
    type: 'Article',
    stream: 'articles',
    topic: 'Python',
    author: 'Quang Duong',
    chapter: 'North Garland H.S. Chapter',
    readTime: '12 min read',
    cover: '/covers/cover-python-game.jpg',
  },
  {
    slug: 'basic-video-game-design-process-javascript',
    title: 'Teaching Tech to the Next Generation: Basic Video Game Design',
    description:
      'A beginner walkthrough of brainstorming, sprites, the draw loop, controls, and collisions in Code.org Game Lab with JavaScript.',
    type: 'Article',
    stream: 'articles',
    topic: 'JavaScript',
    author: 'Danny Le',
    chapter: 'North Garland H.S. Chapter',
    readTime: '10 min read',
    cover: '/covers/cover-gamedesign.jpg',
  },
  {
    slug: 'deep-learning-vs-machine-learning',
    title: 'Deep Learning vs. Machine Learning',
    description:
      'A clear comparison of machine learning and deep learning, how they differ in data needs, feature work, training, and performance.',
    type: 'Essay',
    stream: 'articles',
    topic: 'Artificial Intelligence',
    author: 'Sarah George',
    chapter: 'North Garland H.S. Chapter',
    readTime: '5 min read',
    cover: '/covers/cover-deeplearning.jpg',
  },
];

export const guides = articles;
export type Guide = Article;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getGuide(slug: string) {
  return getArticle(slug);
}

export function getArticlesByStream(stream: Article['stream']) {
  return articles.filter((article) => article.stream === stream);
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
