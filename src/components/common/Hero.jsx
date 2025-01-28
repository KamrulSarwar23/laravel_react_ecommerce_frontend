import React from 'react'
import Hero1 from '../../assets/images/banner-1.jpg'
import Hero2 from '../../assets/images/banner-2.jpg'
import Hero3 from '../../assets/images/banner-3.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Hero = () => {
  return (
    <section className='section-1'>
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}

      breakpoints={{
        1024: {
          slidesPerView: 1,
          spaceBetween: 0,
        }
      }}>

      <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${Hero1})` }}></div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${Hero2})` }}></div>
      </SwiperSlide>


      <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${Hero3})` }}></div>
      </SwiperSlide>

  

    </Swiper>
  </section>
  )
}

export default Hero
