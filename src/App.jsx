import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/log.jsx';
import { WINNING_COMBINATIONS } from './WINNING-COMBINATIONS.js';
import GameOver from './components/GameOver.jsx';

// Constants to define player names
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// Initial state of the game board
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

/**
 * Determines the current active player based on the number of game turns.
 * If the number of turns is even, it's Player X's turn; if odd, it's Player O's turn.
 * @param {Array} gameTurns - The history of game turns.
 * @returns {string} - The symbol of the current active player ('X' or 'O').
 */
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

/**
 * Checks the game board for a winner based on predefined winning combinations.
 * Iterates through each winning combination and checks if the same symbol occupies all three squares.
 * @param {Array} gameBoard - The current state of the game board.
 * @param {Object} players - An object mapping player symbols to player names.
 * @returns {string|null} - The name of the winning player, or null if there is no winner.
 */
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
      break; // Exit the loop once a winner is found
    }
  } 

  return winner;
}

/**
 * Constructs the current state of the game board based on the history of game turns.
 * Creates a copy of the initial game board and updates it according to the recorded turns.
 * @param {Array} gameTurns - The history of game turns.
 * @returns {Array} - The current state of the game board.
 */
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player; // Update the game board based on turns
  }
  return gameBoard;
}

/**
 * The main App component that manages the state and logic of the tic-tac-toe game.
 * It handles player turns, checks for winners or draws, and renders the game UI.
 */
function App() {
  const [gameTurns, setGameTurns] = useState([]); // State for tracking the history of game turns
  const [players, setPlayers] = useState(PLAYERS); // State for managing player names

  const activePlayer = deriveActivePlayer(gameTurns); // Get the current active player
  const gameBoard = deriveGameBoard(gameTurns); // Get the current state of the game board
  const winner = deriveWinner(gameBoard, players); // Check if there is a winner
  const hasDraw = gameTurns.length === 9 && !winner; // Check for a draw condition

  /**
   * Handles player selection of a square on the game board.
   * Updates the game turns state with the new move made by the active player.
   * @param {number} rowIndex - The row index of the selected square.
   * @param {number} colIndex - The column index of the selected square.
   */
  function handleSelectSquare(rowIndex, colIndex) {
    // Prevent selection if the square is already occupied or if there is a winner
    if (gameBoard[rowIndex][colIndex] || winner) return;

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns); // Determine the current player

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns; // Update the game turns state
    });
  }

  /**
   * Resets the game by clearing the history of game turns.
   */
  function handleRestart() {
    setGameTurns([]); // Reset game turns
  }

  /**
   * Handles changes to player names.
   * Updates the state with the new name for the specified player symbol.
   * @param {string} symbol - The symbol of the player whose name is being changed.
   * @param {string} newName - The new name for the player.
   */
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: newName // Update player names in state
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange} 
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange} 
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
