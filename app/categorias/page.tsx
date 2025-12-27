"use client"
import { useEffect, useState } from "react";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
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
      <main className="flex w-full flex-col items-center justify-between bg-gray-900 sm:items-start">
        <h2 className="text-gray-100 font-oswald text-4xl p-3">CATEGORIAS</h2>
        <div className="px-10 py-20">
          {categoriaData && categoriaData.map((categoria: Categoria) => (
            <div key={categoria.id}>
              <h2 className="text-white">{categoria.nombre}</h2>
              <p className="text-gray-400">{categoria.descripcion}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
