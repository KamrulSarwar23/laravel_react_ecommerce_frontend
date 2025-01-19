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
            <li className={isActive("/admin/dashboard") ? "active" : ""}><Link to={'/admin/dashboard'}>Dashboard</Link></li>
            <li className={isActive("/admin/categories") ? "active" : ""}><Link to={'/admin/categories'}>Category</Link></li>
            <li className={isActive("/admin/brands") ? "active" : ""}><Link to={'/admin/brands'}>Brands</Link></li>
            <li className={isActive("/admin/products") ? "active" : ""}><Link to={'/admin/products'}>Products</Link></li>
       
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
