// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// material ui required
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// next required module
import Link from "next/link";
// react required module
import { useMemo } from "react";

// react hook form and yup validation schema required modules
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { data } from "autoprefixer";

export default function home() {
  //  start fungsi fungsi untuk react hook form dan yup validation schema
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);
  //  end fungsi fungsi untuk react hook form dan yup validation schema

  // start fungsi disabled button
  // const isDisabled = useMemo(() => {
  //   return !Object.values(data).every((val) => !!val);
  // }, [data]);
  // end fungsi disabled button

  return (
    <main className=" p-[20px] lg:py-[5%]">
      <div className=" w-full lg:w-[940px] h-screen lg:h-[525px] bg-white-sr lg:m-auto rounded-[10px] flex lg:flex-row drop-shadow-login2 flex-col">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-1/3 lg:h-full w-full lg:rounded-l-[10px] lg:rounded-tr-[0px] rounded-t-[10px]"
        >
          <SwiperSlide>
            <img
              src="/slider-login/slider 1.jpg"
              alt="slider1"
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider-login/slider 2.jpg"
              alt="slider2"
              className="w-full h-full object-center object-cover "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider-login/slider 3.jpg"
              alt="slider3"
              className="w-full h-full object-center object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className=" h-2/3 lg:h-full w-full rounded-r-[10px]">
          <div className="pt-[35px] flex flex-col items-center">
            <img
              src="/favicon.png"
              alt="logo"
              className="w-[65px] lg:w-[95px] h-[65px] lg:h-[95px] object-cover"
            />
            <img
              src="/logotulisan.png"
              alt="logotulisan"
              className="w-[155px] lg:w-[220px] h-[70px] lg:h-[105px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 w-full px-[50px] py-[15px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <TextField
                required
                {...register("email")}
                id="outlined-required email"
                label="University Email"
                type="email"
                defaultValue="john.wick@student.umn.ac.id"
                // error={emailError}
              />
              <TextField
                required
                {...register("password")}
                id="outlined-password-input password"
                label="Password"
                type="password"
                autoComplete="current-password"
                // error={passwordError}
              />
              <Button
                variant="contained"
                type="submit"
                size="large"
                className=" bg-birulogo-sr !capitalize  "
                disabled={isDirty || !isValid}
              >
                Login
              </Button>
            </form>

            <div className="w-full text-center font-medium text-birulogo-sr text-[10px] lg:text-xs ">
              <Link Link href="/forgotPass" className="cursor-pointer">
                Forgot Password ?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mt-5 lg:mt-8 font-medium text-oldgray-sr text-[10px] lg:text-xs">
        Copyright @ 2023 JA - GK
      </div>
    </main>
  );
}
