
function PaginationComponent({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) {

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pages.push(i);
  }

  const nonActive = "bg-white-sr w-[50px] h-[50px] rounded-[10px] text-black-sr";
  const active = "bg-birulogo-sr w-[50px] h-[50px] rounded-[10px] text-white-sr";

  return (
     <div className=' w-full h-fit p-5 flex flex-row gap-2.5'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? active : nonActive}>
                        {page}
                    </button>
                );
            })}
        </div>
  );
}

export default PaginationComponent;
