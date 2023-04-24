import Avatar from "../avatarCover/avatar";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

import Link from "next/link";

function header() {
  const openSidebar = (event) => {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };

  const { profile } = useContext(UserContext);

  return (
    <div className="fixed z-10 top-0 h-[65px] sm:h-[100px] w-full lg:w-9/12 lg:right-0 bg-white-sr drop-shadow-sm flex items-center justify-between px-5 lg:px-[50px]">
      {/* <!-- start sidebar button  --> */}
      <span
        className="relative text-black-sr text-xl cursor-pointer lg:hidden"
        onClick={openSidebar}
      >
        <i className="fi fi-rr-menu-burger"></i>
      </span>
      {/* <!-- end sidebar button  --> */}

      {/* <!-- start search area  --> */}
      <div className="search-area">
        <i className="fi fi-rr-search w-[15px] lg:w-5 h-[15px] lg:h-5"></i>
        <input
          type="text"
          placeholder="Search"
          className="text-[14px] lg:text-base ml-2 w-[150px] lg:w-[305px] text-gray-sr bg-transparent focus:outline-none"
        />
      </div>
      {/* <!-- end search area  -->  */}

      <Link href={"/profile/" + profile?.id}>
        <div className="flex flex-row items-center lg:gap-5">
          <Avatar url={profile?.avatar} />
          <div className="h-fit ">
            <span className="hidden lg:block text-base font-semibold cursor-pointer !capitalize lg:h-fit lg:max-w-[305px]  ">
              {profile?.username}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default header;
