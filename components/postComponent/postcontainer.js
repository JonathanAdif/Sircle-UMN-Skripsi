// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";

import Avatar from "../inpageComponent/avatarCover/avatar";
import Listprp from "../inpageComponent/addition/likeList";
import ReactTimeAgo from "react-time-ago";

import { useContext, useState, useEffect, useRef } from "react";

import { UserContext } from "@/context/userContext";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

// icon
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import Popover from "@mui/material/Popover";

function Postcontainer({
  id,
  content,
  profiles: writerprofile,
  created_at,
  photos,
  videos,
}) {
  const session = useSession();
  // start toggle comment
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  // end toggle comment

  const supabase = useSupabaseClient();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const { profile: myProfile } = useContext(UserContext);


  const likedButton =
    "!w-full !font-medium !text-birulogo-sr !fill-birulogo-sr  !py-[10px]  hover:!bg-birulogo-sr hover:!text-white-sr   !bg-white-sr !capitalize !border-none !shadow-none !rounded-[5px]";
  const nonlikedButton = "ctapostbutton";
  const likesnull =
    "flex flex-row gap-[5px] font-normal text-xs text-oldgray-sr pt-1.5";
  const likesnotnull =
    "flex flex-row gap-[5px] font-normal text-xs text-oldgray-sr pt-1.5 cursor-pointer";

  useEffect(() => {
    fetchLikes();
    fetchComments();
    import("@lottiefiles/lottie-player");
    if (myProfile?.id) fetchIsSaved();
  }, [myProfile?.id]);

  function fetchIsSaved() {
    supabase
      .from("savedpost")
      .select()
      .eq("post_id", id)
      .eq("user_id", myProfile?.id)
      .then((result) => {
        if (result.data.length > 0) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      });
  }

  function fetchLikes() {
    supabase
      .from('likes')
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .eq('post_id', id)
      .then((result) => setLikes(result.data));
  }

  function fetchComments() {
    supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .eq("parent", id)
      .then((result) => setComments(result.data));
  }

  const isLikedByMe = !!likes.find((like) => like.user_id === myProfile?.id);

  const myPost = writerprofile.id === session?.user?.id;

  function likeToggle() {
    if (isLikedByMe) {
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

  function postComment(ev) {
    ev.preventDefault();
    supabase
      .from("posts")
      .insert({
        content: commentText,
        writer: myProfile.id,
        parent: id,
      })
      .then((result) => {
        console.log(result);
        fetchComments();
        setCommentText("");
      });
  }

  // start dialog

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // end dialog

  function saveToggle() {
    if (isSaved) {
      supabase
        .from("savedpost")
        .delete()
        .eq("post_id", id)
        .eq("user_id", myProfile?.id)
        .then((result) => {
          setIsSaved(false);
        });
      window.location.reload(false);
    }
    if (!isSaved) {
      supabase
        .from("savedpost")
        .insert({
          user_id: myProfile.id,
          post_id: id,
        })
        .then((result) => {
          setIsSaved(true);
        });
    }
  }

  const deletingPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("writer", myProfile.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }

    window.location.reload(false);
  };

  // start open popper

  const [anchorEl, setAnchorEl] = useState(null);

  const handlepopperClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlepopperClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;

  // end open popper

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
                <ReactTimeAgo
                  timeStyle={"twitter"}
                  date={new Date(created_at).getTime()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row !p-0">
          <IconButton
            color="primary"
            aria-label="bookmark"
            component="label"
            onClick={saveToggle}
          >
            {isSaved ? (
              <BookmarkIcon
                className=" cursor-pointer  text-birulogo-sr"
                sx={{ fontSize: { xs: 20, lg: 25 } }}
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                className=" cursor-pointer text-oldgray-sr"
                sx={{ fontSize: { xs: 20, lg: 25 } }}
              />
            )}
          </IconButton>

          {myPost && (
            <div>
              <IconButton
                color="primary"
                aria-label="menu"
                component="label"
                onClick={handlepopperClick}
              >
                <MoreVertOutlinedIcon
                  className="  cursor-pointer  text-oldgray-sr"
                  sx={{ fontSize: { xs: 20, lg: 25 } }}
                />
              </IconButton>

              <Popover
                id={idPop}
                open={openPop}
                anchorEl={anchorEl}
                onClose={handlepopperClose}
                className=" !left-[-65px] "
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Button
                  className="ctapostbutton"
                  startIcon={
                    <DeleteForeverOutlinedIcon className="menu-icon" />
                  }
                  onClick={deletingPost}
                >
                  Delete Post
                </Button>
              </Popover>
            </div>
          )}
        </div>
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
              <SwiperSlide className="!cursor-pointer !z-0 !h-[320px]"  key={photo}>
                <a
                  data-fancybox="single"
                  // data-download-src="/slider-login/slider 1.jpg"
                  href={photo}
                >
                  <img
                    src={photo}
                    alt="Media"
                    className="!w-full !h-full !object-center !object-cover"
                  />
                </a>
              </SwiperSlide>
            ))}

          {videos?.length > 0 &&
            videos.map((video) => (
              <SwiperSlide className="!cursor-pointer !z-0 !h-[320px]"  key={video}>
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
              <div
                className={likes?.length > 0 ? likesnotnull : likesnull}
                onClick={handleClickOpen("paper")}
              >
                <span>{likes?.length}</span>
                <span>Likes</span>
              </div>
            </div>
            <div>
              <div
                className=" font-normal text-xs text-oldgray-sr flex flex-row gap-[5px] cursor-pointer pt-1.5"
                onClick={handleClick}
              >
                <span>{comments.length}</span>
                <span>Comments</span>
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
        className="!w-full !shadow-none !rounded-none !flex !flex-row !items-center !gap-[5px]"
      >
        <Button
          className={isLikedByMe ? likedButton : nonlikedButton}
          startIcon={
            isLikedByMe ? (
              <ThumbUpIcon className="menu-icon" color="birulogo-sr" />
            ) : (
              <ThumbUpOutlinedIcon className="menu-icon" />
            )
          }
          onClick={likeToggle}
        >
          Like
        </Button>
        {!myPost && (
          <Button
            className="ctapostbutton"
            startIcon={<LoopOutlinedIcon className="menu-icon" />}
          >
            Resircle
          </Button>
        )}
        <Button
          className="ctapostbutton"
          startIcon={<CommentOutlinedIcon className="menu-icon" />}
          onClick={handleClick}
        >
          Comment
        </Button>
      </ButtonGroup>
      {/* <!-- end button cta postingan --> */}
      {toggle ? (
        <div className="flex flex-col gap-[15px]">
          <div className="flex flex-row items-center gap-2.5 !w-full h-fit">
            <Avatar url={myProfile?.avatar} />
            <form onSubmit={postComment} className="w-full h-fit">
              <input
                className="!w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none !font-normal "
                placeholder={"comment as " + myProfile?.username + " ..."}
                value={commentText}
                onChange={(ev) => setCommentText(ev.target.value)}
              />
            </form>
          </div>
          <div>
            {comments.length > 0 &&
              comments.map((comment) => (
                <div key={comment.id} className="mt-2 flex gap-2 items-center">
                  <Avatar url={comment.profiles.avatar} />
                  <div className=" bg-gray-sr bg-opacity-20 py-2 px-4 rounded-[10px]">
                    <div className="flex flex-row gap-2.5">
                      <Link href={"/profile/" + comment.profiles.id}>
                        <span className="hover:underline font-semibold mr-1">
                          {comment.profiles.username}
                        </span>
                      </Link>
                      <span className="text-sm text-oldgray-sr">
                        <ReactTimeAgo
                          timeStyle={"twitter"}
                          date={new Date(comment.created_at).getTime()}
                        />
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {likes?.length > 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Likes</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            {likes?.length > 0 &&
              likes.map((likess) => (
                <Listprp
                  key={likess.id}
                  listAvatar={likess.profiles?.avatar}
                  listUsername={likess.profiles.username}
                  profileLike={likess.user_id}
                  myLike={likess.user_id === myProfile?.id}
                />
              ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Postcontainer;
