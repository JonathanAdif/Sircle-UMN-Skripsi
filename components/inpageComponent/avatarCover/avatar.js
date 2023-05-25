import Avatar from "@mui/material/Avatar";

function Avatarr({ url }) {
  return (
    <Avatar
      alt="Avatar"
      src={url}
      className="w-[35px] lg:w-[45px] rounded-full cursor-pointer shadow-sm"
    />
  );
}

export default Avatarr;
