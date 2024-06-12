"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Residentiel_FINALE.csv" csvModelPath="residentiel_finale_model.pkl" />

  );
}
