import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50 w-full">
        <Image
          src={`/loader.svg`}
          alt="IMCYC"
          width={100}
          height={0}
          layout="intrinsic"
          className="rotate-infinite mb-3"
        />
        <h2 className="font-montserrat text-2xl font-light uppercase text-white">Cargando</h2>
    </div>
  );
};

export default Loader;
