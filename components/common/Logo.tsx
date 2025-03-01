import Image from 'next/image';
import Link from 'next/link';

export const logo = '/assets/moodbod logo.svg';
export const logoSmall = '/assets/moodbod logo small.svg';


export default function Logo({ collapsed = false, href = '/', className = '' }) {
  const LogoImage = (
    <Image 
      src={collapsed ? logoSmall : logo}
      alt="Moodbod Logo"
      width={collapsed ? 40 : 120}
      height={40}
      className={className}
    />
  );

  if (href) {
    return (
      <Link href={href}>
        {LogoImage}
      </Link>
    );
  }

  return LogoImage;
}