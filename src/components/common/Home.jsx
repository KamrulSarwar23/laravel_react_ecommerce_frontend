import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png'
import Logo2 from '../../assets/images/logo-white.png'
import Hero1 from '../../assets/images/banner-1.jpg'
import Hero2 from '../../assets/images/banner-2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import LatestProduct from './LatestProduct';
import FeaturedProduct from './FeaturedProduct';

export const Home = () => {
  return (

    <div>
      <header className='shadow'>
        <div className='bg-dark text-center py-3'>
          <span className='text-white'>Your Fashion Partner</span>
        </div>

        <div className="container">
          <Navbar expand="lg" className="">

            <Navbar.Brand href="#">
              <img src={Logo} width={170} alt="" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0">
                <Nav.Link href="#action1">Mens</Nav.Link>
                <Nav.Link href="#action2">Women</Nav.Link>
                <Nav.Link href="#action2">Kids</Nav.Link>
                <div className='nav-right d-flex mt-2'>

                  <a href="" className='me-3 ms-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path></svg>
                  </a>

                  <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path></svg></a>
                </div>
              </Nav>

            </Navbar.Collapse>

          </Navbar>
        </div>
      </header>

      <section className='section-1'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}

          breakpoints={{
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            }
          }}>

          <SwiperSlide>
            <div className="content" style={{ backgroundImage: `url(${Hero1})` }}></div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="content" style={{ backgroundImage: `url(${Hero2})` }}></div>
          </SwiperSlide>

        </Swiper>
      </section>


      <LatestProduct />
      <FeaturedProduct />


      <footer className='py-5 text-white'>
        <div className="container pt-4">
          <div className="row">
            <div className='col-md-3 mb-4'>
              <img width={170} src={Logo2} alt="" />
              <div className='logobottom-text pt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, veniam.</div>
            </div>

            <div className='col-md-3 mb-4'>
              <h3 className='mb-3'>Categories</h3>
              <ul>
                <li>
                  <a href="">Mens</a>
                </li>
                <li>
                  <a href="">Women</a>
                </li>
                <li>
                  <a href="">Kids</a>
                </li>
              </ul>

            </div>

            <div className='col-md-3 mb-4'>
            <h3 className='mb-3'>Quick Links</h3>
              <ul>
                <li>
                  <a href="">Login</a>
                </li>
                <li>
                  <a href="">Register</a>
                </li>
  
              </ul>
            </div>

            <div className='col-md-3 mb-4'>
              <h3 className='mb-3'>Get in Touch</h3>

              <ul>
                <li>
                  <a href="">01646-669099</a>
                </li>
                <li>
                  <a href="">kh4035209@gmail.com</a>
                </li>
  
              </ul>


            </div>
          </div>
        </div>
      </footer>

    </div>


  )
}
