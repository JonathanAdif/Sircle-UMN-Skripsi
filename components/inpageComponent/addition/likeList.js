import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "../avatarCover/avatar";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";
import { globalContext } from "@/context/globalContext";
// icon
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Link from "next/link";

import { UserContext } from "@/context/userContext";

function Listprp({ listAvatar, listUsername, myLike, profileLike }) {
  const hasfollow =
    "!bg-green-600  disabled:!opacity-25 disabled:!text-white-sr !capitalize";
  const notfollow =
    "!bg-birulogo-sr  disabled:!opacity-25 disabled:!text-white-sr !capitalize";
  const [follow, setFollow] = useState([]);

  const { profile: myProfile } = useContext(UserContext);
  const {
    supabase,
    fetchfollowing,
    userId,
    fetchfollowers: fetchFollow,
    followToggle,
    isFollowedByMe,
  } = useContext(globalContext);
  const nfollow = userId != myProfile?.id;

  // start follow unfollow function in like list 

  useEffect(() => {
    if (profileLike) {
      fetchfollowers();
    }
    return;
  }, [profileLike]);

  function fetchfollowers() {
    supabase
      .from("following")
      .select("id, follow_id ,profiles(*)")
      .eq("profiles.id", profileLike)
      .eq("follow_id", profileLike)
      .then((result) => setFollow(result.data));
  }

  const isFollowByMe = !!follow?.find(
    (follows) => follows.user_id === myProfile?.id
  );

  function followlistToggle() {
    if (isFollowedByMe && isFollowByMe) {
      supabase
        .from("followers")
        .delete()
        .eq("user_id", myProfile?.id)
        .eq("follow_id", profileLike)
        .then(() => {
          fetchfollowers() && fetchfollowing();
        });
        supabase
        .from("following")
        .delete()
        .eq("user_id", myProfile?.id)
        .eq("follow_id", profileLike)
        .then(() => {
          fetchfollowers() && fetchfollowing();
        });
      return;
    }
    supabase
      .from("followers")
      .insert({
        user_id: myProfile?.id,
        follow_id: profileLike,
      })
      .then((result) => {
        fetchfollowers() && fetchfollowing();
      });
      supabase
      .from("following")
      .insert({
        user_id: myProfile?.id,
        follow_id: profileLike,
      })
      .then((result) => {
        fetchfollowers() && fetchfollowing();
      });
     
  }

    // end follow unfollow function in like list 

  return (
    <List sx={{ width: "100%", maxWidth: 750, bgcolor: "background.paper" }}>
      <ListItem className="!flex !flex-row !items-center">
        <div className="flex flex-row gap-5 items-center w-full h-fit">
          <Avatar url={listAvatar} />

          <Link href={"/profile/" + profileLike}>
            <ListItemText
              sx={{ width: "100%", maxWidth: 450 }}
              primary={listUsername}
            />
          </Link>

          {!myLike && (
            <Button
              variant="contained"
              className={isFollowedByMe || isFollowByMe ? hasfollow : notfollow}
              startIcon={
                isFollowedByMe || isFollowByMe ? (
                  <CheckOutlinedIcon className="menu-icon" />
                ) : (
                  <PersonAddAlt1OutlinedIcon className="menu-icon" />
                )
              }
              onClick={userId && nfollow ? followToggle : followlistToggle}
            >
              {isFollowedByMe || isFollowByMe ? "Following" : "follow"}
            </Button>
          )}
        </div>
      </ListItem>

      <Divider variant="inset" component="li" />
    </List>
  );
}

export default Listprp;
