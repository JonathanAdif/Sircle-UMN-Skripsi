import Header from "../layoutComponent/header";
import Sidebar from "../layoutComponent/sidebar";
import EventBanner from "../inpageComponent/banner/eventBanner";
import EventPostCard from "../postComponent/eventpostCard";
import PaginationComponent from "../inpageComponent/addition/pagination";

function EventComponentPage() {
  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <EventBanner />

        <div className="flex w-full h-fit flex-col gap-[30px]">

          <div className=" !w-full h-fit flex items-center  justify-evenly  flex-wrap gap-5">
            <EventPostCard />
          </div>

          {/* <PaginationComponent /> */}
        </div>
      </div>
    </>
  );
}

export default EventComponentPage;
