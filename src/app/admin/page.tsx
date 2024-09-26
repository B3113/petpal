"use client";
import React, { useState } from "react";
import Pet_manage from "./pet_manage";
import Menu from "./menu";
import Approval from "./approval";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("Pet_manage");

  const renderPage = () => {
    switch (currentPage) {
      case "Pet_manage":
        return <Pet_manage />;
      case "Approval":
        return <Approval />;
      default:
        return <Pet_manage />;
    }
  };

  return (
    <div className="flex h-screen">
      <Menu onSelectPage={setCurrentPage} />
      <div className="flex-1">{renderPage()}</div>
    </div>
  );
}
