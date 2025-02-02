"use client"
import { NavCTA } from "@/app/home/components/NavCTA";
import { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";

interface Props {
    isCTASectionVisible: boolean;
}

export function Navbar({ isCTASectionVisible }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScrollTo = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    }, []);

    const navLinks = [
        { label: 'Welcome to Moodbod', id: 'hero' },
        { label: 'What we believe in', id: 'intro' },
        { label: 'Our expertise', id: 'about' },
        { label: 'How we work', id: 'route' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between py-4">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 ml-6 mt-6"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMenuOpen ? (
                    <X className="w-6 h-6 text-zinc-500" />
                ) : (
                    <Menu className="w-6 h-6 text-zinc-500" />
                )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-col items-start gap-2 px-8 pt-8">
                {navLinks.map((link, index) => (
                    <button
                        key={link.id}
                        onClick={() => handleScrollTo(link.id)}
                        className="text-zinc-500 hover:text-zinc-800 transition-colors duration-300 text-sm font-medium flex items-center gap-3 group leading-none"
                        aria-label={`Scroll to ${link.label} section`}
                    >
                        <span className="text-xs text-zinc-400 font-mono group-hover:text-zinc-600 transition-colors">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                    </button>
                ))}
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-x-0 top-20 bg-white p-4">
                    {navLinks.map((link, index) => (
                        <button
                            key={link.id}
                            onClick={() => handleScrollTo(link.id)}
                            className="w-full text-zinc-500 hover:text-zinc-800 transition-colors duration-300 text-sm font-medium flex items-center gap-3 py-2"
                            aria-label={`Scroll to ${link.label} section`}
                        >
                            <span className="text-xs text-zinc-400 font-mono">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            {link.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="px-8 pt-8">
                <NavCTA
                    isCTASectionVisible={isCTASectionVisible}
                    className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
                />
            </div>
        </nav>
    );
}