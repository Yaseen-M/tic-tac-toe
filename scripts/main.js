class Game {
  constructor() {
    this.gridCoords = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    // Creates player objects
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

    // Keeps current player turn
    this.turn = 0;

    this.winner = 'tie';

    // Outputs grid to the DOM
    this.createGrid();

    this.playerSetup();
  }

  createGrid() {
    // Creates grid section element
    const grid = document.createElement('section');
    grid.setAttribute('id', 'grid');

    // Fills grid with cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Creates cell element
        const cell = document.createElement('div');

        // Sets cell's ID
        cell.setAttribute('id', `cell-${i}-${j}`);

        // Sets cell's class depending on its position
        let cellClass = 'cell';

        if (i === 1) {
          cellClass += ' vertical-middle';
        }
        if (j === 1) {
          cellClass += ' horizontal-middle';
        }

        cell.setAttribute('class', cellClass);

        // Gives cell an onclick function
        cell.onclick = function () {
          game.cellClick(this.getAttribute('id'));
        };

        // Pushes cell into grid
        grid.appendChild(cell);
      }
    }

    // Pushes grid to into container on the DOM
    const container = document.querySelector('#grid-container');
    container.appendChild(grid);
  }

  async playerSetup() {
    for (let i = 0; i < 2; i++) {
      // Sets both players' names
      await this.setPlayerName(i);
    }

    // Outputs current turn to DOM
    this.displayTurn();

    // Outputs current scores to DOM
    this.displayScores();
  }

  async setPlayerName(playerNum) {
    // Uses SweetAlert2 library
    const { value: name } = await Swal.fire({
      title: `Player ${playerNum + 1}`,
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

    // Sets player name equal to the user input
    this.players[playerNum]['name'] = name;
  }

  // Method run when a cell is clicked
  cellClick(cellID) {
    // Sets cell's coords
    const x = cellID[5];
    const y = cellID[7];

    // Checks if cell is occupied
    if (this.isEmpty(this.gridCoords[x][y])) {
      // Cell is empty
      // Grid coords updated with new symbol
      this.gridCoords[x][y] =
        this.turn === 0 ? this.players[0]['symbol'] : this.players[1]['symbol'];

      // Plays pop sound
      const popSound = new Audio('sounds/pop.wav');
      popSound.play();

      // DOM grid updated with new symbol
      this.displayGrid();

      // Checks if game is over
      let gameOver = false;
      if (this.isWinner()) {
        // Updates game winner field to winning player
        this.updateWinner(true);
        gameOver = true;
      } else if (this.isTie()) {
        // Updates game winner field to tie
        this.updateWinner(false);
        gameOver = true;
      }

      if (gameOver) {
        this.showEndMsg();

        // Updates scores on DOM
        this.displayScores();

        this.restartGame();
      }

      // Changes turn to the opposite player
      this.changeTurn();
    }
  }

  isEmpty(str) {
    return str === '';
  }

  // Updates DOM grid to match grid field
  displayGrid() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Sets DOM cell text to its corresponding field cell value
        const cell = document.querySelector(`#cell-${i}-${j}`);
        cell.textContent = this.gridCoords[i][j];
      }
    }
  }

  // Updates winner field
  updateWinner(playerWins) {
    if (playerWins) {
      // Sets winner to player who last had their turn
      this.winner = this.turn;
      this.players[this.winner]['score'] += 1;
    } else {
      this.winner = 'tie';
    }
  }

  // Shows message at the end of a game
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

  // Checks if game is a tie
  isTie() {
    let cellsFilled = 0;
    // Checks if a cell is filled
    this.gridCoords.forEach((row) => {
      row.forEach((cell) => {
        if (!this.isEmpty(cell)) {
          cellsFilled++;
        }
      });
    });
    if (cellsFilled === 9) {
      // Grid is full
      return true;
    } else {
      // Grid is not full
      return false;
    }
  }

  // Checks if there is a winner
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
    // Checks if any column has three symbols in a row
    for (let i = 0; i < 3; i++) {
      if (
        !this.isEmpty(this.gridCoords[0][i]) &&
        this.gridCoords[0][i] === this.gridCoords[1][i] &&
        this.gridCoords[1][i] === this.gridCoords[2][i]
      ) {
        // Has three in a row
        return true;
      }
    }
    // Does not have three in a row
    return false;
  }

  checkHorizontal() {
    // Checks if any row has three symbols in a row
    for (let i = 0; i < 3; i++) {
      if (
        !this.isEmpty(this.gridCoords[i][0]) &&
        this.gridCoords[i][0] === this.gridCoords[i][1] &&
        this.gridCoords[i][1] === this.gridCoords[i][2]
      ) {
        // Has three in a row
        return true;
      }
    }
    // Does not have three in a row
    return false;
  }

  checkDiagonal() {
    // Checks if any diagonal has three symbols in a row
    if (
      !this.isEmpty(this.gridCoords[0][0]) &&
      this.gridCoords[0][0] === this.gridCoords[1][1] &&
      this.gridCoords[1][1] === this.gridCoords[2][2]
    ) {
      // Has three in a row
      return true;
    } else if (
      !this.isEmpty(this.gridCoords[0][2]) &&
      this.gridCoords[0][2] === this.gridCoords[1][1] &&
      this.gridCoords[1][1] === this.gridCoords[2][0]
    ) {
      // Has three in a row
      return true;
    } else {
      // Does not have three in a row
      return false;
    }
  }

  // Empties grid field
  clearGrid() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.gridCoords[i][j] = '';
      }
    }

    // Updates DOM grid
    this.displayGrid();
  }

  changeTurn() {
    // Switches current turn field
    this.turn = Number(!this.turn);

    // Updates turn on DOM
    this.displayTurn();
  }

  // Updates turn on DOM
  displayTurn() {
    const name = document.querySelector('#current-turn h1');

    // Sets DOM value to field value
    name.textContent = this.players[this.turn]['name'];
  }

  // Updates DOM scores to match the player fields
  displayScores() {
    for (let i = 0; i < 2; i++) {
      const playerScore = document.querySelector(`#player-${i}`);
      playerScore.textContent = `${this.players[i]['name']}: ${this.players[i]['score']}`;
    }
  }

  restartGame() {
    this.clearGrid();

    // Sets default winner to tie
    this.winner = 'tie';
  }
}

const game = new Game();
