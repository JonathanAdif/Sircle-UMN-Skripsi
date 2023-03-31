// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function postcontainer() {
  return (
    <div className="w-full h-fit bg-white-sr px-5 py-[30px] rounded-[10px] drop-shadow-komponenIsi flex flex-col gap-5">
      {/* <!-- start header postingan  --> */}
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row gap-2.5 items-center">
          <img
            src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
            className="w-[45px] lg:w-[45px] rounded-full cursor-pointer"
            alt="Avatar"
          />
          <div>
            <div className="text-base font-semibold text-black-sr">
              Luiz Clint Harry
            </div>
            <div className="flex flex-row gap-[2px]">
              {/* <div className="font-semibold text-xs text-oldgray-sr">
              00000078998
            </div> */}
              <div className="flex flex-row gap-[2px] text-xs text-oldgray-sr font-normal">
                <span>20</span>Hours Ago
              </div>
            </div>
          </div>
        </div>

        <i className="fi fi-rr-bookmark text-xl pt-[7px] cursor-pointer text-oldgray-sr"></i>
      </div>
      {/* <!-- end header postingan  --> */}

      {/* <!-- start konten caption isi postingan  --> */}
      <p className="font-medium text-black-sr text-sm">
        Halo teman-teman, saya baru saja melakukan suatu proyek yang bagus
        menurut saya dengan memotret beberapa foto-foto pemandangan yang cukup
        indah, berikut merupakan hasil dari foto-foto saya.
      </p>
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
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2.5 h-fit">
          <i className="fi fi-sr-thumbs-up text-xl h-[23px] cursor-pointer text-oldgray-sr "></i>
          <div className="flex flex-row gap-[2px] font-semibold text-xs text-oldgray-sr">
            <span>50</span>Likes
          </div>
        </div>
        <div>
          <div className="font-semibold text-xs text-oldgray-sr flex flex-row gap-[2px] cursor-pointer">
            <span>20</span>Comments
          </div>
        </div>
      </div>
      {/* end status like & comment  */}
      <hr className="w-full h-[1px] bg-gray-sr"></hr>
      {/* <!-- start button cta postingan  --> */}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        className="w-full !shadow-none !rounded-none flex flex-row gap-[5px]"
      >
        <Button
          className="w-full text-oldgray-sr py-[10px] hover:bg-birulogo-sr hover:text-white-sr  bg-white-sr capitalize !border-none !shadow-none !rounded-[5px] "
          startIcon={<i className="fi fi-rr-social-network menu-icon"></i>}
        >
          Like
        </Button>
        <Button
          className="w-full text-oldgray-sr py-[10px] hover:bg-birulogo-sr hover:text-white-sr  bg-white-sr capitalize !border-none !shadow-none !rounded-[5px] "
          startIcon={<i className="fi fi-rr-arrows-retweet menu-icon "></i>}
        >
          Resircle
        </Button>
        <Button
          className="w-full text-oldgray-sr py-[10px] hover:bg-birulogo-sr hover:text-white-sr  bg-white-sr capitalize !border-none !shadow-none !rounded-[5px] "
          startIcon={<i className="fi fi-rr-comment-alt  menu-icon "></i>}
        >
          Comment
        </Button>
      </ButtonGroup>
      {/* <!-- end button cta postingan --> */}
    </div>
  );
}

export default postcontainer;
