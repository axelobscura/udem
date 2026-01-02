"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MenuLateral from '@/app/components/MenuLateral';
//import Loader from '@/app/components/Loader';
import BreadCrumbUser from '@/app/components/BreadCrumbUser';
import Script from 'next/script';
import Loader from '@/app/components/Loader';
import { BsArrowRightCircle } from "react-icons/bs";

interface Webinar {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    url: string;
    id_categoria: number;
    imagen?: string;
}

interface FlipBookButtonOptions {
    enabled?: boolean;
    vAlign?: string;
    hAlign?: string;
    background?: string;
}

interface FlipBookPage {
    title: string;
}

interface FlipBookOptions {
    pdfUrl: string;
    backgroundColor: string;
    viewMode: string;
    singlePageMode: boolean;
    pages: FlipBookPage[];
    btnToc?: FlipBookButtonOptions;
    btnSelect?: FlipBookButtonOptions;
    btnDownloadPages?: FlipBookButtonOptions;
    btnDownloadPdf?: FlipBookButtonOptions;
    btnPrint?: FlipBookButtonOptions;
    btnShare?: FlipBookButtonOptions;
    btnZoomIn?: FlipBookButtonOptions;
    btnZoomOut?: FlipBookButtonOptions;
    btnSound?: FlipBookButtonOptions;
    btnThumbs?: FlipBookButtonOptions;
    btnBookmark?: FlipBookButtonOptions;
    btnExpand?: FlipBookButtonOptions;
    btnAutoplay?: FlipBookButtonOptions;
    currentPage?: { hAlign: string };
    btnBackground?: string;
}

interface Tipo {
    id: number;
    nombre: string;
    url: string;
    imagen: string;
}

interface JQuery {
    flipBook(options: FlipBookOptions): JQuery;
}

interface JQueryStatic {
    (selector: string): JQuery;
    fn: {
        flipBook?: (options: FlipBookOptions) => JQuery;
    };
}

declare global {
    interface Window {
        $?: JQueryStatic;
    }
}

export default function Webinar() {
  const params = useParams();
  const categoria = params.webinars as string;
  const webinar = params.webinar as string;
  const [tipoData, setTipoData] = useState<Tipo | null>(null);

  const initializeFlipbook = () => {
      // Wait a bit to ensure both scripts are fully loaded
      setTimeout(() => {
          if (typeof window !== 'undefined' && window.$ && window.$.fn && window.$.fn.flipBook) {
            window.$("#container").flipBook({
              pdfUrl: "/pdf/presentacion-ejecutiva.pdf",
              backgroundColor: 'transparent',
              viewMode: '3d',
              singlePageMode: true,
              pages: [
                  { title: "Cover" },
                  { title: "" },
                  { title: "Page 3" },
                  { title: "" },
                  { title: "" },
                  { title: "" },
                  { title: "" },
                  { title: "End" },
              ],
              btnToc: { enabled: false },
              btnSelect: { enabled: false },
              btnDownloadPages: { enabled: false },
              btnDownloadPdf: { enabled: false },
              btnPrint: { enabled: false },
              btnShare: { enabled: false },
              btnZoomIn: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
              btnZoomOut: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
              btnSound: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
              btnThumbs: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
              btnBookmark: { enabled: false },
              btnExpand: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
              btnAutoplay: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
              currentPage: { hAlign: 'center' },
              btnBackground: 'rgb(35 63 139);'
            });
          } else {
            console.error('jQuery or flipBook not available');
          }
      }, 500);
  };

  useEffect(() => {
      initializeFlipbook()
  }, []);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(`/api/get_tipo/${webinar}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data);
            setTipoData(data.tipo[0]);
        } catch (error) {
            console.error(error);
        }
    }
    initializeFlipbook();
    fetchData();
  }, [webinar]);

  if(!tipoData) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center font-sans bg-black w-full">
      <main className="flex w-full flex-col items-center justify-between sm:items-start px-10 py-5 bg-[url('https://amci.webinarsenconcreto.com/images/login2.png')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
        <div className="grid grid-cols-1 gap-2 w-full">
          <BreadCrumbUser params={{ categoria: decodeURIComponent(categoria as string), webinar: decodeURIComponent(webinar as string) }} />
          <h3 className="font-oswald text-3xl text-white font-light mb-7 flex items-center"><BsArrowRightCircle className='mr-3' /> {tipoData.nombre}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[20%_80%] gap-5 w-full">
          <div>
            <MenuLateral params={params} />
          </div>
          <div>
            <div className='bg-slate-900/50 border border-blue-900' style={{
              width: '100%',
              position: 'relative',
              height: '80vh',
            }}>
              <div id='container'></div>
            </div>
          </div>
        </div>
      </main>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"
        strategy="afterInteractive"
        onLoad={() => {
            // jQuery loaded, now load flipbook
            const flipbookScript = document.createElement('script');
            flipbookScript.src = '/js/flipbook.min.js';
            flipbookScript.onload = initializeFlipbook;
            document.body.appendChild(flipbookScript);
        }}
      />
    </div>
  );
}
