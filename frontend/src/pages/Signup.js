import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Nom, setNom] = useState('')
  const [Prenom, setPrenom] = useState('')
  const [Tlf, setTlf] = useState('')
  const [Date_Nais, setDate_Nais] = useState('')
  const [Cin, setCin] = useState('')
  const [Sexe, setSexe] = useState('') 
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, )
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
            <label>Nom:</label>
      <input 
        type="string" 
        onChange={(e) => setNom(e.target.value)} 
        value={Nom} 
      />
      <label>Prenom:</label>
       <input 
        type="string" 
        onChange={(e) => setPrenom(e.target.value)} 
        value={Prenom} 
      />
      <label>Numéro téléphone:</label>
      <input 
        type="string" 
        onChange={(e) => setTlf(e.target.value)} 
        value={Tlf} 
      /> 
      <label>Date_Naissance:</label>
      <input 
        type="Date" 
        onChange={(e) => setDate_Nais(e.target.value)} 
        value={Date_Nais} 
      />
      <label>Cin:</label>
       <input 
        type="string" 
        onChange={(e) => setCin(e.target.value)} 
        value={Cin} 
      />
<label>Sexe:</label>
<div class="sex-options">
  <label style={{ display: "inline-block", marginRight: "10px" }}>M</label>
  <label style={{ display: "inline-block", marginRight: "20px" }}>
    <input type="radio" name="sexe" value="M" onChange={(e) => setSexe(e.target.value)} checked={Sexe === 'M'} />
  </label>
  <label style={{ display: "inline-block", marginRight: "10px" }}>F</label>
  <label style={{ display: "inline-block" }}>
    <input type="radio" name="sexe" value="F" onChange={(e) => setSexe(e.target.value)} checked={Sexe === 'F'} />
  </label>
</div>






      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup