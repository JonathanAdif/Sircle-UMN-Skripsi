import { useContext, useState } from "react";
import { globalContext } from "@/context/globalContext";
import AvatarProfile from "../avatarCover/avatarProfile";
import CoverProfile from "../avatarCover/cover";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSession } from "@supabase/auth-helpers-react";



// icon
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

function profileBanner({follow, followstat}) {
  const { profile, myUser, fetchUser, setProfile } =
    useContext(globalContext);
  const [editSection, seteditSection] = useState(false);
  const [username, setName] = useState("");
  const [bio, setBio] = useState("");
  const supabase = useSupabaseClient();
  const session = useSession();

  const hasfollow = "!bg-green-600  disabled:!opacity-25 disabled:!text-white-sr !capitalize";
  const notfollow = "!bg-birulogo-sr  disabled:!opacity-25 disabled:!text-white-sr !capitalize";

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
          <div className="w-full px-5 h-fit m-auto flex flex-col gap-2.5">
            <div className="flex flex-col gap-[2px]">
              <div className="font-bold text-xl lg:text-2xl !text-black-sr  ">
                {!editSection && profile?.username}
                {editSection && (
                  <Input
                    placeholder="Write down your name"
                    className="!font-bold !text-xl !lg:text-2xl !text-black-sr !w-2/3"
                    // onChange={ev => setName(ev.target.value)}
                    {...register("username", {
                      onChange: (e) => setName(e.target.value),
                      minLength: {
                        value: 1,
                        message: "Please write down your name",
                      },
                    })}
                    value={username}
                  />
                )}
              </div>
              <div className="!font-medium !text-sm lg:!text-base !text-oldgray-sr !flex !flex-row !gap-2.5">
                {!editSection && profile?.email}

                {editSection && (
                  <Input
                    disabled
                    defaultValue={profile?.email}
                    className="!font-medium !text-sm lg:!text-base !text-oldgray-sr !w-2/3"
                  />
                )}
              </div>
            </div>
            <p className="font-medium text-xs lg:text-sm text-black-sr">
              {!editSection && profile?.bio}

              {editSection && (
                <Input
                  placeholder="Write down your bio"
                  className="!font-medium !text-xs lg:!text-sm !text-black-sr !w-2/3"
                  {...register("bio", {
                    onChange: (e) => setBio(e.target.value),
                    minLength: {
                      value: 1,
                      message: "Please write down your bio",
                    },
                  })}
                  value={bio}
                />
              )}
            </p>
          </div>
        </div>
        {/* end profile stat area  */}

        {/* start button edit profile area  */}
        <div>
          {!myUser && (
            <div className="w-full h-fit flex justify-end p-5 ">
              <Button
                variant="contained"
                className={followstat ? hasfollow : notfollow }
                startIcon={followstat ? <CheckOutlinedIcon   className="menu-icon" /> : <PersonAddAlt1OutlinedIcon  className="menu-icon" />}
                onClick={follow}
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
            <div className="w-full h-fit flex justify-end p-5 flex-row gap-2.5">
              <Button
                disabled={!isValid}
                type="submit"
                variant="contained"
                className="!bg-birulogo-sr  disabled:!opacity-25 disabled:!text-white-sr !capitalize "
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

        {/* end button edit profile area  */}
      </form>
    </div>
  );
}

export default profileBanner;
