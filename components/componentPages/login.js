// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// material ui required
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// next required module
import Link from "next/link";

// react hook form and yup validation schema required modules
import { useForm } from "react-hook-form";

import { SignIn, GetSignInErrorMessage } from "@/lib/firebase";


export default function home() {
  //  start fungsi fungsi untuk react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await SignIn(email, password);
    } catch (error) {
      const message = GetSignInErrorMessage(error.code);
      console.log(message);
    }
  };
  //  end fungsi fungsi untuk react hook form

  // watch events
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  // handle disabled submit button
  const isValid = watchEmail && watchPassword;

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
          <div className=" pt-[25px]  lg:pt-[35px] flex flex-col items-center">
            <img
              src="/favicon.png"
              alt="logo"
              className="w-[60px] lg:w-[90px] h-[60px] lg:h-[90px] object-cover"
            />
            <img
              src="/logotulisan.png"
              alt="logotulisan"
              className="w-[150px] lg:w-[215px] h-[65px] lg:h-[100px] object-cover"
            />
          </div>
          <div className="flex flex-col  gap-[15px]  px-[50px] py-[10px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[15px]"
            >
              <TextField
                required
                {...register("email", {
                  required: {
                    value: true,
                    message: "email name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Please enter your email name",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum allowed length is 50 characters ",
                  },
                  // pattern: {
                  //   value: /[a-zA-Z]+/,
                  //   message: "Please enter only alphabets",
                  // },
                })}
                id="outlined-required email"
                label="University Email"
                type="email"
                defaultValue="john.wick@student.umn.ac.id"
                error={errors.email}
                helperText={errors.email && errors.email.message}
              />
              <TextField
                required
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Please enter your Password",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum allowed length is 20 characters ",
                  },
                  // pattern: {
                  //   value: /[a-zA-Z]+/,
                  //   message: "Please enter only alphabets",
                  // },
                })}
                id="outlined-password-input password"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={errors.password}
                helperText={errors.password && errors.password.message}
              />
              <Button
                variant="contained"
                type="submit"
                size="large"
                className=" bg-birulogo-sr !capitalize"
                disabled={!isValid}
              >
                Login
              </Button>
            </form>

            <div className="w-full text-center font-medium text-birulogo-sr text-[10px] lg:text-xs ">
              <Link href="/forgotPass" className="cursor-pointer">
                Forgot Password ?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mt-5 lg:mt-8 font-medium text-oldgray-sr text-[10px] lg:text-xs">
        <div>Copyright @ 2023 JA - GK</div>
        <div>Version 0.1.0</div>
      </div>
    </main>
  );
}
