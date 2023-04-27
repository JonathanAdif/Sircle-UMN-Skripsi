// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Link from "next/link";

import Avatar from "../avatarCover/avatar";
import ReactTimeAgo from "react-time-ago";

import { useContext, useState, useEffect } from "react";

import { UserContext } from "@/context/userContext";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

function postcontainer({
  id,
  content,
  profiles: writerprofile,
  created_at,
  photos,
  videos,
}) {
  // start toggle comment
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  // end toggle comment

  const supabase = useSupabaseClient();

  const [likes, setLikes] = useState([]);

  const { profile: myProfile } = useContext(UserContext);

  const likedButton = "!w-full !font-medium !text-white-sr !py-[10px]  hover:!bg-birulogo-sr hover:!text-white-sr   !bg-birulogo-sr !capitalize !border-none !shadow-none !rounded-[5px]";
  const nonlikedButton = "ctapostbutton";

  useEffect(() => {
    fetchLikes();
    import("@lottiefiles/lottie-player");
  });

  function fetchLikes() {
    supabase
      .from("likes")
      .select()
      .eq("post_id", id)
      .then((result) => setLikes(result.data));
  }

  const ihaveLike = !!likes.find((like) => like.user_id === myProfile?.id);

  function likeToggle() {
    if (ihaveLike) {
      supabase
        .from("likes")
        .delete()
        .eq("post_id", id)
        .eq("user_id", myProfile.id)
        .then(() => {
          fetchLikes();
        });
      return;
    }
    supabase
      .from("likes")
      .insert({
        post_id: id,
        user_id: myProfile.id,
      })
      .then((result) => {
        fetchLikes();
      });
  }

  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  return (
    <div className="w-full h-fit bg-white-sr px-5 py-[30px] rounded-[10px] drop-shadow-sm flex flex-col gap-5">
      {/* <!-- start header postingan  --> */}
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row gap-2.5 items-center">
          <Avatar url={writerprofile.avatar} />
          <div>
            <Link href={"/profile/" + writerprofile.id}>
              <div className="text-base font-semibold text-black-sr h-fit pr-5 ">
                {writerprofile.username}
              </div>
            </Link>
            <div className="flex flex-row gap-[2px]">
              <div className="flex flex-row gap-[2px] text-xs text-oldgray-sr !font-normal">
                <ReactTimeAgo date={new Date(created_at).getTime()} />
              </div>
            </div>
          </div>
        </div>

        <i className="fi fi-rr-bookmark text-xl pt-[7px] cursor-pointer text-oldgray-sr"></i>
      </div>
      {/* <!-- end header postingan  --> */}

      {/* <!-- start konten caption isi postingan  --> */}
      <p className="font-medium text-black-sr text-sm">{content}</p>
      {/* <!-- end konten caption isi postingan  --> */}
      <div>
        {/* <!-- start komponen slider gambar postingan  --> */}
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper w-full h-fit "
        >
          {photos?.length > 0 &&
            photos.map((photo) => (
              <SwiperSlide className="!cursor-pointer !z-0 !h-[320px]">
                <a
                  data-fancybox="single"
                  // data-download-src="/slider-login/slider 1.jpg"
                  href={photo}
                >
                  <img
                    src={photo}
                    alt="Media"
                    className="!w-full !h-full !object-center !object-fill"
                  />
                </a>
              </SwiperSlide>
            ))}

          {videos?.length > 0 &&
            videos.map((video) => (
              <SwiperSlide className="!cursor-pointer !z-0 !h-[320px]">
                <a
                  data-fancybox="single"
                  // data-download-src="/slider-login/slider 1.jpg"
                  href={video}
                >
                  <video controls className="!w-full !h-full !object-fill ">
                    <source src={video} type="video/mp4" />
                  </video>
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* <!-- end komponen slider gambar postingan  --> */}

        {/* start status like & comment  */}
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center h-fit">
              <lottie-player
                id="firstLottie"
                hover
                loop
                speed="1"
                mode="normal"
                src="https://assets10.lottiefiles.com/packages/lf20_wovxkf33.json"
                style={{ width: "50px" }}
              ></lottie-player>
              <div className="flex flex-row gap-[5px] font-normal text-xs text-oldgray-sr pt-1.5">
                <span>{likes?.length}</span>
                <span>Likes</span>
              </div>
            </div>
            <div>
              <div
                className=" font-normal text-xs text-oldgray-sr flex flex-row gap-[2px] cursor-pointer pt-1.5"
                onClick={handleClick}
              >
                <span>0</span>Comments
              </div>
            </div>
          </div>
          {/* end status like & comment  */}
          <hr className="w-full h-[1px] bg-gray-sr"></hr>
        </div>
      </div>

      {/* <!-- start button cta postingan  --> */}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        className="!w-full !shadow-none !rounded-none !flex !flex-row !gap-[5px]"
      >
        <Button
          className={ihaveLike ? likedButton : nonlikedButton}
          startIcon={<i className="fi fi-rr-social-network menu-icon"></i>}
          onClick={likeToggle}
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
        <div className="flex flex-row items-center gap-2.5">
          <Avatar url={myProfile?.avatar} />
          <TextareaAutosize
            className="w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none !font-normal "
            placeholder={"comment as " + myProfile?.username + " ..."}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default postcontainer;
