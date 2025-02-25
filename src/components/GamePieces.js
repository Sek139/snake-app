import { useRef, useState, useEffect } from "react";

const GamePieces = ({score, setScore, onGameOver}) => {
  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const [mouse, setMouse] = useState({ x: 100, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);

  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawSnake = () => {
      snake.forEach((snakePark) => {
        ctx.beginPath();
        ctx.rect(snakePark.x, snakePark.y, 14, 14);
        ctx.fillStyle = "#90EE90";
        ctx.fill();
        ctx.closePath();
      });
    };

    const drawMouse = () => {
      ctx.beginPath();
      ctx.rect(mouse.x, mouse.y, 14, 14);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    };

    const moveSnake = () => {
      if (direction) {
        setSnake((previousSnakeVersion) => {
          const newSnakeVersion = [...previousSnakeVersion];
          const snakeHead = {
            x: newSnakeVersion[0].x,
            y: newSnakeVersion[0].y,
          };
          for (let i = newSnakeVersion.length - 1; i > 0; i--) {
            newSnakeVersion[i].x = newSnakeVersion[i - 1].x;
            newSnakeVersion[i].y = newSnakeVersion[i - 1].y;
          }

          switch (direction) {
            case "right":
              snakeHead.x += SNAKE_SPEED;
              break;

            case "left":
              snakeHead.x -= SNAKE_SPEED;
              break;

            case "up":
              snakeHead.y -= SNAKE_SPEED;
              break;

            case "down":
              snakeHead.y += SNAKE_SPEED;
              break;

            default:
              break;
          }
          newSnakeVersion[0] = snakeHead;
          handleMouseCollision(newSnakeVersion);
          handleWallCollision(snakeHead);
          handleBodyCollision(snakeHead);


          return newSnakeVersion;
        });
      }
    };


    const handleWallCollision = (snakeHead) => {
        if(snakeHead.x + SNAKE_SPEED > canvas.width || snakeHead.x + SNAKE_SPEED < 0){
            onGameOver("wall")
        }
        if(snakeHead.y + SNAKE_SPEED > canvas.height || snakeHead.y < 0){
            onGameOver("wall")
        }

    }

    const handleBodyCollision = (newSnake) => {
        const snakeHead = newSnake[0];
        for(let i = 1; i < newSnake.length; i++){

            if(snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y){
                onGameOver('self')
            }
        }
    }
    const handleMouseCollision = (newSnakeVersion) => {
      const snakeHead = newSnakeVersion[0];
      if (snakeHead.x === mouse.x && snakeHead.y === mouse.y) {
        setScore(score++);
        setMouse({
          x:
            Math.floor((Math.random() * canvas.width) / SNAKE_SPEED) *
            SNAKE_SPEED,
          y:
            Math.floor((Math.random() * canvas.height) / SNAKE_SPEED) *
            SNAKE_SPEED,
        });

        newSnakeVersion.push({
          x: newSnakeVersion[newSnakeVersion.length - 1].x,
          y: newSnakeVersion[newSnakeVersion.length - 1].y,
        });
      }
    };
    const handlePressKeyPress = (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handlePressKeyPress);

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawMouse();
      moveSnake();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [snake, direction]);

  return (
    <div>
      <canvas className="gameCanvas" ref={canvasRef} width={750} height={420} />
    </div>
  );
};

export default GamePieces;
