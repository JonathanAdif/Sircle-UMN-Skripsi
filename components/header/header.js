function header() {
  const openSidebar = (event) => {
    document.querySelector(".sidebar").classList.toggle("hidden");
  };

  return (
    <fragment class="fixed z-10 top-0 h-[65px] sm:h-[100px] w-full lg:w-9/12 lg:right-0 bg-white-sr drop-shadow-navbar flex items-center justify-between">
      {/* <!-- start sidebar button  --> */}
      <span
        class="relative text-black-sr text-xl left-6 cursor-pointer lg:hidden"
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
          class="text-[14px] lg:text-base ml-2 w-[132px] lg:w-[250px] text-gray-sr bg-transparent focus:outline-none"
        />
      </fragment>
      {/* <!-- end search area  -->  */}

      <fragment class="flex items-center lg:mr-10">
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
          class="w-[30px] lg:w-[45px] rounded-full relative right-6 cursor-pointer"
          alt="Avatar"
        />
        <span class="hidden lg:block text-base font-semibold cursor-pointer">
          Jonathan Christian Adif Sugiarto
        </span>
      </fragment>
    </fragment>
  );
}

export default header;
