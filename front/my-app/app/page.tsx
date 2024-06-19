"use client";
import { Dashboard } from "@/components/dashboard";
import useLoginStore from "@/State";
import { Login } from "@/components/login";

import Image from "next/image";
import  ChartComponent  from "@/components/chartfin";

export default function Home() {
  const { username, isLoggedIn, login, logout } = useLoginStore();
  

  return (
    <>
      <Dashboard  csvFilePath="Finale.csv" csvModelPath="" coef={0} />
      <ChartComponent />    
    </>

  );
}
