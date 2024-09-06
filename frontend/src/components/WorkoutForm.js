import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import '../css/Form.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WorkoutForm = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const currentUserEmail = user.email;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.email === currentUserEmail);

  if (filteredUsers.length === 0) {
    return <div>Loading...</div>;
  }

  const currentUser = filteredUsers[0];

  if (currentUser.statut === 'inactive') {
    return (
      <div>
        <h1>Inactive Account</h1>
        <p> Sorry {currentUser.name}, it looks like your account is currently inactive. Please check back later or contact customer support for assistance.</p>
      </div>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          {currentUser.statut === 'active' && (
            <React.Fragment key={currentUser.email}>
              <div className="workout-form-container">
                {currentUser && <p>Welcome {currentUser.Nom} !</p>}
                <div className="workout-image"></div>
                <div className="workout-form-content">
                <Link to="/maj">
                <img src={require("../pics/maj.png")} alt="update" />
                Personal Information
              </Link>
              <Link to="/portefeuille">
                 <img src={require("../pics/wallet.png")} alt="wallet" />
                 Wallet
              </Link>
                </div>
              </div>
            </React.Fragment>
          )}
          {currentUser.statut === 'inactive' && (
            <p>Sorry, it looks like your account is currently inactive. Please check back later or contact customer support for assistance.</p>
          )}
          {currentUser.statut === 'new' && (
            <div>
              <p>Thank you for registering! Your account is currently being reviewed by our admin team. Please allow up to 24 hours for your account to be activated.</p>
              <p>If you have any questions or concerns, please contact customer support for assistance.</p>
              <p>Thank you for your patience!</p>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutForm;
