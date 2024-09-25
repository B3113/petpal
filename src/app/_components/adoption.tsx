"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { api } from "~/trpc/react";

export default function Adoption() {
  const pets = api.pet.get.useQuery().data;
  console.log(pets);
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div id="adoption" className="mt-20 flex justify-center">
      <div className="grid h-[2500px] w-[300px] gap-10 md:h-[1200px] md:w-[600px] md:grid-cols-2 lg:h-[900px] lg:w-[900px] lg:grid-cols-3 lg:gap-5">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardFooter className="absolute justify-between text-small">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                alt={item.title}
                className="w-[300px]"
                src={item.img}
              />
            </CardBody>
          </Card>
        ))}
      </div>
      <div></div>
    </div>
  );
}

