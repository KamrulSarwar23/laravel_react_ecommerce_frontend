import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import Layout from './Layout';


const PaymentSuccess = () => {


  return (
      <Layout>
          <div className='py-5 text-center text-success'>
            <h1 className='py-5'>Order Placed Successfully</h1>
        </div>
      </Layout>
  );
};

export default PaymentSuccess;
