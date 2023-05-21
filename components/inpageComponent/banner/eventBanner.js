import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useForm } from "react-hook-form";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Spinner from "../addition/spinner";

// icon
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

function EventBanner({ onPost }) {
  // start dialog function
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // end dialog function

  // start add event
  const supabase = useSupabaseClient();
  const session = useSession();

  const [photoUploads, setphotoUploads] = useState("");
  const [stilluploading, setstillUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const createEvent = async (data) => {
    const { el_title, es_title, e_date, e_stime, e_etime, content } = data;
    try {
      await supabase
        .from("events")
        .insert({
          long_title: el_title,
          short_title: es_title,
          writer: session.user.id,
          poster: photoUploads,
          content,
          event_date: e_date,
          event_start_time: e_stime,
          event_end_time: e_etime,
        })
        .then((response) => {
          if (!response.error) {
            reset({
              content: "",
              el_title: "",
              es_title: "",
              e_date: "",
              e_stime: "",
              e_etime: "",
            });
            setphotoUploads();
            setOpen(false);
            if (onPost) {
              onPost();
            }
          }
        });
      // setOpenSnk(true);
    } catch (error) {
      console.log(error);
    }
  };

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
          setphotoUploads(url);
        } else {
          console.log(result);
        }
      }
      setstillUploading(false);
    }
  }
  // end add photos to database

  // end add event

  return (
    <div className="w-full h-fit bg-white-sr flex flex-col gap-5 rounded-[10px] shadow-sm px-2.5 py-[30px] lg:p-[50px] bg-center bg-cover bg-[url('https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/event-banner.jpg')]">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={handleClickOpen("paper")}
        className=" !absolute !top-[150px] !right-5 lg:!right-[100px] !bg-white-sr !p-2.5"
      >
        <AddCircleOutlineOutlinedIcon
          className=" !text-birulogo-sr"
          sx={{ fontSize: { xs: 20, lg: 25 } }}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="!font-poppins !z-20"
      >
        <form onSubmit={handleSubmit(createEvent)}>
          <DialogTitle id="scroll-dialog-title">Add Event</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div className="flex flex-col gap-5 lg:w-[500px]">
              <div className="font-bold text-xl text-black-sr">Event Title</div>
              <TextField
                required
                fullWidth
                label="Long Event Title"
                id="fullWidth"
                {...register("el_title", {
                  minLength: {
                    value: 1,
                    message: "Please write the content",
                  },
                  maxLength: 5,
                })}
              />
              <TextField
                required
                fullWidth
                label="Short Event Title"
                id="fullWidth"
                {...register("es_title", {
                  minLength: {
                    value: 1,
                    message: "Please write the content",
                  },
                })}
              />
              <div className="font-bold text-xl text-black-sr">Event Date</div>
              <input
                required
                type="date"
                className=" !font-normal !p-3 !text-base !text-black-sr !bg-transparent !w-[200px] !h-fit border border-solid focus:!outline-none"
                {...register("e_date", {
                  minLength: {
                    value: 1,
                    message: "Please write the content",
                  },
                })}
              ></input>

              <div className="font-bold text-xl text-black-sr">Event Times</div>
              <div className="flex flex-col lg:flex-row gap-5">
                <label htmlFor="startTime">Select Start time:</label>
                <input
                  required
                  type="time"
                  id="startTime"
                  className=" !font-normal !p-3 !text-base !text-black-sr !bg-transparent !w-[200px] !h-fit border border-solid focus:!outline-none"
                  {...register("e_stime", {
                    minLength: {
                      value: 1,
                      message: "Please write the content",
                    },
                  })}
                ></input>
                <label htmlFor="endTime">Select End time:</label>
                <input
                  required
                  type="time"
                  id="endTime"
                  className=" !font-normal !p-3 !text-base !text-black-sr !bg-transparent !w-[200px] !h-fit border border-solid focus:!outline-none"
                  {...register("e_etime", {
                    minLength: {
                      value: 1,
                      message: "Please write the content",
                    },
                  })}
                ></input>
              </div>
              <div className="font-bold text-xl text-black-sr">
                Event Content
              </div>
              <TextField
                id="outlined-multiline-static"
                required
                multiline
                rows={10}
                className="w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none "
                placeholder="Write about your event here.."
                {...register("content", {
                  minLength: {
                    value: 1,
                    message: "Please write the content",
                  },
                })}
              />
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="font-bold text-xl text-black-sr">
                    Event Poster
                  </div>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    className="!p-0"
                  >
                    <input
                      required
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
                </div>

                {stilluploading && (
                  <div className="!w-full !h-full !m-auto flex flex-row gap-2.5 py-2.5">
                    <span className=" font-normal text-birulogo-sr text-xs ">
                      Uploading
                    </span>
                    <Spinner />
                  </div>
                )}

                {photoUploads?.length > 0 && (
                  <>
                    <img
                      src={photoUploads}
                      alt="Media"
                      className="!object-center !object-fill !rounded-[10px] !w-[200px] !h-[200px]"
                    />
                  </>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="!bg-birulogo-sr !capitalize !py-2 !px-5 disabled:!opacity-25 disabled:!text-white-sr "
              type="submit"
              // disabled={!isValid}
            >
              Post Event
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <div className=" font-normal lg:text-3xl text-white-sr w-full lg:max-w-[400px]  ">
        Academic. Non Academic. See Events.
      </div>
      {/* <div className="bg-white-sr flex flex-col lg:flex-row justify-between p-5 rounded-[10px] gap-2.5 lg:max-w-[535px]">
        <input
          type="text"
          placeholder="Search"
          className=" font-normal text-base text-gray-sr bg-transparent focus:outline-none"
        />
        <div className="!flex !flex-row !items-center gap-2.5">
          <CalendarMonthIcon
            className="!text-oldgray-sr"
            sx={{ fontSize: { xs: 20, lg: 25 } }}
          />

          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className=" !font-normal !text-base !text-black-sr !bg-transparent !w-[150px] focus:!outline-none !cursor-pointer"
          />
        </div>

        <Button
          variant="contained"
          className="!bg-birulogo-sr !w-full !capitalize !px-[15px] !py-2.5 !text-sm "
        >
          Search
        </Button>
      </div> */}
    </div>
  );
}

export default EventBanner;
