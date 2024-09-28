"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  type ChipProps,
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
import { type Session } from "next-auth";

const statusColorMap: Record<string, ChipProps["color"]> = {
  available: "success",
  unavailable: "danger",
  pending: "warning",
};

type Props = {
  session: Session;
};

export default function Adoption({ session }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPet, setSelectedPet] = React.useState("");
  const pets = api.pet.get.useQuery().data;
  console.log(pets);
  console.log(session);

  const addAdoption = api.adopt.create.useMutation({
    onSuccess() {
      alert("Adoption request sent");
    },
    onError() {
      alert("Failed to send adoption request");
    },
  });

  const handleAdopt = (formData: FormData) => {
    const data = {
      career: formData.get("career"),
      birthdate: formData.get("birthdate"),
      name: formData.get("name"),
    };
    addAdoption.mutate({
      petId: selectedPet,
      userId: session.user.id,
      // name: data.name as string,
      career: data.career as string,
      birthdate: data.birthdate as string,
    });
  };

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
              onClick={() => {
                if (!session) {
                  alert("Please login to adopt a pet");
                  return;
                }
                setSelectedPet(item.id);
                onOpen();
              }}
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
                  <form action={handleAdopt}>
                    <ModalHeader className="flex flex-col gap-1">
                      Adoption form
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        name="name"
                        variant="bordered"
                        type="Name"
                        label="Name"
                      />
                      <Input
                        name="career"
                        variant="bordered"
                        type="Career"
                        label="Career"
                      />
                      <DateInput
                        variant="bordered"
                        label={"Birth date"}
                        placeholderValue={new CalendarDate(1995, 11, 6)}
                        className="w-full"
                        name="birthdate"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button className="text-[#6f4ef2]" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                        onPress={onClose}
                        type="submit"
                      >
                        Adopt
                      </Button>
                    </ModalFooter>
                  </form>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
