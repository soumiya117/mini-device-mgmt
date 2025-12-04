import React, { useEffect, useState } from "react";
import { getTransactions } from "../api";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 2000); // refresh every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>User</th>
            <th>Event</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.transaction_id}>
              <td>{tx.device_id}</td>
              <td>{tx.username}</td>
              <td>{tx.event_type}</td>
              <td>{tx.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
