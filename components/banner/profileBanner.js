import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import AvatarProfile from "../avatarCover/avatarProfile";
import CoverProfile from "../avatarCover/cover";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

function profileBanner() {
  const { profile, myUser, fetchUser } = useContext(UserContext);

  const [editSection, seteditSection] = useState(false);

  return (
    <fragment className="w-full bg-white-sr drop-shadow-sm rounded-[10px] h-fit flex flex-col">
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
      {/* start button edit profile area  */}
      {!myUser && (
        <fragment className="w-full h-fit flex justify-end p-9 "></fragment>
      )}

      {myUser && !editSection && (
        <fragment className="w-full h-fit flex justify-end p-5">
          <IconButton
            color="primary"
            aria-label="edit"
            component="label"
            className=" !bg-white-sr"
            onClick={() => seteditSection(true)}
          >
            <i className="fi fi-rr-pencil !text-xl w-5 h-5 !text-birulogo-sr"></i>
          </IconButton>
        </fragment>
      )}

      {myUser && editSection && (
        <fragment className="w-full h-fit flex justify-end p-5">
          <Button variant="contained" className="!bg-birulogo-sr  !capitalize ">
            Save Profile
          </Button>
        </fragment>
      )}

      {/* end button edit profile area  */}
      {/* start profile stat area  */}
      <fragment className="pt-[5px] pb-[35px] w-full h-fit">
        <fragment className="w-full px-5 h-fit m-auto flex flex-col gap-2.5">
          <fragment className="flex flex-col gap-[2px]">
            <fragment className="font-bold text-xl lg:text-2xl !text-black-sr  ">
              {!editSection && profile?.username}
              {editSection && (
                <Input
                  placeholder="Write down your name"
                  className="!font-bold !text-xl !lg:text-2xl !text-black-sr !w-2/3"
                />
              )}
            </fragment>
            <fragment className="!font-medium !text-sm lg:!text-base !text-oldgray-sr !flex !flex-row !gap-2.5">
              {!editSection && profile?.email}

              {editSection && (
                <Input
                  disabled
                  defaultValue=  {profile?.email}
                  className="!font-medium !text-sm lg:!text-base !text-oldgray-sr !w-2/3"
                />
              )}
            </fragment>
          </fragment>
          <p className="font-medium text-xs lg:text-sm text-black-sr">
            {!editSection && profile?.bio}

            {editSection && (
                <Input
                  placeholder="Write your bio"
                  className="!font-medium !text-xs lg:!text-sm !text-black-sr !w-2/3"
                />
              )}
          </p>
        </fragment>
      </fragment>
      {/* end profile stat area  */}
    </fragment>
  );
}

export default profileBanner;
