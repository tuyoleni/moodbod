import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { logo, logoSmall } from '@/public/assets';


export default function Logo({ href }: { href: string }) {
    const [isMobile, setIsMobile] = useState(false);

    return (
        <div className="">
            <Link href={href}>
                <Image
                    src={isMobile ? logoSmall : logo}
                    alt="Moodbod"
                    width={100}
                    height={32}
                    className="w-auto h-6 transition-all duration-300"
                />
            </Link>
        </div>
    );
}
