import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";

const withProtected = (Pages) => {
  return (props) => {
    const session = useSession();


    if (!session) {
      return <LoginPage />;
    }

    return <Pages {...props} />;
  };
};

export default withProtected;
