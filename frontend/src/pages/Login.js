import { useEffect, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"

const Login = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  useEffect(() => {
    if (user && email !== "admin@admin.admin") {
      navigate('/dashbord');
    }
  }, [user, email, navigate]);

  useEffect(() => {
    if (user && email === "admin@admin.admin") {
      navigate('/admin');
    }
  }, [user, email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

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

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
