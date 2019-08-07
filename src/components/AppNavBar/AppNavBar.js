import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthenticationsAPI from '../../api/AuthenticationsAPI';

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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>SubReckoner</Navbar.Brand>
        <Nav.Item>
          {logInOrOut()}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/addsubscription'>Add New Subscription</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/subscriptionlist'>Subscription List</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link href='/'>Report by Month</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          { username }
        </Nav.Item>
      </Navbar>
    </div>
  )
}

export default AppNavBar;