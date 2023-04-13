// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Avatar from "../banner/avatar";

function postcontainer({ content, profiles}) {
  return (
    <fragment className="w-full h-fit bg-white-sr px-5 py-[30px] rounded-[10px] drop-shadow-komponenIsi flex flex-col gap-5">
      {/* <!-- start header postingan  --> */}
      <fragment className="flex flex-row justify-between items-start">
        <fragment className="flex flex-row gap-2.5 items-center">
          <Avatar url={profiles.avatar} />
          <fragment>
            <fragment className="text-base font-semibold text-black-sr h-fit pr-5 ">
              {profiles.username}
            </fragment>
            <fragment className="flex flex-row gap-[2px]">
              {/* <fragment className="font-semibold text-xs text-oldgray-sr">
              00000078998
            </fragment> */}
              <fragment className="flex flex-row gap-[2px] text-xs text-oldgray-sr font-normal">
                <span>20</span>Hours Ago
              </fragment>
            </fragment>
          </fragment>
        </fragment>

        <i className="fi fi-rr-bookmark text-xl pt-[7px] cursor-pointer text-oldgray-sr"></i>
      </fragment>
      {/* <!-- end header postingan  --> */}

      {/* <!-- start konten caption isi postingan  --> */}
      <p className="font-medium text-black-sr text-sm">{content}</p>
      {/* <!-- end konten caption isi postingan  --> */}

      {/* <!-- start komponen slider gambar postingan  --> */}
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-full h-fit "
      >
        <SwiperSlide className="cursor-pointer z-0 h-[350px]">
          <img
            src="/slider-login/slider 1.jpg"
            alt="slider1"
            className="w-full h-full object-center object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer z-0 h-[350px]">
          <img
            src="/slider-login/slider 2.jpg"
            alt="slider2"
            className="w-full h-full object-center object-cover "
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer z-0 h-[350px]">
          <img
            src="/slider-login/slider 3.jpg"
            alt="slider3"
            className="w-full h-full object-center object-cover"
          />
        </SwiperSlide>
      </Swiper>
      {/* <!-- end komponen slider gambar postingan  --> */}

      {/* start status like & comment  */}
      <fragment className="flex flex-row justify-between items-center">
        <fragment className="flex flex-row items-center gap-2.5 h-fit">
          <i className="fi fi-sr-thumbs-up text-xl h-[23px] cursor-pointer text-oldgray-sr "></i>
          <fragment className="flex flex-row gap-[2px] font-semibold text-xs text-oldgray-sr">
            <span>50</span>Likes
          </fragment>
        </fragment>
        <fragment>
          <fragment className="font-semibold text-xs text-oldgray-sr flex flex-row gap-[2px] cursor-pointer">
            <span>20</span>Comments
          </fragment>
        </fragment>
      </fragment>
      {/* end status like & comment  */}
      <hr className="w-full h-[1px] bg-gray-sr"></hr>
      {/* <!-- start button cta postingan  --> */}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        className="!w-full !shadow-none !rounded-none !flex !flex-row !gap-[5px]"
      >
        <Button
          className="ctapostbutton"
          startIcon={<i className="fi fi-rr-social-network menu-icon"></i>}
        >
          Like
        </Button>
        <Button
          className="ctapostbutton"
          startIcon={<i className="fi fi-rr-arrows-retweet menu-icon "></i>}
        >
          Resircle
        </Button>
        <Button
          className="ctapostbutton"
          startIcon={<i className="fi fi-rr-comment-alt  menu-icon "></i>}
        >
          Comment
        </Button>
      </ButtonGroup>
      {/* <!-- end button cta postingan --> */}
    </fragment>
  );
}

export default postcontainer;
