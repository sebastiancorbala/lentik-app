import React, { useState } from 'react';
import UnitMap from './screens/UnitMap';
import LessonScreen from './screens/LessonScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('map'); // 'map' o 'lesson'

  return (
    <div className="bg-black min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-md bg-white shadow-2xl min-h-screen relative overflow-hidden">
        
        {/* PANTALLA 1: EL MAPA */}
        {currentScreen === 'map' && (
          <div className="h-full">
             {/* IMPORTANTE: Pasamos la función al componente UnitMap */}
             <UnitMap onStartLesson={() => setCurrentScreen('lesson')} />
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