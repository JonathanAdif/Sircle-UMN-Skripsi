import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import EventBanner from "../banner/eventBanner";
import EventPostCard from "../postcontainer/eventpostCard";
import PaginationComponent from "../addition/pagination";

function EventComponentPage() {
  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <EventBanner />

        <div className="flex flex-col gap-[30px]">

          <div className=" !w-full flex flex-row items-center  justify-evenly  flex-wrap gap-5">
            <EventPostCard />
            <EventPostCard />
            <EventPostCard />
            <EventPostCard />
            <EventPostCard />
            <EventPostCard />
          </div>

          <PaginationComponent />
        </div>
      </div>
    </>
  );
}

export default EventComponentPage;
