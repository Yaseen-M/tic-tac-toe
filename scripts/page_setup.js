class Game {
  // Creates game
  constructor() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.playerOneSymbol = 'X';
    this.playerTwoSymbol = '0';
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
        tableCell.setAttribute('id', `${i}-${j}`);

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
}

const game = new Game();
