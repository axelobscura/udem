'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center bg-slate-950 shadow-2xl shadow-black w-full">
      <div className='flex justify-between items-center w-full px-5 py-3'>
        <div className='flex'>
          <div className="p-3">
            <Link href="/">
              <Image
                src="/logo-imcyc-blanco.svg"
                alt="Next.js logo"
                width={150}
                height={20}
                priority
              />
            </Link>
          </div>
          <div className="p-3">
            <Link href="/categorias">
              <Image
                src="/logo.svg"
                alt="Next.js logo"
                width={120}
                height={20}
                priority
              />
            </Link>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
          >
            <HiOutlineUserCircle size={40} style={{
              color: '#fff'
            }} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <Link 
                href="/perfil" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Mi Perfil
              </Link>
              <Link 
                href="/mis-cursos" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Mis Cursos
              </Link>
              <Link 
                href="/configuracion" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Configuración
              </Link>
              <hr className="my-2" />
              <button 
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add logout logic here
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}