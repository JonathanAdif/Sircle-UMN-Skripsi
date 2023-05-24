import Button from "@mui/material/Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

function Rightbar1() {
  const url = "https://berita-indo-api.vercel.app/v1/cnn-news";

  useEffect(() => {
    fetchEvent();
    fetchNews();
  }, []);

  const supabase = useSupabaseClient();
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

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

  function fetchNews() {
    axios
      .get(url)
      .then((response) => {
        setNews(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-4/12 hidden lg:block">
      <div className="w-[300px] h-2/3 overflow-auto px-[35px] py-[25px] bg-white-sr fixed drop-shadow-sm rounded-[10px] flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[15px]">
          <div className="text-left font-bold text-black-sr text-xl flex flex-row gap-[5px]">
            <div>
              <NewspaperOutlinedIcon />
            </div>
            <div>
              <span className=" text-birulogo-sr">Sircle </span> Daily
            </div>
          </div>
          {news &&
            news.data?.slice(0, 3).map((newss, index) => (
              <div className=" flex flex-row gap-[15px]" key={index} >
                <img
                  className="h-[50px] w-[80px] object-cover"
                  src={newss.image.small}
                  alt=""
                />

                <div className="flex flex-col">
                  <Link href={newss.link} target="_blank">
                    <div className="text-base text-black-sr font-semibold">
                      {newss?.title}
                    </div>
                  </Link>
                  {/* <div className="text-xs text-oldgray-sr font-semibold">
                    {newss.author}
                  </div> */}
                </div>
              </div>
            ))}
          <hr></hr>
        </div>
        <div className="flex flex-col gap-[15px]">
          <div className="text-left font-bold text-black-sr text-xl flex flex-row gap-[5px]">
            <div>
              <GradeOutlinedIcon />
            </div>
            <div>
              <span className=" text-birulogo-sr">Upcoming</span> Events
            </div>
          </div>
          {events?.length > 0 &&
            events.slice(0, 2).map((eventss) => (
              <div className=" flex flex-row gap-[15px]" key={eventss.id}>
                <img
                  className="h-[50px] w-[80px] object-cover"
                  src={eventss.poster}
                  alt=""
                />

                <div className="flex flex-col">
                  <div className="text-base text-black-sr font-semibold">
                    {eventss.short_title}
                  </div>
                  <div className="text-xs text-oldgray-sr font-semibold">
                    {eventss.event_date}
                  </div>
                </div>
              </div>
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
    </div>
  );
}

export default Rightbar1;
