"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  ChipProps,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DateInput,
} from "@nextui-org/react";
import { api } from "~/trpc/react";
import { CalendarDate } from "@internationalized/date";

const statusColorMap: Record<string, ChipProps["color"]> = {
  available: "success",
  unavailable: "danger",
  pending: "warning",
};

export default function Adoption() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pets = api.pet.get.useQuery().data;
  console.log(pets);

  return (
    <div id="adoption" className="mt-20 flex justify-center">
      <div className="grid h-full w-[300px] gap-10 md:w-[600px] md:grid-cols-2 lg:w-[900px] lg:grid-cols-3 lg:gap-5">
        {pets?.map((item, index) => (
          <div className="relative" key={index}>
            <Card shadow="sm" isPressable>
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

            <div
              onClick={onOpen}
              className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center rounded-lg bg-[#EADDF7] opacity-0 transition-opacity hover:opacity-60"
            >
              <div className="text-center text-[#481878]">
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="mt-1 text-sm">{item.description}</div>
                <div className="mt-1 text-sm">{item.birthdate}</div>
              </div>
            </div>
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              radius="lg"
              classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Adoption form
                    </ModalHeader>
                    <ModalBody>
                      <Input variant="bordered" type="Name" label="Name" />
                      <Input variant="bordered" type="Career" label="Career" />
                      <DateInput
                        variant="bordered"
                        label={"Birth date"}
                        placeholderValue={new CalendarDate(1995, 11, 6)}
                        className="w-full"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button className="text-[#6f4ef2]" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                        onPress={onClose}
                      >
                        Adopt
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
