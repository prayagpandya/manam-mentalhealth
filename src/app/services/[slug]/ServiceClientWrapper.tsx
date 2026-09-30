"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useBooking } from "@/context/BookingContext";
import { ServiceDetail } from "@/data/servicesData";

interface ServiceClientWrapperProps {
  service: ServiceDetail;
  children: React.ReactNode;
}

export default function ServiceClientWrapper({ service, children }: ServiceClientWrapperProps) {
  const { openBooking } = useBooking();

  // Attach global click handler for data-booking-trigger buttons rendered in the page
  useEffect(() => {
    const handleButtonClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-booking-trigger]");
      if (target) {
        const mode = target.getAttribute("data-booking-trigger") as "in-person" | "online";
        openBooking(mode || "in-person");
      }
    };

    document.addEventListener("click", handleButtonClick);
    return () => document.removeEventListener("click", handleButtonClick);
  }, [openBooking]);

  return (
    <>
      <Navbar onOpenBooking={() => openBooking("in-person")} />
      {children}
    </>
  );
}
