import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";
import Feed from "@/components/componentPages/feed";

function Index() {
  const session = useSession();

  if (!session) {
    return <LoginPage />;
  }

  return <Feed />;
}

export default Index;
