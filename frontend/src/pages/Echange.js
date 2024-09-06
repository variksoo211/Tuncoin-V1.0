const Echange = () => {
    return (
      <div>
        <h2>Echange TDC</h2>
        <form>
  <label>
    TDC Amount:
    <input type="number" name="tdcAmount" step="0.0001" required />
  </label>
  <br />
  <label>
    Choose cryptocurrency to receive:
    <select name="cryptoCurrency" required>
  <option value="">Select cryptocurrency</option>
  <option value="BTC">Bitcoin (BTC)</option>
  <option value="ETH">Ethereum (ETH)</option>
  <option value="USDT">Tether (USDT)</option>
  <option value="LTC">Litecoin (LTC)</option>
  <option value="XRP">Ripple (XRP)</option>
  <option value="BCH">Bitcoin Cash (BCH)</option>
  <option value="ADA">Cardano (ADA)</option>
  <option value="DOGE">Dogecoin (DOGE)</option>
  <option value="LINK">Chainlink (LINK)</option>
</select>

  </label>
  <br />
  <label>
    Destination Wallet Address:
    <input type="text" name="walletAddress" required />
  </label>
  <br />
  <button type="submit">Exchange</button>
</form>
    <div className="echange-image">
    <img src={require("../pics/echange.png")} alt="echange" /> 
    </div>
  </div>
    );
  };
  
  export default Echange;
  