import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import PostMaker1 from "../postmaker/postMaker1";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar1 from "../rightbar/rightbar1";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/context/userContext";
import { UserProfileContext } from "@/context/userprofileContext";

function feed() {
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);

  const { profile: myProfile } = useContext(UserContext);

  const {
    followToggle,
    isFollowedByMe,
  } = useContext(UserProfileContext);

  useEffect(() => {
    fetchPost();
  }, []);


  function fetchPost() {
    supabase
      .from("posts")
      .select(
        "id, content, created_at, photos, videos, profiles(id, avatar, username)"
      )
      .is("parent", null)
      .order("created_at", { ascending: false })
      .then((result) => {
        console.log("posts", result);
        setPosts(result.data);
      });
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="mainLayout">
        <div className="mainLeftlayout">
          <PostMaker1 onPost={fetchPost} />
          {posts?.length > 0 &&
            posts.map((post) => <Postcontainer {...post}  follow={followToggle} followstat={isFollowedByMe} />)}
        </div>
        <div className="mainRightlayout">
          <Rightbar1 />
        </div>
      </div>
    </>
  );
}

export default feed;
