import ProfileComponent from "@/components/componentPages/profileComponent";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "../login";

function profilePage() {
  const session = useSession();


  if(!session){
    return <LoginPage/>
  }

  return <ProfileComponent />;
}

export default profilePage;
