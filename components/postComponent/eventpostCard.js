import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

// icon
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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
        className="!font-poppins"
      >
        <CancelOutlinedIcon
          className=" text-birulogo-sr cursor-pointer absolute right-5 top-5"
          sx={{ fontSize: { xs: 20, lg: 30 } }}
          onClick={handleClose}
        />
        <div className="h-fit w-full lg:px-[300px] lg:py-[100px] text-left flex flex-col gap-5">
          <h2 className="font-bold text-black-sr text-3xl capitalize">
            Ikuti misi #RekomendAsik Merah Putih, dapetin 77K hadiah kolaborasi
            eksklusif brand lokal & voucher diskon!
          </h2>
          <div className="flex flex-row gap-5 items-center">
            <div>17 agustus 2023</div>
            <span>|</span>
            <div>Jonathan Christian Adif Sugiarto</div>
          </div>

          <img
            src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/login-slider1?t=2023-04-21T00%3A33%3A58.278Z"
            alt="slider1"
            className="w-full h-full object-center object-cover lg:rounded-[10px] lg:h-[450px] "
          />

          <div className="font-semibold text-xl text-black-sr flex flex-row gap-10">
            <div>
              Tanggal Event : <span className="font-normal">17/01/2024</span>
            </div>
            <div>
              Waktu Event : <span className="font-normal">08.00</span>-
              <span className="font-normal">08.00</span>
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <div className="font-semibold text-xl text-black-sr">Tentang Event</div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default EventPostCard;
