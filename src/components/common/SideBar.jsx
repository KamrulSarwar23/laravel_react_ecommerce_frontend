import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiUrl, token } from './Http';
import { toast } from 'react-toastify';

const SideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);
  const navigate = useNavigate();
  const { logout } = useContext(AdminAuthContext);

  const logoutAdmin = async () => {
    const res = await fetch(`${apiUrl}logout`, {
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
      navigate('/admin/login');
       toast.success('Logout Successfully')
    }
    
  };

  return (
    <div>
      <div className="card shadow sidebar mb-3">
        <div className="card-body">
          <ul>
            <li className={isActive("/admin/dashboard") ? "active" : ""}><Link to={'/admin/dashboard'}>Dashboard</Link></li>
            <li className={isActive("/admin/categories") ? "active" : ""}><Link to={'/admin/categories'}>Category</Link></li>
            <li className={isActive("/admin/brands") ? "active" : ""}><Link to={'/admin/brands'}>Brands</Link></li>
            <li className={isActive("/admin/products") ? "active" : ""}><Link to={'/admin/products'}>Products</Link></li>
            <li className={isActive("/admin/orders") ? "active" : ""}><Link to={'/admin/orders'}>Orders</Link></li>
            <li className={isActive("/admin/transactions") ? "active" : ""}><Link to={'/admin/transactions'}>Transactions</Link></li>
            <li className={isActive("/admin/shipping") ? "active" : ""}><Link to={'/admin/shipping'}>Shipping</Link></li>
            <li className={isActive("/admin/user/list") ? "active" : ""}><Link to={'/admin/user/list'}>Users</Link></li>
            <li className={isActive("/admin/product/review") ? "active" : ""}><Link to={'/admin/product/review'}>Review</Link></li>
            <li className={isActive("/admin/profile") ? "active" : ""}><Link to={'/admin/profile'}>Profile</Link></li>
            <li><Link onClick={logoutAdmin} href="#">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
