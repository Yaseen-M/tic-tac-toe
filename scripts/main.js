class Game {
  constructor() {
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

  createGrid() {
    const grid = document.createElement('div');
    grid.setAttribute('id', 'grid');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');

        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', `cell-${i}-${j}`);

        cell.onclick = function () {
          game.cellClick(this.getAttribute('id'));
        };

        grid.appendChild(cell);
      }
    }

    const container = document.querySelector('#grid-container');
    container.appendChild(grid);
  }

  cellClick(cellID) {
    const x = cellID[5];
    const y = cellID[7];

    if (this.gridCoords[x][y] === '') {
      this.gridCoords[x][y] =
        this.turn === 0 ? this.players[0]['symbol'] : this.players[1]['symbol'];

      this.updateBoard();

      let gameOver = false;
      if (this.isTie()) {
        this.winnerUpdate(true);
        gameOver = true;
      } else if (this.isWinner()) {
        this.winnerUpdate(false);
        gameOver = true;
      }

      if (gameOver) {
        this.showEndMsg();
        this.restart();
      }

      this.turn = Number(!this.turn);
    }
  }

  updateBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.querySelector(`#cell-${i}-${j}`);
        cell.textContent = this.gridCoords[i][j];
      }
    }
  }

  winnerUpdate(noWinner) {
    if (noWinner) {
      this.winner = 'tie';
    } else {
      this.winner = this.turn;
      this.players[this.winner]['score'] += 1;
    }
  }

  showEndMsg() {
    Swal.fire({
      titleText:
        this.winner === 'tie'
          ? `It's a ${this.winner}!`
          : `Player ${this.winner + 1} wins!`,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      allowOutsideClick: false,
    });
  }

  isTie() {
    let cellsFilled = 0;
    this.gridCoords.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== '') {
          cellsFilled++;
        }
      });
    });
    if (cellsFilled === 9) {
      return true;
    } else {
      return false;
    }
  }

  isWinner() {
    if (
      this.checkVertical() ||
      this.checkHorizontal() ||
      this.checkDiagonal()
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkVertical() {
    for (let i = 0; i < 3; i++) {
      if (
        this.gridCoords[0][i] !== '' &&
        this.gridCoords[0][i] === this.gridCoords[1][i] &&
        this.gridCoords[1][i] === this.gridCoords[2][i]
      ) {
        return true;
      }
    }
    return false;
  }

  checkHorizontal() {
    for (let i = 0; i < 3; i++) {
      if (
        this.gridCoords[i][0] !== '' &&
        this.gridCoords[i][0] === this.gridCoords[i][1] &&
        this.gridCoords[i][1] === this.gridCoords[i][2]
      ) {
        return true;
      }
    }
    return false;
  }

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
    this.updateBoard();
  }

  restart() {
    this.clearBoard();
    this.winner = 'tie';
  }
}

const game = new Game();
