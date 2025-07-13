function sortTableByWinrate() {
  const table = document.getElementById("results-table");
  const rows = Array.from(table.rows).slice(1); // Skip header
  const sorted = rows.sort((a, b) => {
    const aVal = parseFloat(a.cells[3].innerText);
    const bVal = parseFloat(b.cells[3].innerText);
    return bVal - aVal; // Descending
  });

  const tbody = table.querySelector("tbody");
  sorted.forEach(row => tbody.appendChild(row));
}