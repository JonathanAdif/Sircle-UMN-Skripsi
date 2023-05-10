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
  const [followingData, setFollowingdata] = useState([]);

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
    if (userId) {
      fetchUser();
      loadPosts().then(() => {});
      fetchfollowersData();
      fetchfollowingData();
    }
 
  }, [myProfile?.id, userId]);

  // start function buat masukin post ke profile page

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

  function fetchfollowersData() {
    if (myProfile?.id == userId) {
      supabase
        .from("followers")
        .select("id, followers_id , profiles(*)")
        // .eq("profiles.id", userId)
        // .eq("user_id", myProfile?.id)
        .eq("followers_id", myProfile?.id)
        // .then((result) => setFollow(result.data));
        .then((result) => {
          supabase
          .from("following")
          .select("id, user_id , profiles(*)")
          // .eq("profiles.id", myProfile?.id)
          .eq("followers_id", userId)
          .then((result) => setFollow(result.data));
        });
    } else {
      supabase
        .from("following")
        .select("id, user_id , profiles(*)")
        .eq("profiles.id", myProfile?.id)
        .eq("followers_id", userId)
        .then((result) => setFollow(result.data));
    }
    return;
  }


  function fetchfollowingData() {
    if (myProfile?.id == userId) {
      supabase
        .from("followers")
        .select("id, followers_id , profiles(*)")
        // .eq("profiles.id", userId)
        .eq("user_id", myProfile?.id)
        // .eq("followers_id", userId)
        .then((result) => setFollowing(result.data));
        // .then((result) => {
        //   supabase
        //   .from("following")
        //   .select("id, user_id , profiles(*)")
        //   // .eq("profiles.id", myProfile?.id)
        //   .eq("user_id", userId)
        //   .then((result) => console.log(result.data));
        // });
    } else {
      supabase
        .from("following")
        .select("id, user_id , profiles(*)")
        .eq("user_id", userId)
        .then((result) => setFollowing(result.data));
    }
    return;
  }

  const isFollowedByMe = !!follow?.find(
    (follows) => follows.user_id === myProfile?.id
  );

  const isFollowByMe = !!following?.find(
    (follows) => follows.user_id === myProfile?.id
  );

  function followToggle() {
    if (isFollowedByMe || isFollowByMe) {
      supabase
        .from("following")
        .delete()
        .eq("user_id", myProfile.id)
        .eq("followers_id", userId)
        .then(() => {
          fetchfollowersData();
          fetchfollowingData();
        });
      supabase
        .from("followers")
        .delete()
        .eq("user_id", myProfile.id)
        .eq("followers_id", userId)
        .then(() => {
          fetchfollowersData();
          fetchfollowingData();
        });
      return;
    }
    supabase
      .from("following")
      .insert({
        user_id: myProfile.id,
        followers_id: userId,
      })
      .then((result) => {
        fetchfollowersData();
        fetchfollowingData();
      });
    supabase
      .from("followers")
      .insert({
        user_id: myProfile.id,
        followers_id: userId,
      })
      .then((result) => {
        fetchfollowersData();
        fetchfollowingData();
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
        follow,
        userId,
        profile,
        posts,
        supabase,
        followersData,
        followingData,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
