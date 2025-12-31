"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { useUser } from './context/UserContext';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Bienvenido!, Ingresar sus datos");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { login } = useUser();

  const checkUser = async (userEmail: string, userPassword: string) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch('/api/get_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store user data in context
        if (data.user) {
          login({
            id: data.user.id,
            email: email,
            nombre: data.user.nombre || userEmail.split('@')[0], // Use nombre if available, otherwise use email prefix
            ...data.user, // Spread any additional fields
          });
        }

        setMessage('Bienvenido!');
        router.push(`/categorias/`);
      } else {
        setMessage('Usuario y/o contraseña incorrectos');
      }
    } catch (error) {
      setMessage('Network error occurred');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }


  //const router = useRouter();
  const ingreso = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailValue = form.email.value;
    const passwordValue = form.password.value;
    setEmail(emailValue);
    checkUser(emailValue, passwordValue);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start bg-[url('https://amci.webinarsenconcreto.com/images/login2.png')] bg-gray-700/80 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
        <div className="grid text-center min-h-screen items-center lg:mb-0 md:grid-cols-[1fr_1fr_1fr] w-full">
          <div className="p-5 bg-gray-950/90 min-h-[20vh] md:min-h-screen flex flex-col items-center justify-center hover:bg-yellow-500 transition-colors">
            <Image
              src="/logo-imcyc-blanco.svg"
              alt="Next.js logo"
              width={300}
              height={40}
              priority
            />
            <p className="text-white p-5 uppercase font-oswald font-light">Instituto Mexicano del Cemento y del Concreto A.C.</p>
          </div>
          <div className="min-h-[60vh] md:min-h-screen bg-gray-950/80 bg-blend-multiply">
            <div className="flex flex-col min-h-[60vh] md:min-h-screen justify-center items-center">
              {loading && <h2 className="text-white">ENVIANDO DATOS</h2>}
              <form onSubmit={ingreso} className="flex flex-col items-center justify-center h-full px-5 w-full max-w-md">
                <h1 className="text-2xl text-white mb-6 uppercase text-center font-oswald font-bold">Una plataforma para profesionales de la construcción con concreto</h1>
                <p className="text-white mb-4 text-center font-oswald uppercase font-light">Compartir el Conocimiento</p>
                {message && <h2 className="text-white font-bold uppercase pb-5">{message}</h2>}
                <div className="w-full mb-4">
                  <label htmlFor="email" className="block text-white mb-2 text-1xl font-medium text-left font-oswald uppercase">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors shadow-lg"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="w-full mb-6">
                  <label htmlFor="password" className="block text-white mb-2 text-1xl font-medium text-left font-oswald uppercase">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors shadow-lg"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase shadow-xl hover:shadow-2xl font-oswald"
                >
                  Iniciar sesión
                </button>

                <div className="mt-4 text-center">
                  <a href="/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 text-sm font-oswald uppercase">
                    ¿No tienes cuenta? Regístrate aquí
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="p-5 bg-yellow-500/90 min-h-[20vh] md:min-h-screen flex flex-col items-center justify-center hover:bg-gray-900">
            <Image
              className="dark:invert"
              src="/logo.svg"
              alt="Next.js logo"
              width={270}
              height={20}
              priority
            />
            <p className="text-white p-5 uppercase text font-oswald font-light">Universidad de Monterrey</p>
          </div>
        </div>
      </main>
    </div>
  );
}
