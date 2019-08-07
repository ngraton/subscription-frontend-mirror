import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function AppNavBar() {

  const [logedIn, setLogedIn ] = React.useState(!!localStorage.getItem('username'))

  const handleLogout = () => {
    localStorage.removeItem('username')
    setLogedIn(false)
  }

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
          {logedIn && <Nav.Link to='/addsubscription'>Add New Subscription</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link to='/subscriptionlist'>Subscription List</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {logedIn && <Nav.Link to='/'>Report by Month</Nav.Link>}
        </Nav.Item>
      </Navbar>
    </div>
  )
}

export default AppNavBar;