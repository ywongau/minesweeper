import Sinon from "sinon";
import {
  countMines,
  createBoard,
  getNeighbors,
  randomizer,
  reveal,
} from "./engine";
import { expect } from "chai";
describe("Engine", () => {
  describe("createBoard", () => {
    it("should create a board", () => {
      const board = createBoard(30, 20, () => false);
      expect(board.length).to.equal(20);
      expect(board[0].length).to.equal(30);
    });

    it("should put random mimes in the board", () => {
      const alwaysFalse = () => false;
      const board = createBoard(30, 20, alwaysFalse);
      expect(board[0][0]).to.deep.equal({ mine: 0, revealed: false });
    });

    it("should put random mimes in the board", () => {
      const alwaysTrue = () => true;
      const board = createBoard(30, 20, alwaysTrue);
      expect(board[0][0]).to.deep.equal({ mine: 1, revealed: false });
    });
  });

  describe("randomizer", () => {
    const sinon = Sinon.createSandbox();

    beforeEach(() => {
      sinon.stub(Math, "random");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return true if the Math.random gives a value < 0.15", () => {
      Math.random.returns(0.14);
      expect(randomizer()).to.be.true;
    });

    it("should return false if the Math.random gives a value < 0.15", () => {
      Math.random.returns(0.15);
      expect(randomizer()).to.be.false;
    });
  });

  describe("reveal", () => {
    it("should reveal the cell itself", () => {
      const board = [
        [
          { mine: 1, revealed: false },
          { mine: 0, revealed: false },
        ],
        [
          { mine: 0, revealed: false },
          { mine: 0, revealed: false },
        ],
      ];
      const newBoard = reveal(board, 1, 1);
      const expectedBoard = [
        [
          { mine: 1, revealed: false },
          { mine: 0, revealed: false },
        ],
        [
          { mine: 0, revealed: false },
          { mine: 0, revealed: true },
        ],
      ];
      expect(newBoard).to.deep.equal(expectedBoard);
    });
  });

  it.only("should reveal all adjacent cells that have no adjacent mines", () => {
    const board = [
      [
        { mine: 1, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
    ];
    const newBoard = reveal(board, 2, 2);
    const expectedBoard = [
      [
        { mine: 1, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: true },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: true },
      ],
      [
        { mine: 0, revealed: true },
        { mine: 0, revealed: true },
        { mine: 0, revealed: true },
      ],
    ];
    expect(newBoard).to.deep.equal(expectedBoard);
  });

  it("should count the number of neighboring mines", () => {
    const board = [
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
    ];
    expect(countMines(board, 2, 2)).to.equal(0);
  });

  it("should count the number of neighboring mines", () => {
    const board = [
      [
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
        { mine: 0, revealed: false },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 1, revealed: false },
        { mine: 1, revealed: false },
      ],
      [
        { mine: 0, revealed: false },
        { mine: 1, revealed: false },
        { mine: 0, revealed: false },
      ],
    ];
    expect(countMines(board, 2, 2)).to.equal(3);
  });

  describe("getNeighbors", () => {
    it("should get the neighboring cells", () => {
      const board = [
        [
          { mine: 0, revealed: false, id: "0-0" },
          { mine: 0, revealed: false, id: "0-1" },
          { mine: 0, revealed: false, id: "0-2" },
        ],
        [
          { mine: 0, revealed: false, id: "1-0" },
          { mine: 0, revealed: false, id: "1-1" },
          { mine: 0, revealed: false, id: "1-2" },
        ],
        [
          { mine: 0, revealed: false, id: "2-0" },
          { mine: 0, revealed: false, id: "2-1" },
          { mine: 0, revealed: false, id: "2-2" },
        ],
      ];

      const neighbors = getNeighbors(board, 1, 1);
      expect(neighbors).to.deep.equal([
        { mine: 0, revealed: false, id: "0-0" },
        { mine: 0, revealed: false, id: "0-1" },
        { mine: 0, revealed: false, id: "0-2" },
        { mine: 0, revealed: false, id: "1-0" },
        { mine: 0, revealed: false, id: "1-2" },
        { mine: 0, revealed: false, id: "2-0" },
        { mine: 0, revealed: false, id: "2-1" },
        { mine: 0, revealed: false, id: "2-2" },
      ]);
    });

    it("should get the neighboring cells", () => {
      const board = [
        [
          { mine: 0, revealed: false, id: "0-0" },
          { mine: 0, revealed: false, id: "0-1" },
          { mine: 0, revealed: false, id: "0-2" },
        ],
        [
          { mine: 0, revealed: false, id: "1-0" },
          { mine: 0, revealed: false, id: "1-1" },
          { mine: 0, revealed: false, id: "1-2" },
        ],
        [
          { mine: 0, revealed: false, id: "2-0" },
          { mine: 0, revealed: false, id: "2-1" },
          { mine: 0, revealed: false, id: "2-2" },
        ],
      ];

      const neighbors = getNeighbors(board, 0, 0);
      expect(neighbors).to.deep.equal([
        { mine: 0, revealed: false, id: "0-1" },
        { mine: 0, revealed: false, id: "1-0" },
        { mine: 0, revealed: false, id: "1-1" },
      ]);
    });
  });
});
