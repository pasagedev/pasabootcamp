import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../reducers/userReducer'

export const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear('loggedBlogAppUser')
    dispatch(removeUser())
  }

  const padding = {
    padding: '5px'
  }

  return(
    <Navbar collapseOnSelect expand="lg" bg='light' >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/blogs'>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/users'>users</Link>
          </Nav.Link>
          <NavDropdown id="dropdown-nav-user" title={`${user.username} logged in`}  >
            <NavDropdown.Item href="/login" onClick={handleLogout}>
              logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

