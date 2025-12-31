"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MenuLateral from '@/app/components/MenuLateral';
import BreadCrumbUser from '@/app/components/BreadCrumbUser';
import Loader from '@/app/components/Loader';
import { BsArrowRightCircle } from "react-icons/bs";
import Video from '@/app/components/Video';
import Documento from '@/app/components/Documento';

interface Tipo {
    id: number;
    nombre: string;
    url: string;
    imagen: string;
}

export default function Tipo() {
  const params = useParams();
  const categoria = params.webinars as string;
  const webinar = params.webinar as string;
  const tipo = params.tipo as string;
  const [tipoData, setTipoData] = useState<Tipo | null>(null);

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
    fetchData();
  }, [webinar]);

  if(!tipoData) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center font-sans bg-black">
      <main className="flex w-full flex-col items-center justify-between sm:items-start px-10 py-1 bg-[url('https://amci.webinarsenconcreto.com/images/login2.png')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
          <div className="grid grid-cols-1 gap-2 w-full items-center">
            <BreadCrumbUser params={{ categoria: decodeURIComponent(categoria as string), webinar: decodeURIComponent(webinar as string), tipo: decodeURIComponent(tipo as string) }} />
            <h3 className="font-oswald text-xs sm:text-3xl text-white font-light mb-7 flex items-center"><BsArrowRightCircle className='mr-3' /> {tipoData.nombre}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[20%_80%] gap-5 w-full min-h-[80vh]">
            <div>
              <MenuLateral params={params} />
            </div>
            <div>
              <div>
                {tipo === 'presentaci%C3%B3n-ejecutiva' &&<Documento />}

                {tipo === 'videos' &&<Video id={tipoData.url} />}

              </div>
            </div>
          </div>
      </main>
    </div>
  );
}
