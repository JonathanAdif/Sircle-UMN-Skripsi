import { useContext, useState, useRef, useEffect } from "react";
import { globalContext } from "@/context/globalContext";
import AvatarProfile from "../avatarCover/avatarProfile";
import CoverProfile from "../avatarCover/cover";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSession } from "@supabase/auth-helpers-react";

import DialogData from "../addition/dialog";

// icon
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "next/link";

function ProfileBanner({ follow: followed, followstat }) {
  const { profile, myUser, fetchUser, setProfile, following, follow, posts } =
    useContext(globalContext);
  const [editSection, seteditSection] = useState(false);
  const [username, setName] = useState("");
  const [bio, setBio] = useState("");
  const supabase = useSupabaseClient();
  const session = useSession();

  const hasfollow =
    "!bg-green-600  disabled:!opacity-25 disabled:!text-white-sr !capitalize";
  const notfollow =
    "!bg-birulogo-sr  disabled:!opacity-25 disabled:!text-white-sr !capitalize";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const editPost = async () => {
    try {
      await supabase
        .from("profiles")
        .update({
          username,
          bio,
        })
        .eq("id", session.user.id)
        .then((result) => {
          if (!result.error) {
            setProfile((prev) => ({ ...prev, username, bio }));
          }
          seteditSection(false);
        });
    } catch (error) {}
  };

  // start disabled button
  // watch events
  const watchName = watch("username");

  // handle disabled submit button
  const isValid = watchName;
  // const isValid = watchContent || photoUploads.length > 0 ;
  // end disabled button

  const followingnotnull = "flex flex-col items-center cursor-pointer";
  const followingnull = "flex flex-col items-center";

  // start dialog followers

  const [openMobile, setOpenMobile] = useState(false);
  const [scrollMobile, setScrollMobile] = useState("paper");

  const handleClickOpenMobile = (scrollType) => () => {
    setOpenMobile(true);
    setScrollMobile(scrollType);
  };

  const handleCloseMobile = () => {
    setOpenMobile(false);
  };

  const descriptionElementRefMobile = useRef(null);
  useEffect(() => {
    if (openMobile) {
      const { current: descriptionElement } = descriptionElementRefMobile;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openMobile]);

  // end dialog followers

  // start dialog following

  const [openPopMobile, setOpenPopMobile] = useState(false);
  const [scrollPopMobile, setScrollPopMobile] = useState("paper");

  const handleClickOpenPopMobile = (scrollType) => () => {
    setOpenPopMobile(true);
    setScrollPopMobile(scrollType);
  };

  const handleClosePopMobile = () => {
    setOpenPopMobile(false);
  };

  const descriptionElementRefPopMobile = useRef(null);
  useEffect(() => {
    if (openPopMobile) {
      const { current: descriptionElement } = descriptionElementRefPopMobile;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openPopMobile]);

  // end dialog following

  return (
    <div className="w-full bg-white-sr drop-shadow-sm rounded-[10px] h-fit flex flex-col">
      {/* start profile photo  */}
      <AvatarProfile
        url={profile?.avatar}
        editable={myUser}
        onChange={fetchUser}
      />
      {/* end profile photo  */}
      {/* start banner photo  */}

      <CoverProfile
        url={profile?.cover}
        editable={myUser}
        onChange={fetchUser}
      />

      {/* end banner photo  */}
      <form
        onSubmit={handleSubmit(editPost)}
        className="flex  flex-col-reverse"
      >
        {/* start profile stat area  */}
        <div className="pt-[5px] pb-[35px] w-full h-fit">
          <div className="w-full px-5 h-fit m-auto flex flex-col mt-2.5 gap-5">
            <div className="flex flex-col gap-5 lg:gap-[5px]">
              <div className=" lg:hidden flex flex-row justify-between items-center px-5">
                <div
                  className={
                    follow?.length > 0 ? followingnotnull : followingnull
                  }
                  onClick={handleClickOpenMobile("paper")}
                >
                  <div>Followers</div>
                  <div>{follow?.length}</div>
                </div>
                {follow?.length > 0 &&
                  follow.map((follows) => (
                    <DialogData
                      key={follows.id}
                      title={"followers"}
                      open={openMobile}
                      handleClose={handleCloseMobile}
                      stat={follow}
                      scroll={scrollMobile}
                    />
                  ))}
                <div className="flex flex-col items-center">
                  <div>Post</div>
                  <div>{posts?.length}</div>
                </div>
                <div
                  className={
                    following?.length > 0 ? followingnotnull : followingnull
                  }
                  onClick={handleClickOpenPopMobile("paper")}
                >
                  <div>Following</div>
                  <div>{following?.length}</div>
                </div>
                {following?.length > 0 &&
                  following?.map((follow) => (
                    <DialogData
                      key={follow.id}
                      title={"following"}
                      open={openPopMobile}
                      handleClose={handleClosePopMobile}
                      fstat={following}
                      scroll={scrollPopMobile}
                    />
                  ))}
              </div>
              <div className="font-bold text-xl lg:text-2xl !text-black-sr text-center lg:text-left ">
                {!editSection && profile?.username}
                {editSection && (
                  <TextField
                    required
                    placeholder="Write down your name"
                    className="!font-bold !text-base !lg:text-2xl !text-black-sr  w-full lg:!w-2/3"
                    // onChange={ev => setName(ev.target.value)}
                    error={errors.username}
                    helperText={errors.username?.message}
                    {...register("username", {
                      onChange: (e) => setName(e.target.value),
                      minLength: {
                        value: 1,
                        message: "Please write down your name",
                      },
                      maxLength: {
                        value: 40,
                        message: "Max Character for username is 40 Character",
                      },
                    })}
                    value={username}
                  />
                )}
              </div>
              <div className="!font-medium !text-sm lg:!text-base !text-oldgray-sr !text-center lg:!text-left">
                {!editSection && profile?.email}

                {editSection && (
                  <TextField
                    disabled
                    defaultValue={profile?.email}
                    className="!font-medium !text-sm lg:!text-base !text-oldgray-sr w-full lg:!w-2/3"
                  />
                )}
              </div>
            </div>
            <p className="font-medium text-xs lg:text-sm text-black-sr text-center lg:text-left">
              {!editSection && profile?.bio}

              {editSection && (
                <TextField
                  placeholder="Write down your bio"
                  className="!font-medium !text-xs lg:!text-sm !text-black-sr  w-full lg:!w-2/3"
                  error={errors.bio}
                  helperText={errors.bio?.message}
                  {...register("bio", {
                    onChange: (e) => setBio(e.target.value),
                    minLength: {
                      value: 1,
                      message: "Please write down your bio",
                    },
                    maxLength: {
                      value: 100,
                      message: "Max Character for bio is 100 Character",
                    },
                  })}
                  value={bio}
                />
              )}
            </p>
            {!myUser && (
              <Link href={`mailto:${profile?.email}`} target="_blank">
                <Button
                  variant="contained"
                  className="lg:!hidden !bg-birulogo-sr !w-full !capitalize "
                >
                  Email
                </Button>
              </Link>
            )}
            {myUser && editSection && (
              <div className="w-full h-fit flex py-2.5 px-[45px] flex-row gap-2.5 lg:hidden">
                <Button
                  disabled={!isValid}
                  type="submit"
                  variant="contained"
                  className="!bg-birulogo-sr text-sm lg:text-base disabled:!opacity-25 disabled:!text-white-sr !capitalize "
                >
                  Save Profile
                </Button>

                <Button
                  variant="contained"
                  className=" !bg-red-700 disabled:!opacity-25 disabled:!text-white-sr !capitalize "
                  onClick={() => seteditSection(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* end profile stat area  */}

        {/* start button edit profile area  */}
        <div>
          {!myUser && (
            <div className="w-full h-fit flex lg:flex-row gap-[15px] justify-end items-center p-5 ">
              <a
                href={`mailto:${profile?.email}`}
                target="_blank"
                className="hidden lg:block"
              >
                <IconButton color="primary" aria-label="edit" component="label">
                  <EmailOutlinedIcon
                    className=" !text-birulogo-sr"
                    sx={{ fontSize: { xs: 20, lg: 25 } }}
                  />
                </IconButton>
              </a>
              <Button
                variant="contained"
                className={followstat ? hasfollow : notfollow}
                startIcon={
                  followstat ? (
                    <CheckOutlinedIcon className="menu-icon" />
                  ) : (
                    <PersonAddAlt1OutlinedIcon className="menu-icon" />
                  )
                }
                onClick={followed}
              >
                {followstat ? "Following" : "follow"}
              </Button>
            </div>
          )}

          {myUser && !editSection && (
            <div className="w-full h-fit flex justify-end p-5">
              <IconButton
                color="primary"
                aria-label="edit"
                component="label"
                className=" !bg-white-sr"
                onClick={() => {
                  seteditSection(true);
                  setName(profile.username);
                  setBio(profile.bio);
                }}
              >
                <ModeEditOutlinedIcon
                  className=" !text-birulogo-sr"
                  sx={{ fontSize: { xs: 20, lg: 25 } }}
                />
              </IconButton>
            </div>
          )}

          {myUser && editSection && (
            <>
              <div className="w-full  h-fit  justify-end p-10 lg:p-5 flex-row gap-2.5"></div>
              <div className="w-full hidden lg:block h-fit  ">
                <div className="flex flex-row gap-2.5 justify-end px-5">
                  <Button
                    disabled={!isValid}
                    type="submit"
                    variant="contained"
                    className="!bg-birulogo-sr text-sm lg:text-base disabled:!opacity-25 disabled:!text-white-sr !capitalize "
                  >
                    Save Profile
                  </Button>

                  <Button
                    variant="contained"
                    className=" !bg-red-700 disabled:!opacity-25 disabled:!text-white-sr !capitalize "
                    onClick={() => seteditSection(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* end button edit profile area  */}
      </form>
    </div>
  );
}

export default ProfileBanner;
