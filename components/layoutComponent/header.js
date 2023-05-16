import Avatar from "../inpageComponent/avatarCover/avatar";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Link from "next/link";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

// Icon
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function Header() {
  const supabase = useSupabaseClient();
  const [profilesList, setProfileslist] = useState("");
  // const [input, setInput] = useState("");

  const openSidebar = (event) => {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };

  const { profile } = useContext(UserContext);

  // start notification badge

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  // end notification badge

  // start open popper

  const [anchorEl, setAnchorEl] = useState(null);

  const handlepopperClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlepopperClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;

  // end open popper

  // start fetch profile list
  const handleChange = (value) => {
    // setInput(value);
    supabase
      .from("profiles")
      .select("id, username, avatar")
      .textSearch("username", value, {
        type: "websearch",
      })
      .then((result) => {
        setProfileslist(result.data);
      });
  };
  // end fetch profile list

  return (
    <div className="fixed z-10 top-0 h-[65px] sm:h-[100px] w-full lg:w-9/12 lg:right-0 bg-white-sr drop-shadow-sm flex items-center justify-between px-5 lg:px-[50px]">
      {/* <!-- start sidebar button  --> */}
      <span
        className="relative text-black-sr text-xl cursor-pointer lg:hidden"
        onClick={openSidebar}
      >
        <MenuOutlinedIcon />
      </span>
      {/* <!-- end sidebar button  --> */}

      {/* <!-- start search area  --> */}
      <div>
        <div className="search-area">
          <SearchOutlinedIcon className="menu-icon" />
          <input
            type="text"
            placeholder="Search Sircle Users"
            className="text-[14px] lg:text-base ml-2 w-[120px] lg:w-[305px] text-gray-sr bg-transparent focus:outline-none"
            // value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        {profilesList?.length > 0 && (
          <div className="absolute h-fit p-2.5 bg-white-sr drop-shadow-xl rounded-[10px]  mt-2.5 w-[120px] lg:w-[500px] flex flex-col items-left gap-5">
            {profilesList?.length > 0 &&
              profilesList.map((plist) => (
                <Link href={"/profile/" + plist?.id}>
                  <div className="flex flex-row items-center gap-5 cursor-pointer w-full h-fit hover:bg-birulogo-sr rounded-[10px] hover:text-white-sr p-2.5">
                    <Avatar url={plist.avatar} />
                    <div>{plist.username}</div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
      {/* <!-- end search area  -->  */}

      <div className="flex flex-row items-center gap-[15px] lg:gap-5">
        <IconButton
          color="primary"
          aria-label={notificationsLabel(100)}
          component="label"
          className=" !bg-white-sr !text-oldgray-sr"
          onClick={handlepopperClick}
        >
          <Badge badgeContent={7} color="primary">
            <NotificationsNoneOutlinedIcon
              sx={{ fontSize: { xs: 25, lg: 30 } }}
            />
          </Badge>
        </IconButton>
        <Popover
          id={idPop}
          open={openPop}
          anchorEl={anchorEl}
          onClose={handlepopperClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 750, bgcolor: "background.paper" }}
          >
            <ListItem className="!flex !flex-row !items-center">
              <div className="flex flex-row gap-5 items-center w-full h-fit">
                {/* <Avatar url={listAvatar} /> */}
                <div>jo has like your post</div>
                {/* <Link href={"/profile/" + profileLike}> */}
                {/* <ListItemText
                    sx={{ width: "100%", maxWidth: 450 }}
                    primary={listUsername}
                  /> */}
                {/* </Link> */}
              </div>
            </ListItem>

            <Divider variant="inset" component="li" />
          </List>
        </Popover>
        <Link href={"/profile/" + profile?.id}>
          <Avatar url={profile?.avatar} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
