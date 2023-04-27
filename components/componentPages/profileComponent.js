import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Postcontainer from "../postcontainer/postcontainer";
import ProfileBanner from "../banner/profileBanner";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function profileComponent() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const userId = router.query.id;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  // start function buat masukin post ke profile page

  useEffect(() => {
    if (!userId) {
      return;
    }

    loadPosts().then(() => {});
  }, [userId]);

  async function loadPosts() {
    const posts = await userPosts(userId);
    const profile = await userProfile(userId);
    setPosts(posts);
    setProfile(profile);
  }

  async function userPosts(userId) {
    const { data } = await supabase
      .from("posts")
      .select("id, content, created_at, writer")
      .order("created_at", { ascending: false })
      .eq("writer", userId);
    return data;
  }

  async function userProfile(userId) {
    const { data } = await supabase.from("profiles").select().eq("id", userId);
    return data?.[0];
  }

  // end function buat masukin post ke profile page

  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <ProfileBanner />

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
                  <div>100</div>
                </div>
                <div className="flex flex-row w-full justify-between h-fit">
                  <div>Following</div>
                  <div>1000</div>
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
