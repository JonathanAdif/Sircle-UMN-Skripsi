import Avatar from "../inpageComponent/avatarCover/avatar";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Link from "next/link";

// Icon
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function header() {
  const openSidebar = (event) => {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };

  const { profile } = useContext(UserContext);

  return (
    <div className="fixed z-10 top-0 h-[65px] sm:h-[100px] w-full lg:w-9/12 lg:right-0 bg-white-sr drop-shadow-sm flex items-center justify-between px-5 lg:px-[30px]">
      {/* <!-- start sidebar button  --> */}
      <span
        className="relative text-black-sr text-xl cursor-pointer lg:hidden"
        onClick={openSidebar}
      >
        <MenuOutlinedIcon />
      </span>
      {/* <!-- end sidebar button  --> */}

      {/* <!-- start search area  --> */}
      <div className="search-area">
        <SearchOutlinedIcon className="menu-icon" />
        <input
          type="text"
          placeholder="Search"
          className="text-[14px] lg:text-base ml-2 w-[120px] lg:w-[305px] text-gray-sr bg-transparent focus:outline-none"
        />
      </div>
      {/* <!-- end search area  -->  */}

      <div className="flex flex-row items-center gap-[15px] lg:gap-[15px]">
        <IconButton
          color="primary"
          aria-label="edit"
          component="label"
          className=" !bg-white-sr !text-oldgray-sr"
        >
          <NotificationsNoneOutlinedIcon
            sx={{ fontSize: { xs: 25, lg: 30 } }}
          />
        </IconButton>
        <Link href={"/profile/" + profile?.id}>
          <Avatar url={profile?.avatar} />
        </Link>
      </div>
    </div>
  );
}

export default header;
