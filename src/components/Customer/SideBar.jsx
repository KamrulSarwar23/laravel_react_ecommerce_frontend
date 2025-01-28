import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import { apiUrl, token } from '../common/Http';

const SideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);
  const navigate = useNavigate();
  const { logout } = useContext(AdminAuthContext);

  const logoutAdmin = async () => {
    const res = await fetch(`${apiUrl}customer/logout`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    if (res.status == 200) {
      logout()
      localStorage.removeItem('adminInfo');
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
            <li><a href="">Users</a></li>
            <li><a href="">Change Password</a></li>
            <li><Link onClick={logoutAdmin} href="#">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
