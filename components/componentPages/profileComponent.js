import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Postcontainer from "../postcontainer/postcontainer";
import ProfileBanner from "../banner/profileBanner";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useContext, useState, useEffect, useRef } from "react";

import { UserContext } from "@/context/userContext";
import { UserProfileContext } from "@/context/userprofileContext";

function profileComponent() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const userId = router.query.id;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState([]);

  const [following, setFollowing] = useState([]);

  const { profile: myProfile } = useContext(UserContext);

  const {
    profile: otherProfile,
    myUser,
    fetchUser,
    setProfile: setUserProfile,
  } = useContext(UserProfileContext);

  // start function buat masukin post ke profile page

  useEffect(() => {
    if (!userId) {
      return;
    }
    loadPosts().then(() => {});
    fetchfollowers();
    if (userId != myProfile?.id) {
      return;
    }
    fetchfollowing();
  }, [myProfile?.id, userId]);

  async function loadPosts() {
    const posts = await userPosts(userId);
    const profile = await userProfile(userId);
    setPosts(posts);
    setProfile(profile);
  }

  async function userPosts(userId) {
    const { data } = await supabase
      .from("posts")
      .select("id, content, created_at, photos, videos, writer")
      .is("parent", null)
      .order("created_at", { ascending: false })
      .eq("writer", userId);
    return data;
  }

  async function userProfile(userId) {
    const { data } = await supabase.from("profiles").select().eq("id", userId);
    return data?.[0];
  }

  // end function buat masukin post ke profile page

  function fetchfollowers() {
    supabase
      .from("followers")
      .select()
      .eq("follow_id", userId)
      .then((result) => setFollow(result.data));
  }

  function fetchfollowing() {
    supabase
      .from("followers")
      .select()
      .eq("user_id", myProfile?.id)
      .then((result) => setFollowing(result.data));
  }

  const isFollowedByMe = !!follow?.find(
    (follows) => follows.user_id === myProfile?.id
  );

  function followToggle() {
    if (isFollowedByMe) {
      supabase
        .from("followers")
        .delete()

        .eq("user_id", myProfile.id)
        .eq("follow_id", userId)
        .then(() => {
          fetchfollowers();
          fetchfollowing();
        });
      return;
    }
    supabase
      .from("followers")
      .insert({
        user_id: myProfile.id,
        follow_id: userId,
      })
      .then((result) => {
        fetchfollowers();
        fetchfollowing();
      });
  }

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
                <div className="flex flex-row w-full justify-between h-fit">
                  <div>Following</div>
                  <div>{following?.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default profileComponent;
