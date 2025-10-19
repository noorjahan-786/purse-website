import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {/* ---- Slide 1 ---- */}
        <SwiperSlide>
          <Link to="/men" className="block w-full bg-white">
            <img
              src={assets.menPurse_hero}
              alt="Men's purse"
              className="
                w-full
                h-[180px]
                sm:h-[250px]
                md:h-[350px]
                lg:h-[420px]
                xl:h-[450px]
                object-contain
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-[1.01]
                bg-white
              "
            />
          </Link>
        </SwiperSlide>

        {/* ---- Slide 2 ---- */}
        <SwiperSlide>
          <Link to="/women" className="block w-full bg-white">
            <img
              src={assets.womenPurse_hero}
              alt="Women's purse"
              className="
                w-full
                h-[180px]
                sm:h-[250px]
                md:h-[350px]
                lg:h-[420px]
                xl:h-[450px]
                object-contain
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-[1.01]
                bg-white
              "
            />
          </Link>
        </SwiperSlide>

        {/* ---- Slide 3 ---- */}
        <SwiperSlide>
          <Link to="/kid" className="block w-full bg-white">
            <img
              src={assets.menBelt_hero}
              alt="Men's belt"
              className="
                w-full
                h-[180px]
                sm:h-[250px]
                md:h-[350px]
                lg:h-[420px]
                xl:h-[450px]
                object-contain
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-[1.01]
                bg-white
              "
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;

