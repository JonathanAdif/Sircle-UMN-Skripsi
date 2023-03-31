// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function forgotPasspage() {
  return (
    <main className=" p-[20px] lg:py-[5%]">
      <div className=" w-full lg:w-[940px] h-screen lg:h-[525px] bg-white-sr lg:m-auto rounded-[10px] flex lg:flex-row drop-shadow-login2 flex-col">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-1/3 lg:h-full w-full lg:rounded-l-[10px] lg:rounded-tr-[0px] rounded-t-[10px]"
        >
          <SwiperSlide>
            <img
              src="/slider-login/slider 1.jpg"
              alt="slider1"
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider-login/slider 2.jpg"
              alt="slider2"
              className="w-full h-full object-center object-cover "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider-login/slider 3.jpg"
              alt="slider3"
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className=" h-2/3 lg:h-full w-full rounded-r-[10px]">
          <div className="pt-[35px] flex flex-col items-center">
            <img
              src="/favicon.png"
              alt="logo"
              className="w-[65px] lg:w-[95px] h-[65px] lg:h-[95px] object-cover"
            />
            <img
              src="/logotulisan.png"
              alt="logotulisan"
              className="w-[155px] lg:w-[220px] h-[70px] lg:h-[105px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 w-full px-[50px] py-[15px]">
            <TextField
              required
              id="outlined-required"
              label="University Email"
              defaultValue="john.wick@student.umn.ac.id"
            />
            <Button
              variant="contained"
              size="large"
              className=" bg-birulogo-sr !capitalize "
            >
              Reset Password
            </Button>

            <div className="w-full text-center font-medium text-birulogo-sr text-[10px] lg:text-xs ">
              <Link Link href="/" className="cursor-pointer">
                Login ?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mt-5 lg:mt-8 font-medium text-oldgray-sr text-[10px] lg:text-xs">
        Copyright @ 2023 JA - GK
      </div>
    </main>
  );
}
