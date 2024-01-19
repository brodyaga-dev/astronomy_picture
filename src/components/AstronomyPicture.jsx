"use client";
import useSWR from "swr";
import {formatDate} from '@/lib/utils'

const fetcher = (url) => fetch(url).then((res) => res.json());

const AstronomyPicture = () => {
  const { data: pictureData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_NASA_API_URL}?api_key=${
      process.env.NEXT_PUBLIC_NASA_API_KEY
    }&date=2024-01-19`,
    fetcher
  );

  if (error) {
    console.error("Error fetching NASA picture:", error);
    return <p>Error loading data</p>;
  }

  if (!pictureData) {
    return (
      <>
        <div className="container mx-auto">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {pictureData.error?.code == "OVER_RATE_LIMIT" && (
        <div className="container mx-auto">
          <p>OVER_RATE_LIMIT</p>
        </div>
      )}
      <div className="container mx-auto">
        <h2>{pictureData.title}</h2>
        <img src={pictureData.url} alt={pictureData.title} />
        {/* <p>{pictureData.explanation}</p> */}
      </div>
    </>
  );
};

export default AstronomyPicture;
