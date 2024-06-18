"use client";
import { Dashboard } from "@/components/dashboard2";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Transport_Liquides.csv" csvModelPath="transport_liquide_model.h5" coef={250000} />

  );
}
