import axios from "axios";
import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';

function Vente(props) {
  const [amount, setAmount] = useState(""); // state for the amount input
  const [message, setMessage] = useState(""); // state for displaying success/error message
  const { user } = useAuthContext();

  const handleSell = () => {
    // Make sure the user entered a valid amount
    if (!amount || isNaN(amount)) {
      setMessage("Entrez un montant valide");
      return;
    }

    // Make an API call to update the user's solde
    axios.put(`/update-soldeV/${user.email}`, { Solde: Number(amount) })
      .then(response => {
        // Show success message and update the user's solde in props
        setMessage(response.data.message);
        
        setAmount("");
      })
      .catch(error => {
        // Show error message if the API call fails
        console.log(error);
        setMessage("Une erreur s'est produite lors de la vente. Veuillez réessayer plus tard.");
      });
  };

  return (
    <div>
      <h1>Sell TDC</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="amount">Amount :</label>
        <input type="number" id="amount" name="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter the amount to withdraw" />
        <br />
        <button type="button" onClick={handleSell}>Sell</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Vente;
                                                                                  
