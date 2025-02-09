import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'

import { Link } from 'react-router-dom';
import SideBar from '../common/SideBar';
import { apiUrl, token } from '../common/Http';

const Dashboard = () => {

  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();

  const dashboardAnalytics = async () => {
    try {

      const res = await fetch(`${apiUrl}dashboard-analytics`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      if (result.status == 200) {
        setUsers(result.users);
        setProducts(result.products);
        setOrders(result.orders)
      } else {

        console.log(result.error)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dashboardAnalytics();
  }, []);

  return (
    <div>
      <Layout>

        <div className="container">
          <div className="row">

            <div className="d-flex justify-content-between mt-3">
              <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
            </div>
            <div className="col-md-3 py-4">
              <SideBar />
            </div>

            <div className="col-md-9">
              <div className="row mt-4">

                <div className="col-md-4 mb-3">
                  <div className='card shadow'>
                    <div className="card-body">
                      <h2>{users}</h2>
                      <span>Users</span>
                    </div>

                    <div className="card-footer">
                
                      <Link to="/admin/user/list">View Users</Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className='card shadow'>
                    <div className="card-body">
                      <h2>{products}</h2>
                      <span>Products</span>
                    </div>

                    <div className="card-footer">
                      <Link to="/admin/products">View Products</Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className='card shadow'>
                    <div className="card-body">
                      <h2>{orders}</h2>
                      <span>Orders</span>
                    </div>

                    <div className="card-footer">
                    <Link to="/admin/orders">View Orders</Link>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

      </Layout>
    </div>
  )
}

export default Dashboard
