"use client";
import { Dashboard } from "@/components/dashboard2";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Transport_ELECTRICITE.csv" csvModelPath="transport_elect_model.h5" coef={50000} />

  );
}
