"use client"

import { Navbar } from "@/components/common/Navbar";
import Home from "./home/app";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { logo } from '@/public/assets';
import Image from 'next/image';

export default function App() {
    const [isCTASectionVisible, setIsCTASectionVisible] = useState(false);
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading || isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Image src={logo} alt="Moodbod" width={100} height={32} className="w-auto h-6" />
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
