import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen';
import UnitMap from './screens/UnitMap';
import LessonScreen from './screens/LessonScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro'); // 'intro', 'map' o 'lesson'

  const handleStart = () => setCurrentScreen('map');

  return (
    <div className="bg-black min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-md bg-white shadow-2xl min-h-screen relative overflow-hidden">
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
