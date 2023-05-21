import Header from "../layoutComponent/header";
import Sidebar from "../layoutComponent/sidebar";
import EventBanner from "../inpageComponent/banner/eventBanner";
import EventPostCard from "../postComponent/eventpostCard";
import PaginationComponent from "../inpageComponent/addition/pagination";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

function EventComponentPage() {

  useEffect(() => {
    fetchEvent();
  }, []);
  
  const supabase = useSupabaseClient();

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  function fetchEvent() {
    supabase
      .from("events")
      .select(
        "*, profiles(*)"
      )
      .order("event_date", { ascending: true})
      .then((result) => {
        console.log("events", result);
        setEvents(result.data);
      });
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = events.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header />
      <Sidebar />

      <div className="mainLayout2">
        <EventBanner onPost={fetchEvent}/>

        <div className="flex w-full h-fit flex-col gap-[30px]">

          <div className=" !w-full h-fit flex items-center  justify-evenly  flex-wrap gap-5">
          {events?.length > 0 &&
            currentPosts.map((eventss) => <EventPostCard   key={eventss.id} {...eventss} />)}
          </div>

          <PaginationComponent 
           totalPosts={events.length}
           postsPerPage={postsPerPage}
           setCurrentPage={setCurrentPage}
           currentPage={currentPage}
           />
        </div>
      </div>
    </>
  );
}

export default EventComponentPage;
