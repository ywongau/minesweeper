export const createBoard = (
  x: number,
  y: number,
  randomizer: () => boolean
) => {
  return [...Array(y)].map(() =>
    [...Array(x)].map(() => ({ mine: randomizer() ? 1 : 0, revealed: false }))
  );
};

export const randomizer = () => Math.random() < 0.15;

export const reveal = (board: Cell[][], x: number, y: number) => {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      /*
      ({
      mine: cell.mine,
      revealed: rowIndex === y && colIndex === x ? true : cell.revealed,
    }));*/
      const shouldReveal =
        rowIndex === y && colIndex === x ? true : cell.revealed;
      if (shouldReveal) {
        cell.revealed = true;
        cell.checked = true;
        // reveal all adjacent cells that have no adjacent mines
        const neighbors = getNeighbors(board, colIndex, rowIndex);
        neighbors.forEach((neighbor) => {
          
        });
      }
    });
  });
  return board;
};

export const countMines = (board: Cell[][], x: number, y: number) =>
  getNeighbors(board, x, y).reduce((acc, cell) => acc + cell.mine, 0);

export const getNeighbors = (board: Cell[][], x: number, y: number) =>
  [
    board[y - 1]?.[x - 1],
    board[y - 1]?.[x],
    board[y - 1]?.[x + 1],
    board[y][x - 1],
    board[y][x + 1],
    board[y + 1]?.[x - 1],
    board[y + 1]?.[x],
    board[y + 1]?.[x + 1],
  ]?.filter(Boolean);

type Cell = {
  mine: number;
  revealed: boolean;
  checked?: boolean;
};

type Board = Cell[][];
