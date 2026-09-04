import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Role of AI in the Entertainment Industry',
  description:
    'How AI is reshaping entertainment — and the concerns that come with it — by Henry Pham of the North Garland H.S. Chapter.',
};

export default function RoleOfAiInEntertainmentPage() {
  return (
    <ArticlePage slug="role-of-ai-in-the-entertainment-industry">
        <p>
          Over the last couple of years, social media platforms have seen a
          large uprising in the use of AI. This has evolved in the form of many
          things such as deepfakes, AI chatbots, and more. Companies have also
          used them for recommendation algorithms and to develop expansive
          projects. Recently, AI has grown massively unpopular amongst the
          common people and AI has been receiving backlash due to its effects on
          the environment and the creative job market. While AI has
          revolutionized means of making content, it does raise many ethical and
          privacy concerns.
        </p>

        <GuideSection title="How has AI been used?">
          <p>
            With the growth of AI, many forms of content have developed on a
            whole new level. For example, popular video games like Mario Kart and
            Fallout 3 have introduced dynamic game difficulty balancing which
            uses AI to balance the parameters of the game in real time based on
            the user&apos;s performance. Additionally, NPCs (non-playable
            characters) have grown to where they can display a variety of
            behaviors based on the game&apos;s conditions compared to their
            previously written dialogues. An example of this would be in Red Dead
            Redemption 2, contributing to its high reputation and immersive
            experience. Massive companies have also used AI to push the
            boundaries of video games to create hyper-realistic environments.
            These developments in technology allow the game to adapt to users&apos;
            wants and needs and reduce repetitiveness.
          </p>

          <p>
            Creators have started using AI as a creative partner. Creators
            without the resources to expand their projects can use AI to create
            character designs, scripts, soundtracks, and more. This lets them
            develop assets and a guideline for how they want their project to
            go. According to a PR Newswire article, 76% of creators use it for
            ideation and 58% for caption and copywriting support. This also
            affects smaller businesses, allowing them to develop marketing
            campaigns on social media.
          </p>

          <p>
            New types of content have also been generated with AI. As more
            people become interested in AI, videos describing AI takeover or
            general AI experimentation have increased. Straight AI-generated
            content, while receiving backlash, has grown popular such as AI Fruit
            Love Island on TikTok. Deepfakes involving celebrities&apos; faces
            and voices have grown in popularity like the fight scene between Brad
            Pitt and Tom Cruise. Another use has been to create scenes with
            famous actors like the trending Star Wars fan AI films. AI chatbots
            have also gained traction. This allows users to recreate their
            favorite characters and simulate a conversation with them, or to just
            recreate a scenario they&apos;ve imagined. Short-form content that
            involves an AI voiceover over summaries of already created content
            or comedic scenarios has risen.
          </p>

          <p>
            Large social media companies have been using AI to maximize
            engagement with AI recommendation algorithms and personalization.
            This allows them to see your interactions and find or even generate
            content you would be most interested in. An example of this would be
            Spotify creating AI-curated playlists to match the user&apos;s
            listening habits, which have shown to boost engagement. Companies
            have also generated promotional material with AI such as the
            &quot;Holidays are Coming&quot; ad by Coca-Cola which was fully
            AI-generated. Companies have also used AI facial recognition to
            prevent minors from watching mature content.
          </p>
        </GuideSection>

        <GuideSection title="Backlash and Concerns">
          <p>
            AI-generated content has recently received much backlash, gaining
            the term &quot;AI slop.&quot; It refers to lazily put-together
            content made by many creators in hopes of views or even money. It
            references how previous hardworking creators have turned to AI with
            hopes of expediting the process. Environmental concerns are also
            brought up with the heavy use of water to cool down AI systems.
            Economic problems like the rising price of coding software and the
            loss of creative jobs have also created backlash. Creative jobs have
            always been held in high regard due to the passion and hardship that
            usually accompanies them, but AI-generated content has increased
            competition and raised the bar due to the quality it can create.
          </p>

          <p>
            Deepfakes and hyperrealistic content have led to the spread of
            misinformation such as the AI video of massive snowfall in Russia.
            This confusion is especially popular amongst older generations who
            have trouble distinguishing AI-generated content from real content.
            This has led to many scams targeting the elderly. Chatbots have also
            been dangerous due to the dependency they can create. Many develop
            relationships with AI that they believe to be true — in extreme
            cases, for example, marrying them. These relationships can lead to
            harmful situations where AI can encourage reckless behaviors.
          </p>

          <p>
            Use of AI has also faced legal concerns. Social media companies have
            been using AI to enhance personalization, but this involves the
            collection and usage of sensitive user data. Often, this is done with
            a lack of transparency and an explicit lack of consent, raising many
            privacy concerns. Additionally, generative AI models are trained on
            large amounts of copyrighted material, raising many concerns
            regarding intellectual property. Many deepfake projects have been
            fought in the courts so that artists and actors can have control over
            their digital identities.
          </p>

          <p>
            Ultimately, while AI in creative industries has faced massive
            criticism, there is no denying the positive effects it has had on
            raising scales of production and supporting means of creative
            expression. This does not, however, erase the negatives that come
            with the use of AI. Many should see the danger of overreliance on AI,
            especially when it comes to easily influenced ages. Overall, we
            should stay aware of how AI is used, especially with how it has
            invaded many fan-favorite titles.
          </p>
        </GuideSection>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link href="/learn" className="btn-secondary">
            ← Back to Articles
          </Link>
        </div>
    </ArticlePage>
  );
}
