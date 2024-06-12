"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Transport_Liquides.csv" csvModelPath="" />

  );
}
