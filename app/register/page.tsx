'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { simeon, logo } from '@/public/assets';

export default function Register() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Image src={logo} alt="Moodbod" width={100} height={32} className="w-auto h-6" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Image Section */}
            <motion.div
                className="relative w-full md:w-[45%] h-[75vh] md:min-h-screen bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                {/* Logo */}
                <div className="absolute top-8 left-8 z-10">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Moodbod"
                            width={100}
                            height={32}
                            className="w-auto h-6"
                        />
                    </Link>
                </div>

                <Image
                    src={simeon}
                    alt="Simeon Tuyoleni"
                    fill
                    className="object-cover brightness-90"
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-32 pb-8">
                    <div className="max-w-[80%] mx-8">
                        <p className="text-white/95 text-lg font-medium">
                            Simeon Tuyoleni
                            <span className="block text-sm font-normal text-white/70 mt-0.5">
                                Founder, Moodbod
                            </span>
                        </p>
                        <blockquote className="text-white/85 text-sm leading-relaxed mt-3">
                            Inspiration and creativity have always been my way of bringing people closer, a way to tell stories that words alone cannot. This journey began with a simple desire to create something meaningful that connects us all. It&apos;s about sharing moments, ideas, and visions that remind us we&apos;re in this together.
                        </blockquote>
                    </div>
                </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
                className="w-full md:w-[55%] bg-white flex items-center justify-center p-8 md:p-8 lg:p-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                <div className="w-full max-w-[360px] mx-auto space-y-12">
                    {/* Heading Section */}
                    <div className="space-y-3">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Client Portal
                        </h1>
                        <p className="text-[13px] leading-relaxed text-gray-600">
                            Access your project workspace and stay connected with our team.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <svg className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-[13px] leading-relaxed text-gray-600">View and manage your active services</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <svg className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-[13px] leading-relaxed text-gray-600">Track payments and view invoices</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <svg className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-[13px] leading-relaxed text-gray-600">Request additional services or updates</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <svg className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-[13px] leading-relaxed text-gray-600">Monitor project progress and updates</span>
                        </div>
                    </div>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                            className="group relative w-full flex items-center justify-center h-10 text-[13px] font-medium rounded-md text-white bg-gray-900 hover:bg-black transition-colors duration-200"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-4 w-4 transition-opacity duration-200 opacity-80 group-hover:opacity-100" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                            </span>
                            Continue with Google
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[11px]">
                                <span className="px-2 bg-white text-gray-400">or</span>
                            </div>
                        </div>

                        <Link
                            href="mailto:simeon@moodbod.com"
                            className="flex items-center justify-center h-10 text-[13px] font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors duration-200"
                        >
                            Get in Touch
                        </Link>

                        <p className="text-center text-[11px] text-gray-500">
                            By continuing, you agree to our{' '}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                Privacy Policy
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
} 