import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  Callout,
  CodeBlock,
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Teaching Tech to the Next Generation: Basic Video Game Design',
  description:
    'A beginner Code.org Game Lab walkthrough by Danny Le of the North Garland H.S. Chapter.',
};

export default function BasicVideoGameDesignPage() {
  return (
    <ArticlePage slug="basic-video-game-design-process-javascript">
        <Callout>
          Game link:{' '}
          <a
            href="https://studio.code.org/projects/gamelab/9seVfHXezDgnbf4LFTir6MS-0EOnMFEUGb837z_L614"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
          >
            Space Invaders-style Code.org Game Lab project
          </a>
        </Callout>

        <p>
          Want to start making your own games? You don&apos;t need any fancy
          software — just Code.org and some JavaScript. I will be explaining the
          video game creation process in Code.org&apos;s Game Lab IDE with a
          focus on prototyping and learning. Games and starting a game can be
          complex, but hopefully this article can help you get an idea of how to
          actually start making games. There is a lot of simplification here, so
          take everything with a grain of salt.
        </p>

        <GuideSection title="1. Brainstorm and define your project">
          <p>
            Firstly, you want to start brainstorming and defining your project.
            What type of game do you want to make? Look at your favorite games
            and look at all the types of genres. For your first game, you may
            want to create classic games like Space Invaders, Pong, Pac-Man, a
            simple platformer, etc. Once you have your idea, define your game in
            a couple of sentences.
          </p>
          <p>
            My game definition was: &quot;A Space Invaders-like game where
            players control a spaceship that can shoot aliens. If they get past
            you, then you lose health. Once your health gets to zero, you lose.
            You get 3 lives, but there are ways to get up to 5. The goal for the
            user is to get to the highest score possible, with maybe bosses to
            finish the game.&quot;
          </p>
          <p>
            For demonstration purposes, I decided to make a Space Invaders game
            where you shoot aliens to protect the Earth. Don&apos;t start too
            ambitiously; your first project should be reasonable and not too
            time-consuming. After that, start preparing for your game by making a
            plan. Be sure to keep the user / player in mind when creating your
            game. Also, remember that this is brainstorming, meaning you can
            always change ideas, merge ideas, or build on top of them. It is also
            highly recommended to draw your vision so you don&apos;t forget it
            and have a good idea of the sprites (characters) you&apos;ll make.
          </p>
        </GuideSection>

        <GuideSection title="2. Open Code.org Game Lab">
          <p>
            Secondly, you want to open Code.org and open Game Lab. This is a
            free, online, web-based code editor. Code.org allows a large quantity
            of easy-to-learn and use libraries (premade code) in primarily
            JavaScript. Make an account in Code.org and scroll down until you
            see custom projects and Game Lab. Click on Game Lab.
          </p>
          <p>
            Once opened, you&apos;ll see a coding area, &quot;toolbox,&quot;
            preview area, animation tab, code tab, sprite library, and more. Game
            Lab handles all the technical setup and helps you start coding
            immediately. To start, you should look around the toolbox and get a
            good idea of what each function does. Additionally, if you open my
            game and click &quot;remix&quot; at the top right, you can edit my
            code and look through the animations, sprites, code, functions, and
            more. Use this to understand how each function (a block of code that
            performs a purpose) works. This may seem a little daunting at first,
            but it eventually starts to make sense. Be sure to explore all the
            different functions inside the toolbox and learn what you&apos;ll
            need to use.
          </p>
        </GuideSection>

        <GuideSection title="3. Create your sprites and variables">
          <p>
            Thirdly, you want to create your sprites and variables. Sprites are
            your moving characters, entities — basically anything visual on your
            screen. If you want to start immediately, you can use Code.org&apos;s
            built-in sprites as I did, or make your own. Click on the
            &quot;animation&quot; tab to create your sprites. Make a new sprite
            and be sure to use some conventional coding practices that use
            camelCase or dashes to name your variables and sprites.
          </p>
          <p>
            I started with basic sprites such as Spaceship, Spaceship_Reloading,
            Broken_Spaceship, Bullet, Enemy_1, Enemy_2, Enemy_3, Enemy_4, and
            Enemy_5. Sprites won&apos;t appear without code. This brings me to
            the next topic: variables. Variables help track things and allow you
            to use logic within your code. Additionally, they are necessary to
            make your sprites appear.
          </p>
          <p>
            To create your sprite, define a variable and use the{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              createSprite(x,y)
            </code>{' '}
            function from the toolbox (Game Lab&apos;s library). For example:
          </p>
          <CodeBlock>{`var Player = createSprite(200, 350);
Player.setAnimation("Spaceship");`}</CodeBlock>
          <p>
            Additionally, you can adjust color, size, position, direction, and
            more with functions under the &quot;Sprites&quot; tab in the toolbox.
            Each sprite needs its own variable to track and control. Before we
            move on, be sure to create variables for numbers that you might track
            later on (hp, score, enemy health, etc). Once these variables are
            created, you now have the basis for your game.
          </p>
        </GuideSection>

        <GuideSection title="4. Use the draw() loop">
          <p>
            Fourthly, you want to create the{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              draw()
            </code>{' '}
            function that repeats 60 times a second (60 fps). This should already
            be present in your code, but the draw function is the main loop of
            the program. This is the core of your game and continuously
            &quot;draws&quot; your game and updates it. Without this function,
            your game will not run.
          </p>
        </GuideSection>

        <GuideSection title="5. Add user controls and limitations">
          <p>
            Fifthly, you want to add user controls and limitations. It is common
            to use W to move up, A to move left, S to move down, or D to move
            right. This can be done through the{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              keyDown
            </code>{' '}
            function in the &quot;World&quot; tab of the toolbox. You can use if
            statements to detect if that key is being pressed:
          </p>
          <CodeBlock>{`if (keyDown("a")) {
  Sprite.x = Sprite.x - 4;
}`}</CodeBlock>
          <p>
            Also, you may need to have other sprites move as well.{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              sprite.velocityX
            </code>{' '}
            and{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              sprite.velocityY
            </code>{' '}
            will continuously move the sprite across the X and Y axis. Setting{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              sprite.velocityX = 2
            </code>{' '}
            will move the sprite from left to right, and setting{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              sprite.velocityY = 2
            </code>{' '}
            will move it up and down.
          </p>
          <p>
            From this, you should have sprites that can move on their own and a
            player character that can move in four directions. In my game, I have
            limited the sprites to moving down and the player from left to right.
            My game consists of shooting control with the space bar. This is done
            by creating 5 bullet sprites that fire depending on the{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              BulletLimit
            </code>{' '}
            variable. This variable increases each time space is pressed, and
            several if statements check and send bullets 1–5 depending on the
            BulletLimit. These bullets are sent to the player&apos;s position and
            are fired. This may be a little complicated, so having a sprite be
            able to move in all four directions is recommended for the first
            step.
          </p>
        </GuideSection>

        <GuideSection title="6. Add collisions and sprite interactions">
          <p>
            Sixthly, you want to add collisions and sprite interactions. Use the
            tools under the Sprite tab in the toolbox to manage your sprite
            interactions. You may want something to happen when one sprite
            collides with another. My bullet sprite has interactions with the
            enemies that make their health decrease. You can add as many
            individual interactions as you wish, like platforms that slide your
            sprite off or power-ups that make you faster. These interactions
            spice up your game and give it a sense of challenge.
          </p>
          <p>
            I can&apos;t really guide you completely here because each game has
            different interactions, so it&apos;s up to you to find out how each
            sprite interacts with each other. My main interaction is the
            interaction between the bullets and the enemy. I check:
          </p>
          <CodeBlock>{`if (Bullet_1.isTouching(Enemy_1)) {
  // decrease the enemy health by one
}`}</CodeBlock>
          <p>
            I repeat this for each bullet and each enemy.
          </p>
        </GuideSection>

        <GuideSection title="7. Reflect on your prototype">
          <p>
            Lastly, you have a rough prototype of your game. Reflect on what you
            have learned and how you can change it. At this stage, you might have
            a small character and platform or a small shooter that does damage to
            enemies. Ask yourself what feels fun, what feels confusing, and what
            you might want to add next. More importantly, ask yourself what you
            learned.
          </p>
          <p>
            Building new things is always a learning experience, and you
            shouldn&apos;t expect success from your first try. You can build onto
            this game with new levels, enemies, multiple players, sound effects,
            powerups, and more — or you can build a brand new project using what
            you have learned with this one. It is ultimately up to you.
          </p>
          <p>
            The most important part of game development is taking your idea and
            creating something with it, no matter how simple. With each project,
            you learn more about programming, design, and problem-solving. So the
            next time you want to make another game, you will be more
            knowledgeable and more successful than before.
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
