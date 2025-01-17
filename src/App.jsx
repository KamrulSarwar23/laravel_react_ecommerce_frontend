import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/common/Home'
import { Shop } from './components/common/Shop'
import Product from './components/common/Product'
import Cart from './components/common/Cart'
import Checkout from './components/common/Checkout'
import Login from './components/admin/Login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

import CategoryShow from './components/admin/category/Show'
import CategoryCreate from './components/admin/category/Create'
import CategoryUpdate from './components/admin/category/Update'


import BrandShow from './components/admin/brand/Show'
import BrandCreate from './components/admin/brand/Create'
import BrandUpdate from './components/admin/brand/Update'
import ProductShow from './components/admin/product/Show'
import ProductCreate from './components/admin/product/Create'
import ProductUpdate from './components/admin/product/Update'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/admin/login' element={<Login />} />


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

        </Routes>

      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
