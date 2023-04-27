import Pagination from "@mui/material/Pagination";

function PaginationComponent() {
  return (
    <div className="w-full h-fit flex flex-col items-center ">
      <Pagination count={10} shape="rounded" />
    </div>
  );
}

export default PaginationComponent;
