"use client";
import Image from "next/image";
import AstronomyPicture from "@/components/AstronomyPicture";
import AstronomyPictureRange from "@/components/AstronomyPictureRange";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import { LocaleProvider } from "@douyinfe/semi-ui";

export default function Home() {
  return (
    <>
      <div className="text-center mb-[20px] mt-5">
        <h2 className="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-heading-1 text-gray-900 mb-5 md:mb-[10px] max-w-[60rem]">
          APOD
        </h2>
        <p className="text-quote md:text-lead-lg text-gray-600 mx-auto max-w-[60rem]">
          Astronomy Picture of the Day
        </p>
      </div>

      <LocaleProvider locale={en_US}>
        <AstronomyPicture></AstronomyPicture>
        <AstronomyPictureRange></AstronomyPictureRange>
      </LocaleProvider>
    </>
  );
}
