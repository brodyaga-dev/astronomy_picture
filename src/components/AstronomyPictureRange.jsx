"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { DatePicker } from "@douyinfe/semi-ui";

import { formatDate } from "@/lib/utils";

const fetcher = (url) => fetch(url).then((res) => res.json());

const disabledDate = (date) => {
  const deadDate = new Date();
  return date.getTime() > deadDate.getTime();
};

const AstronomyPictureRange = () => {
  const [dateRange, setDateRange] = useState([]);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_NASA_API_URL}?api_key=${
      process.env.NEXT_PUBLIC_NASA_API_KEY
    }&start_date=${formatDate(dateRange[0])}&end_date=${formatDate(
      dateRange[1]
    )}`,
    fetcher
  );

  if (error) {
    console.error("Error fetching NASA picture:", error);
    return <p>Error loading data</p>;
  }

  if (!data) {
    <>
      <div className="container mx-auto">
        <p>Loading...</p>
      </div>
    </>;
  }

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div className="container mx-auto mt-5">
        {data?.error?.code != "OVER_RATE_LIMIT" && (
          <DatePicker
            disabledDate={disabledDate}
            type="dateRange"
            density="compact"
            style={{ width: 260 }}
            onChange={setDateRange}
          />
        )}

        {dateRange.length > 0 &&
          data?.map((item) => (
            <div key={item.date}>
              <div>
                <h2>{item.title}</h2>
                <img src={item.url} alt={item.title} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AstronomyPictureRange;
