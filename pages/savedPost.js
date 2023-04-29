import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";
import SavedpostComponent from "@/components/componentPages/savedpostComponent";

function savedPostPage() {
    const session = useSession();

    if (!session) {
      return <LoginPage />;
    }
  
    return <SavedpostComponent />;
}

export default savedPostPage;