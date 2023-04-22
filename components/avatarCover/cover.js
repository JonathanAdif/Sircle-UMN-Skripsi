import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IconButton from "@mui/material/IconButton";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Spinner from "../spinner/spinner";
import { uploadProfileSectionImage } from "@/helper/userHelper";

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
    <fragment className="!w-full !h-[225px] !rounded-[10px] !z-0 ">
      <a data-fancybox="single" href={url}>
        <img
          src={url}
          alt="cover"
          className="w-full h-full !rounded-[10px]  object-center object-cover cursor-pointer"
        />
      </a>

      {stilluploading && (
        <fragment className=" !absolute !h-[225px] !w-full !rounded-[10px] opacity-90 bg-white-sr !top-0 ">
          <span className=" font-normal justify-center  !w-full !h-full text-birulogo-sr text-xs flex flex-col items-center">
            Uploading
            <Spinner />
          </span>
        </fragment>
      )}

      {editable && (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          className=" !absolute !top-5 !right-5 !bg-white-sr !p-2.5"
        >
          <input hidden accept="image/*" type="file" onChange={coverUpdate} />
          <i className="fi fi-rr-camera !text-xl w-5 h-5 !text-birulogo-sr"></i>
        </IconButton>
      )}
    </fragment>
  );
}

export default CoverProfile;
