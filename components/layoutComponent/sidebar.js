import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
// import { supabase } from "@/lib/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

// icon
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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

      <CancelOutlinedIcon
        className=" !absolute !top-5 !right-5 !text-birulogo-sr !cursor-pointer lg:!hidden"
        sx={{ fontSize: 20 }}
        onClick={openSidebar}
      />

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
              startIcon={
                <PublicOutlinedIcon sx={{ fontSize: { xs: 20, lg: 25 } }} />
              }
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
              startIcon={
                <PersonOutlinedIcon sx={{ fontSize: { xs: 20, lg: 25 } }} />
              }
            >
              Profile
            </Button>
          </Link>

          {/* <Button
            className="menu-btn menu-name "
            startIcon={
              <NotificationsNoneOutlinedIcon
                sx={{ fontSize: { xs: 20, lg: 25 } }}
              />
            }
          >
            Notification
          </Button> */}

          <Link href="/event">
            <Button
              className={
                router.pathname == "/event" ? activeClasses : nonActiveClasses
              }
              startIcon={
                <LocalActivityOutlinedIcon
                  sx={{ fontSize: { xs: 20, lg: 25 } }}
                />
              }
            >
              Event
            </Button>
          </Link>

          <Link href="/savedPost">
            <Button
              className={
                router.pathname == "/savedPost"
                  ? activeClasses
                  : nonActiveClasses
              }
              startIcon={
                <BookmarkBorderOutlinedIcon
                  sx={{ fontSize: { xs: 20, lg: 25 } }}
                />
              }
            >
              Saved Post
            </Button>
          </Link>

          <Button
            className="menu-btn menu-name "
            startIcon={
              <LogoutOutlinedIcon sx={{ fontSize: { xs: 20, lg: 25 } }} />
            }
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
