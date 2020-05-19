// Creates the game board
const createBoard = () => {
  // Creates table element
  const table = document.createElement('table');

  // Sets the id of the board
  table.setAttribute('id', 'board');

  for (let i = 0; i < 3; i++) {
    // Creates a table row
    const tableRow = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
      // Creates a table cell with text
      const tableCell = document.createElement('td');
      const cellContent = document.createTextNode('');
      tableCell.appendChild(cellContent);

      // Appends cells to row
      tableRow.append(tableCell);
    }

    // Appens table row to the table
    table.appendChild(tableRow);
  }

  // Outputs table to the web page
  const container = document.querySelector('.container');
  container.appendChild(table);
};

createBoard();
