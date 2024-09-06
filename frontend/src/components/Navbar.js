import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user, setUser } = useAuthContext()

  const handleClick = () => {
    logout()
    setUser(null)
  }

  return (
    <header>
      <div className="hnav container">
        <Link to="/">
          <h1>TDC</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
      
    </header>
  )
}

export default Navbar
