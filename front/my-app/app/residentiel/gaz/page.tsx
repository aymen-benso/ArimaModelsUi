"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Residentiel_GAZEUX.csv" csvModelPath="Residentiel_GAZEUX.h5" coef={100000} />
  );
}
