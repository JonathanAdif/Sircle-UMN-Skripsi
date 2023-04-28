import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import PostMaker1 from "../postmaker/postMaker1";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar1 from "../rightbar/rightbar1";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { useSession } from "@supabase/auth-helpers-react";
import { UserContext } from "@/context/userContext";

function feed() {
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);

  const session = useSession();

  const [profile, setProfile] = useState(null);

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
      .is('parent', null)
      .order("created_at", { ascending: false })
      .then(result => {
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
          <UserContext.Provider value={{ profile }}>
            <PostMaker1 onPost={fetchPost} />
            {posts?.length > 0 && posts.map(post => (
          <Postcontainer key={post.id} {...post} />
        ))}
          </UserContext.Provider>
        </div>
        <div className="mainRightlayout">
          <Rightbar1 />
        </div>
      </div>
    </>
  );
}

export default feed;
