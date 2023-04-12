// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// module untuk google button
import GoogleButton from "react-google-button";
import { supabase } from "@/lib/supabase"; //digunakan karena env dibaca secara manual

export default function Home() {
  async function GoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <main className=" p-[20px] lg:py-[5%]">
      <fragment className=" w-full lg:w-[940px] h-screen lg:h-[525px] bg-white-sr lg:m-auto rounded-[10px] flex lg:flex-row drop-shadow-login2 flex-col">
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

        <fragment className=" h-2/3 lg:h-full w-full rounded-r-[10px] flex flex-col justify-between py-[70px]">
          <fragment className="flex flex-col items-center">
            <img
              src="/favicon.png"
              alt="logo"
              className="w-[60px] lg:w-[90px] h-[60px] lg:h-[90px] object-cover"
            />
            <img
              src="/logotulisan.png"
              alt="logotulisan"
              className="w-[150px] lg:w-[215px] h-[65px] lg:h-[100px] object-cover"
            />
          </fragment>
          <fragment className=" w-full h-fit flex flex-col items-center px-[50px]">
            <GoogleButton
              className="!w-full !font-poppins "
              onClick={GoogleLogin}
            />
          </fragment>
          <fragment className="w-full text-center mt-5 lg:mt-8 font-medium text-oldgray-sr text-[10px] lg:text-xs flex flex-col">
            <fragment>Copyright @ 2023 JA - GK</fragment>
            <fragment>Version 0.1.0</fragment>
          </fragment>
        </fragment>
      </fragment>
    </main>
  );
}
