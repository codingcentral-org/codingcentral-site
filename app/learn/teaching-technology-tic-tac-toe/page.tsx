import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/guides/article-page';
import {
  Callout,
  CodeBlock,
  GuideSection,
} from '@/components/guides/guide-article';

export const metadata: Metadata = {
  title: 'Teaching Technology to the Next Generation: Tic-Tac-Toe',
  description:
    'A beginner Python guide to building Tic-Tac-Toe by Quang Duong of the North Garland H.S. Chapter.',
};

export default function TicTacToeGuidePage() {
  return (
    <ArticlePage slug="teaching-technology-tic-tac-toe">
        <p>
          Have you ever wondered how your favorite games are made? Computers
          cannot read English as humans do. Instead, they read machine code,
          composed of strings of binary 1&apos;s and 0&apos;s that stand for
          instructions that the computer can understand. Programmers write code
          that goes through a compiler or interpreter application that translates
          it into machine code.
        </p>
        <p>
          In this article, we will write a simple game: Tic-Tac-Toe. Don&apos;t
          worry if you have never written any lines of code before; by the end of
          the article, you will have a working game and will understand the
          underlying principles of how it works.
        </p>

        <GuideSection title="How to Make Tic-Tac-Toe">
          <h3>Initialization</h3>
          <p>
            To start, when making a program, you need to define your starting
            variables and properties. This concept is known as initialization. In
            Tic-Tac-Toe, you would need to define a board, a list of win
            conditions, game state variables, and input handler variables.
          </p>
          <CodeBlock>{`#initialization
board = [(i+1) for i in range(9)]

winconditions = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]

win = False
turn = "X"
turns = 0
choice = None`}</CodeBlock>

          <p>
            First, we need to create the Tic-Tac-Toe 3 x 3 (9-square) grid. We
            can do this by making a list that is 9 elements long.
          </p>
          <p>
            In Python, you can create a list of any length using{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              {'list = [<Value> for i in range(num)]'}
            </code>
            , which creates a list composed of <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">&lt;Value&gt;</code> with length{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">num</code>.
          </p>
          <p>
            So, to create a board of 9 squares, you can do:
          </p>
          <CodeBlock>{`board = [(i+1) for i in range(9)]`}</CodeBlock>
          <p>
            which creates a board list of{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              [1, 2, 3, 4, 5, 6, 7, 8, 9]
            </code>{' '}
            to represent every tile on the board.
          </p>
          <p>
            After that, we need to define every possible win condition in
            Tic-Tac-Toe. We can do this using a list of every winning 3-tile
            combination:
          </p>
          <CodeBlock>{`winconditions = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]`}</CodeBlock>
          <p>
            This list contains the list indexes of every 3 in a row, 3 in a
            column, and 3 in a diagonal that are possible in a 3 x 3 Tic-Tac-Toe
            grid.
          </p>
          <p>
            It is also important to define important game state variables inside
            the initialization part of our program:
          </p>
          <CodeBlock>{`win = False
turn = "X"
turns = 0
choice = None`}</CodeBlock>
        </GuideSection>

        <GuideSection title="Displaying the board">
          <p>
            For a user to be able to run our program, it is important to display
            the board.
          </p>
          <CodeBlock>{`print("Tic-Tac-Toe")

def displayBoard():
    print(str(board[0]) + " | " + str(board[1]) + " | " + str(board[2]))
    print("--+---+--")
    print(str(board[3]) + " | " + str(board[4]) + " | " + str(board[5]))
    print("--+---+--")
    print(str(board[6]) + " | " + str(board[7]) + " | " + str(board[8]))`}</CodeBlock>
          <p>
            The first print statement simply outputs &quot;Tic-Tac-Toe&quot; to
            the console.
          </p>
          <p>
            Throughout the game, you will need to output the Tic-Tac-Toe board
            multiple times. To avoid having excessively long code, it is
            recommended to define a function that handles displaying it.
          </p>
          <p>
            This code displays the current state of the board, showing which grid
            squares are taken by checking their corresponding index in the list.
          </p>
          <Callout>
            List elements can be accessed by putting the name of the list,
            followed by brackets, with the target index inside the brackets like
            this:{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              list_name[6]
            </code>
            . Therefore,{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              board[0]
            </code>{' '}
            would check the 1st item (or index 0) in the board list.{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              str()
            </code>{' '}
            simply changes the type of the data inside the brackets to a string
            so that we can concatenate it using{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              +
            </code>
            .
          </Callout>
        </GuideSection>

        <GuideSection title="The Game Loop">
          <p>
            Now, this is starting to get interesting. The game logic needs to run
            every time a player makes a move. Therefore, it is important to
            create a simple state machine so that the game runs until there is a
            winner or there is a draw.
          </p>
          <CodeBlock>{`#gameloop
while not (win or turns == 9):

    displayBoard()
    print("Type the corresponding number for where you want to move!")

    #safe input
    while True:
        try:
            choice = int(input("Player-" + turn + " Turn:"))
        except ValueError:
            print("Invalid choice")
        else:
            if choice-1 in range(9):
                if str(board[choice-1]) not in ["X", "O"]:
                    turns += 1
                    break
                else:
                    print("Invalid choice")
            else:
                print("Invalid choice")

    #update board
    board[choice-1] = turn

    #check win condition
    for condition in winconditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] == turn:
            win = True
            break

    #change turn
    if not (win or turns == 9):
        if turn == "X":
            turn = "O"
        elif turn == "O":
            turn = "X"`}</CodeBlock>
          <p>
            To run until certain conditions are met, we can use a while loop. In
            this case, we need to run until there is a winner (
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              win == True
            </code>
            ), or a draw (
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              turns == 9
            </code>
            ).
          </p>
          <p>
            Next, we update the board with the function we defined earlier,
            prompt the players for their move, and protect the input so the
            program does not crash.
          </p>
        </GuideSection>

        <GuideSection title="What is a try-except-else statement?">
          <p>
            A try-except-else statement allows us to protect our code against
            errors. You put code that might produce an error inside the
            &quot;try,&quot; respond to specific errors inside the
            &quot;except,&quot; and run code that you only want to run if there
            are no errors inside the &quot;else.&quot;
          </p>
          <p>
            Because of the way we prompt the user, we can only accept numbers. So
            if a player typed a word or a decimal, we would get a ValueError, and
            the program would crash. Furthermore, if a player types a number that
            does not exist on the board, we could get an IndexError later on when
            we attempt to access items from the board list whose index does not
            exist.
          </p>
          <p>
            We can use try-except-else by putting the error-prone input code
            inside the &quot;try,&quot; and protecting against the ValueError by
            checking for it in the &quot;except.&quot; When we encounter the
            error, we can output &quot;Invalid choice.&quot;
          </p>
          <p>
            There are also logical errors that do not necessarily cause crashes.
            We still need to check if the input&apos;s corresponding board index
            is not occupied, and if the input number is from 1 to 9. Nest this
            block of code in a{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              while True
            </code>{' '}
            loop so that we keep checking for invalid inputs until the player
            enters an allowed input.
          </p>
        </GuideSection>

        <GuideSection title="Controlling Player Turns and Checking If a Player Won or Drew">
          <CodeBlock>{`#update board
board[choice-1] = turn

#check win condition
for condition in winconditions:
    if board[condition[0]] == board[condition[1]] == board[condition[2]] == turn:
        win = True
        break

#change turn
if not (win or turns == 9):
    if turn == "X":
        turn = "O"
    elif turn == "O":
        turn = "X"`}</CodeBlock>
          <p>
            As you probably know, Tic-Tac-Toe has 2 players, &quot;X&quot; and
            &quot;O,&quot; who alternate turns. Recall that we set the turn to
            &quot;X&quot; in the initialization part of our code. We need to
            update the board list to show that the player whose turn it was has
            control of that square:
          </p>
          <CodeBlock>{`board[choice-1] = turn`}</CodeBlock>
          <p>
            Also, it is important to check if a player has won yet. We can do
            this by checking all of our win conditions and seeing if a player
            occupies all squares with indices that match any case of the
            wincondition 3-pairs. If a player has met one of the winning
            conditions, we can end the game loop by setting{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              win
            </code>{' '}
            to{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              True
            </code>
            .
          </p>
          <p>
            However, if the game has not ended yet, it is important to advance
            the game by changing whose turn it is. All we need to do is switch
            between &quot;X&quot; and &quot;O,&quot; so we can just use an
            if-then-elif statement to switch between the 2 states.
          </p>
        </GuideSection>

        <GuideSection title="After the Game Ends">
          <p>
            When the game ends, there are still a couple of things we need to do
            to wrap up our program. We still need to display the final state of
            the board, and whether the game is a draw or if somebody has won.
          </p>
          <CodeBlock>{`displayBoard()
if win:
    print(str(turn) + " IS THE WINNER!")
else:
    print("DRAW!")`}</CodeBlock>
          <p>
            All we need to do is call our{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px]">
              displayBoard
            </code>{' '}
            function again and use an if statement to check if there is a winner.
          </p>
        </GuideSection>

        <GuideSection title="Conclusion">
          <p>
            Congratulations! You have just coded a game. Even seemingly simple
            games such as Tic-Tac-Toe require many lines of code and many
            important concepts in computer science, such as initialization, state
            management, iteration, and error handling. Even relatively small
            projects are important in learning the building blocks of programming
            to take on harder projects in the future.
          </p>
        </GuideSection>

        <GuideSection title="Complete Code">
          <CodeBlock>{`#initialization
board = [(i+1) for i in range(9)]

winconditions = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]

win = False
turn = "X"
turns = 0
choice = None

print("Tic-Tac-Toe")

def displayBoard():
    print(str(board[0]) + " | " + str(board[1]) + " | " + str(board[2]))
    print("--+---+--")
    print(str(board[3]) + " | " + str(board[4]) + " | " + str(board[5]))
    print("--+---+--")
    print(str(board[6]) + " | " + str(board[7]) + " | " + str(board[8]))

#gameloop
while not (win or turns == 9):

    displayBoard()
    print("Type the corresponding number for where you want to move!")

    #safe input
    while True:
        try:
            choice = int(input("Player-" + turn + " Turn:"))
        except ValueError:
            print("Invalid choice")
        else:
            if choice-1 in range(9):
                if str(board[choice-1]) not in ["X", "O"]:
                    turns += 1
                    break
                else:
                    print("Invalid choice")
            else:
                print("Invalid choice")

    #update board
    board[choice-1] = turn

    #check win condition
    for condition in winconditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] == turn:
            win = True
            break

    #change turn
    if not (win or turns == 9):
        if turn == "X":
            turn = "O"
        elif turn == "O":
            turn = "X"

#End Game
displayBoard()
if win:
    print(str(turn) + " IS THE WINNER!")
else:
    print("DRAW!")`}</CodeBlock>
        </GuideSection>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link href="/learn" className="btn-secondary">
            ← Back to Articles
          </Link>
        </div>
    </ArticlePage>
  );
}
