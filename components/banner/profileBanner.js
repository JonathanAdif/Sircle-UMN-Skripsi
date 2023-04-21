import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import AvatarProfile from "../avatarCover/avatarProfile";
import CoverProfile from "../avatarCover/cover";
import IconButton from "@mui/material/IconButton";

function profileBanner() {
  const { profile, myUser, fetchUser } = useContext(UserContext);

  return (
    <fragment className="w-full bg-white-sr drop-shadow-sm rounded-[10px] h-fit flex flex-col">
      {/* start profile photo  */}
      <AvatarProfile url={profile?.avatar} />
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
      {myUser && (
        <fragment className="w-full h-fit flex justify-end p-5">
          <IconButton
            color="primary"
            aria-label="edit"
            component="label"
            className=" !bg-white-sr"
          >
            <input
              hidden
              // accept="image/*"
              // type="file"
              //   onChange={addImage}
            />
            <i className="fi fi-rr-pencil !text-xl w-5 h-5 !text-birulogo-sr"></i>
          </IconButton>
        </fragment>
      )}

      {/* end button edit profile area  */}
      {/* start profile stat area  */}
      <fragment className="pt-[5px] pb-[35px] w-full h-fit">
        <fragment className="w-full px-5 h-fit m-auto flex flex-col gap-2.5">
          <fragment className="flex flex-col gap-[2px]">
            <fragment className="font-bold text-xl lg:text-2xl !text-black-sr  ">
              {profile?.username}
            </fragment>
            <fragment className="font-medium text-sm lg:!text-base text-oldgray-sr flex flex-row gap-2.5">
              {profile?.email}
            </fragment>
          </fragment>
          <p className="font-medium text-xs lg:text-sm text-black-sr">
            {profile?.bio}
          </p>
        </fragment>
      </fragment>
      {/* end profile stat area  */}
    </fragment>
  );
}

export default profileBanner;
