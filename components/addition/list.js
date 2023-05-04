import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "../avatarCover/avatar";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserProfileContext } from "@/context/userprofileContext";
// icon
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Link from "next/link";

function Listprp({
  listAvatar,
  listUsername,
  myLike,
  followButton,
  followStat,
  profileLike,
}) {
  const hasfollow =
    "!bg-green-600  disabled:!opacity-25 disabled:!text-white-sr !capitalize";
  const notfollow =
    "!bg-birulogo-sr  disabled:!opacity-25 disabled:!text-white-sr !capitalize";

  //   const { followToggle, isFollowedByMe,  userId } = useContext(UserProfileContext);

  return (
    <List sx={{ width: "100%", maxWidth: 750, bgcolor: "background.paper" }}>
      <ListItem className="!flex !flex-row !items-center">
        <div className="flex flex-row gap-5 items-center w-full h-fit">
          <Avatar url={listAvatar} />

          <Link href={ "/profile/" + profileLike}>
            <ListItemText
              sx={{ width: "100%", maxWidth: 450 }}
              primary={listUsername}
            />
          </Link>

          {!myLike && (
            <Button
              variant="contained"
              className={followStat ? hasfollow : notfollow}
              startIcon={
                followStat ? (
                  <CheckOutlinedIcon className="menu-icon" />
                ) : (
                  <PersonAddAlt1OutlinedIcon className="menu-icon" />
                )
              }
              onClick={followButton}
            >
              {followStat ? "Following" : "follow"}
            </Button>
          )}
        </div>
      </ListItem>

      <Divider variant="inset" component="li" />
    </List>
  );
}

export default Listprp;
