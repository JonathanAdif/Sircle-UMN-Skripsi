import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { uploadProfileSectionImage } from "@/helper/userHelper";
import Spinner from "../addition/spinner";
import Avatar from "@mui/material/Avatar";

// icon
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

function AvatarProfile({ url, editable, onChange }) {
  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  const supabase = useSupabaseClient();
  const session = useSession();
  const [stilluploading, setstillUploading] = useState(false);
  async function avatarUpdate(ev) {
    const file = ev.target.files?.[0];
    if (file) {
      setstillUploading(true);
      await uploadProfileSectionImage(
        supabase,
        session.user.id,
        file,
        "avatars",
        "avatar"
      );
      setstillUploading(false);
      if (onChange) onChange();
    }
  }

  return (
    <div>
      <a data-fancybox="single" href={url}  className=" z-10 rounded-full absolute cursor-pointer top-[145px] lg:top-[115px] left-5 lg:left-[30px] ring ring-birulogo-sr  ring-offset-0">
        <Avatar
          alt="Avatar Profile"
          src={url}
          className="!w-[150px] !h-[150px] lg:!w-[180px] lg:!h-[180px]"
        />
      </a>

      {editable && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          className=" z-10 !absolute top-[145px] lg:top-[115px] left-5 lg:left-[30px]  !w-[150px]  lg:!w-[180px] !h-[150px] lg:!h-[180px]"
          badgeContent={
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              className="!p-2.5 !bg-white-sr !shadow-sm !shadow-black-sr !z-10"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={avatarUpdate}
              />
              <CameraAltOutlinedIcon
                className=" !text-birulogo-sr"
                sx={{ fontSize: { xs: 20, lg: 25 } }}
              />
            </IconButton>
          }
        >
          <a data-fancybox="single" href={url}>
            <Avatar
              alt="Avatar Profile"
              src={url}
              className="!w-[150px]  lg:!w-[180px] !h-[150px] lg:!h-[180px]"
            />
          </a>
          {stilluploading && (
            <div className=" !absolute  left-0 right-0 top-0 bottom-0 bg-white-sr rounded-full opacity-70 z-0">
              <span className=" font-normal justify-center  !w-full !h-full text-birulogo-sr text-xs flex flex-col items-center">
                Uploading
                <Spinner />
              </span>
            </div>
          )}
        </Badge>
      )}
    </div>
  );
}

export default AvatarProfile;
