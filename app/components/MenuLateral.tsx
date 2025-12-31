import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';

interface BreadCrumbUserProps {
    webinars?: string;
    webinar?: string;
    tipo?: string;
}

export default function MenuLateral(
    {
        params
    }: {
        params: BreadCrumbUserProps
    }) {
    const { webinars, webinar } = params || {};
    return (
        <div className='barra_lateral'>
            <ul className='menu interno bg-slate-800 bg-opacity-50'>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/evaluación-diagnóstico`} className={`mb-0 ${params.tipo as string === "evaluaci%C3%B3n-diagn%C3%B3stico" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> EVALUACIÓN DIAGNÓSTICO</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/presentación-ejecutiva`} className={`mb-0 ${(params.tipo as string === "presentaci%C3%B3n-ejecutiva" || params.tipo === undefined) && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> PRESENTACIÓN EJECUTIVA</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/presentación-grabada`} className={`mb-0 ${params.tipo as string === "presentaci%C3%B3n-grabada" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> PRESENTACIÓN GRABADA</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/dato-en-concreto`} className={`mb-0 ${params.tipo as string === "dato-en-concreto" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> DATO EN CONCRETO</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/infografías`} className={`mb-0 ${params.tipo as string === "infograf%C3%ADas" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> INFOGRAFÍAS</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/videos`} className={`mb-0 ${params.tipo as string === "videos" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> VIDEOS</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/evaluación-final`} className={`mb-0 ${params.tipo as string === "evaluaci%C3%B3n-final" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> EVALUACIÓN FINAL</Link>
                </li>
                <li>
                    <Link href={`/categorias/${webinars}/${webinar}/contenido-adicional`} className={`mb-0 ${params.tipo as string === "contenido-adicional" && "bg-blue-700"}`}><BsChevronRight className='mr-2' /> CONTENIDO ADICIONAL</Link>
                </li>
            </ul>
        </div>
    )
}
