import React, { useState } from 'react';
import IntroScreen from './screens/IntroScreen';
import UnitMap from './screens/UnitMap';
import LessonScreen from './screens/LessonScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro'); // 'intro', 'map' o 'lesson'

  const handleStart = () => setCurrentScreen('map');

  return (

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
