import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import mascotImg from '../assets/mascot.png';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 text-center relative overflow-hidden font-sans text-white">
      
      {/* Elementos de fondo decorativos */}
      <div className="absolute top-10 left-[-50px] w-64 h-64 bg-purple-600 rounded-full opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-10 right-[-50px] w-64 h-64 bg-yellow-600 rounded-full opacity-10 blur-[80px]"></div>

      {/* Contenedor Mascota */}
      <div className="relative mb-10 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl transform scale-90"></div>
        
        {/* IMAGEN DE LA MASCOTA */}
        <img 
          src={mascotImg} 
          alt="Lumen Mascota" 
          className="w-56 h-56 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
        
        <div className="absolute -top-4 -right-2 animate-bounce">
          <Sparkles className="text-yellow-400 fill-yellow-400" size={32} />
        </div>
      </div>

      <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
        Bienvenido a <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Lentik
        </span>
      </h1>

      <p className="text-gray-300 text-lg mb-12 font-light max-w-xs mx-auto leading-relaxed">
        Tu viaje para capturar la belleza del mundo comienza aquí.
      </p>

      <button
        onClick={onStart}
        className="w-full max-w-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-[#0f0c29] text-xl font-bold py-4 px-8 rounded-2xl shadow-[0_0_20px_rgba(255,193,7,0.4)] hover:shadow-[0_0_30px_rgba(255,193,7,0.6)] transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Camera size={24} strokeWidth={2.5} />
        EMPEZAR AVENTURA
      </button>
    </div>
  );
}