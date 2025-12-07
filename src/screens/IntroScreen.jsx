import React from 'react';
import mascot from '../assets/mascot.svg';

export default function IntroScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b082d] via-[#0f0d3f] to-[#0a0728] flex items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(255,204,112,0.22),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(134,96,255,0.25),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,87,145,0.2),transparent_35%)]"></div>
        <div className="relative flex flex-col items-center gap-6 px-8 py-10 text-center">
          <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-[#ffcf6f] via-[#ffd676] to-[#ff8b6a] shadow-[0_12px_50px_rgba(255,193,94,0.35)] flex items-center justify-center ring-4 ring-white/10">
            <img src={mascot} alt="Mascota fotógrafo" className="w-24 h-24 drop-shadow-lg" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffcf6f]">Bienvenido a</p>
            <h1 className="text-3xl font-extrabold leading-tight">
              Lentik
            </h1>
            <p className="text-base text-white/70">
              Tu viaje para capturar la belleza del mundo comienza aquí.
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffd75c] px-7 py-3 text-base font-black text-[#201114] shadow-[0_12px_35px_rgba(255,200,90,0.35)] transition hover:brightness-105 active:scale-95"
          >
            <span className="text-sm">EMPEZAR AVENTURA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
