class Game {
  // Creates game
  constructor() {
    // Creates game attributes
    this.gridCoords = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.players = [
      {
        name: '',
        symbol: 'X',
        score: 0,
      },
      {
        name: '',
        symbol: '0',
        score: 0,
      },
    ];
    this.turn = 0;
    this.winner = 'tie';
    this.createGrid();
  }

  // Creates the game grid
  createGrid() {
    // Creates grid element
    const grid = document.createElement('div');
    grid.setAttribute('id', 'grid');

    // Fills grid with cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');

        // Assigns relevant class and id
        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', `cell-${i}-${j}`);

        // Assigns onclick functionality
        cell.onclick = function () {
          game.cellClick(this.getAttribute('id'));
        };

        grid.appendChild(cell);
      }
    }

    // Pushes grid to DOM
    const container = document.querySelector('#grid-container');
    container.appendChild(grid);
  }

  // Changes the value of the clicked cell
  cellClick(cellID) {
    // Gets coords from cell ID
    const x = cellID[5];
    const y = cellID[7];

    // Checks if cell is empty
    if (this.gridCoords[x][y] === '') {
      // If empty the cell is filled with the player's symbol
      this.gridCoords[x][y] =
        this.turn === 0 ? this.players[0]['symbol'] : this.players[1]['symbol'];

      // DOM board is updated
      this.updateBoard();

      // Checks if game is over
      this.isGameOver();

      // Changes the current turn
      this.turn = Number(!this.turn);
    }
  }

  // Updates DOM board
  updateBoard() {
    // Iterates through rows and columns
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Replaces visibile board text with game object board text
        const cell = document.querySelector(`#cell-${i}-${j}`);
        cell.textContent = this.gridCoords[i][j];
      }
    }
  }

  // Checks if game is over
  isGameOver() {
    if (
      this.checkVertical() ||
      this.checkHorizontal() ||
      this.checkDiagonal()
    ) {
      this.winner = this.turn;
      Swal.fire({
        titleText:
          this.winner === 'tie'
            ? `It's a ${this.winner}!`
            : `Player ${this.winner + 1} wins!`,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      this.clearBoard();
    }
  }

  // Checks for three identical vertical symbols
  checkVertical() {
    for (let i = 0; i < 3; i++) {
      if (
        this.gridCoords[0][i] !== '' &&
        this.gridCoords[0][i] === this.gridCoords[1][i] &&
        this.gridCoords[1][i] === this.gridCoords[2][i]
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
        this.gridCoords[i][0] !== '' &&
        this.gridCoords[i][0] === this.gridCoords[i][1] &&
        this.gridCoords[i][1] === this.gridCoords[i][2]
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
      this.gridCoords[0][0] !== '' &&
      this.gridCoords[0][0] === this.gridCoords[1][1] &&
      this.gridCoords[1][1] === this.gridCoords[2][2]
    ) {
      return true;
    } else if (
      this.gridCoords[0][2] !== '' &&
      this.gridCoords[0][2] === this.gridCoords[1][1] &&
      this.gridCoords[1][1] === this.gridCoords[2][0]
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.gridCoords[i][j] = '';
      }
    }
    this.winner = this.turn;
    console.log('Winner: ' + this.winner);
    this.updateBoard();
  }

  restart() {
    this.clearBoard();
    this.winner = 'tie';
  }
}

// Creates game object
const game = new Game();
