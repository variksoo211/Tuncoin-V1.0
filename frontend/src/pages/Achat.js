import axios from "axios";
import { useState } from "react";
import "../css/Achat.css";
import { useAuthContext } from '../hooks/useAuthContext';
//import StripeCheckout from 'react-stripe-checkout';



function Achat(props) {
  const [amount, setAmount] = useState("");
  const { user } = useAuthContext();

  const handleToken = async (token) => {
    try {
      const response = await axios.post('/charge', {
        amount: amount * 100,
        token: token
      });
      alert(response.data.message);
      setAmount("");
    } catch (error) {
      console.log(error);
      alert("Une erreur s'est produite lors de l'achat. Veuillez réessayer plus tard.");
    }
  };

  const handleBuy = () => {
    if (!amount || isNaN(amount)) {
      alert("Entrez un montant valide");
      return;
    }

    axios.put(`/update-solde/${user.email}`, { Solde: Number(amount) })
      .then(response => {
        // open Stripe checkout popup
        const stripeKey = "pk_test_51MygarDE5oFCYDkpkSgUdUotKtxhe6TSSxvC1V6ovo5wrsYRAYMhrWL7SJVrtunZ1Mlw15T318X0BXtyO99gwU0C00fcMvRrnT";
        const amountInCents = amount * 100;
        const name = "TDC";
        const description = `Buy ${amount} TDC`;
        const email = user.email;

        const stripeCheckoutOptions = {
          key: stripeKey,
          amount: amountInCents,
          name: name,
          description: description,
          email: email,
          token: handleToken
        };
        window.StripeCheckout.open(stripeCheckoutOptions);
      })
      .catch(error => {
        console.log(error);
        alert("Une erreur s'est produite lors de l'achat. Veuillez réessayer plus tard.");
      });
  };

  return (
    <div>
      <h1>Buy TDC</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="amount">Amount :</label>
        <input type="number" id="amount" name="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter the amount to add" />
        <br />
        <button type="button" onClick={handleBuy}>Buy with Stripe</button>
      </form>
      {props.message && <p>{props.message}</p>}
    </div>
  );
}

//pk_test_51MygarDE5oFCYDkpkSgUdUotKtxhe6TSSxvC1V6ovo5wrsYRAYMhrWL7SJVrtunZ1Mlw15T318X0BXtyO99gwU0C00fcMvRrnT
export default Achat;
