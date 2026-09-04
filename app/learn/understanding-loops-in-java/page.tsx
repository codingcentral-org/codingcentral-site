import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  Callout,
  CodeBlock,
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Understanding Loops in Java',
  description:
    'A beginner guide to Java loops and a number-guessing mini project by Bisrat Andrew of the North Garland H.S. Chapter.',
};

export default function UnderstandingLoopsInJavaPage() {
  return (
    <ArticlePage slug="understanding-loops-in-java">
        <p>
          Ever wonder how video game characters move smoothly instead of
          teleporting everywhere? That&apos;s mostly because of loops.
        </p>
        <p>
          Loops let computers repeat actions without programmers writing the
          same line of code over and over again. Without loops, games, apps, and
          basically all software would be a mess.
        </p>

        <GuideSection title="What Is a Loop?">
          <p>A loop is just a way to repeat code. An iteration.</p>
          <p>In Java, loops keep running as long as a condition is true.</p>
          <p>
            Example: imagine you&apos;re a teacher with 25 students. You
            wouldn&apos;t want to type &quot;call on student&quot; 25 different
            times. With a loop, you write it once and tell the computer to
            repeat it 25 times. Way easier.
          </p>
        </GuideSection>

        <GuideSection title="Types of Loops in Java">
          <p>Java has three main loops.</p>

          <h3>For Loops</h3>
          <p>Use a for loop when you know how many times something should run.</p>
          <CodeBlock>{`for (int i = 1; i <= 5; i++) {
    System.out.println("Number: " + i);
}`}</CodeBlock>
          <p>
            This starts at 1, prints the number, adds 1 each time, and stops
            once it hits 5.
          </p>

          <h3>While Loops</h3>
          <p>
            A while loop keeps running as long as the condition is true. This is
            good when you don&apos;t know how many times the loop will run.
          </p>
          <CodeBlock>{`int attempts = 0;
while (attempts < 3) {
    System.out.println("Attempt number: " + attempts);
    attempts++;
}`}</CodeBlock>

          <h3>Do-While Loops</h3>
          <p>A do-while loop always runs at least once, no matter what.</p>
          <CodeBlock>{`int number = 0;
do {
    System.out.println("This runs at least once!");
    number++;
} while (number < 0);`}</CodeBlock>
          <p>
            Even though the condition is false, the code still runs once.
          </p>
        </GuideSection>

        <GuideSection title="Where Loops Are Used">
          <p>Loops are everywhere:</p>
          <ul>
            <li>Games: movement, physics, and player input</li>
            <li>Apps: refreshing feeds and checking notifications</li>
            <li>Data: going through tons of information</li>
            <li>Servers: staying on 24/7 waiting for users</li>
          </ul>
        </GuideSection>

        <GuideSection title="Common Mistakes">
          <p>
            <strong>Infinite loops:</strong> forgetting to update the variable
          </p>
          <CodeBlock>{`int i = 0;
while (i < 10) {
    System.out.println(i);
}`}</CodeBlock>
          <Callout>
            This loop never updates <code>i</code>, so it never ends.
          </Callout>
          <ul>
            <li>
              <strong>Off-by-one errors:</strong> starting or ending at the
              wrong number
            </li>
            <li>
              <strong>Using the wrong loop:</strong> sometimes a while loop is
              just clearer than a for loop
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Mini Project: Number Guessing Game">
          <p>
            A number guessing game is a simple way to use loops. The program
            picks a random number, and you keep guessing until you get it right
            or run out of tries.
          </p>
          <p>It uses:</p>
          <ul>
            <li>While loops to keep the game running</li>
            <li>For loops to count attempts</li>
            <li>Do-while loops to make sure input actually makes sense</li>
          </ul>
          <CodeBlock>{`import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        boolean playAgain = true;

        System.out.println(" WELCOME TO THE NUMBER GUESSING GAME ");
        System.out.println("Learn Loops While Having Fun!");
        System.out.println();

        do {
            playGame(scanner, random);

            String response;
            do {
                System.out.print("\\nWould you like to play again? (yes/no): ");
                response = scanner.nextLine().trim().toLowerCase();

                if (!response.equals("yes") && !response.equals("no")) {
                    System.out.println("Please enter 'yes' or 'no'.");
                }
            } while (!response.equals("yes") && !response.equals("no"));

            playAgain = response.equals("yes");

            if (playAgain) {
                System.out.println("\\n" + "=".repeat(40) + "\\n");
            }

        } while (playAgain);

        System.out.println("Thanks for playing! Goodbye!");
        scanner.close();
    }

    public static void playGame(Scanner scanner, Random random) {
        int secretNumber = random.nextInt(100) + 1;
        int maxAttempts = 7;
        int attempts = 0;
        boolean hasGuessed = false;

        System.out.println("I'm thinking of a number between 1 and 100");
        System.out.println("You have " + maxAttempts + " attempts to guess it!");
        System.out.println();

        while (attempts < maxAttempts && !hasGuessed) {
            attempts++;

            System.out.print("Attempts remaining: ");
            for (int i = 0; i < (maxAttempts - attempts + 1); i++) {
                System.out.print(" ");
            }
            System.out.println("(" + (maxAttempts - attempts + 1) + " left)");

            int guess = getValidGuess(scanner, attempts);

            if (guess == secretNumber) {
                hasGuessed = true;
                displayVictory(attempts, maxAttempts);
            } else if (guess < secretNumber) {
                System.out.println("Too low! Try a higher number.");
                giveHint(secretNumber, guess);
            } else {
                System.out.println("Too high! Try a lower number.");
                giveHint(secretNumber, guess);
            }

            System.out.println();
        }

        if (!hasGuessed) {
            System.out.println("You've run out of attempts!");
            System.out.println("The number was:" + secretNumber);
        }
    }

    public static int getValidGuess(Scanner scanner, int attemptNumber) {
        int guess = -1;

        do {
            System.out.print("Attempt #" + attemptNumber + " - Enter your guess: ");

            if (scanner.hasNextInt()) {
                guess = scanner.nextInt();
                scanner.nextLine();

                if (guess < 1 || guess > 100) {
                    System.out.println("Enter a number between 1 and 100!");
                    guess = -1;
                }
            } else {
                System.out.println("That's not a valid number! Try again.");
                scanner.nextLine();
            }
        } while (guess == -1);

        return guess;
    }

    public static void giveHint(int secretNumber, int guess) {
        int difference = Math.abs(secretNumber - guess);

        if (difference <= 5) {
            System.out.println("You're very close! Almost there!");
        } else if (difference <= 15) {
            System.out.println("You're getting warm!");
        } else if (difference <= 30) {
            System.out.println("You're cold!");
        } else {
            System.out.println(" You're freezing! Way off!");
        }
    }

    public static void displayVictory(int attempts, int maxAttempts) {
        System.out.println("CONGRATULATIONS!");
        System.out.println("You guessed the number!");
        System.out.println();

        System.out.print("Your Rating: ");

        if (attempts <= 3) {
            System.out.print("AMAZING! ");
        } else if (attempts <= 5) {
            System.out.print("GREAT! ");
        } else if (attempts <= 6) {
            System.out.print("GOOD! ");
        } else {
            System.out.print("Nice! ");
        }

        System.out.println("(" + attempts + "/" + maxAttempts + " attempts)");
    }
}`}</CodeBlock>
        </GuideSection>

        <div className="guide-citations">
          <h2>Citations</h2>
          <ul>
            <li>
              <a
                href="https://www.geeksforgeeks.org/java/loops-in-java/"
                target="_blank"
                rel="noreferrer"
              >
                Java Loops — GeeksforGeeks
              </a>
              . 20 Mar. 2017.
            </li>
            <li>
              <a
                href="https://www.w3schools.com/java/java_for_loop.asp"
                target="_blank"
                rel="noreferrer"
              >
                Java for Loop — W3Schools
              </a>
              . 2020.
            </li>
            <li>
              <a
                href="https://www.w3schools.com/java/java_while_loop.asp"
                target="_blank"
                rel="noreferrer"
              >
                Java While Loop — W3Schools
              </a>
            </li>
            <li>
              <a
                href="https://www.w3schools.com/java/java_while_loop_do.asp"
                target="_blank"
                rel="noreferrer"
              >
                Java Do/While Loop — W3Schools
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
