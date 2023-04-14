import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
// import { supabase } from "@/lib/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

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
    await supabase.auth.signOut()
  }

  return (
    <fragment className="sidebar z-20 font-poppins drop-shadow-navbar fixed top-0 bottom-0 lg:left-0 p-2 w-10/12 lg:w-3/12 overflow-y-auto text-center bg-white-sr hidden lg:block">
      <fragment className=" w-full flex flex-col items-center py-[50px]">
        <img
          src="/logotulisan.png"
          alt="logotulisan"
          className="w-[155px] lg:w-[220px] h-[70px] lg:h-[105px] object-cover"
        />
      </fragment>

      <i
        className="fi fi-rr-cross-circle absolute top-5 right-5 text-xl text-birulogo-sr cursor-pointer lg:hidden"
        onClick={openSidebar}
      ></i>

      <fragment className="flex flex-col gap-5">
        <fragment className="w-full text-left pl-10 text-black-sr">
          <span>Menu</span>
        </fragment>

        <fragment className="flex flex-col gap-[5px]">
          {/* start menu atas ori  */}

          <Link href="/">
            <Button
              className={
                pathname === "/"
                  ? activeClasses
                  : nonActiveClasses
              }
              startIcon={<i className="fi fi-rr-world menu-icon"></i>}
            >
              Beranda Global
            </Button>
          </Link>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-users-alt menu-icon"></i>}
          >
            Beranda Prodi
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-users menu-icon"></i>}
          >
            Beranda Teman
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-bell menu-icon"></i>}
          >
            Notifikasi
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i className="fi fi-rr-calendar-star menu-icon"></i>}
          >
            Event
          </Button>
          {/* end menu atas ori  */}
          {/* start menu atas tambahan */}

          {/* end menu atas tambahan  */}
        </fragment>

        <fragment className=" bg-gray-sr h-[1px] w-10/12 px-5 m-auto"></fragment>

        <fragment className="w-full text-left pl-10 text-black-sr">
          <span>Settings</span>
        </fragment>

        <fragment className="flex flex-col gap-[5px]">
          {/* start menu bawah tambahan  */}

          {/* end menu bawah tambahan  */}
          {/* start menu bawah ori  */}
          <Link href="/profile">
            <Button
              className={
                pathname === "/profile"
                  ? activeClasses
                  : nonActiveClasses
              }
              startIcon={<i class="fi fi-rr-user menu-icon"></i>}
            >
              Profile
            </Button>
          </Link>

          <Button
            className="menu-btn menu-name "
            startIcon={<i class="fi fi-rr-settings-sliders menu-icon"></i>}
          >
            Settings
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i class="fi fi-rr-sign-out-alt menu-icon"></i>}
            onClick={GoogleLogout}
          >
            Logout
          </Button>
          {/* end menu bawah ori  */}
        </fragment>

        <fragment className="my-[35px] text-[10px] w-full text-left pl-12 text-black-sr">
          <span>JA & GK 2023. All Rights Reserved.</span>
        </fragment>
      </fragment>
    </fragment>
  );
}

export default sidebar;
