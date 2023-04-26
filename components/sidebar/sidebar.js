import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
// import { supabase } from "@/lib/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

// start function untuk button close sidebar
function sidebar() {
  const openSidebar = (event) => {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };
  //end function untuk button close sidebar

  // start variabel untuk active class
  const router = useRouter();
  const { asPath: pathname } = router;
  const activeClasses = "menu-btn-active menu-name";
  const nonActiveClasses = "menu-btn menu-name";
  // end variabel untuk active class

  const supabase = useSupabaseClient();
  async function GoogleLogout() {
    await supabase.auth.signOut();
  }

  const [profile, setProfile] = useState(null);
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

  const theId = "/profile/" + session.user.id;

  return (
    <div className="sidebar z-20 font-poppins drop-shadow-sm fixed top-0 bottom-0 lg:left-0 p-2 w-10/12 lg:w-3/12 overflow-y-auto text-center bg-white-sr hidden lg:block">
      <div className=" w-full flex flex-col items-center py-[35px]">
        <Link href="/">
          <img
            src="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/logotulisan.png?t=2023-04-20T14%3A24%3A37.216Z"
            alt="logotulisan"
            className="w-[155px] lg:w-[220px] h-[70px] lg:h-[105px] object-cover cursor-pointer"
          />
        </Link>
      </div>

      <i
        className="fi fi-rr-cross-circle absolute top-5 right-5 text-xl text-birulogo-sr cursor-pointer lg:hidden"
        onClick={openSidebar}
      ></i>

      <div className="flex flex-col gap-5">
        <div className="w-full text-left pl-10 text-black-sr">
          <span>Menu</span>
        </div>

        <div className="flex flex-col gap-[5px]">
          {/* start menu atas ori  */}

          <Link href="/">
            <Button
              className={
                router.pathname == "/" ? activeClasses : nonActiveClasses
              }
              startIcon={<i className="fi fi-rr-world menu-icon"></i>}
            >
              Global
            </Button>
          </Link>

          <Link href={theId}>
            <Button
              className={
                pathname == "/profile/" + profile?.id
                  ? activeClasses
                  : nonActiveClasses
              }
              startIcon={<i className="fi fi-rr-user menu-icon"></i>}
            >
              Profile
            </Button>
          </Link>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-bell menu-icon"></i>}
          >
            Notification
          </Button>

          <Link href="/event">
            <Button
              className={
                router.pathname == "/event" ? activeClasses : nonActiveClasses
              }
              startIcon={<i className="fi fi-rr-calendar-star menu-icon"></i>}
            >
              Event
            </Button>
          </Link>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-bookmark menu-icon"></i>}
          >
            Saved Post
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-sign-out-alt menu-icon"></i>}
            onClick={GoogleLogout}
          >
            Logout
          </Button>
        </div>

        <div className="text-[10px] w-full text-left pl-12 text-black-sr">
          <span>JA & GK 2023. All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default sidebar;
