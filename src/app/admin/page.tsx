import React from "react";
import Pet_manage from "./pet_manage";
import Menu from "./menu";

export default function page() {
  return (
    <div className="flex">
      <Menu />
      <Pet_manage />
    </div>
  );
}
