"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Residentiel_ELECTRICITE.csv" csvModelPath="Residentiel_ELECTRICITE.h5" coef={95000} />

  );
}
