import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import PostMaker1 from "../postmaker/postMaker1";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar1 from "../rightbar/rightbar1";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

function feed() {
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select('id, content, created_at, profiles(id, avatar, username)')
      .order("created_at", { ascending: false })
      .then((result) => {
        console.log('posts', result);
        setPosts(result.data);
      });
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <fragment className="mainLayout">
        <fragment className="mainLeftlayout">
          <PostMaker1 />
          {posts?.length > 0 && posts.map((post) => (
            <Postcontainer key={post.created_at}  {...post} />
          ))}
        </fragment>
        <fragment className="mainRightlayout">
          <Rightbar1 />
        </fragment>
      </fragment>
    </>
  );
}

export default feed;
