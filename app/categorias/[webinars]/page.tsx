"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loader';
import Link from 'next/link';
import Image from 'next/image';
import BreadCrumbUser from '@/app/components/BreadCrumbUser';

interface Categoria {
    id: number;
    nombre: string;
    link: string;
    imagen: string;
    descripcion: string;
}

interface Webinar {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    url: string;
    id_categoria: number;
    imagen?: string;
}

export default function Webinars() {
  const params = useParams();
  const categoria = params.webinars as string;
  const [categoriaData, setCategoriaData] = useState<Categoria | null>(null);
  const [webinars, setWebinars] = useState<Webinar[] | null>(null);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(`/api/get_categoria/${categoria}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data);
            setCategoriaData(data.categoria[0]);
            setWebinars(data.webinars[0]);
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
  }, [categoria]);

  if(!categoriaData || !webinars) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center font-sans bg-black w-full">
      <main className="flex w-full flex-col items-center justify-between sm:items-center px-10 py-5 bg-[url('https://amci.webinarsenconcreto.com/images/contenido.jpg')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
        <div className="grid grid-cols-1 gap-5 w-full">
          <BreadCrumbUser params={{ categoria: categoria }} />
        </div>
        <div className="grid grid-cols-[30%_70%] gap-5 w-full min-h-[80vh]">
          <div className='h-full flex items-center'>
            <h3 className="font-oswald text-5xl text-white font-light mb-5">{categoriaData?.nombre}</h3>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr] gap-5 w-full">
              {webinars && webinars.map((webinar: Webinar) => {
                return (
                  <Link key={webinar.id} href={`/categorias/${categoriaData.link}/${webinar.url}`} rel="noopener noreferrer">
                    <div className="border border-slate-800 hover:border-blue-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-slate-900">
                      <div>
                        <Image src={`/webinars/${webinar.imagen || 'default.jpg'}`} alt={webinar.nombre} width={200} height={100} className="w-full h-auto"/>
                        <h2 className="text-white font-oswald text-sm font-bold bg-slate-900 p-3 text-center min-h-20 flex items-center justify-center">{webinar.nombre}</h2>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
