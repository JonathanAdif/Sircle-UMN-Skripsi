// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import Avatar from "../banner/avatar";
import ReactTimeAgo from "react-time-ago";

import { useContext, useState, useEffect } from "react";

import { UserContext } from "@/context/userContext";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function postcontainer({ content, profiles: writerprofile, created_at }) {
  // start toggle comment
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  // end toggle comment

  const { profile: myProfile } = useContext(UserContext);

  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <fragment className="w-full h-fit bg-white-sr px-5 py-[30px] rounded-[10px] drop-shadow-sm flex flex-col gap-5">
      {/* <!-- start header postingan  --> */}
      <fragment className="flex flex-row justify-between items-start">
        <fragment className="flex flex-row gap-2.5 items-center">
          <Avatar url={writerprofile.avatar} />
          <fragment>
            <fragment className="text-base font-semibold text-black-sr h-fit pr-5 ">
              {writerprofile.username}
            </fragment>
            <fragment className="flex flex-row gap-[2px]">
              {/* <fragment className="font-semibold text-xs text-oldgray-sr">
              00000078998
            </fragment> */}
              <fragment className="flex flex-row gap-[2px] text-xs text-oldgray-sr !font-normal">
                <ReactTimeAgo date={created_at} />
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
      <fragment>
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
            <a
              data-fancybox="single"
              data-download-src="/slider-login/slider 1.jpg"
              href="/slider-login/slider 1.jpg"
            >
              <img
                src="/slider-login/slider 1.jpg"
                alt="slider1"
                className="w-full h-full object-center object-cover"
              />
            </a>
          </SwiperSlide>

          <SwiperSlide className="cursor-pointer z-0 h-[350px]">
            <a
              data-fancybox="single"
              data-download-src="/slider-login/slider 2.jpg"
              href="/slider-login/slider 2.jpg"
            >
              <img
                src="/slider-login/slider 2.jpg"
                alt="slider2"
                className="w-full h-full object-center object-cover "
              />
            </a>
          </SwiperSlide>
          <SwiperSlide className="cursor-pointer z-0 h-[350px]">
            <a
              data-fancybox="single"
              data-download-src="/slider-login/slider 3.jpg"
              href="/slider-login/slider 3.jpg"
            >
              <img
                src="/slider-login/slider 3.jpg"
                alt="slider3"
                className="w-full h-full object-center object-cover"
              />
            </a>
          </SwiperSlide>
        </Swiper>
        {/* <!-- end komponen slider gambar postingan  --> */}

        {/* start status like & comment  */}
        <fragment className="flex flex-col gap-1.5">
          <fragment className="flex flex-row justify-between items-center">
            <fragment className="flex flex-row items-center h-fit">
              {/* <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_wovxkf33.json"  background="transparent"  speed="1"  style="width: 20px; height: 20px;" hover loop  autoplay></lottie-player> */}
              <lottie-player
                id="firstLottie"
                hover
                loop
                speed="1"
                mode="normal"
                src="https://assets10.lottiefiles.com/packages/lf20_wovxkf33.json"
                style={{ width: "50px" }}
              ></lottie-player>
              <fragment className="flex flex-row gap-[2px] font-normal text-xs text-oldgray-sr pt-1.5">
                <span>50</span>Likes
              </fragment>
            </fragment>
            <fragment>
              <fragment
                className=" font-normal text-xs text-oldgray-sr flex flex-row gap-[2px] cursor-pointer pt-1.5"
                onClick={handleClick}
              >
                <span>20</span>Comments
              </fragment>
            </fragment>
          </fragment>
          {/* end status like & comment  */}
          <hr className="w-full h-[1px] bg-gray-sr"></hr>
        </fragment>
      </fragment>

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
          onClick={handleClick}
        >
          Comment
        </Button>
      </ButtonGroup>
      {/* <!-- end button cta postingan --> */}
      {toggle ? (
        <fragment className="flex flex-row items-center gap-2.5">
          <Avatar url={myProfile?.avatar} />
          <TextareaAutosize
            className="w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none !font-normal"
            placeholder="Say something about this post..."
          />
        </fragment>
      ) : (
        <></>
      )}
    </fragment>
  );
}

export default postcontainer;
