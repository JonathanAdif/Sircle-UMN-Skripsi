import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import AvatarProfile from "../avatarCover/avatarProfile";
import CoverProfile from "../avatarCover/cover";

function profileBanner() {
  const { profile, myUser } = useContext(UserContext);

  return (
    <fragment className="w-full bg-white-sr drop-shadow-sm rounded-[10px] h-fit flex flex-col">
      {/* start profile photo  */}
      <AvatarProfile url={profile?.avatar} />
      {/* end profile photo  */}
      {/* start banner photo  */}

      <CoverProfile url={profile?.cover} editable={myUser} />

      {/* end banner photo  */}
      {/* start button edit profile area  */}
      <fragment className="w-full h-fit flex justify-end p-5 ">
        <Button
          variant="outlined"
          className="!capitalize !text-birulogo-sr !border-birulogo-sr !text-xs lg:!text-sm !border-[2px] "
        >
          Edit Profile
        </Button>
      </fragment>
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
