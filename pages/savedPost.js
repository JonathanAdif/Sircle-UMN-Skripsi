import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";
import SavedpostComponent from "@/components/pagesComponent/savedpostComponent";

function SavedPostPage() {
    const session = useSession();

    if (!session) {
      return <LoginPage />;
    }
  
    return <SavedpostComponent />;
}

export default SavedPostPage;