import Feed from "@/components/componentPages/feed";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "./login";

function index() {
  const session = useSession();


  if(!session){
    return <LoginPage/>
  }

  return <Feed />;
}

export default index;
