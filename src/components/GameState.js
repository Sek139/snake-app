import { useEffect, useState } from "react";
import GamePieces from "./GamePieces";

const GameState = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollisionType] = useState("");
  const handleGameOver = (type) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }
    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handlePressKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };
    window.addEventListener("keydown", handlePressKeyPress);
  }, [gameOver]);

  return (
    <div>
      <p className="score"> Score : {score}</p>
      <p className="highScore">High Score : {highScore}</p>
      {gameOver && (
        <div className="gameOver">
          <p>
            Game Over !
            {collision === "wall" ? "you Hit the wall" : "you ate yourself"}
          </p>
          <p> please press enter to reset the game</p>
        </div>
      )}
      {!gameOver && (
        <GamePieces
          data-testid="game-pieces"
          score={score}
          setScore={setScore}
          onGameOver={(type) => handleGameOver(type)}
        />
      )}
    </div>
  );
};

export default GameState;
