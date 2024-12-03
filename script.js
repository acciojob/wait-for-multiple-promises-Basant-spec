// Select the table body where rows will be added
const output = document.getElementById("output");

// Add the default 'Loading...' row
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
output.appendChild(loadingRow);

// Create an array of three promises
const promises = Array.from({ length: 3 }, (_, i) => {
  // Each promise resolves after a random time between 1 and 3 seconds
  return new Promise((resolve) => {
    const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    setTimeout(() => resolve({ promiseName: `Promise ${i + 1}`, time }), time * 1000);
  });
});

// Track the start time
const startTime = performance.now();

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Calculate total time taken
  const totalTime = (performance.now() - startTime) / 1000;

  // Clear the 'Loading...' row
  output.innerHTML = "";

  // Populate rows for each resolved promise
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.promiseName}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add the 'Total' row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
});
