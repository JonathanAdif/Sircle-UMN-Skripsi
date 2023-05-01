import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Postcontainer from "../postcontainer/postcontainer";
import { UserContextProvider } from "@/context/userContext";

function SavedpostComponent() {
  const [posts, setPosts] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();
  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from("savedpost")
      .select("post_id")
      .eq("user_id", session.user.id)
      .then((result) => {
        const postsIds = result.data.map((item) => item.post_id);
        supabase
          .from("posts")
          .select("*, profiles(*)")
          .in("id", postsIds)
          .order("created_at", { ascending: false })
          .then((result) => setPosts(result.data));
      });
  }, [session?.user?.id]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="mainLayout">
        <div className="mainLeftlayout">
          <UserContextProvider>
        
            <h1 className="font-bold text-base lg:text-xl text-black-sr">My <span className="text-birulogo-sr">Saved</span> posts ..</h1>
            {posts.length > 0 &&
              posts.map((post) => (
                <div key={post.id}>
                  <Postcontainer {...post} />
                </div>
              ))}
          </UserContextProvider>
        </div>
        <div className="mainRightlayout"></div>
      </div>
    </>
  );
}

export default SavedpostComponent;
