// Populate device ID dropdown
async function populateDeviceFilter() {
  const res = await fetch(`${API_BASE}/devices`);
  const devices = await res.json();
  const filter = document.getElementById("transactionFilter");
  filter.innerHTML = `<option value="all">All Devices</option>`;
  devices.forEach(d => {
    filter.innerHTML += `<option value="${d.id}">${d.id}</option>`;
  });
}

// Fetch and display transactions
async function fetchTransactions() {
  try {
    const filter = document.getElementById("transactionFilter").value;
    const res = await fetch(`${API_BASE}/transactions`);
    const transactions = await res.json();
    const tbody = document.querySelector("#transactions-table tbody");
    tbody.innerHTML = "";

    const filtered = filter === "all" ? transactions : transactions.filter(tx => tx.device_id === filter);

    filtered.forEach(tx => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tx.transaction_id}</td>
        <td>${tx.device_id}</td>
        <td>${tx.username}</td>
        <td>${tx.event_type}</td>
        <td>${tx.timestamp}</td>
      `;
      tbody.appendChild(row);
    });

    // scroll to bottom for latest transaction
    const table = document.getElementById("transactions-table");
    table.scrollTop = table.scrollHeight;

  } catch (err) {
    console.error("Failed to fetch transactions:", err);
  }
}

// Event listener for dropdown
document.getElementById("transactionFilter").addEventListener("change", fetchTransactions);

// Initial load
populateDeviceFilter();
fetchTransactions();

// Auto-refresh every 3 seconds
setInterval(fetchTransactions, 3000);
