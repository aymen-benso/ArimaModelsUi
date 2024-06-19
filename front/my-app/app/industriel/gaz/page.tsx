"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Industrie_GAZEUX.csv" csvModelPath="industrie_gazeux_model.h5" coef={305000} />

  );
}
