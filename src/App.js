import './App.css';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';



const PLAYERS = {
  x: 'Player 1',
  o: 'Player 2'
};



const INITIAL_GAME_BOARD = [
  [null, null,null],
  [null, null,null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = "x";

  if(gameTurns.length > 0 && gameTurns[0].player === 'x'){
    currentPlayer = 'o';
  }
  return currentPlayer
}

  function deriveWinner(boardGame,players){
    let winner ; 

    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = boardGame[combination[0].row][combination[0].column];
      const secondSquareSymbol = boardGame[combination[1].row][combination[1].column];
      const thirdSquareSymbol = boardGame[combination[2].row][combination[2].column];
  
      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
      }
    }
    return winner;
  }

  function derviedGameBoard(gameTurns){
    // Copy of game board here & must be a deep copy 
  let boardGame = [...INITIAL_GAME_BOARD.map(array  =>[...array])];

  for(const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;

      // overridding some inner element in a nested array in another array with a symbol of a player that took a certain turn.  
      boardGame[row][col] = player;
  }
  }

function App() {
  const [gameTurns,setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns);
  const boardGame = derviedGameBoard(gameTurns);
  const winner = deriveWinner(boardGame,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'x' ? 'o' : 'x');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const UpdatedTurns = [{ square: { row: rowIndex, col: colIndex} , player: currentPlayer },
        ...prevTurns
      ];
      return UpdatedTurns;
    }); 
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }
  
  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.x} symbol="x" isActive={activePlayer === 'x'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.o} symbol="o" isActive={activePlayer === 'o'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw)  && <GameOver winner={winner} onRematch={handleRematch} />}
      <GameBoard onSelectSquare={handleSelectSquare} 
      board={boardGame} />
    </div>
    <Log turns={gameTurns} />
   </main>
  ); 
}

export default App;
