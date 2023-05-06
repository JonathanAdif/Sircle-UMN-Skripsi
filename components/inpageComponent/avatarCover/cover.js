import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IconButton from "@mui/material/IconButton";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Spinner from "../addition/spinner";
import { uploadProfileSectionImage } from "@/helper/userHelper";

// icon
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

function CoverProfile({ url, editable, onChange }) {
  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  const supabase = useSupabaseClient();
  const [stilluploading, setstillUploading] = useState(false);
  const session = useSession();

  async function coverUpdate(ev) {
    const file = ev.target.files?.[0];
    if (file) {
      setstillUploading(true);
      await uploadProfileSectionImage(
        supabase,
        session.user.id,
        file,
        "covers",
        "cover"
      );
      setstillUploading(false);
      if (onChange) onChange();
    }
  }

  return (
    <div className="!w-full !h-[225px] !rounded-[10px] !z-0 ">
      <a data-fancybox="single" href={url}>
        <img
          src={url}
          alt="cover"
          className="w-full h-full !rounded-[10px]  object-center object-cover cursor-pointer"
        />
      </a>

      {stilluploading && (
        <div className=" !absolute !h-[225px] !w-full !rounded-[10px] opacity-90 bg-white-sr !top-0 ">
          <span className=" font-normal justify-center  !w-full !h-full text-birulogo-sr text-xs flex flex-col items-center">
            Uploading
            <Spinner />
          </span>
        </div>
      )}

      {editable && (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          className=" !absolute !top-5 !right-5 !bg-white-sr !p-2.5"
        >
          <input hidden accept="image/*" type="file" onChange={coverUpdate} />
          <CameraAltOutlinedIcon
            className=" !text-birulogo-sr"
            sx={{ fontSize: { xs: 20, lg: 25 } }}
          />
        </IconButton>
      )}
    </div>
  );
}

export default CoverProfile;
