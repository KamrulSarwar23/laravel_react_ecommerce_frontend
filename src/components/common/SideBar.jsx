import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link, useLocation } from "react-router-dom";


const SideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const { logout } = useContext(AdminAuthContext);
  return (
    <div>
      <div className="card shadow sidebar mb-3">
        <div className="card-body">
          <ul>
            <li className={isActive("/dashboard") ? "active" : ""}><Link to={'/dashboard'}>Dashboard</Link></li>
            <li className={isActive("/categories") ? "active" : ""}><Link to={'/categories'}>Category</Link></li>
            <li><a href="">Brands</a></li>
            <li><a href="">Products</a></li>
            <li><a href="">Orders</a></li>
            <li><a href="">Users</a></li>
            <li><a href="">Shipping</a></li>
            <li><a href="">Change Password</a></li>
            <li><Link onClick={logout} href="#">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
