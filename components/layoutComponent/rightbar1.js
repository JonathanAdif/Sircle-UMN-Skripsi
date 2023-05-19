import Button from "@mui/material/Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Link from "next/link";

function rightbar1() {
  useEffect(() => {
    fetchEvent();
  }, []);

  const supabase = useSupabaseClient();
  const [events, setEvents] = useState([]);

  function fetchEvent() {
    supabase
      .from("events")
      .select("*, profiles(*)")
      .order("event_date", { ascending: true })
      .then((result) => {
        console.log("events", result);
        setEvents(result.data);
      });
  }

  return (
    <div className="w-4/12 hidden lg:block">
      <div className="w-[300px] h-fit px-[35px] py-[25px] bg-white-sr fixed drop-shadow-sm rounded-[10px] flex flex-col gap-[15px]">
        <p className="text-center font-bold text-black-sr text-xl">
          Upcoming Events
        </p>
        {events?.length > 0 &&
          events.slice(0, 1).map((eventss) => (
            <>
              <div>
                <img className="rounded-[10px]" src={eventss.poster} alt="" />
              </div>
              <div className="flex flex-col">
                <div className="text-base text-black-sr font-semibold">
                  {eventss.short_title}
                </div>
                <div className="text-xs text-oldgray-sr font-semibold">
                  {eventss.event_date}
                </div>
              </div>
            </>
          ))}

        <Link href="/event">
          <Button
            variant="contained"
            className="!bg-birulogo-sr !w-full !capitalize "
          >
            View All Events
          </Button>
        </Link>
        {/* <div className="underline m-auto cursor-pointer ">View All Events</div> */}
      </div>
    </div>
  );
}

export default rightbar1;
