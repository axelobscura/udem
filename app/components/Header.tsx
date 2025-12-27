import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex items-center justify-center bg-slate-950 font-sans dark:bg-black">
      <div className="p-5">
        <Image
          className="dark:invert"
          src="/logo-imcyc-blanco.svg"
          alt="Next.js logo"
          width={150}
          height={20}
          priority
        />
      </div>
      <div className="p-5">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Next.js logo"
          width={120}
          height={20}
          priority
        />
      </div>
    </div>
  );
}