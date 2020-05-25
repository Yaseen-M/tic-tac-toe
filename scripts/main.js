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
    this.getPlayerName();
  }

  async getPlayerName() {
    for (let i = 0; i < 2; i++) {
      const { value: name } = await Swal.fire({
        title: `Player ${i + 1}`,
        input: 'text',
        inputPlaceholder: 'Enter name here...',
        allowOutsideClick: false,
        showConfirmButton: false,
        inputValidator: (value) => {
          if (!value) {
            return 'You must have a name!';
          }
        },
      });
      this.players[i]['name'] = name;
    }
    this.displayTurn();
    this.displayScores();
  }

  createGrid() {
    const grid = document.createElement('section');
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
      const popSound = new Audio('sounds/pop.wav');
      popSound.play();
      this.updateGrid();

      let gameOver = false;
      if (this.isWinner()) {
        this.winnerUpdate(false);
        gameOver = true;
      } else if (this.isTie()) {
        this.winnerUpdate(true);
        gameOver = true;
      }

      if (gameOver) {
        this.showEndMsg();
        this.displayScores();
        this.restartGame();
      }

      this.changeTurn();
    }
  }

  updateGrid() {
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
          : `${this.players[this.winner]['name']} wins!`,
      timer: 3000,
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

  clearGrid() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.gridCoords[i][j] = '';
      }
    }
    this.updateGrid();
  }

  changeTurn() {
    this.turn = Number(!this.turn);
    this.displayTurn();
  }

  displayTurn() {
    const name = document.querySelector('#current-turn h1');
    name.textContent = this.players[this.turn]['name'];
  }

  displayScores() {
    for (let i = 0; i < 2; i++) {
      const playerScore = document.querySelector(`#player-${i}`);
      console.log(this.players[i]['score']);
      playerScore.textContent = `${this.players[i]['name']}: ${this.players[i]['score']}`;
    }
  }

  restartGame() {
    this.clearGrid();
    this.winner = 'tie';
  }
}

const game = new Game();
