import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="shadow">
      <div className="bg-dark text-center py-3">
        <span className="text-white">Your Fashion Partner</span>
      </div>

      <div className="container">
        <Navbar expand="lg" className="">
          <Link to="/">
            <img src={Logo} width={170} alt="Logo" />
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0">
              <Link className="nav-link" to="/shop">Shop</Link>
              <Link className="nav-link" to="#">Mens</Link>
              <Link className="nav-link" to="#">Women</Link>
              <Link className="nav-link" to="#">Kids</Link>
              <div className="nav-right d-flex mt-2">
                <Link to="/profile" className="me-3 ms-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                  </svg>
                </Link>

                <Link to="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                  </svg>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
          
        </Navbar>
      </div>
    </header>
  );
};

export default Header;