"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Categoria {
  id: number;
  nombre: string;
  imagen: string;
  link: string;
} 

export default function Categorias() {
  const [categoriaData, setCategoriaData] = useState<Categoria[] | null>(null);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(`/api/get_categorias`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data);
            setCategoriaData(data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
  }, []);

  console.log(categoriaData);

  return (
    <div className="flex items-center justify-center font-sans bg-black">
      <main className="flex w-full flex-col items-center justify-between sm:items-start px-10 py-10 bg-[url('https://amci.webinarsenconcreto.com/images/login2.png')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-5 w-full">
          {categoriaData && categoriaData.map((categoria: Categoria) => (
            <Link href={categoria.link} key={categoria.id} className="border border-slate-800">
              <div key={categoria.id} className="border border-slate-800">
                <Image src={`/webinars/categorias/${categoria.imagen}`} alt={categoria.nombre} width={200} height={100} className="w-full h-auto"/>
                <h2 className="text-white font-oswald text-1xl font-light bg-slate-900 p-3">{categoria.nombre}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
