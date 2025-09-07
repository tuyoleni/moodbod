"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { RxChevronDown } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";

const useNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const isMobile = useMediaQuery("(max-width: 991px)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const shouldShowCTA = scrollY > viewportHeight * 0.5;
      setIsInHeroSection(shouldShowCTA);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    if (!isMobile) {
      setIsDropdownOpen(true);
    }
  };
  const closeOnDesktopDropdownMenu = () => {
    if (!isMobile) {
      setIsDropdownOpen(false);
    }
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
    isInHeroSection,
  };
};

export function Navbar() {
  const useActive = useNavbar();
  return (
    <section
      id="navbar"
      className="fixed top-0 left-0 right-0 z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-white px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <Link href="#">
          <Image
            src="/logos/Moodbod.svg"
            alt="MoodBod Logo"
            width={70}
            height={18}
            className="h-4 w-auto"
            priority
          />
        </Link>
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-24 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            <Link
              href="#"
              className="relative block w-auto py-3 text-sm font-sans lg:inline-block lg:px-4 lg:py-6 lg:text-sm"
            >
              HOME
            </Link>
            <Link
              href="#"
              className="relative block w-auto py-3 text-sm font-sans lg:inline-block lg:px-4 lg:py-6 lg:text-sm"
            >
              ABOUT
            </Link>
            <Link
              href="#"
              className="relative block w-auto py-3 text-sm font-sans lg:inline-block lg:px-4 lg:py-6 lg:text-sm"
            >
              SERVICES
            </Link>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <button
                className="relative flex w-full items-center justify-between py-3 text-sm font-sans whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-sm"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                <span>CONTACT US</span>
                <motion.span
                  animate={useActive.animateDropdownMenuIcon}
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <RxChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                <motion.nav
                  variants={{
                    open: {
                      opacity: 1,
                      height: "var(--height-open, auto)",
                      display: "block",
                    },
                    close: {
                      opacity: 0,
                      height: "var(--height-close, 0)",
                      display: "none",
                    },
                  }}
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  transition={{ duration: 0.2 }}
                  className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                >
                  <div className="mx-auto flex size-full max-w-full items-center justify-between">
                    <div className="flex w-full flex-col lg:flex-row">
                      <div className="grid flex-1 grid-cols-1 content-start items-start gap-x-8 gap-y-2 py-4 md:grid-cols-2 md:gap-y-6 md:py-8 lg:auto-cols-fr lg:grid-cols-4 lg:content-stretch lg:items-stretch lg:gap-y-0">
                        <Link
                          href="#"
                          className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <Image
                              src="/images/icons/placeholder-icon.svg"
                              alt="Icon 1"
                              width={24}
                              height={24}
                              className="shrink-0"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <h5 className="font-heading font-semibold">
                              Careers
                            </h5>
                            <p className="hidden text-sm font-sans md:block">
                              Join our innovative team today!
                            </p>
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <Image
                              src="/images/icons/placeholder-icon.svg"
                              alt="Icon 1"
                              width={24}
                              height={24}
                              className="shrink-0"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <h5 className="font-heading font-semibold">Blog</h5>
                            <p className="hidden text-sm font-sans md:block">
                              Insights and updates from our experts
                            </p>
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <Image
                              src="/images/icons/placeholder-icon.svg"
                              alt="Icon 1"
                              width={24}
                              height={24}
                              className="shrink-0"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <h5 className="font-heading font-semibold">
                              Testimonials
                            </h5>
                            <p className="hidden text-sm font-sans md:block">
                              What our clients say about us
                            </p>
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                        >
                          <div className="flex size-6 flex-col items-center justify-center">
                            <Image
                              src="/images/icons/placeholder-icon.svg"
                              alt="Icon 1"
                              width={24}
                              height={24}
                              className="shrink-0"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <h5 className="font-heading font-semibold">
                              Resources
                            </h5>
                            <p className="hidden text-sm font-sans md:block">
                              Tools and guides for your success
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-6 flex w-full flex-col items-start justify-between p-6 sm:items-center lg:mb-0 lg:flex-row lg:px-0 lg:py-3">
                    <div className="absolute top-0 -right-[50vw] bottom-0 -left-[50vw] w-[200vw] bg-background-secondary" />
                    <div className="relative z-10 mr-auto flex flex-col gap-y-4 sm:mx-auto sm:grid sm:auto-cols-fr sm:grid-cols-[max-content_max-content] sm:gap-x-1">
                      <p className="font-sans">
                        Looking for exciting opportunities?
                      </p>
                      <Link href="#" className="underline font-sans">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </motion.nav>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: useActive.isInHeroSection ? 1 : 0,
                scale: useActive.isInHeroSection ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block"
            >
              <Button size="sm">Discover What is Possible</Button>
            </motion.div>
          </div>
        </div>
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={useActive.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.5rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
          animate={useActive.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute top-full right-0 left-0 w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: "-100%" } }}
            animate={useActive.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 left-0 block h-dvh overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-8"
          >
            <div className="flex flex-col">
              <Link href="#" className="block py-3 text-sm font-sans">
                HOME
              </Link>
              <Link href="#" className="block py-3 text-sm font-sans">
                ABOUT
              </Link>
              <Link href="#" className="block py-3 text-sm font-sans">
                SERVICES
              </Link>
              <Link href="#" className="block py-3 text-sm font-sans">
                CONTACT US
              </Link>
              <div className="mt-6 flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: useActive.isInHeroSection ? 1 : 0,
                    y: useActive.isInHeroSection ? 0 : 20,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Button size="sm">Discover What is Possible</Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
