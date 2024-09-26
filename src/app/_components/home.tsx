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
      <div className="mt-20 flex flex-col-reverse items-center justify-between px-0 md:px-16 lg:flex-row lg:px-32 xl:px-56">
        <div className="mt-10 flex flex-col items-center lg:mt-0 lg:items-start">
          <div className="pointer-events-none flex h-6 w-40 items-center gap-2 rounded-full border border-black/20 px-5 text-[10px] text-black/60 lg:h-8 lg:w-44 lg:text-xs">
            <Icon icon="ph:paw-print-fill" />
            ADOPTION CENTER
          </div>
          <div className="pointer-events-none mt-2 text-2xl font-semibold md:mt-5 md:text-3xl lg:text-4xl xl:text-5xl">
            Find Your Pawsome <br /> Partner with PetPal
          </div>
          <div className="pointer-events-none mt-1 text-[12px] opacity-50 md:mt-2 lg:text-[16px]">
            Discover your perfect companion and give <br /> a pet in need a
            forever home.
          </div>
          <div className="mt-8 flex items-center gap-8 lg:mt-5">
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
        <div className="felx felx-col items-center justify-center">
          <Card
            isFooterBlurred
            radius="lg"
            className="h-[200px] w-[200px] border-none md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[340px] xl:w-[340px]"
          >
            <Image alt="Pets" className="object-cover" src="../img/dog.png" />
            <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
              <p className="pointer-events-none text-tiny text-black/80">
                Dalmatian
              </p>
              <Button
                className="bg-black/20 text-tiny text-white"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Adopt
              </Button>
            </CardFooter>
          </Card>
          <div className="mt-5 flex items-center justify-center gap-5">
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
      <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
    </div>
  );
}
