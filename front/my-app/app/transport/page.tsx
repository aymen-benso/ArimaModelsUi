"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Transport_FINALE.csv" csvModelPath="transport_finale_model.pkl" />

  );
}
