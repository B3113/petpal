import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
  ChipProps,
  Button,
} from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  approved: "success",
  decline: "danger",
  processing: "warning",
};

export default function page() {
  const status = "approved";

  return (
    <div className="p-10">
      <div>
        <div className="text-2xl">History</div>
        <div className="ju mt-14 grid grid-cols-2 gap-10">
          <Card className="max-w-[650px]">
            <CardHeader className="flex justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">PetName</p>
                  <p className="text-small text-default-500">Species • Breed</p>
                </div>
              </div>

              <Chip
                className="capitalize"
                color={statusColorMap[status]}
                size="sm"
                variant="flat"
              >
                {status}
              </Chip>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
              <p>PetID :</p>
              <Button
                className="text-tiny"
                variant="flat"
                color="danger"
                radius="lg"
                size="sm"
              >
                Cancel Adoption
              </Button>
            </CardFooter>
          </Card>

          <Card className="max-w-[650px]">
            <CardHeader className="flex justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">PetName</p>
                  <p className="text-small text-default-500">Species • Breed</p>
                </div>
              </div>

              <Chip
                className="capitalize"
                color={statusColorMap[status]}
                size="sm"
                variant="flat"
              >
                {status}
              </Chip>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
              <p>PetID :</p>
              <Button
                className="text-tiny"
                variant="flat"
                color="danger"
                radius="lg"
                size="sm"
              >
                Cancel Adoption
              </Button>
            </CardFooter>
          </Card>

          <Card className="max-w-[650px]">
            <CardHeader className="flex justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">PetName</p>
                  <p className="text-small text-default-500">Species • Breed</p>
                </div>
              </div>

              <Chip
                className="capitalize"
                color={statusColorMap[status]}
                size="sm"
                variant="flat"
              >
                {status}
              </Chip>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
              <p>PetID :</p>
              <Button
                className="text-tiny"
                variant="flat"
                color="danger"
                radius="lg"
                size="sm"
              >
                Cancel Adoption
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
