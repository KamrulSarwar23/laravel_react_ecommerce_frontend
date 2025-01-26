import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }


  return (
    <div>
      <Header />
      {children}
      <Footer />

      <button onClick={() => scrollTop()} id="scrollToTop" className="scroll-to-top"><i className="fa-solid fa-arrow-up"></i></button>
    </div>
  )
}

export default Layout
