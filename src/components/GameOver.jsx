export default function GameOver({ winner, onRestart }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {/* 
                Using the && operator to conditionally render the winner's name. 
                If 'winner' is truthy (i.e., there is a winner), 
                the message "{winner} Won!" is displayed. 
                If 'winner' is falsy (i.e., there is no winner), this line won't render anything.
            */}
            {winner && <p>{winner} Won!</p>}
            {/* Render a message indicating a draw if there is no winner */}
            {!winner && <p>It's a draw</p>}
            <p>
                {/* Button to restart the game, triggering the onRestart function passed as a prop */}
                <button onClick={onRestart}>Rematch</button>
            </p>
        </div>
    );
}
