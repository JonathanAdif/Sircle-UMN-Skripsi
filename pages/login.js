import Home from "@/components/componentPages/login";
import { useSession } from "@supabase/auth-helpers-react";
import Index from "@/pages/.";

function LoginPage() {
  const session = useSession();

  if (session) {
    return <Index />;
  }

  return <Home />;
}

export default LoginPage;
