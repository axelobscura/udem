"use client";
import { useParams } from 'next/navigation';
import MenuLateral from '@/app/components/MenuLateral';
import BreadCrumbUser from '@/app/components/BreadCrumbUser';

export default function Tipo() {
  const params = useParams();
  const categoria = params.webinars as string;
  const webinar = params.webinar as string;
  const tipo = params.tipo as string;
  return (
    <div className="flex items-center justify-center font-sans bg-black">
      <main className="flex w-full flex-col items-center justify-between sm:items-start px-10 py-10 bg-[url('https://amci.webinarsenconcreto.com/images/login2.png')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
          <div className="grid grid-cols-1 gap-5 w-full">
            <BreadCrumbUser params={{ categoria: decodeURIComponent(categoria as string), webinar: decodeURIComponent(webinar as string), tipo: decodeURIComponent(tipo as string) }} />
            <h3 className="font-oswald text-5xl text-white font-light mb-5">{decodeURIComponent(webinar as string).replace('-', ' ').toUpperCase()}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[20%_80%] gap-5 w-full">
            <div>
              <MenuLateral params={params} />
            </div>
            <div>
              <div style={{
                width: '100%',
                position: 'relative',
                height: '80vh',
              }}>
                
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}
