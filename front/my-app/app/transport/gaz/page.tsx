"use client";
import { Dashboard } from "@/components/dashboard2";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Transport_GAZEUX.csv" csvModelPath="transport_gazeux_model.h5" coef={100000} />

  );
}
