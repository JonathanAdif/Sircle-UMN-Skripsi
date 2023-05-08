import Header from "../layoutComponent/header";
import Sidebar from "../layoutComponent/sidebar";
import Postcontainer from "../postComponent/postcontainer";
import ProfileBanner from "../inpageComponent/banner/profileBanner";
import { useContext } from "react";

import { UserContext } from "@/context/userContext";
import { globalContext } from "@/context/globalContext";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FollowStatList from "../inpageComponent/addition/followStatList";

import { useState, useRef, useEffect } from "react";

function profileComponent() {
  const { profile: myProfile } = useContext(UserContext);

  const {
    followToggle,
    following,
    isFollowedByMe,
    follow,
    profile,
    posts,
    userId,
    followStat,
    followersData,
  } = useContext(globalContext);

  const followingnotnull =
    "flex flex-row w-full justify-between h-fit cursor-pointer";
  const followingnull = "flex flex-row w-full justify-between h-fit";

  // start dialog

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // end dialog

  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <ProfileBanner follow={followToggle} followstat={isFollowedByMe} />

        <div className="flex flex-row gap-5">
          <div className="mainLeftlayout">
            {posts?.length > 0 &&
              posts.map((post) => (
                <Postcontainer
                  key={post.created_at}
                  {...post}
                  profiles={profile}
                />
              ))}
          </div>
          <div className="mainRightlayout">
            <div className="hidden lg:block px-[35px] py-[25px] bg-white-sr drop-shadow-sm rounded-[10px]">
              <div className="flex flex-col w-full h-fit  gap-2.5 ">
                <div className="flex flex-row w-full justify-between h-fit">
                  <div>Post</div>
                  <div>{posts?.length}</div>
                </div>
                <div
                  className={
                    followersData?.length > 0 ? followingnotnull : followingnull
                  }
                  onClick={handleClickOpen("paper")}
                >
                  <div>Followers</div>
                  <div>{followersData?.length}</div>
                </div>
                {followersData?.length > 0 && (
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogTitle id="scroll-dialog-title">
                      Followers
                    </DialogTitle>
                    <DialogContent dividers={scroll === "paper"}>
                      {followersData.length > 0 &&
                        followersData.map((follow) => (
                          <FollowStatList
                            key={follow.id}
                            listAvatar={follow?.profiles?.avatar}
                            listUsername={follow?.profiles?.username}
                            profileFollow={follow.user_id}
                            myFollowstat={follow.user_id === myProfile?.id}
                          />
                        ))}
                    </DialogContent>
                  </Dialog>
                )}
                {/* {userId == myProfile?.id && (
                  <div
                    className={
                      following?.length > 0 ? followingnotnull : followingnull
                    }
                    onClick={handleClickOpen("paper")}
                  >
                    <div>Following</div>
                    <div>{following?.length}</div>
                  </div>
                )} */}
                {/* {following?.length > 0 && (
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogTitle id="scroll-dialog-title">
                      Following
                    </DialogTitle>
                    <DialogContent dividers={scroll === "paper"}>
                      {following.length > 0 &&
                        following.map((follows) => (
                          <FollowStatList
                            key={follows.id}
                            listAvatar={follows?.profiles?.avatar}
                            listUsername={follows?.profiles?.username}
                            profileFollow={follows.user_id}
                            myFollowstat={follows.user_id === myProfile?.id}
                          />
                        ))}
                    </DialogContent>
                  </Dialog>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default profileComponent;
