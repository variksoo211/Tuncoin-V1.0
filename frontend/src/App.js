import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Admin from './pages/admin';
import Dashbord from './pages/dashbord';


import Maj from './pages/maj';
import Portefeuille from './pages/portefeuille';
import Achat from './pages/Achat';
import Vente from './pages/Vente';
import Transfer from './pages/Transfer';
import Echange from './pages/Echange';
import Solde from './pages/Solde';

function App() {
  const { user } = useAuthContext();

  let dashboardPath = "/dashbord";
  if (user && user.email === "admin@admin.admin") {
    dashboardPath = "/admin";
  }

  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user && user.email !== "admin@admin.admin" ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> :  <Navigate to={dashboardPath} />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashbord" />} />
            <Route path="/admin" element={user && user.email === "admin@admin.admin" ? <Admin /> : <Navigate to={dashboardPath} />} />
            <Route path="/dashbord" element={user && user.email !== "admin@admin.admin" ? <Dashbord /> : <Navigate to={dashboardPath} />} />
          

          
            <Route path="/maj" element={user ? <Maj /> : <Navigate to="/login" />} />
            <Route path="/portefeuille" element={user ? <Portefeuille /> : <Navigate to="/login" />} />
            <Route path="/achat" element={user ? <Achat /> : <Navigate to="/login" />} />
            <Route path="/vente" element={user ? <Vente /> : <Navigate to="/login" />} />
            <Route path="/transfer" element={user ? <Transfer /> : <Navigate to="/login" />} />
            <Route path="/echange" element={user ? <Echange /> : <Navigate to="/login" />} />
            <Route path="/solde" element={user ? <Solde /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
