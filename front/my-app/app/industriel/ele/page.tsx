"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Industrie_ELECTRICITE.csv" csvModelPath="industrie_elect_model.h5" coef={140000} />

  );
}
