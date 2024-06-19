"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Residentiel_ Liquide.csv" csvModelPath="residentiel_liquide_model.h5" coef={340000} />

  );
}
