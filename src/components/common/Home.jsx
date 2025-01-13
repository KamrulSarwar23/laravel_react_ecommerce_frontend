import React from 'react'

import LatestProduct from './LatestProduct';
import FeaturedProduct from './FeaturedProduct';
import Hero from './Hero';
import Layout from './Layout';

export const Home = () => {
  return (

    <div>


      <Layout>

        <Hero />

        <LatestProduct />

        <FeaturedProduct />

      </Layout>




    </div>


  )
}
