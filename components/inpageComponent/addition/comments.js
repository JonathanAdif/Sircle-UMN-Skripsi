import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatarr from "../avatarCover/avatar";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

function Comments({
  id: commentId,
  content,
  created_at,
  writer,
  parent,
  profiles: commentProfiles,
}) {
  const { profile: myProfile } = useContext(UserContext);
  const supabase = useSupabaseClient();
  const session = useSession();

  const deletingComment = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", commentId)
      .eq("parent", parent)
      .eq("writer", myProfile.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }

    window.location.reload(false);
  };

  return (
    <div className="mt-2 flex gap-2 items-center">
      <Avatarr url={commentProfiles?.avatar} />
      <div className=" bg-gray-sr bg-opacity-20 py-2 px-4 rounded-[10px]">
        <div className="flex flex-row gap-2.5">
          <Link href={"/profile/" + commentProfiles.id}>
            <span className="hover:underline font-semibold mr-1">
              {commentProfiles.username}
            </span>
          </Link>
          <span className="text-sm text-oldgray-sr">
            <ReactTimeAgo
              timeStyle={"twitter"}
              date={new Date(created_at).getTime()}
            />
          </span>
        </div>
        <p className="text-sm">{content}</p>
        {writer == session.user.id && (
          <div
            className=" font-normal text-birulogo-sr text-xs mt-1 cursor-pointer"
            onClick={deletingComment}
          >
            Delete
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
