import Button from "@mui/material/Button";

function rightbar1() {
  return (
    <div className="w-4/12 hidden lg:block">
      <div className="w-[300px] h-fit px-[35px] py-[25px] bg-white-sr fixed drop-shadow-komponenIsi rounded-[10px] flex flex-col gap-[15px]">
        <p class="text-center font-bold text-black-sr text-xl">
          Upcoming Events
        </p>
        <div>
          <img class="rounded-[10px]" src="/slider-login/slider 2.jpg" alt="" />
        </div>

        <div>
          <div class="text-base text-black-sr font-semibold">
            Orientasi Mahasiswa Baru
          </div>
          <div class="text-xs text-oldgray-sr font-semibold">17 Juli 2023</div>
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
