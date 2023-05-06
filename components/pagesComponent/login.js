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
              src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/login-slider1?t=2023-04-21T00%3A33%3A58.278Z"
              alt="slider1"
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/login-slider2?t=2023-04-21T00%3A34%3A22.123Z"
              alt="slider2"
              className="w-full h-full object-center object-cover "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/login-slider3?t=2023-04-20T14%3A23%3A53.661Z"
              alt="slider3"
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className=" h-2/3 lg:h-full w-full rounded-r-[10px] flex flex-col justify-between py-[70px]">
          <div className="flex flex-col items-center">
            <img
              src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/favicon.png?t=2023-04-20T14%3A22%3A50.785Z"
              alt="logo"
              className="w-[60px] lg:w-[90px] h-[60px] lg:h-[90px] object-cover"
            />
            <img
              src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/logotulisan.png?t=2023-04-20T14%3A24%3A37.216Z"
              alt="logotulisan"
              className="w-[150px] lg:w-[215px] h-[65px] lg:h-[100px] object-cover"
            />
          </div>
          <div className=" w-full h-fit flex flex-col items-center px-[50px]">
            <GoogleButton
              className="!w-full !font-poppins "
              onClick={GoogleLogin}
            />
          </div>
          <div className="w-full text-center mt-5 lg:mt-8 font-medium text-oldgray-sr text-[10px] lg:text-xs flex flex-col">
            <div>Copyright @ 2023 JA - GK</div>
            <div>Version 0.1.0</div>
          </div>
        </div>
      </div>
    </main>
  );
}
