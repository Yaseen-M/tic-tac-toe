class Game {
  // Creates game
  constructor() {
    // Creates game attributes
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.playerOneSymbol = 'X';
    this.playerTwoSymbol = '0';
    this.turn = 0;
    this.winner = null;
    this.createBoard();
  }

  // Creates the game board
  createBoard() {
    // Creates table element
    const table = document.createElement('table');

    // Sets the id of the board
    table.setAttribute('id', 'board');

    for (let i = 0; i < 3; i++) {
      // Creates a table row
      const tableRow = document.createElement('tr');

      for (let j = 0; j < 3; j++) {
        // Creates a table cell
        const tableCell = document.createElement('td');

        // Sets the id of the cell as it coords
        tableCell.setAttribute('id', `cell-${i}-${j}`);

        // Appends cells to row
        tableRow.append(tableCell);
      }

      // Appens table row to the table
      table.appendChild(tableRow);
    }

    // Outputs table to the web page
    const container = document.querySelector('.container');
    container.appendChild(table);
  }

  // Changes the value of the clicked cell
  cellClick(cellID) {
    // Gets coords from cell ID
    const x = cellID[5];
    const y = cellID[7];

    // Checks if cell is empty
    if (this.board[x][y] === '') {
      // If empty the cell is filled with the player's symbol
      console.log(this.turn);
      this.board[x][y] =
        this.turn === 0 ? this.playerOneSymbol : this.playerTwoSymbol;
      // Changes the current turn
      this.turn = Number(!this.turn);
      // Visible board is updated
      this.updateBoard();
    }
  }

  // Updates visible board
  updateBoard() {
    // Iterates through rows and columns
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Replaces visibile board text with game object board text
        const cell = document.querySelector(`#cell-${i}-${j}`);
        cell.textContent = this.board[i][j];
      }
    }
    this.checkForWinner();
  }

  checkForWinner() {
    if (
      this.checkVertical() ||
      this.checkHorizontal() ||
      this.checkDiagonal()
    ) {
      alert('We have a winner!');
    }
  }

  // Checks for three identical vertical symbols
  checkVertical() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] !== '' &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        // Three in a row exists
        return true;
      }
    }
    return false;
  }

  // Checks for three identical horizontal symbols
  checkHorizontal() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        // Three in a row exists
        return true;
      }
    }
    return false;
  }

  // Checks for three identical diagonal symbols
  checkDiagonal() {
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return true;
    } else if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = '';
      }
    }
    this.updateBoard();
  }
}

// Creates game object
const game = new Game();

// Cell click event listeners
document.querySelector('#cell-0-0').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-0-1').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-0-2').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-1-0').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-1-1').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-1-2').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-2-0').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-2-1').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
document.querySelector('#cell-2-2').onclick = function () {
  game.cellClick(this.getAttribute('id'));
};
