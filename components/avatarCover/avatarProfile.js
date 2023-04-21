import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

function AvatarProfile({ url, editable, onChange }) {
  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  return (
    <fragment>
      <a data-fancybox="single" href={url}>
        <img
          src={url}
          className="w-[150px]  z-10 lg:w-[180px] rounded-full absolute cursor-pointer top-[145px] lg:top-[115px] left-5 lg:left-[30px] ring ring-birulogo-sr  ring-offset-0"
          alt="Avatar Profile"
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
              className="!p-2.5 !bg-white-sr !shadow-sm !shadow-black-sr"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                //  onChange={coverUpdate}
              />
              <i className="fi fi-rr-camera !text-xl !w-5 !h-5  !text-birulogo-sr"></i>
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
        </Badge>
      )}
    </fragment>
  );
}

export default AvatarProfile;
