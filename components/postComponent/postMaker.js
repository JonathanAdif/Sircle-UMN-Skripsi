import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { useForm } from "react-hook-form";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useState } from "react";
import Spinner from "../inpageComponent/addition/spinner";

// icon
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PostMaker1({ onPost }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // start popover

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);

  // end popover

  // start snackbar
  const [openSnk, setOpenSnk] = React.useState(false);

  const handleCloseSnk = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnk(false);
  };
  // end snackbar

  // start add post

  const supabase = useSupabaseClient();
  const session = useSession();

  const [photoUploads, setphotoUploads] = useState([]);
  const [videoUploads, setvideoUploads] = useState([]);
  const [stilluploading, setstillUploading] = useState(false);

  //  start fungsi fungsi untuk react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const createPost = async (data) => {
    const { content } = data;
    try {
      await supabase
        .from("posts")
        .insert({
          writer: session.user.id,
          content,
          photos: photoUploads,
          videos: videoUploads,
        })
        .then((response) => {
          if (!response.error) {
            reset({
              content: "",
            });
            setphotoUploads([]);
            setvideoUploads([]);
            setOpen(false);
            if (onPost) {
              onPost();
            }
          }
        });
      setOpenSnk(true);
    } catch (error) {
      console.log(error);
    }
  };

  // end add post

  // start add photos to database
  async function addPhoto(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setstillUploading(true);
      for (const file of files) {
        const newName = Date.now() + file.name;
        const result = await supabase.storage
          .from("photos")
          .upload(newName, file);
        if (result.data) {
          const url =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/photos/" +
            result.data.path;
          setphotoUploads((prevUploads) => [...prevUploads, url]);
        } else {
          console.log(result);
        }
      }
      setstillUploading(false);
    }
  }
  // end add photos to database

  // start add photos to database
  async function addVideo(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setstillUploading(true);
      for (const file of files) {
        const newName = Date.now() + file.name;
        const result = await supabase.storage
          .from("videos")
          .upload(newName, file);
        if (result.data) {
          const url =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/videos/" +
            result.data.path;
          setvideoUploads((prevUploads) => [...prevUploads, url]);
        } else {
          console.log(result);
        }
      }
      setstillUploading(false);
    }
  }
  // end add photos to database

  // start disabled button
  // watch events
  const watchContent = watch("content");

  // handle disabled submit button
  const isValid = watchContent;
  // const isValid = watchContent || photoUploads.length > 0 ;
  // end disabled button

  return (
    <>
      <div className="w-full h-fit px-5 py-[30px] bg-white-sr rounded-[10px]  drop-shadow-sm flex flex-col gap-[15px]">
        <div className="flex flex-col text-center lg:text-left">
          <div className="font-bold text-base lg:text-xl text-black-sr">
            <span className="text-birulogo-sr">Hi!</span>, How Are You Today?
          </div>
          <div className="font-semibold text-sm lg:text-base text-black-sr">
            Let’s make an awesome post 🎉
          </div>
        </div>
        <div className="w-full h-fit">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="!w-full !pl-[10px] !capitalize !justify-start !border-oldgray-sr !text-gray-sr !text-xs lg:!text-sm !font-normal"
          >
            Whats going on in your beautiful mind...
          </Button>
        </div>
      </div>
      {/* start modal  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="!font-poppins !z-20"
      >
        <div className=" w-11/12 lg:w-6/12 h-fit bg-white-sr m-auto mt-20 px-5 py-[30px] flex flex-col gap-[10px] rounded-[10px]">
          <div className="flex flex-row justify-end">
            <div className="w-full h-fit font-bold text-black-sr text-xl">
              Go! Tell Something Amazing!
            </div>

            <CancelOutlinedIcon
              className=" text-birulogo-sr cursor-pointer"
              sx={{ fontSize: { xs: 20, lg: 25 } }}
              onClick={handleClose}
            />
          </div>
          <form onSubmit={handleSubmit(createPost)}>
            <TextField
              id="outlined-multiline-static"
              error={errors.content}
              multiline
              rows={3}
              className="w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none"
              placeholder="Whats going on in your beautiful mind..."
              // error
              helperText={errors.content?.message}
              {...register("content", {
                minLength: {
                  value: 5,
                  message: "Please write the content with minimum 5 words",
                },
                maxLength: {
                  value: 1000,
                  message: "Max Character is 1000 Character",
                },
              })}
            />

            {stilluploading && (
              <div className="!w-full !h-full !m-auto flex flex-row gap-2.5 py-2.5">
                <span className=" font-normal text-birulogo-sr text-xs ">
                  Uploading
                </span>
                <Spinner />
              </div>
            )}

            <Swiper
              slidesPerView={3}
              spaceBetween={5}
              freeMode={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper mt-5"
            >
              {photoUploads.length > 0 && (
                <>
                  {photoUploads.map((uploadPhoto) => (
                    <SwiperSlide className="cursor-pointer !rounded-[10px]" key={uploadPhoto}>
                      <a
                        data-fancybox="single"
                        // data-download-src="/slider-login/slider 1.jpg"
                        href={uploadPhoto}
                        className="!z-[100]"
                      >
                        <img
                          src={uploadPhoto}
                          alt="Media"
                          className="!object-center !object-fill !rounded-[10px] !w-[200px] !h-[200px]"
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </>
              )}

              {videoUploads.length > 0 && (
                <>
                  {videoUploads.map((uploadVideo) => {
                    console.log(uploadVideo);
                    return (
                      <SwiperSlide className="cursor-pointer !rounded-[10px]" key={uploadVideo}>
                        <a
                          data-fancybox="single"
                          // data-download-src="/slider-login/slider 1.jpg"
                          href={uploadVideo}
                          className="!z-[100]"
                        >
                          <video
                            controls
                            className=" !object-center !object-fill !rounded-[10px] !w-[200px] !h-[150px]"
                          >
                            <source src={uploadVideo} type="video/mp4" />
                          </video>
                        </a>
                      </SwiperSlide>
                    );
                  })}
                </>
              )}
            </Swiper>

            <div className="!flex !flex-row !justify-between !items-center !pt-5">
              {/* start popover area  */}

              <HelpOutlineOutlinedIcon
                className=" !text-oldgray-sr "
                sx={{ fontSize: { xs: 20, lg: 25 } }}
                aria-owns={openPop ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />

              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={openPop}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <ul className="p-2.5">
                  <li>Min Size for image Upload is 5 MB</li>
                  <li>Min Size for video Upload is 15 MB</li>
                </ul>
              </Popover>

              {/* end popover area  */}

              <div className="flex flex-row gap-5 !items-center">
                <div className="flex flex-row gap-[5px] !items-center">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    className="!p-0"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      multiple
                      onChange={addPhoto}
                    />
                    <ImageOutlinedIcon
                      className="!text-oldgray-sr"
                      sx={{ fontSize: { xs: 20, lg: 25 } }}
                    />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    className="!p-0"
                  >
                    <input
                      hidden
                      accept="video/*"
                      type="file"
                      multiple
                      onChange={addVideo}
                    />
                    <SlideshowOutlinedIcon
                      className="!text-oldgray-sr"
                      sx={{ fontSize: { xs: 20, lg: 25 } }}
                    />
                  </IconButton>
                </div>

                <Button
                  variant="contained"
                  className="!bg-birulogo-sr !capitalize !py-2 !px-10 disabled:!opacity-25 disabled:!text-white-sr "
                  type="submit"
                  disabled={!isValid}
                >
                  Post
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* end modal  */}
      <Snackbar open={openSnk} autoHideDuration={6000} onClose={handleCloseSnk}>
        <Alert
          onClose={handleCloseSnk}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your post has been successfully posted!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PostMaker1;
