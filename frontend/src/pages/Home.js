import React from "react";
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to our platform! <br></br> 1 TDC = 1 Dinar Tunisien</h1>
      <Link to="/dashbord">
      <img src={require("../pics/dinar.png")} alt="dinar" />
      </Link>
      <p>
      Our mission is to provide a secure and convenient way for Tunisians to manage their money and make transactions. Whether you're signing up for an account or logging in, our goal is to make the process as easy as possible for you.      </p>
      <p>
      With our platform, you'll have access to a range of features designed to meet your financial needs. From sending and receiving payments to managing your account information, we've got you covered.      </p>
      <p>
      At the same time, we prioritize security and take measures to protect your personal and financial information. We use the latest encryption and authentication technologies to ensure that your data is kept safe.      </p>
      <p>
      Our team is dedicated to providing you with the best possible experience on our platform. If you have any questions or concerns, please don't hesitate to reach out to us. We're here to help!      </p>
    </div>
  );

};

export default Home;
