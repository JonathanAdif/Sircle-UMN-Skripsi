import Header from "../layoutComponent/header";
import Sidebar from "../layoutComponent/sidebar";
import Postcontainer from "../postComponent/postcontainer";
import ProfileBanner from "../inpageComponent/banner/profileBanner";
import { useContext } from "react";

import { UserContext } from "@/context/userContext";
import { globalContext } from "@/context/globalContext";

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
  } = useContext(globalContext);

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
                <div className="flex flex-row w-full justify-between h-fit">
                  <div>Followers</div>
                  <div>{follow?.length}</div>
                </div>
                {userId == myProfile?.id && (
                  <div className="flex flex-row w-full justify-between h-fit">
                    <div>Following</div>
                    <div>{following?.length}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default profileComponent;
