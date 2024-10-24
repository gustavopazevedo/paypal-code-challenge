import { useEffect, useState, useRef, useMemo } from "react";
import "./App.css";

const mockTransactionData: TransactionData[] = [
  {
    id: 1,
    date: "2023-09-01",
    description: "Payment for Product A",
    amount: 50.0,
  },
  {
    id: 2,
    date: "2023-09-02",
    description: "Payment for Product B",
    amount: 75.0,
  },
  {
    id: 3,
    date: "2023-08-01",
    description: "Payment for Product C",
    amount: 50.0,
  },
  {
    id: 4,
    date: "2023-10-02",
    description: "Payment for Product D",
    amount: 75.0,
  },
  {
    id: 5,
    date: "2023-09-15",
    description: "Payment for Product E",
    amount: 50.0,
  },
  {
    id: 6,
    date: "2023-09-10",
    description: "Payment for Product F",
    amount: 75.0,
  },
  // Add more mock data as needed
];

type TransactionData = {
  id: number;
  date: string;
  description: string;
  amount: number;
};

function App() {
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [error, setError] = useState(null);
  const startDateRef = useRef<any>();
  const endDateRef = useRef<any>();

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = () => {
    // Simulate API request delay
    setTimeout(() => {
      setTransactionData(mockTransactionData);
    }, 1000);
  };

  console.log(startDateRef.current);

  const filteredTransactionData = useMemo(() => {
    const startDateTime = new Date(startDateRef.current.value).getTime();
    const endDateTime = new Date(startDateRef.current.value).getTime();

    const transactions = transactionData.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();

      return transactionDate >= startDateTime && transactionDate <= endDateTime;
    });

    return transactions;
  }, [transactionDate, startEndDate]);

  const handleOnFilter = () => {
    // const startDateTime = new Date(startDate).getTime();
    // const endDateTime = new Date(startDate).getTime();
    // const transactions = transactionData.filter((transaction) => {
    //   const transactionDate = new Date(transaction.date).getTime();
    //   return transactionDate >= startDateTime && transactionDate <= endDateTime;
    // });
  };

  return (
    <div className="payment-dashboard">
      <h1>Payment Transaction Dashboard</h1>
      {error && <p className="error-message">Error: {error}</p>}
      {/* Date Range Filter (to be implemented) */}
      <div className="date-filter">
        <div className="date-filter__item">
          <label>Start date</label>
          <input ref={startDateRef} id="start_date" type="date" />
        </div>
        <div className="date-filter__item">
          <label>End date</label>
          <input ref={endDateRef} id="end_date" type="date" />
        </div>
        <button className="date-filter__button" onClick={handleOnFilter}>
          Filter
        </button>
      </div>

      <ul className="transaction-list">
        {transactionData.map((transaction) => (
          <li className="transaction-list__item" key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
            <p>Amount: {transaction.amount}</p>
          </li>
        ))}
      </ul>
      {/* Pagination and Summary Section (optional, to be implemented) */}
    </div>
  );
}

export default App;
