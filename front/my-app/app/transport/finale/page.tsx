"use client";
import { Dashboard } from "@/components/dashboard2";
import Image from "next/image";
import ChartComponent from "@/components/charttra";

export default function Home() {
  return (
    <>
    <Dashboard csvFilePath="Transport_FINALE.csv" csvModelPath="transport_finale_model.h5" coef={150000} />
    <ChartComponent />
    </>
  );
}
