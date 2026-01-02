"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import Loader from './Loader';
import { FaClock } from "react-icons/fa";

interface Respuesta {
    id: number;
    id_pregunta: string;
    pregunta: string;
    correcta: string;
}

interface Pregunta {
    pregunta: string;
    respuesta: Respuesta[];
}

interface Evaluacion {
    message?: string;
    preguntas?: Pregunta[];
}

export default function Evaluacion() {
    const params = useParams();
    const [evaluacion, setEvaluacion] = useState<Evaluacion>({});
    const [countdown, setCountdown] = useState('');
    const end = new Date().getTime() + 29 * 60 * 1000;

    useEffect(() => {
        const fetchEvaluacion = async () => {
            const response = await fetch(`/api/get_evaluacion/${params.webinar}`);
            const data = await response.json();
            setEvaluacion(data);
            console.log('Evaluacion loaded:', data);
        };
        fetchEvaluacion();
    }, [params.webinar]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = end - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountdown(`${minutes} minutos ${seconds} segundos`);
            if (distance < 0) {
                clearInterval(timer);
                setCountdown('EXPIRED');
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleEvaluacion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    };

    if (!evaluacion.preguntas) {
        return <Loader />;
    }
    return (
        <div className="grid grid-cols-[1fr] w-full rounded-md items-center bg-slate-900/50 p-5">
            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr] gap-0 my-5">
                <h3 className="text-center text-1xl font-semibold text-white p-0 m-0 pb-2 font-oswald">EVALUACIÓN PARA</h3>
                <h2 className="text-center text-4xl font-bold text-white p-0 m-0 font-oswald">{typeof params?.webinar === 'string' ? decodeURIComponent(params.webinar.split('-').join(' ')).toUpperCase() : ''}</h2>
            </div>
            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr] gap-0 my-2">
                <p className="text-left text-1xl text-white p-0 m-0 uppercase pl-6 flex items-center font-oswald"><FaClock className="mr-2" /> Cuenta con <span className="font-bold mx-2 text-2xl text-blue-500">{countdown}</span> para terminar la evaluación:</p>
            </div>
            <div className="w-full p-5 py-0 font-oswald">
                <form onSubmit={handleEvaluacion}>
                    {evaluacion.preguntas.map((pregunta: Pregunta, index: number) => (
                        <div key={index}>
                            <p className="text-white my-2 bg-gray-800 bg-opacity-50 p-2 grid grid-cols-[1fr] sm:grid-cols-[1fr_20fr] gap-0 items-center border border-slate-700"><span className="text-white flex justify-center items-center bg-slate-500 p-2 mr-3 border-2 border-blue-500">{index + 1}</span> <span className="text-white text-left">{pregunta.pregunta}</span></p>
                            <div className="mx-4 my-4 bg-slate-900 bg-opacity-50 p-3">
                                {pregunta.respuesta.map((respuestaObj: Respuesta, respuestaIndex: number) => (
                                    <label key={respuestaIndex} className="text-white my-2 cursor-pointer hover:text-gray-300 grid grid-cols-[1fr] sm:grid-cols-[1fr_20fr] gap-0 items-center">
                                        <input
                                            type="radio"
                                            name={`pregunta-${index}`}
                                            value={respuestaObj.pregunta}
                                            className="mr-2 p-10 border border-gray-300 rounded-md bg-gray-800 bg-opacity-50"
                                            style={{
                                              width: '30px',
                                              height: '30px',
                                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                              border: '2px solid #ccc',
                                              cursor: 'pointer',
                                            }}
                                        />
                                        {respuestaObj.pregunta}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center items-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-20 my-5 rounded uppercase">Finalizar Evaluación</button>
                    </div>
                </form>
            </div>
        </div>
    );
}