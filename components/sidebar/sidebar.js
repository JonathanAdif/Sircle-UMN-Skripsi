import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

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

  return (
    <div class="sidebar z-20 font-poppins drop-shadow-navbar fixed top-0 bottom-0 lg:left-0 p-2 w-10/12 lg:w-3/12 overflow-y-auto text-center bg-white-sr hidden lg:block">
      <div class=" w-full flex flex-col items-center py-[50px]">
        <img
          src="/logotulisan.png"
          alt="logotulisan"
          className="w-[155px] lg:w-[220px] h-[70px] lg:h-[105px] object-cover"
        />
      </div>

      <i
        className="fi fi-rr-cross-circle absolute top-5 right-5 text-xl text-birulogo-sr cursor-pointer lg:hidden"
        onClick={openSidebar}
      ></i>

      <div className="flex flex-col gap-5">
        <div class="w-full text-left pl-10 text-black-sr">
          <span>Menu</span>
        </div>

        <div className="flex flex-col gap-[5px]">
          {/* start menu atas ori  */}

          <Link href="/global">
            <Button
              className={
                pathname === "/global"
                  ? activeClasses
                  : nonActiveClasses
              }
              startIcon={<i class="fi fi-rr-world menu-icon"></i>}
            >
              Beranda Global
            </Button>
          </Link>

          <Button
            className="menu-btn menu-name "
            startIcon={<i class="fi fi-rr-users-alt menu-icon"></i>}
          >
            Beranda Prodi
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i class="fi fi-rr-users menu-icon"></i>}
          >
            Beranda Teman
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i class="fi fi-rr-bell menu-icon"></i>}
          >
            Notifikasi
          </Button>

          <Button
            className="menu-btn menu-name "
            startIcon={<i class="fi fi-rr-calendar-star menu-icon"></i>}
          >
            Event
          </Button>
          {/* end menu atas ori  */}
          {/* start menu atas tambahan */}

          {/* end menu atas tambahan  */}
        </div>

        <div class=" bg-gray-sr h-[1px] w-10/12 px-5 m-auto"></div>

        <div class="w-full text-left pl-10 text-black-sr">
          <span>Settings</span>
        </div>

        <div className="flex flex-col gap-[5px]">
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
          >
            Logout
          </Button>
          {/* end menu bawah ori  */}
        </div>

        <div class="my-[35px] text-[10px] w-full text-left pl-12 text-black-sr">
          <span>JA & GK 2023. All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default sidebar;
