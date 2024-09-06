import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const Solde = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
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

  const filteredUsers = users.filter(user => user.email === currentUserEmail);

  return (
    <div>
      <h1>Check Balance</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.Solde}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Solde;
