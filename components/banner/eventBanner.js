import Button from "@mui/material/Button";

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EventBanner() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="w-full h-[300px] bg-white-sr flex flex-col gap-5 rounded-[10px] shadow-sm px-2.5 py-[30px] lg:p-[50px] bg-center bg-cover bg-[url('https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/event-banner.jpg')]">
      <div className=" font-normal text-3xl text-white-sr w-full lg:max-w-[400px]  ">
        Academic. Non Academic. See Events.
      </div>
      <div className="bg-white-sr flex flex-col lg:flex-row justify-between p-5 rounded-[10px] gap-2.5 lg:max-w-[535px]">
        <input
          type="text"
          placeholder="Search"
          className=" font-normal text-base text-gray-sr bg-transparent focus:outline-none"
        />
        <div className="flex flex-row items-center gap-2.5">
          <i className="fi fi-rr-calendar menu-icon !text-oldgray-sr"></i>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className=" font-normal text-base text-black-sr bg-transparent w-[150px] focus:outline-none cursor-pointer"
          />
        </div>

        <Button
          variant="contained"
          className="!bg-birulogo-sr !w-full !capitalize !px-[15px] !py-2.5 !text-sm "
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default EventBanner;
