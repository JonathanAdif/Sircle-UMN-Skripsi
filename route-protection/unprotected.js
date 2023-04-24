import { useSession } from "@supabase/auth-helpers-react";
import Index from "@/pages/.";

const withunProtected = (Pages) => {
  return (props) => {
    const session = useSession();

    if(session){
        return <Index/>
      }

    return <Pages {...props} />;
  };
};

export default withunProtected;
