import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import EventBanner from "../banner/eventBanner";

function EventComponentPage() {
  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <EventBanner />

        <div className="flex flex-row gap-5"></div>
      </div>
    </>
  );
}

export default EventComponentPage;
