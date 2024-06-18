"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";
import ChartComponent from "@/components/chartres";

export default function Home() {
  return (
    <>
    <Dashboard csvFilePath="Residentiel_FINALE.csv" csvModelPath="Residentiel_FINALE.h5" coef={150000} />
    <ChartComponent />
    </>
  );
}
