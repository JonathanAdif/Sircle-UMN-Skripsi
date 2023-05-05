import { createContext, useEffect, useState, useContext } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/userContext";

export const globalContext = createContext({});

export function UserProfileContextProvider({ children }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const router = useRouter();
  const userId = router.query.id;
  const [posts, setPosts] = useState([]);

  const [following, setFollowing] = useState([]);
  const [follow, setFollow] = useState([]);

  const myUser = userId === session?.user?.id;
  const { profile: myProfile } = useContext(UserContext);

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
          setProfiles(result.data[0]);
        }
      });
  }

// start function buat masukin post ke profile page

useEffect(() => {
  if (userId) {
    loadPosts().then(() => {});
    fetchfollowers();
  }
  if (myProfile?.id) {
    fetchfollowing();
  }
  return;
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

// start fungsi fungsi follow unfollow 
  function fetchfollowers() {
    supabase
      .from("followers")
      .select("*")
      .eq("follow_id", userId)
      .then((result) => setFollow(result.data));
  }


  function fetchfollowing() {
    supabase
      .from("followers")
      .select("*")
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
        .eq("user_id", myProfile?.id)
        .eq("follow_id", userId)
        .then(() => {
          fetchfollowers() && fetchfollowing();
        });
      return;
    }
    supabase
      .from("followers")
      .insert({
        user_id: myProfile?.id,
        follow_id: userId,
      })
      .then((result) => {
        fetchfollowers() && fetchfollowing();
      });
  }

  // end fungsi fungsi follow unfollow 

  return (
    <globalContext.Provider
      value={{
        profiles,
        myUser,
        fetchUser,
        setProfile,
        followToggle,
        following,
        isFollowedByMe,
        fetchfollowers,
        follow,
        // fetchfollowing,
        userId,
        profile,
        posts,
        supabase,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
