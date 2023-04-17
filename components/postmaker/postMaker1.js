import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { useForm } from "react-hook-form";

function postMaker1({ onPost }) {
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

  // start add post

  const supabase = useSupabaseClient();
  const session = useSession();

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
        .from('posts')
        .insert({
          writer: session.user.id,
          content,
        })
        .then((response) => {
          if (!response.error) {
            reset({
              content: "",
            });
            setOpen(false);
            if (onPost) {
              onPost();
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // end add post

  // start disabled button
  // watch events
  const watchContent = watch("content");

  // handle disabled submit button
  const isValid = watchContent;

  // end disabled button

  // start add photos to database
  function addMedia(ev) {
    const files = ev.target.files;
    for (const file of files) {
      const newName = Date.now() + file.name;
      supabase.storage
        .from('photos')
        .upload(newName, file)
        .then((result) => {
          if (result.data) {
            console.log({
              url: process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data.path,
            })
          }else{
            console.log(result);
          }
        });
    }
    // console.log(ev);
  }
  // end add photos to database

  return (
    <>
      <fragment className="w-full h-fit px-5 py-[30px] bg-white-sr rounded-[10px]  drop-shadow-sm flex flex-col gap-[15px]">
        <fragment className="flex flex-col text-center lg:text-left">
          <fragment className="font-bold text-base lg:text-xl text-black-sr">
            <span className="text-birulogo-sr">Hi!</span>, How Are You Today?
          </fragment>
          <fragment className="font-semibold text-sm lg:text-base text-black-sr">
            Let’s make an awesome post 🎉
          </fragment>
        </fragment>
        <fragment className="w-full h-fit">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="!w-full !pl-[10px] !capitalize !justify-start !border-oldgray-sr !text-gray-sr !text-xs lg:!text-sm !font-normal"
          >
            Whats going on in your beautiful mind...
          </Button>
        </fragment>
      </fragment>
      {/* start modal  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="!font-poppins"
      >
        <fragment className=" w-11/12 lg:w-6/12 h-fit bg-white-sr m-auto mt-20 px-5 py-[30px] flex flex-col gap-[10px] rounded-[10px]">
          <fragment className="flex flex-row justify-end">
            <fragment className="w-full h-fit font-bold text-black-sr text-xl">
              Go! Write Something Amazing!
            </fragment>
            <i
              className="fi fi-rr-cross-circle text-xl text-birulogo-sr cursor-pointer"
              onClick={handleClose}
            ></i>
          </fragment>
          <form onSubmit={handleSubmit(createPost)}>
            <TextareaAutosize
              className="w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none "
              placeholder="Whats going on in your beautiful mind..."
              {...register("content", {
                minLength: {
                  value: 1,
                  message: "Please write the content",
                },
              })}
            />

            <fragment className="flex flex-row justify-between items-center">
              {/* start popover area  */}
              <i
                className="fi fi-rr-messages-question !text-xl w-5 h-5 !text-oldgray-sr"
                aria-owns={openPop ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              ></i>

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
                  <li>test</li>
                  <li>test</li>
                </ul>
              </Popover>

              {/* end popover area  */}

              <fragment className="flex flex-row gap-[15px] !items-center">
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
                    onChange={addMedia}
                  />
                  <i className="fi fi-rr-picture !text-xl w-5 h-5 !text-oldgray-sr "></i>
                </IconButton>
                <Button
                  variant="contained"
                  className="!bg-birulogo-sr !capitalize !py-2 !px-10 disabled:!opacity-25 disabled:!text-white-sr "
                  type="submit"
                  disabled={!isValid}
                >
                  Post
                </Button>
              </fragment>
            </fragment>
          </form>
        </fragment>
      </Modal>
      {/* end modal  */}
    </>
  );
}

export default postMaker1;
