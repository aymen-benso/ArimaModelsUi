"use client";
import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <Dashboard csvFilePath="Residentiel_GAZEUX.csv" csvModelPath="residentiel_gazeux_model.pkl" />

  );
}
