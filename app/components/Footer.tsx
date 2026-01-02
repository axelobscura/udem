import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutubeSquare, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Header() {
  return (
    <div className="flex items-center justify-center bg-slate-950 font-sans dark:bg-black">
      <div className="sm:flex sm:items-center sm:justify-between">
          <div className="p-5 flex flex-col justify-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 1953 - 2026{" "}
              <a href="https://imcyc.com/" className="hover:underline">
                Instituto Mexicano del Cemento y del Concreto A.C.
              </a>
              , Todos los Derechos Revervados. <Link href="/aviso-de-privacidad"><span className="text-gray-100 hover:underline">Aviso de Privacidad.</span></Link>
            </span>
            <div className="flex items-center space-x-6 rtl:space-x-reverse mt-3 justify-center">
              <Link href="https://www.facebook.com/imcycoficial/" rel="noopener noreferrer" target="_blank" className="text-sm  text-gray-500 dark:text-gray-400 hover:underline flex flex-row">
                <FaFacebook size={27} />
              </Link>
              <Link href="https://instagram.com/imcyc_oficial?r=nametag" rel="noopener noreferrer" target="_blank" className="text-sm  text-gray-500 dark:text-gray-400 hover:underline flex flex-row">
                <FaInstagram size={29} />
              </Link>
              <Link href="https://x.com/imcyc_oficial" rel="noopener noreferrer" target="_blank" className="text-sm  text-gray-500 dark:text-gray-400 hover:underline flex flex-row">
                <RiTwitterXLine size={25} />
              </Link>
              <Link href="https://www.youtube.com/channel/UCGLxU2D2q2i8ny_klAWqPTw" rel="noopener noreferrer" target="_blank" className="text-sm  text-gray-500 dark:text-gray-400 hover:underline flex flex-row">
                <FaYoutubeSquare size={25} />
              </Link>
              <Link href="https://mx.linkedin.com/company/imcyc-oficial" rel="noopener noreferrer" target="_blank" className="text-sm  text-gray-500 dark:text-gray-400 hover:underline flex flex-row">
                <FaLinkedin size={25} />
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}