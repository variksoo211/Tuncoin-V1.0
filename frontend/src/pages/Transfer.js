import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import "../css/Transfer.css";

function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const { user } = useAuthContext();


  const handleTransfer = async (e) => {
    e.preventDefault();
  
    // check if user email matches sender email
    if (user.email !== senderEmail) {
      alert('Please enter your own email as sender email');
      return;
    }
  
    try {
      const response = await axios.post("/transfer", {
        amount: amount,
        recipientEmail: recipientEmail,
        senderEmail: senderEmail,
      });
      console.log(response.data.message);
      alert("Money sent successfully!");
    } catch (error) {
      console.log(error.response.data.error);
      alert("Error occurred while sending money.");
    }
  };
  

  return (
    <div className="transfer-container">
  <div className="transfer-text">
    <h1>Send Money</h1>
    <form onSubmit={handleTransfer}>
      <label>
        Sender Email:
        <input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Recipient Email:
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Send</button> 
    </form>
  </div>
  <div className="transfer-image">
    <img src={require("../pics/trans.png")} alt="trans" /> 
  </div>
</div>
  )
};

export default Transfer;

