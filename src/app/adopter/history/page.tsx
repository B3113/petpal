import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Chip,
  type ChipProps,
  Button,
} from "@nextui-org/react";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import History from "./history";

export default async function page() {
  const session = await getServerAuthSession();

  return <History session={session!} />;
}
