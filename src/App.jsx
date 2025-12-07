import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen';
import UnitMap from './screens/UnitMap';
import LessonScreen from './screens/LessonScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro'); // 'intro', 'map' o 'lesson'

  const handleStart = () => setCurrentScreen('map');

  return (
    <div className="bg-gradient-to-b from-[#07041c] via-[#0b0830] to-[#0a0a25] min-h-screen flex justify-center font-sans text-white">
      <div className="w-full max-w-md bg-[#0e0a2d] shadow-2xl min-h-screen relative overflow-hidden ring-1 ring-white/5">
        {currentScreen === 'intro' && (
          <IntroScreen onStart={handleStart} />
        )}

        {/* PANTALLA 1: EL MAPA */}
        {currentScreen === 'map' && (
          <div className="h-full">
            <UnitMap onStartLesson={() => setCurrentScreen('lesson')} onExit={() => setCurrentScreen('intro')} />
          </div>
        )}

        {/* PANTALLA 2: LA LECCIÓN */}
        {currentScreen === 'lesson' && (
          <LessonScreen onExit={() => setCurrentScreen('map')} />
        )}

      </div>
    </div>
  );
}

export default App;
