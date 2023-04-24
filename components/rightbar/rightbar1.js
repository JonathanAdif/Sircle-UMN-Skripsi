import Button from "@mui/material/Button";

function rightbar1() {
  return (
    <div className="w-4/12 hidden lg:block">
      <div className="w-[300px] h-fit px-[35px] py-[25px] bg-white-sr fixed drop-shadow-sm rounded-[10px] flex flex-col gap-[15px]">
        <p className="text-center font-bold text-black-sr text-xl">
          Upcoming Events
        </p>
        <div>
          <img className="rounded-[10px]" src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/login-slider2" alt="" />
        </div>

        <div className="flex flex-col" >
          <div className="text-base text-black-sr font-semibold">
            Orientasi Mahasiswa Baru
          </div>
          <div className="text-xs text-oldgray-sr font-semibold">17 Juli 2023</div>
        </div>
        <Button variant="contained" className="!bg-birulogo-sr !w-full !capitalize ">
          View Detail
        </Button>
        <div className="underline m-auto cursor-pointer ">View All Events</div>
      </div>
    </div>
  );
}

export default rightbar1;
