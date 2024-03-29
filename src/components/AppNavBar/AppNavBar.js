import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
  }, [])

  const logInOrOut = () => {
    if(logedIn){
      return <a href="/login" onClick={handleLogout}>Logout</a>
    }
  }

  return (
    <div>
      <Navbar className="bg-light justify-content-between" expand="lg">
        <Navbar.Brand><h2 className="ml-4 font-weight-bold">$ubReckoner</h2></Navbar.Brand>
        <Nav.Item>
          {logedIn && <Nav.Link href='/' className={window.location.pathname === '/' && 'active'}>Total Monthly Subscriptions</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/addsubscription' className={window.location.pathname === '/addsubscription' && 'active'}>Add New Subscription</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/subscriptionlist' className={window.location.pathname === '/subscriptionlist' && 'active'}>Your Subscriptions</Nav.Link>}
        </Nav.Item>
        {logedIn &&
        <NavDropdown title="Reports" id="nav-dropdown">
        <NavDropdown.Item href='/monthlygraph' eventKey="4.1">This Month</NavDropdown.Item>
        <NavDropdown.Item href='/annualgraph' eventKey="4.2">This Year</NavDropdown.Item>
      </NavDropdown>}
        <Nav.Item>
        {logedIn && <>{ username + ':' }</>}{logInOrOut()}
        </Nav.Item>
      </Navbar>
    </div>
  )
}

export default AppNavBar;