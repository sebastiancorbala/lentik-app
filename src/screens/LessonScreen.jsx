import React, { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, Check, X } from 'lucide-react';
import { lessonOneData } from '../data/course/lessons/unit1/lesson1';

const lessonCatalog = {
  'U1-L1': lessonOneData
};

const fallbackLesson = (lessonMeta) => ([
  {
    id: 'placeholder-1',
    type: 'summary',
    title: lessonMeta?.lessonTitle || 'Lección próximamente',
    points: [
      'El contenido detallado de esta lección estará disponible pronto.',
      'Mientras tanto, puedes revisar otras unidades o lecciones completadas.'
    ]
  }
]);

export default function LessonScreen({ lessonMeta, onExit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const lessonData = useMemo(() => {
    if (!lessonMeta?.lessonId) return fallbackLesson(lessonMeta);
    return lessonCatalog[lessonMeta.lessonId] ?? fallbackLesson(lessonMeta);
  }, [lessonMeta]);

  const totalSteps = lessonData.length;
  const currentData = lessonData[currentStep] ?? lessonData[0];
  const progress = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps]);

  const resetFeedback = () => {
    setStatus('idle');
    setFeedback('');
    setSelectedOption(null);
  };

  const handleNext = () => {
    resetFeedback();
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (onExit) {
      onExit();
    }
  };

  const handleOptionSelect = (option) => {
    if (status !== 'idle') return;

    setSelectedOption(option?.id ?? null);
    const isCorrect = option?.correct;
    const optionFeedback = option?.feedback;

    if (isCorrect) {
      setStatus('correct');
      setFeedback(optionFeedback || currentData.feedbackCorrect || '¡Correcto!');
    } else {
      setStatus('wrong');
      setFeedback(optionFeedback || currentData.feedbackWrong || 'Intenta de nuevo.');
    }
  };

  const renderTheory = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {currentData.image && (
        <div className="h-64 rounded-2xl overflow-hidden mb-6 border border-gray-800">
          <img src={currentData.image} className="w-full h-full object-cover" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-white mb-4">{currentData.title}</h2>
      <p className="text-gray-300 whitespace-pre-line leading-relaxed">{currentData.content}</p>
      <button
        onClick={handleNext}
        className="mt-auto w-full bg-blue-600 py-4 rounded-xl font-bold text-white uppercase hover:bg-blue-500"
      >
        {currentData.buttonText || 'Continuar'}
      </button>
    </div>
  );

  const renderQuiz = (useImages = false) => (
    <div className="flex flex-col h-full">
      {currentData.title && (
        <h2 className="text-2xl font-bold text-white mb-4">{currentData.title}</h2>
      )}
      {currentData.image && (
        <div className="h-64 rounded-2xl overflow-hidden mb-4 border border-gray-800">
          <img src={currentData.image} alt="Contenido de la pregunta" className="w-full h-full object-cover" />
        </div>
      )}
      {currentData.instruction && <p className="text-gray-400 mb-2">{currentData.instruction}</p>}
      {currentData.question && <p className="text-gray-300 mb-4">{currentData.question}</p>}
      <div className={useImages ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-3'}>
        {currentData.options?.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`rounded-xl border border-gray-800 bg-white/5 text-left p-4 hover:bg-white/10 transition flex flex-col gap-3 ${
              selectedOption === option.id ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            {useImages && option.src && (
              <img src={option.src} alt="Opción" className="w-full h-32 object-cover rounded-lg" />
            )}
            <span className="text-white font-semibold">{option.text || option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white mb-3">{currentData.instruction}</h2>
      <div className="grid grid-cols-2 gap-4">
        {currentData.options?.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition ${
              selectedOption === option.id ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <img src={option.src} alt="Comparación" className="w-full h-40 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400">
        <Check size={48} />
      </div>
      <h2 className="text-3xl font-black text-white mb-8">{currentData.title}</h2>
      <div className="w-full bg-gray-800 rounded-2xl p-6 text-left space-y-3 mb-8">
        {currentData.points.map((point, index) => (
          <div key={index} className="flex gap-3 text-gray-300">
            <Check size={20} className="text-emerald-500 shrink-0" /> {point}
          </div>
        ))}
      </div>
      <button
        onClick={onExit}
        className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase hover:bg-gray-200"
      >
        Volver al mapa
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentData.type) {
      case 'theory':
        return renderTheory();
      case 'quiz':
        return renderQuiz(false);
      case 'compare':
        return renderCompare();
      case 'image_quiz':
        return renderQuiz(true);
      case 'summary':
      default:
        return renderSummary();
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col p-6 text-white">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onExit} aria-label="Salir de la lección">
          <X className="text-gray-500 hover:text-white" />
        </button>
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-sm text-gray-400 font-semibold">{currentStep + 1}/{totalSteps}</div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">{renderCurrentStep()}</div>

      {status !== 'idle' && (
        <div
          className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 z-50 ${
            status === 'correct' ? 'bg-emerald-900' : 'bg-rose-900'
          }`}
        >
          <div className="max-w-md mx-auto">
            <p className="font-bold text-xl text-white mb-2">{status === 'correct' ? '¡Correcto!' : 'Ups...'}</p>
            <p className="text-white/80 mb-4">{feedback}</p>
            <div className="flex gap-3">
              {status === 'wrong' && (
                <button
                  onClick={resetFeedback}
                  className="flex-1 py-3 rounded-xl font-bold uppercase text-white bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <AlertCircle size={18} />
                  Reintentar
                </button>
              )}
              <button
                onClick={handleNext}
                className={`flex-1 py-3 rounded-xl font-bold uppercase text-white flex items-center justify-center gap-2 ${
                  status === 'correct' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
                }`}
                disabled={currentData.type === 'summary'}
              >
                <ArrowRight size={18} />
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
