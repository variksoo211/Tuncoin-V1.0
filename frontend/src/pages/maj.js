import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Maj.css';
import { useAuthContext } from '../hooks/useAuthContext';


const Maj = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    Nom: user?.Nom || '',
    Prenom: user?.Prenom || '',
    Tlf: user?.Tlf || '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        Nom: user.Nom,
        Prenom: user.Prenom,
        Tlf: user.Tlf,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      return;
    }
    const { Nom, Prenom, Tlf } = formData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/maj/${user.email}`, { Nom, Prenom, Tlf }, config);
      console.log(res.data); // log the updated user object
      setSuccessMessage('Information updated successfully!');
      // handle any other logic for updating the UI, displaying a success message, etc.
    } catch (error) {
      console.error(error.message);
      // handle the error, such as displaying an error message to the user
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <p>{successMessage}</p>}
      <label>
        Nom:
        <input type="text" name="Nom" value={formData.Nom} onChange={handleInputChange} />
      </label>
      <label>
        Prenom:
        <input type="text" name="Prenom" value={formData.Prenom} onChange={handleInputChange} />
      </label>
      <label>
        Tlf:
        <input type="text" name="Tlf" value={formData.Tlf} onChange={handleInputChange} />
      </label>
      <button type="submit">Update Information</button>
      <button>
        <Link to="/dashbord">Dashboard</Link>
      </button>
    </form>
  );
};

export default Maj;
