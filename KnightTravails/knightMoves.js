// BOARD : Array of 8 rows (0 - 7) with each of them having
// 8 coordinates. Ej [0,0] -> [0,7]

const KnightMove = (position, moves, prev = null) => {
  const [x, y] = position;
  const data = {
    position,
    x,
    y,
    moves,
    prev,
  };

  return Object.assign({}, data);
};

const movements = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

const calcPossibleMoves = (position) => {
  const [xP, yP] = position;
  const possibleMovements = movements
    .map(([x, y]) => [x + xP, y + yP])
    .filter((el) => el[0] >= 0 && el[0] <= 7 && el[1] >= 0 && el[1] <= 7);
  return possibleMovements;
};

function knightMoves(origin, end) {
  const [endX, endY] = end;
  const originKnight = KnightMove(origin, 0, null);
  const coordinateSet = new Set();
  const queu = [];
  queu.push(originKnight);
  let currentNode = null;
  let isFound = false;
  while (queu.length !== 0 && !isFound) {
    //GET THE NODE AND ITS VALUES
    currentNode = queu.shift();
    const { position, x, y, moves, prev } = currentNode;
    isFound = x === endX && y === endY;
    if (!coordinateSet.has(`${x}, ${y}`)) {
      coordinateSet.add(`${x}, ${y}`);
      // Calc all positions from that node on BFS
      const possibleMoves = calcPossibleMoves(position);
      for (const move of possibleMoves) {
        const newNode = KnightMove(move, moves + 1, currentNode);
        queu.push(newNode);
      }
    }
  }

  return currentNode;
}

function displayMovesInfo(endNode) {
  let currentNode = endNode;
  let message = `==> You made it in ${currentNode.moves} moves!  Here's your path:`;
  const coordinatesStack = [];
  while (currentNode) {
    coordinatesStack.push(currentNode.position);
    currentNode = currentNode.prev;
  }
  while (coordinatesStack.length) {
    message += `\n\t [${coordinatesStack.pop()}]`;
  }
  return message;
}

const endNode = knightMoves([3, 3], [4, 3]);
console.log(displayMovesInfo(endNode));
