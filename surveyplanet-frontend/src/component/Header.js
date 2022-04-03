import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, LinkContainer } from "react-bootstrap";


const Header = () => {

    const userInfo = localStorage.getItem('userInfo')
    const history = useHistory()
    const LogoutHandler = () =>{
      localStorage.removeItem('userInfo')
      history.push('/login')
     
    }
    return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='px-5'
      >
        <Link to='/'>
        <Navbar.Brand >SURVEY PLANET</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav style={{ marginLeft: "auto" }}>
              {userInfo ?
              <>  
            <Link to='/'>
            <Nav.Link href='/'>
              <i className='fas fa-shopping-cart'></i>Survey List
            </Nav.Link>
            </Link>

            <Link onClick={LogoutHandler} >
            <Nav.Link >
              <i className='fas fa-shopping-cart'>Logout</i>
            </Nav.Link>
            </Link>
            </>
            :
            <>  
            <Link to='/login'>
            <Nav.Link href='/login'>
              <i className='fas fa-shopping-cart'></i>login
            </Nav.Link>
            </Link>

            <Link to='/registration'>
            <Nav.Link href='/registration'>
              <i className='fas fa-shopping-cart'>registration</i>
            </Nav.Link>
            </Link>
            </>
            
            }
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;