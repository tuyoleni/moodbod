"use client"
import { Navbar } from "@/components/common/Navbar";
import Home from "./home/app";
import { useState } from "react";

export default function App() {
  const [isCTASectionVisible, setIsCTASectionVisible] = useState(false);

  return (
    <main>
      <Navbar isCTASectionVisible={isCTASectionVisible} />
      <Home onCTAVisibilityChange={setIsCTASectionVisible} />
    </main>
  )
}
