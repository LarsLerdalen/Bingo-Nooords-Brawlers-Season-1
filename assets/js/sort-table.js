function sortTableByWinrate() {
  const table = document.getElementById("results-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.rows);

  // Sort by the 4th column (winrate), stripping the % and converting to number
  const sorted = rows.sort((a, b) => {
    const aVal = parseFloat(a.cells[3].innerText.replace('%', ''));
    const bVal = parseFloat(b.cells[3].innerText.replace('%', ''));
    return bVal - aVal; // Descending
  });

  // Append sorted rows back to tbody
  sorted.forEach(row => tbody.appendChild(row));
}

// Call the function after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  sortTableByWinrate();
});
