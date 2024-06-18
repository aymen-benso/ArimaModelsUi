"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";
import ChartComponent from "@/components/chartsind";

export default function Home() {
  return ( 
    <>
    <Dashboard csvFilePath="Industrie_FINALE.csv" csvModelPath="industrie_finale_model.h5" coef={110000} />
    <ChartComponent />
    </>
  );
}
