import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50 w-full bg-[url('https://amci.webinarsenconcreto.com/images/login2.png')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
        <Image
          src={`/loader.svg`}
          alt="IMCYC"
          width={100}
          height={0}
          layout="intrinsic"
          className="animate-[spin_2s_linear_infinite] mb-3"
        />
        <h2 className="font-montserrat text-2xl font-light uppercase text-white">Cargando...</h2>
    </div>
  );
};

export default Loader;
