"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function Adoption() {
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
    <div className=" flex justify-center mt-20">
      <div className="gap-10 lg:gap-5 grid md:grid-cols-2 lg:grid-cols-3 w-[300px] h-[2500px] md:w-[600px] md:h-[1200px] lg:w-[900px] lg:h-[900px]">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardFooter className="text-small absolute justify-between">
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
    </div>
  );
}