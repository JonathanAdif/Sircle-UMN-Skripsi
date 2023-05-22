import Header from "../layoutComponent/header";
import Sidebar from "../layoutComponent/sidebar";
import Postcontainer from "../postComponent/postcontainer";
import ProfileBanner from "../inpageComponent/banner/profileBanner";
import { useContext } from "react";

import { UserContext } from "@/context/userContext";
import { globalContext } from "@/context/globalContext";

import DialogData from "../inpageComponent/addition/dialog";

import { useState, useRef, useEffect } from "react";

function ProfileComponent() {
  const { profile: myProfile } = useContext(UserContext);

  const { followToggle, following, isFollowedByMe, follow, profile, posts } =
    useContext(globalContext);

  const followingnotnull =
    "flex flex-row w-full justify-between h-fit cursor-pointer";
  const followingnull = "flex flex-row w-full justify-between h-fit";

  // start dialog followers

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

  // end dialog followers

  // start dialog following

  const [openPop, setOpenPop] = useState(false);
  const [scrollPop, setScrollPop] = useState("paper");

  const handleClickOpenPop = (scrollType) => () => {
    setOpenPop(true);
    setScrollPop(scrollType);
  };

  const handleClosePop = () => {
    setOpenPop(false);
  };

  const descriptionElementRefPop = useRef(null);
  useEffect(() => {
    if (openPop) {
      const { current: descriptionElement } = descriptionElementRefPop;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openPop]);

  // end dialog following

  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <ProfileBanner
          follow={followToggle}
          followstat={isFollowedByMe}
        />

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
                    follow?.length > 0 ? followingnotnull : followingnull
                  }
                  onClick={handleClickOpen("paper")}
                >
                  <div>Followers</div>
                  <div>{follow?.length}</div>
                </div>
                {follow?.length > 0 &&
                  follow.map((follows) => (
                    <DialogData
                      key={follows.id}
                      title={"followers"}
                      open={open}
                      handleClose={handleClose}
                      stat={follow}
                      scroll={scroll}
                    />
                  ))}

                <div
                  className={
                    following?.length > 0 ? followingnotnull : followingnull
                  }
                  onClick={handleClickOpenPop("paper")}
                >
                  <div>Following</div>
                  <div>{following?.length}</div>
                </div>

                {following?.length > 0 &&
                  following?.map((follow) => (
                    <DialogData
                      key={follow.id}
                      title={"following"}
                      open={openPop}
                      handleClose={handleClosePop}
                      fstat={following}
                      scroll={scrollPop}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
