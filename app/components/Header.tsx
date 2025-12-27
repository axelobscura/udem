import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex items-center justify-center bg-slate-950 font-sans dark:bg-black">
      <div className="p-5">
        <Link href="/">
          <Image
            className="dark:invert"
            src="/logo-imcyc-blanco.svg"
            alt="Next.js logo"
            width={150}
            height={20}
            priority
          />
        </Link>
      </div>
      <div className="p-5">
        <Link href="/categorias">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Next.js logo"
            width={120}
            height={20}
            priority
          />
        </Link>
      </div>
    </div>
  );
}