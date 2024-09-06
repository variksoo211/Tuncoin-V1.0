import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde, statut) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde, statut })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

console.log("email", email);
console.log("password", password);
console.log("Nom", Nom);
console.log("Prenom", Prenom);
console.log("Tlf", Tlf);
console.log("Date_Nais", Date_Nais);
console.log("Cin", Cin);
console.log("Sexe", Sexe);
console.log("Sexe", statut);

    }
  }
  

  return { signup, isLoading, error }
}