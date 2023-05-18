import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import ReactTimeAgo from "react-time-ago";

// icon
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EventPostCard({
  poster,
  long_title: Ltitle,
  short_title: Stitle,
  event_date: date,
  profiles: writer,
  created_at,
  event_start_time : eventStartTime,
  event_end_time: eventEndTime,
  content,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="!w-[270px] relative !h-[205px] bg-white-sr rounded-[10px] shadow-sm cursor-pointer "
        onClick={handleClickOpen}
      >
        <div className="bg-white-sr absolute bottom-0 rounded-[10px] py-2.5 px-[15px] w-full z-10 ">
          <div className="font-semibold text-base text-black-sr">{Stitle}</div>
          <div className="font-semibold text-xs text-oldgray-sr">{date}</div>
        </div>
        <img
          className="w-full h-full  !rounded-[10px] z-0 object-center object-cover cursor-pointer"
          src={poster}
          alt="postuyghjgjhgjhger"
        />
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="!font-poppins"
      >
        <CancelOutlinedIcon
          className=" text-birulogo-sr cursor-pointer absolute right-5 top-5"
          sx={{ fontSize: { xs: 20, lg: 30 } }}
          onClick={handleClose}
        />
        <div className="h-fit w-full lg:px-[300px] lg:py-[100px] text-left flex flex-col gap-5">
          <h2 className="font-bold text-black-sr text-3xl capitalize">
          {Ltitle}
          </h2>
          <div className="flex flex-row gap-5 items-center">
            <div>
              <ReactTimeAgo
                // timeStyle={"twitter"}
                date={new Date(created_at).getTime()}
              />
            </div>
            <span>|</span>
            <div>{writer.username}</div>
          </div>

          <img
            src={poster}
            alt={poster}
            className="w-full h-full object-center object-cover lg:rounded-[10px] lg:h-[450px] "
          />

          <div className="font-semibold text-xl text-black-sr flex flex-row gap-10">
            <div>
              Tanggal Event : <span className="font-normal">{date}</span>
            </div>
            <div>
              Waktu Event : <span className="font-normal">{eventStartTime}</span>-
              <span className="font-normal">{eventEndTime}</span>
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <div className="font-semibold text-xl text-black-sr">
              Tentang Event
            </div>
            <p>
              {content}
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default EventPostCard;
