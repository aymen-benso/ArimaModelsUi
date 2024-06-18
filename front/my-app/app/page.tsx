"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";
import  ChartComponent  from "@/components/chartfin";

export default function Home() {
  return (
    <>
      <Dashboard  csvFilePath="Finale.csv" csvModelPath="" coef={0} />
      <ChartComponent />    
    </>

  );
}
