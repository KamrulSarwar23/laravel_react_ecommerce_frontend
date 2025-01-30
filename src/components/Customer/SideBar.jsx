import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiUrl, customerToken, token } from '../common/Http';
import { CustomerAuthContext } from '../context/CustomerAuth';

const SideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);
  const navigate = useNavigate();
  const { logout } = useContext(CustomerAuthContext);

  const logoutAdmin = async () => {
    const res = await fetch(`${apiUrl}customer/logout`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${customerToken()}`,
      },
    });

    if (res.status == 200) {
      logout()
      localStorage.removeItem('customerInfo');
      navigate('/login');
      toast.success('Logout Successfully')
    }

  };

  return (
    <div>
      <div className="card shadow sidebar mb-3">
        <div className="card-body">
          <ul>
            <li className={isActive("/customer/dashboard") ? "active" : ""}><Link to={'/customer/dashboard'}>Dashboard</Link></li>
            <li><a href="">Orders</a></li>
            <li className={isActive("/customer/profile") ? "active" : ""}><Link to={'/customer/profile'}>Profile</Link></li>
            <li><Link onClick={logoutAdmin} href="#">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
