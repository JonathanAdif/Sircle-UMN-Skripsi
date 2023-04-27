import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EventPostCard() {
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
          <div className="font-semibold text-base text-black-sr">
            Karate Festival
          </div>
          <div className="font-semibold text-xs text-oldgray-sr">
            17 juli 2023
          </div>
        </div>
        <img
          className="w-full h-full  !rounded-[10px] z-0 object-center object-cover cursor-pointer"
          src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/login-slider2"
          alt=""
        />
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <i
          className="fi fi-rr-cross-circle text-xl text-birulogo-sr cursor-pointer"
          onClick={handleClose}
        ></i>
      </Dialog>
    </>
  );
}

export default EventPostCard;
