import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';

interface BreadCrumbUserProps {
    categoria?: string;
    webinar?: string;
    tipo?: string;
}

export default function MenuLateral(
    {
        params
    }: {
        params: BreadCrumbUserProps
    }) {
    const { categoria, webinar } = params || {};
    return (
        <div className='barra_lateral'>
            <ul className='menu interno bg-slate-800 bg-opacity-50'>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/evaluación-diagnóstico`} className={`mb-0 ${params.tipo as string === "evaluaci%C3%B3n-diagn%C3%B3stico" && "bg-blue-700"}`}><BsChevronRight /> EVALUACIÓN DIAGNÓSTICO</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/presentación-ejecutiva`} className={`mb-0 ${(params.tipo as string === "presentaci%C3%B3n-ejecutiva" || params.tipo === undefined) && "bg-blue-700"}`}><BsChevronRight /> PRESENTACIÓN EJECUTIVA</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/presentación-grabada`} className={`mb-0 ${params.tipo as string === "presentaci%C3%B3n-grabada" && "bg-blue-700"}`}><BsChevronRight /> PRESENTACIÓN GRABADA</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/dato-en-concreto`} className={`mb-0 ${params.tipo as string === "dato-en-concreto" && "bg-blue-700"}`}><BsChevronRight /> DATO EN CONCRETO</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/infografías`} className={`mb-0 ${params.tipo as string === "infograf%C3%ADas" && "bg-blue-700"}`}><BsChevronRight /> INFOGRAFÍAS</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/videos`} className={`mb-0 ${params.tipo as string === "videos" && "bg-blue-700"}`}><BsChevronRight /> VIDEOS</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/evaluación-final`} className={`mb-0 ${params.tipo as string === "evaluaci%C3%B3n-final" && "bg-blue-700"}`}><BsChevronRight /> EVALUACIÓN FINAL</Link>
                </li>
                <li>
                    <Link href={`/usuarios/${categoria}/${webinar}/contenido-adicional`} className={`mb-0 ${params.tipo as string === "contenido-adicional" && "bg-blue-700"}`}><BsChevronRight /> CONTENIDO ADICIONAL</Link>
                </li>
            </ul>
        </div>
    )
}
