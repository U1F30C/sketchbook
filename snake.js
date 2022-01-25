const TerminalGameIo = require("terminal-game-io");
const { chain, keyBy } = require("lodash");

const Key = TerminalGameIo.Key;

const FPS = 10;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo;

const snake = {
  body: [
    {
      x: Math.round(BOARD_WIDTH / 2),
      y: Math.round(BOARD_HEIGHT / 2),
    },
    {
      x: Math.round(BOARD_WIDTH / 2 + 1),
      y: Math.round(BOARD_HEIGHT / 2 + 0),
    },
    {
      x: Math.round(BOARD_WIDTH / 2 + 1),
      y: Math.round(BOARD_HEIGHT / 2 + 1),
    },
  ],
  direction: "Up",
};

function getTarget() {
  return {
    x: Math.round(BOARD_WIDTH * Math.random()) % BOARD_WIDTH,
    y: Math.round(BOARD_HEIGHT * Math.random()) % BOARD_HEIGHT,
  };
}
let target = getTarget();

setInterval(() => {
  const snakeHead = snake.body[0];
  const newHead = { ...snakeHead };
  switch (snake.direction) {
    case "Down":
      newHead.y = (snakeHead.y + 1) % BOARD_HEIGHT;
      break;
    case "Up":
      newHead.y = snakeHead.y === 0 ? BOARD_HEIGHT - 1 : snakeHead.y - 1;
      break;
    case "Left":
      newHead.x = snakeHead.x === 0 ? BOARD_WIDTH - 1 : snakeHead.x - 1;
      break;
    case "Right":
      newHead.x = (snakeHead.x + 1) % BOARD_WIDTH;
      break;
    case Key.Escape:
      instance.exit();
      break;
  }
  if (newHead.y == target.y && newHead.x == target.x) {
    target = getTarget();
  } else {
    snake.body.pop();
  }
  // snake.body.shift();
  snake.body.unshift(newHead);
}, 100);

const frameHandler = (instance) => {
  let frameData = "";
  const snakeBodyMap = chain(snake.body)
    .groupBy((cell) => cell.x)
    .mapValues((xcells) => keyBy(xcells, (cell) => cell.y))
    .value();
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      let symbol;
      if (snakeBodyMap[x]?.[y]) symbol = "@";
      else if (y == target.y && x == target.x) symbol = "O";
      else symbol = ".";

      frameData += symbol;
    }
  }
  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
};

const keypressHandler = (instance, keyName) => {
  switch (keyName) {
    case Key.ArrowDown:
      snake.direction = "Down";
      break;
    case Key.ArrowUp:
      snake.direction = "Up";
      break;
    case Key.ArrowLeft:
      snake.direction = "Left";
      break;
    case Key.ArrowRight:
      snake.direction = "Right";
      break;
    case Key.Escape:
      instance.exit();
      break;
  }

  frameHandler(instance);
};

terminalGameIo = TerminalGameIo.createTerminalGameIo({
  fps: FPS,
  frameHandler,
  keypressHandler,
});
