import Header from "../layoutComponent/header";
import Sidebar from "../layoutComponent/sidebar";
import PostMaker1 from "../postComponent/postMaker";
import Postcontainer from "../postComponent/postcontainer";
import Rightbar1 from "../layoutComponent/rightbar1";

import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";


function feed() {
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);
  const session = useSession();
  const [profile,setProfile] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);


  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase.from('profiles')
      .select()
      .eq('id', session.user.id)
      .then(result => {
        if (result.data.length) {
          setProfile(result.data[0]);
        }
      })
  }, [session?.user?.id]);


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
            posts.map((post) => <Postcontainer  key={post.id} {...post} />)}
        </div>
        <div className="mainRightlayout">
          <Rightbar1 />
        </div>
      </div>
    </>
  );
}

export default feed;
