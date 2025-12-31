"use client";
import Link from "next/link";
//import { useUser } from '../context/UserContext';

interface BreadCrumbUserProps {
  params?: {
    categoria?: string;
    webinar?: string;
    tipo?: string;
    url?: string;
  } | null;
}

export default function BreadCrumbUser({ params }: BreadCrumbUserProps) {
  const { categoria, webinar, tipo, url } = params || {};
  //const { user } = useUser();

  // Determine Category URL: use provided URL or construct from slug
  const categoryUrl = url || (categoria ? `/categorias/${categoria}` : "#");
  const webinarUrl = url || (webinar ? `/categorias/${categoria}/${webinar}` : "#");

  return (
    <div className="hidden sm:grid grid-cols-[1fr] sm:grid-cols-[4fr_1fr] gap-0 mt-0 items-center">
      <div>
        <nav
          className="flex px-0 py-3 text-gray-700 bg-opacity-50"
          aria-label="Breadcrumb"
        >
          <ol className="font-montserrat inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="/categorias"
                className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white uppercase"
              >
                <svg
                  className="w-3 h-3 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>| Plataforma Educativa
              </Link>
            </li>
            {categoria && (
              <li className="inline-flex items-center">
                <Link
                  href={categoryUrl}
                  className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  | {decodeURIComponent((categoria || '').split('-').join(' ')).toUpperCase()}
                </Link>
              </li>
            )}
            {webinar && (
              <li className="inline-flex items-center">
                <Link
                  href={webinarUrl}
                  className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  | {decodeURIComponent((webinar || '').split('-').join(' ')).toUpperCase()}
                </Link>
              </li>
            )}
            {tipo && (
              <li className="inline-flex items-center">
                <span className="inline-flex items-center text-sm font-medium text-gray-400 dark:text-gray-400">
                  | {decodeURIComponent((tipo || '').split('-').join(' ')).toUpperCase()}
                </span>
              </li>
            )}
          </ol>
        </nav>
      </div>
    </div>

  );
}
