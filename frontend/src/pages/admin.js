import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [users, setUsers] = useState([]);

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

  const handleStatusUpdate = async (email, newStatus) => {
    try {
      const response = await axios.put(`/update-statut/${email}`, { statut: newStatus });
      console.log(response.data);
      // Update the state to reflect the changes
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.email === email ? { ...user, statut: newStatus } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            user =>
              user.email === "admin@admin.admin" ? null : (
                <tr key={user.id}>
                  <td>{user._id}</td>
                  <td>{user.Nom}</td>
                  <td>{user.email}</td>
                  <td>{user.statut}</td>
                  <td>
                  <button
                  onClick={() => handleStatusUpdate(user.email, "active")}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                   <FontAwesomeIcon icon={faCheckCircle} />
                 </button>
               <button
                 onClick={() => handleStatusUpdate(user.email, "inactive")}
                  style={{ backgroundColor: "red", color: "white" }}
                  >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
