import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex items-center justify-center bg-slate-950">
      <div className="p-5">
        <Link href="/">
          <Image
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