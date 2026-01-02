"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Script from 'next/script';
import Loader from '@/app/components/Loader';

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

export default function Documento() {
  const params = useParams();
  const categoria = params.webinars as string;
  const webinar = params.webinar as string;
  const [tipoData, setTipoData] = useState<Tipo | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

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
    async function fetchData() {
        try {
            const response = await fetch(`/api/get_tipo/${webinar}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setTipoData(data.tipo[0]);
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
    initializeFlipbook();
  }, [webinar]);

  useEffect(() => {
    if (scriptsLoaded) {
      initializeFlipbook();
    }
  }, [scriptsLoaded]);

  if(!tipoData) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center font-sans bg-black/20 w-full">
        <div className="grid grid-cols-1 gap-5 w-full">
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
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"
        strategy="afterInteractive"
        onLoad={() => {
            // jQuery loaded, now load flipbook
            const flipbookScript = document.createElement('script');
            flipbookScript.src = '/js/flipbook.min.js';
            flipbookScript.onload = () => {
              setScriptsLoaded(true);
            };
            document.body.appendChild(flipbookScript);
        }}
      />
    </div>
  );
}
