import React, { useState } from 'react';
import axios from 'axios';

const BuyTdc = ({ userId }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    try {
      await axios.post('/api/buyTdc', {
        userId: userId,
        amount: amount
      });

      alert("Balance updated successfully");
      setAmount('');
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input type="number" className="form-control" id="amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Buy TDC</button>
    </form>
  );
};

export default BuyTdc;
