"use client"

import { Navbar } from "@/components/common/Navbar";
import Home from "./home/app";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function App() {
  const [isCTASectionVisible, setIsCTASectionVisible] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main>
      <Navbar isCTASectionVisible={isCTASectionVisible} />
      <Home onCTAVisibilityChange={setIsCTASectionVisible} />
    </main>
  );
}
