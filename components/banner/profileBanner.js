import Button from "@mui/material/Button";

function profileBanner() {
  return (
    <div className="w-full bg-white-sr drop-shadow-komponenIsi rounded-[10px] h-fit flex flex-col">
      {/* start profile photo  */}
      <img
        src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
        class="w-[150px] lg:w-[180px] rounded-full absolute cursor-pointer top-[145px] lg:top-[115px] left-5 lg:left-[30px] border-[5px] border-white-sr"
        alt="Avatar"
      />
      {/* end profile photo  */}
      {/* start banner photo  */}
      <img
        src="/slider-login/slider 3.jpg"
        alt="slider3"
        className="w-full h-[225px] rounded-[10px] object-center object-cover cursor-pointer"
      />
      {/* end banner photo  */}
      {/* start button edit profile area  */}
      <div className="w-full h-fit flex justify-end p-5 ">
        <Button
          variant="outlined"
          className="!capitalize !text-birulogo-sr !border-birulogo-sr !text-xs lg:!text-sm !border-[2px] "
        >
          Edit Profile
        </Button>
      </div>
      {/* end button edit profile area  */}
      {/* start profile stat area  */}
      <div className="pt-[5px] pb-[35px] w-full h-fit">
        <div className="w-full px-5 h-fit m-auto flex flex-col gap-2.5">
          <div className="flex flex-col gap-[2px]">
            <div className="font-bold text-xl lg:text-2xl text-black-sr  ">
              Jonathan Christian Adif Sugiarto
            </div>
            <div className="font-medium text-sm lg:!text-base text-oldgray-sr flex flex-row gap-2.5">
              <span>Informatika </span>
              <span>|</span>
              <span>00000034563</span>
            </div>
          </div>
          <p className="font-medium text-xs lg:text-sm text-black-sr">
            Lorem ipsum dolor sit amet consectetur. Interdum pretium enim montes
            eu amet fermentum lorem integer. Lorem ipsum dolor sit amet
            consectetur. Interdum pretium enim montes eu amet fermentum lorem
            integer.
          </p>
        </div>
      </div>
      {/* end profile stat area  */}
    </div>
  );
}

export default profileBanner;
