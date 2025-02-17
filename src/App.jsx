import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/common/Home'
import { Shop } from './components/common/Shop'
import Product from './components/common/Product'
import Cart from './components/common/Cart'
import Checkout from './components/common/Checkout'
import Login from './components/admin/Login'
import CustomerLogin from './components/customer/Login'

import { ToastContainer } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import CustomerDashboard from './components/customer/Dashboard'

import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import { CustomerRequireAuth } from './components/customer/CustomerRequireAuth'


import CategoryShow from './components/admin/category/Show'
import CategoryCreate from './components/admin/category/Create'
import CategoryUpdate from './components/admin/category/Update'


import ShippingShow from './components/admin/shipping/Show'
import ShippingCreate from './components/admin/shipping/Create'
import ShippingUpdate from './components/admin/shipping/Update'


import BrandShow from './components/admin/brand/Show'
import BrandCreate from './components/admin/brand/Create'
import BrandUpdate from './components/admin/brand/Update'
import ProductShow from './components/admin/product/Show'
import ProductCreate from './components/admin/product/Create'
import ProductUpdate from './components/admin/product/Update'
import Register from './components/common/Register'

import AdminProfile from './components/admin/Profile'
import CustomerProfile from './components/Customer/Profile'
import CategoryProduct from './components/common/CategoryProduct'

import UserList from './components/admin/UserList'
import PaymentSuccess from './components/common/PaymentSuccess'
import OrderList from './components/admin/OrderList'
import TransactionList from './components/admin/TransactionList'
import Invoice from './components/admin/Invoice'
import CustomerOrderList from './components/Customer/OrderList'
import CustomerInvoice from './components/Customer/Invoice'
import ProductReview from './components/admin/ProductReview'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />

          <Route path='/product/:id' element={<Product />} />
          <Route path='/product-by-category/:id' element={<CategoryProduct />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='/admin/login' element={<Login />} />

          <Route path='/login' element={<CustomerLogin />} />

          <Route path='/register' element={<Register />} />

          <Route path='/customer/dashboard' element={
            <CustomerRequireAuth>
              <CustomerDashboard />
            </CustomerRequireAuth>
          } />


          <Route path='/order/success' element={
            <CustomerRequireAuth>
              <PaymentSuccess />
            </CustomerRequireAuth>
          } />

          <Route path='/customer/order/list' element={
            <CustomerRequireAuth>
              <CustomerOrderList />
            </CustomerRequireAuth>
          } />


          <Route path='/customer/invoice/:id' element={
            <CustomerRequireAuth>
              <CustomerInvoice />
            </CustomerRequireAuth>
          } />

          <Route path='/checkout' element={
            <CustomerRequireAuth>
              <Checkout />
            </CustomerRequireAuth>
          } />

          <Route path='/customer/profile' element={
            <CustomerRequireAuth>
              <CustomerProfile />
            </CustomerRequireAuth>
          } />


          <Route path='/admin/profile' element={
            <AdminRequireAuth>
              <AdminProfile />
            </AdminRequireAuth>
          } />

          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <CategoryShow />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CategoryCreate />
            </AdminRequireAuth>
          } />


          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <CategoryUpdate />
            </AdminRequireAuth>
          } />




          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <BrandShow />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <BrandCreate />
            </AdminRequireAuth>
          } />


          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <BrandUpdate />
            </AdminRequireAuth>
          } />



          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ProductShow />
            </AdminRequireAuth>
          } />

          <Route path='/admin/products/create' element={
            <AdminRequireAuth>
              <ProductCreate />
            </AdminRequireAuth>
          } />


          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <ProductUpdate />
            </AdminRequireAuth>
          } />


          <Route path='/admin/user/list' element={
            <AdminRequireAuth>
              <UserList />
            </AdminRequireAuth>
          } />

          <Route path='/admin/orders' element={
            <AdminRequireAuth>
              <OrderList />
            </AdminRequireAuth>
          } />

          <Route path='/admin/transactions' element={
            <AdminRequireAuth>
              <TransactionList />
            </AdminRequireAuth>
          } />

          <Route path='/admin/invoice/:id' element={
            <AdminRequireAuth>
              <Invoice />
            </AdminRequireAuth>
          } />

          <Route path='/admin/product/review' element={
            <AdminRequireAuth>
              <ProductReview />
            </AdminRequireAuth>
          } />


          <Route path='/admin/shipping' element={
            <AdminRequireAuth>
              <ShippingShow />
            </AdminRequireAuth>
          } />

          <Route path='/admin/shipping/create' element={
            <AdminRequireAuth>
              <ShippingCreate />
            </AdminRequireAuth>
          } />


          <Route path='/admin/shipping/edit/:id' element={
            <AdminRequireAuth>
              <ShippingUpdate />
            </AdminRequireAuth>
          } />

        </Routes>

      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
