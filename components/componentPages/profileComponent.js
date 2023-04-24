import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar2 from "../rightbar/rightbar2";
import ProfileBanner from "../banner/profileBanner";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";

function profileComponent() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const userId = router.query.id;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const session = useSession();

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
  }, [userId]);

  function fetchUser() {
    supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }

  const myUser = userId === session?.user?.id;

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
      <UserContext.Provider value={{ profile, myUser, fetchUser, setProfile }}>
        <fragment className="mainLayout2">
          <ProfileBanner />
          <fragment className="flex flex-row gap-5">
            <fragment className="mainLeftlayout">
              {posts?.length > 0 &&
                posts.map((post) => (
                  <Postcontainer
                    key={post.created_at}
                    {...post}
                    profiles={profile}
                  />
                ))}
            </fragment>
            <fragment className="mainRightlayout">
              <Rightbar2 />
            </fragment>
          </fragment>
        </fragment>
      </UserContext.Provider>
    </>
  );
}

export default profileComponent;
