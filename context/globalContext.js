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

  const [followersData, setFollowersdata] = useState([]);

  const myUser = userId === session?.user?.id;
  const { profile: myProfile } = useContext(UserContext);

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

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
    loadPosts().then(() => {});
    fetchfollowers();
    fetchfollowersData()
  }, [userId]);
  // start function buat masukin post ke profile page

  // useEffect(() => {
  //   if (userId) {
  //     loadPosts().then(() => {});
  //     fetchfollowers();
  //   }
  //   if (myProfile?.id ) {
  //    fetchfollowers();
  //   }
  //   return;
  // }, [myProfile?.id, userId]);

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
      .from("follow")
      .select()
      // .eq("profiles.id", userId)
      .eq("followers_id", userId)
      .then((result) => setFollow(result.data));
  }

  function fetchfollowersData() {
    supabase
      .from("following")
      .select("*, profiles(*)")
      .eq("profiles.id", myProfile?.id)
      .eq("followers_id", userId)
      .eq("user_id", myProfile?.id)
      .then((result) => setFollowersdata(result.data));
  }

  // function fetchfollowing() {
  //   supabase
  //     .from("following")
  //     .select("*,profiles(*)")
  //     .eq("profiles.id", userId)
  //     .eq("follow_id", userId)
  //     .then((result) => setFollowing(result.data));
  // }

  const isFollowedByMe = !!follow?.find(
    (follows) => follows.followers_id === userId
  );

  // const isFollowByMe = !!following?.find(
  //   (follows) => follows.follow_id === userId
  // );

  function followToggle() {
    if (isFollowedByMe) {
      supabase
        .from("follow")
        .delete()
        .eq("user_id", myProfile.id)
        .eq("followers_id", userId)
        .then(() => {
          fetchfollowers();
          fetchfollowersData();
        });
        supabase
        .from("followers")
        .delete()
        .eq("user_id", myProfile.id)
        .eq("followers_id", userId)
        .then(() => {
          fetchfollowers();
          fetchfollowersData();
        });
        supabase
        .from("following")
        .delete()
        .eq("user_id", myProfile.id)
        .eq("followers_id", userId)
        .then(() => {
          fetchfollowers();
          fetchfollowersData();
        });
      return;
    }
    supabase
      .from("follow")
      .insert({
        user_id: myProfile.id,
        followers_id: userId,
      })
      .then((result) => {
        fetchfollowers();
        fetchfollowersData();
      });
      supabase
      .from("followers")
      .insert({
        user_id: myProfile.id,
        followers_id: userId,
      })
      .then((result) => {
        fetchfollowers();
        fetchfollowersData();
      });
      supabase
      .from("following")
      .insert({
        user_id: myProfile.id,
        followers_id: userId,
      })
      .then((result) => {
        fetchfollowers();
        fetchfollowersData();
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
        userId,
        profile,
        posts,
        supabase,
        followersData,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
