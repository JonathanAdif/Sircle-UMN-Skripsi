import ProfileComponent from "@/components/componentPages/profileComponent";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "../login";

function idprofilePage() {
  const session = useSession();


  if(!session){
    return <LoginPage/>
  }


  return <ProfileComponent />;
}

export default idprofilePage;
