import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar2 from "../rightbar/rightbar2";
import ProfileBanner from "../banner/profileBanner";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";

function profileComponent() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const userId = router.query.id;
  const [profile, setProfile] = useState(null);
  const session = useSession();

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser()
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
    <>
      <Header />
      <Sidebar />
      <UserContext.Provider value={{ profile, myUser, fetchUser, setProfile }}>
        <fragment className="mainLayout2">
          <ProfileBanner />
          <fragment className="flex flex-row gap-5">
            <fragment className="mainLeftlayout">
              {/* <Postcontainer /> */}
            </fragment>
            <fragment className="mainRightlayout">
              <Rightbar2 />
            </fragment>
          </fragment>
        </fragment>
      </UserContext.Provider>
    </>
  );
}

export default profileComponent;
