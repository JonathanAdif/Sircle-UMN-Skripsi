import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

// icon
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

function EventBanner() {
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

  return (
    <div className="w-full h-fit bg-white-sr flex flex-col gap-5 rounded-[10px] shadow-sm px-2.5 py-[30px] lg:p-[50px] bg-center bg-cover bg-[url('https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/event-banner.jpg')]">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={handleClickOpen("paper")}
        className=" !absolute !top-[150px] !right-[100px] !bg-white-sr !p-2.5"
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
        <DialogTitle id="scroll-dialog-title">Add Event</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className="flex flex-col gap-5 w-[500px]">
            <div className="font-bold text-xl text-black-sr">Event Title</div>
            <TextField
              required
              fullWidth
              label="Long Event Title"
              id="fullWidth"
            />
            <TextField
              required
              fullWidth
              label="Short Event Title"
              id="fullWidth"
            />
            <div className="font-bold text-xl text-black-sr">Event Date</div>
            <input
              required
              type="date"
              className=" !font-normal !p-3 !text-base !text-black-sr !bg-transparent !w-[200px] !h-fit border border-solid focus:!outline-none"
            ></input>

            <div className="font-bold text-xl text-black-sr">Event Times</div>
            <div className="flex flex-row gap-5">
              <label for="startTime">Select Start time:</label>
              <input
                required
                type="time"
                id="startTime"
                className=" !font-normal !p-3 !text-base !text-black-sr !bg-transparent !w-[200px] !h-fit border border-solid focus:!outline-none"
              ></input>
              <label for="endTime">Select End time:</label>
              <input
                required
                type="time"
                id="endTime"
                className=" !font-normal !p-3 !text-base !text-black-sr !bg-transparent !w-[200px] !h-fit border border-solid focus:!outline-none"
              ></input>
            </div>
            <div className="font-bold text-xl text-black-sr">Event Content</div>
            <TextField
              id="outlined-multiline-static"
              required
              multiline
              rows={10}
              className="w-full h-fit py-2.5 px-2.5 resize-none focus:!outline-none "
              placeholder="Write about your event here.."
            />
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
                  // onChange={addPhoto}
                />
                <ImageOutlinedIcon
                  className="!text-oldgray-sr"
                  sx={{ fontSize: { xs: 20, lg: 25 } }}
                />
              </IconButton>
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
      </Dialog>
      <div className=" font-normal text-3xl text-white-sr w-full lg:max-w-[400px]  ">
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
