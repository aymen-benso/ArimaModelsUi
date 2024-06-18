"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Industrie_Liquides.csv" csvModelPath="industrie_liquide_model.h5" coef={100000} />

  );
}
