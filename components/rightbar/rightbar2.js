function rightbar2() {
  return (
    <div className="hidden lg:block px-[35px] py-[25px] bg-white-sr drop-shadow-sm rounded-[10px]">
      <div className="flex flex-col w-full h-fit  gap-2.5 ">
        <div className="flex flex-row w-full justify-between h-fit">
          <div>Post</div>
          <div>50</div>
        </div>
        <div className="flex flex-row w-full justify-between h-fit">
          <div>Followers</div>
          <div>100</div>
        </div>
        <div className="flex flex-row w-full justify-between h-fit">
          <div>Following</div>
          <div>1000</div>
        </div>
      </div>
    </div>
  );
}

export default rightbar2;
