import Button from "@mui/material/Button";

function rightbar1() {
  return (
    <fragment className="w-4/12 hidden lg:block">
      <fragment className="w-[300px] h-fit px-[35px] py-[25px] bg-white-sr fixed drop-shadow-komponenIsi rounded-[10px] flex flex-col gap-[15px]">
        <p class="text-center font-bold text-black-sr text-xl">
          Upcoming Events
        </p>
        <fragment>
          <img class="rounded-[10px]" src="/slider-login/slider 2.jpg" alt="" />
        </fragment>

        <fragment>
          <fragment class="text-base text-black-sr font-semibold">
            Orientasi Mahasiswa Baru
          </fragment>
          <fragment class="text-xs text-oldgray-sr font-semibold">17 Juli 2023</fragment>
        </fragment>
        <Button variant="contained" className="!bg-birulogo-sr !w-full !capitalize ">
          View Detail
        </Button>
        <fragment className="underline m-auto cursor-pointer ">View All Events</fragment>
      </fragment>
    </fragment>
  );
}

export default rightbar1;
