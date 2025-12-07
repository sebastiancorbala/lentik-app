import React, { useState } from 'react';
import UnitMap from './screens/UnitMap';
import LessonScreen from './screens/LessonScreen';
// Asegúrate de que este archivo exista en tu carpeta screens con este nombre exacto
import WelcomeScreen from './screens/WelcomeScreen'; 

import { 
  Camera, 
  BookOpen, 
  User, 
  Sparkles,
  ChevronRight,
  Settings,
  Heart
} from 'lucide-react';

// ==========================================
// VISTAS SECUNDARIAS (Placeholders)
// ==========================================
const LibraryView = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8 text-white animate-in fade-in">
    <div className="w-24 h-24 bg-[#24243e] rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/10">
      <BookOpen size={40} className="text-yellow-400" />
    </div>
    <h2 className="text-2xl font-bold mb-2">Biblioteca Teórica</h2>
    <p className="text-gray-400">Aquí encontrarás artículos sobre historia de la fotografía, glosario de términos y guías avanzadas.</p>
  </div>
);

const ProfileView = () => (
  <div className="h-full flex flex-col items-center pt-20 px-6 text-white w-full animate-in fade-in">
    <div className="w-28 h-28 rounded-full border-4 border-yellow-400 p-1 mb-4 shadow-[0_0_20px_rgba(255,193,7,0.3)]">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full rounded-full bg-white" />
    </div>
    <h2 className="text-2xl font-bold">Sebastián Corbala</h2>
    <p className="text-purple-400 font-medium mb-8">Fotógrafo Aprendiz</p>

    <div className="w-full space-y-3">
      <div className="bg-[#24243e] p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-[#2d2859] transition-colors cursor-pointer">
        <span className="flex items-center gap-3"><Sparkles size={18} className="text-yellow-400"/> Racha</span>
        <span className="font-bold text-yellow-100">12 Días 🔥</span>
      </div>
      <div className="bg-[#24243e] p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-[#2d2859] transition-colors cursor-pointer">
        <span className="flex items-center gap-3"><Heart size={18} className="text-red-400"/> Vidas</span>
        <span className="font-bold text-red-100">5/5 ❤️</span>
      </div>
      <div className="bg-[#24243e] p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-[#2d2859] transition-colors cursor-pointer">
        <span className="flex items-center gap-3"><Settings size={18} className="text-gray-400"/> Configuración</span>
        <ChevronRight size={18} className="text-gray-500" />
      </div>
    </div>
  </div>
);

// ==========================================
// BARRA DE NAVEGACIÓN INFERIOR
// ==========================================
const BottomNavBar = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#161231]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex justify-between items-center z-50 max-w-md mx-auto">
      <button 
        onClick={() => onTabChange('map')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'map' ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <Camera size={26} strokeWidth={activeTab === 'map' ? 3 : 2} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Ruta</span>
      </button>
      <button 
        onClick={() => onTabChange('library')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'library' ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <BookOpen size={26} strokeWidth={activeTab === 'library' ? 3 : 2} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Teoría</span>
      </button>
      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <User size={26} strokeWidth={activeTab === 'profile' ? 3 : 2} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Perfil</span>
      </button>
    </div>
  );
};

// ==========================================
// APP PRINCIPAL
// ==========================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'app', 'lesson'
  const [currentTab, setCurrentTab] = useState('map'); // 'map', 'library', 'profile'

  return (
    <div className="bg-black min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-md bg-[#0f0c29] shadow-2xl min-h-screen relative overflow-hidden border-x border-white/5 flex flex-col">
        
        {/* 1. PANTALLA DE BIENVENIDA */}
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStart={() => setCurrentScreen('app')} />
        )}

        {/* 2. APP PRINCIPAL (CON TABS) */}
        {currentScreen === 'app' && (
          <>
            {/* Header Superior */}
            <header className="px-6 py-4 flex justify-between items-center bg-[#0f0c29]/90 backdrop-blur sticky top-0 z-40 border-b border-white/5">
              <span className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                LENTIK
              </span>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#24243e] rounded-full border border-white/10">
                <Sparkles size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-yellow-100">1250 XP</span>
              </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow overflow-y-auto custom-scrollbar pb-24">
              {currentTab === 'map' && (
                <UnitMap onStartLesson={() => setCurrentScreen('lesson')} />
              )}
              {currentTab === 'library' && <LibraryView />}
              {currentTab === 'profile' && <ProfileView />}
            </main>

            {/* Menú Inferior */}
            <BottomNavBar activeTab={currentTab} onTabChange={setCurrentTab} />
          </>
        )}

        {/* 3. PANTALLA DE LECCIÓN (Sobrepone todo) */}
        {currentScreen === 'lesson' && (
          <div className="absolute inset-0 z-50 bg-[#0f0c29]">
             <LessonScreen onExit={() => setCurrentScreen('app')} />
          </div>
        )}

      </div>
    </div>
  );
}