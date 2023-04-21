import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function AvatarProfile({ url }) {
  Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
  });

  return (
    <a data-fancybox="single" href={url}>
      <img
        src={url}
        className="w-[150px] inner  z-10 lg:w-[180px] rounded-full absolute cursor-pointer top-[145px] lg:top-[115px] left-5 lg:left-[30px] ring ring-birulogo-sr  ring-offset-0"
        alt="Avatar Profile"
      />
    </a>
  );
}

export default AvatarProfile;
