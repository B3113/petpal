"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  ChipProps,
  Chip,
} from "@nextui-org/react";
import { api } from "~/trpc/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  available: "success",
  unavailable: "danger",
  pending: "warning",
};

export default function Adoption() {
  const pets = api.pet.get.useQuery().data;
  console.log(pets);

  return (
    <div id="adoption" className="mt-20 flex justify-center">
      <div className="grid h-full w-[300px] gap-10 md:w-[600px] md:grid-cols-2 lg:w-[900px] lg:grid-cols-3 lg:gap-5">
        {pets?.map((item, index) => (
          <div className="relative" key={index}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  alt={item.image}
                  className="w-[300px]"
                  src={item.image}
                />
              </CardBody>
              <CardFooter className="absolute z-20 justify-between text-small">
                <p>{item.birthdate}</p>
                <Chip
                  className="capitalize"
                  color={statusColorMap[item.status]}
                  size="sm"
                  variant="flat"
                >
                  {item.status}
                </Chip>
              </CardFooter>
            </Card>

            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-[#EADDF7] opacity-0 transition-opacity hover:opacity-60">
              <div className="text-center text-[#481878]">
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="mt-1 text-sm">{item.description}</div>
                <div className="mt-1 text-sm">{item.birthdate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
