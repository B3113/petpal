import React from "react";
import { Image } from "@nextui-org/react";

export default function Aboutus() {
  return (
    <div id="aboutus" className="mt-20">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="mt-20 items-center xl:items-start  xl:px-24 flex flex-col xl:flex-row xl:justify-between">
        <div className="flex flex-col items-center xl:items-start xl:justify-start">
          <div className="text-2xl font-semibold cursor-default">ABOUT US</div>
          <div className="mt-5 text-[12px] lg:text-[16px] opacity-50 cursor-default">
            At PetPal, we’re dedicated to providing a safe, <br /> modern
            shelter for pets in need while making <br /> the adoption process
            seamless and joyful.
          </div>
        </div>
        <div className="h-[600px] hidden xl:flex min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>

        <div className="mt-8 xl:mt-0">
          <Image
            isZoomed
            className="w-[320px] h-[150px]  md:w-[600px] md:h-[250px] lg:w-[700px] lg:h-[350px]"
            alt="NextUI Fruit Image with Zoom"
            src="./img/shelter.jpeg"
          />
          <div className="flex gap-5 xl:gap-0 xl:justify-between mt-5">
            <Image
              isZoomed
              className="w-[150px] h-[90px] md:w-[290px] md:h-[150px] lg:w-[340px] lg:h-[200px]"
              alt="NextUI Fruit Image with Zoom"
              src="./img/cat.jpg"
            />
            <Image
              isZoomed
              className="w-[150px] h-[90px] md:w-[290px] md:h-[150px] lg:w-[340px] lg:h-[200px]"
              alt="NextUI Fruit Image with Zoom"
              src="./img/dog.jpg"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
