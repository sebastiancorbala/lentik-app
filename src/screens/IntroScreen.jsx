import React from 'react';
import mascot from '../assets/mascot.svg';

export default function IntroScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden border border-orange-100">
        <div className="absolute -left-10 -top-10 h-32 w-32 bg-orange-200/50 rounded-full blur-3xl"></div>
        <div className="absolute -right-6 -bottom-6 h-40 w-40 bg-amber-200/60 rounded-full blur-3xl"></div>

        <div className="relative p-8 flex flex-col items-center text-center gap-6">
          <div className="bg-white rounded-2xl border border-orange-100 shadow-lg p-4 w-44 h-44 flex items-center justify-center">
            <img src={mascot} alt="Mascota fotógrafo saludando" className="w-full h-full object-contain" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-[0.2em]">¡Bienvenido futuro fotógrafo!</p>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              ¿Listo para ver el mundo a través de tu lente?
            </h1>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Conoce a tu guía y prepárate para explorar el árbol de contenido lleno de misiones y lecciones creativas.
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-md transition-transform duration-200 active:scale-95"
          >
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
}
