"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ChipProps,
  Divider,
} from "@nextui-org/react";
import { Session } from "next-auth";
import React from "react";
import { api } from "~/trpc/react";
import Image from "next/image";

type Props = {
  session: Session;
};

export default function History({ session }: Props) {
  const adoptionHistory = api.adopt.get.useQuery({
    id: session?.user.id ?? "",
  }).data;
  const statusColorMap: Record<string, ChipProps["color"]> = {
    approved: "success",
    decline: "danger",
    processing: "warning",
  };

  const utils = api.useUtils();

  const cancelAdoption = api.adopt.cancel.useMutation({
    async onSuccess() {
      await utils.adopt.get.refetch();
      alert("Adoption request cancelled");
    },
    onError() {
      alert("Failed to cancel adoption request");
    },
  });

  console.log(adoptionHistory);
  return (
    <div className="p-10">
      <div>
        <div className="text-2xl">History</div>
        <div className="mt-14 grid grid-cols-2 gap-10">
          {/* Loop through the adoptionHistory array */}
          {adoptionHistory?.map((adoption, index) => (
            <Card key={index} className="max-w-[650px]">
              <CardHeader className="flex justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    alt={adoption.pet?.name ?? ""}
                    height={40}
                    src={
                      adoption.pet?.image ?? "https://via.placeholder.com/40"
                    }
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{adoption.pet?.name}</p>
                    <p className="text-small text-default-500">
                      {adoption.pet?.specie} • {adoption.pet?.breed}
                    </p>
                  </div>
                </div>

                <Chip
                  className="capitalize"
                  color={statusColorMap[adoption.status]}
                  size="sm"
                  variant="flat"
                >
                  {adoption.status}
                </Chip>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{adoption.pet?.description}</p>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-between">
                <p>{adoption.pet?.birthdate}</p>
                {adoption.status !== "approved" && (
                  <Button
                    className="text-tiny"
                    variant="flat"
                    color="danger"
                    radius="lg"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to cancel the adoption?")
                      ) {
                        cancelAdoption.mutate({
                          id: adoption.id,
                        });
                      }
                    }}
                  >
                    Cancel Adoption
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
