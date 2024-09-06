import { Link } from 'react-router-dom';
import '../css/Portefeuille.css';

const Portefeuille = () => {
  return (
    <div className="prt">
<h2>Wallet</h2>
<button>
  <Link to="/achat">Buy TDC</Link>
</button>
<button>
  <Link to="/vente">Sell TDC</Link>
</button>
<button>
  <Link to="/transfer">Transfer TDC</Link>
</button>
<button>
  <Link to="/echange">Exchange TDC</Link>
</button>
<button>
  <Link to="/solde">Check Balance</Link>
</button>
    </div>
  );
};

export default Portefeuille;
