import Avatar from "../avatarCover/avatar";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import Link from "next/link";

function header() {
  const openSidebar = (event) => {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };

  const [profile, setProfile] = useState(null);
  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .then((result) => {
        if (result.data.length) {
          setProfile(result.data[0]);
        }
      });
  }, []);

  return (
    <fragment class="fixed z-10 top-0 h-[65px] sm:h-[100px] w-full lg:w-9/12 lg:right-0 bg-white-sr drop-shadow-sm flex items-center justify-between px-5 lg:px-[50px]">
      {/* <!-- start sidebar button  --> */}
      <span
        class="relative text-black-sr text-xl cursor-pointer lg:hidden"
        onClick={openSidebar}
      >
        <i class="fi fi-rr-menu-burger"></i>
      </span>
      {/* <!-- end sidebar button  --> */}

      {/* <!-- start search area  --> */}
      <fragment class="search-area">
        <i class="fi fi-rr-search w-[15px] lg:w-5 h-[15px] lg:h-5"></i>
        <input
          type="text"
          placeholder="Search"
          class="text-[14px] lg:text-base ml-2 w-[150px] lg:w-[200px] text-gray-sr bg-transparent focus:outline-none"
        />
      </fragment>
      {/* <!-- end search area  -->  */}

      <Link href={"/profile/" + profile?.id}>
        <fragment class="flex flex-row items-center lg:gap-5">
          <Avatar url={profile?.avatar} />
          <fragment classname="h-fit ">
            <span class="hidden lg:block text-base font-semibold cursor-pointer !capitalize lg:h-fit lg:max-w-[305px]  ">
              {profile?.username}
            </span>
          </fragment>
        </fragment>
      </Link>
    </fragment>
  );
}

export default header;
