import ProfileComponent from "@/components/pagesComponent/profileComponent";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";

function IdprofilePage() {
  const session = useSession();

  if (!session) {
    return <LoginPage />;
  }

  return <ProfileComponent />;
}

export default IdprofilePage;
