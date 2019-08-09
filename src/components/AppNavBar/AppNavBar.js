import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthenticationsAPI from '../../api/AuthenticationsAPI';
import './AppNavBar.css';

function AppNavBar({ username, setUserName }) {

  const [logedIn, setLogedIn ] = React.useState(false)

  const handleLogout = () => {
    AuthenticationsAPI.logout()
    localStorage.removeItem('username')
    setLogedIn(false)
    setUserName('')
  }

  React.useEffect(() => {
    setLogedIn(!!localStorage.getItem('username'))
  }, [localStorage.getItem('username')])

  const logInOrOut = () => {
    if(logedIn){
      return <Nav.Link href="/login" onSelect={handleLogout}>Logout</Nav.Link>
    }
  }

  return (
    <div>
      <Navbar className="bg-light justify-content-between" expand="lg">
        <Navbar.Brand><h2 className="ml-5 font-weight-bold">$ubReckoner</h2></Navbar.Brand>
        <Nav.Item>
          {logedIn && <Nav.Link href='/' className={window.location.pathname === '/' && 'active'}>Report by Month</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/addsubscription' className={window.location.pathname === '/addsubscription' && 'active'}>Add New Subscription</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/subscriptionlist' className={window.location.pathname === '/subscriptionlist' && 'active'}>Subscription List</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          { username }
        </Nav.Item>
        <Nav.Item>
          {logInOrOut()}
        </Nav.Item>
      </Navbar>
    </div>
  )
}

export default AppNavBar;