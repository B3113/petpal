"use client";
import React from "react";
import {
  Button,
  Card,
  CardFooter,
  Image,
  Tabs,
  Tab,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div id="home">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-0 md:px-16 lg:px-32 xl:px-56 mt-20">
        <div className="mt-10 lg:mt-0 items-center lg:items-start flex flex-col">
          <div className="pointer-events-none flex gap-2 h-6 w-40 lg:h-8 lg:w-44 rounded-full border border-black/20 px-5 items-center text-[10px] lg:text-xs text-black/60">
            <Icon icon="ph:paw-print-fill" />
            ADOPTION CENTER
          </div>
          <div className="pointer-events-none  text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-2 md:mt-5">
            Find Your Pawsome <br /> Partner with PetPal
          </div>
          <div className=" pointer-events-none text-[12px] lg:text-[16px] mt-1 md:mt-2 opacity-50">
            Discover your perfect companion and give <br /> a pet in need a
            forever home.
          </div>
          <div className="flex items-center gap-8 mt-8 lg:mt-5">
            <Input
              isClearable
              radius="full"
              placeholder="Search..."
              className="w-[200px] md:w-[350px] xl:w-[380px]"
            />
            <Button color="secondary" variant="flat">
              <Icon icon="line-md:search" />
            </Button>
          </div>

          <Tabs radius="full" variant="light" className="mt-5 gap-4 opacity-60">
            <Tab title="All"></Tab>
            <Tab title="Dog"></Tab>
            <Tab title="Cat"></Tab>
            <Tab title="Rabbit"></Tab>
          </Tabs>
        </div>
        <div className="felx felx-col justify-center items-center">
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none h-[200px] w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[340px] xl:w-[340px]"
            >
            <Image alt="Pets" className="object-cover" src="../img/dog.png" />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-black/80 pointer-events-none">
                Dalmatian
              </p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Adopt
              </Button>
            </CardFooter>
          </Card>
          <div className="gap-5 mt-5 flex justify-center items-center">
            <Button
              variant="light"
              size="sm"
              className="opacity-60 hover:opacity-100"
            >
              <Icon icon="fe:arrow-left" />
            </Button>
            <Button
              variant="light"
              size="sm"
              className="opacity-60 hover:opacity-100"
            >
              <Icon icon="fe:arrow-right" />
            </Button>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* <div className="flex flex-col justify-center items-center mt-10">
        <div className="font-semibold text-4xl">
          Find Your Pawsome Partner with PetPal
        </div>
        <div className="text-sm opacity-50">
          Discover your perfect companion and give a pet in need a forever home.
        </div>
        <div className="flex items-center gap-8 mt-10">
          <Select
            color="warning"
            placeholder="Select pet type"
            selectionMode="multiple"
            className="w-64"
            onChange={(e) => {
              console.log("selected = " + e.target.value);
              setSelected([
                ...selected,
                animals.find((animal) => animal.key == e.target.value),
              ]);
            }}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          {selected.map((animal) => (
            <div key={animal.key}>{animal.label}</div>
          ))}
          <Button color="success" variant="flat">
            Search
          </Button>
        </div>
        <div>
          <img src={"/img/dog.png"} alt="Gloden" className="h-[500px]" />
        </div>
      </div> */}
    </div>
  );
}