import { createContext, useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const UserProfileContext = createContext({});

export function UserProfileContextProvider({ children }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const userId = router.query.id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
  }, [userId]);

  function fetchUser() {
    supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }

  const myUser = userId === session?.user?.id;

  return (
    <UserProfileContext.Provider value={{ profile, myUser, fetchUser, setProfile }}>{children}</UserProfileContext.Provider>
  );
}
