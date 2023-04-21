import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IconButton from "@mui/material/IconButton";

function CoverProfile({ url, editable }) {
  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  return (
    <fragment className="!w-full !h-[225px] !rounded-[10px]  ">
      <a data-fancybox="single" href={url}>
        <img
          src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/default-cover.jpg?t=2023-04-20T14%3A30%3A42.502Z"
          alt="cover"
          className="w-full h-full !rounded-[10px]  object-center object-cover cursor-pointer"
        />
      </a>
      {editable && (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          className=" !absolute !top-5 !right-5 !bg-white-sr !p-2.5"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            //   onChange={addImage}
          />
          <i className="fi fi-rr-camera !text-xl w-5 h-5 !text-birulogo-sr"></i>
        </IconButton>
      )}
    </fragment>
  );
}

export default CoverProfile;
