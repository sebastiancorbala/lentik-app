import React, { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, Check, Sparkles, X } from 'lucide-react';
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

  const tagStyle = useMemo(() => ({
    theory: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
    quiz: 'bg-cyan-500/15 text-cyan-100 border-cyan-400/30',
    compare: 'bg-amber-500/15 text-amber-100 border-amber-400/30',
    image_quiz: 'bg-cyan-500/15 text-cyan-100 border-cyan-400/30',
    summary: 'bg-emerald-500/15 text-emerald-100 border-emerald-400/30'
  })[currentData.type] || 'bg-white/10 text-white border-white/20', [currentData.type]);

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


  const renderTheory = () => {
    return (
      <div className="flex flex-col h-full animate-in fade-in duration-500 gap-6">
        {currentData.image && (
          <div className="relative w-full min-h-[260px] max-h-[440px] aspect-[4/5] md:aspect-[16/9] rounded-3xl overflow-hidden border border-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] bg-gradient-to-br from-indigo-900/30 to-slate-900/40">
            <img src={currentData.image} alt="Inspiración de la lección" className="absolute inset-0 w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-white/80">
              <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 font-semibold">
                Inspiración visual
              </span>
              <Sparkles size={18} className="text-yellow-300 drop-shadow" />
            </div>
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${tagStyle}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            Lección teórica
          </div>
          <h2 className="text-3xl font-black text-white mt-3 mb-3 leading-tight">{currentData.title}</h2>
          <p className="text-gray-200 whitespace-pre-line leading-relaxed text-lg">
            {currentData.content}
          </p>
          {currentData.tip && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-100 flex gap-3 items-start">
              <Sparkles className="mt-1" size={18} />
              <div>
                <p className="text-sm uppercase tracking-wide font-semibold text-amber-200">Tip destacado</p>
                <p className="text-amber-50 leading-relaxed">{currentData.tip}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          className="mt-auto w-full bg-gradient-to-r from-purple-500 to-blue-500 py-4 rounded-2xl font-bold text-white uppercase tracking-wide shadow-lg shadow-purple-500/30 hover:from-purple-400 hover:to-blue-400"
        >
          {currentData.buttonText || 'Continuar'}
        </button>
      </div>
    );
  };

  const renderQuiz = (useImages = false) => (
    <div className="flex flex-col h-full">
      {currentData.title && (
        <div className="flex items-center gap-2 mb-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold ${tagStyle}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            Quiz interactivo
          </div>
        </div>
      )}
      {currentData.title && (
        <h2 className="text-2xl font-black text-white mb-2">{currentData.title}</h2>
      )}
      {currentData.image && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] bg-black/30">
          <img
            src={currentData.image}
            alt="Contenido de la pregunta"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      )}
      {currentData.instruction && <p className="text-gray-300 mb-1 text-sm uppercase tracking-wide">{currentData.instruction}</p>}
      {currentData.question && <p className="text-gray-100 mb-4 text-lg font-semibold">{currentData.question}</p>}
      <div className={useImages ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-3'}>
        {currentData.options?.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`rounded-2xl border border-white/10 bg-white/5 text-left p-4 hover:bg-white/10 transition flex flex-col gap-3 backdrop-blur ${
              selectedOption === option.id ? 'ring-2 ring-blue-400/80 shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]' : ''
            }`}
          >
            {useImages && option.src && (
              <div className="relative w-full aspect-[4/3] bg-black/30 rounded-xl overflow-hidden">
                <img src={option.src} alt="Opción" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            )}
            <span className="text-white font-semibold text-base">{option.text || option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="flex flex-col h-full">
      <div className={`inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold ${tagStyle} mb-3`}>
        <span className="w-2 h-2 rounded-full bg-current" />
        Busca el sujeto
      </div>
      <h2 className="text-2xl font-black text-white mb-3 leading-tight">{currentData.instruction}</h2>
      <div className="grid grid-cols-2 gap-4">
        {currentData.options?.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/60 transition shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] ${
              selectedOption === option.id ? 'ring-2 ring-blue-400/80' : ''
            }`}
          >
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-black/30">
              <img src={option.src} alt="Comparación" className="absolute inset-0 w-full h-full object-contain" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <div className="w-24 h-24 bg-emerald-500/15 rounded-full flex items-center justify-center mb-6 text-emerald-300 border border-emerald-400/30">
        <Check size={48} />
      </div>
      <h2 className="text-3xl font-black text-white mb-6">{currentData.title}</h2>
      <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left space-y-3 mb-8 backdrop-blur">
        {currentData.points.map((point, index) => (
          <div key={index} className="flex gap-3 text-gray-100">
            <Check size={20} className="text-emerald-400 shrink-0" /> {point}
          </div>
        ))}
      </div>
      <button
        onClick={onExit}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black py-4 rounded-2xl font-bold uppercase hover:from-emerald-400 hover:to-teal-300"
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
    <div className="h-screen bg-gradient-to-br from-[#0b0a1f] via-[#12102f] to-[#0a0b18] flex flex-col p-6 text-white">
      <div className="flex items-center gap-4 mb-5">
        <button onClick={onExit} aria-label="Salir de la lección" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
          <X className="text-white" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span className="font-semibold uppercase tracking-wide">Progreso</span>
            <span className="font-semibold text-white/80">Paso {currentStep + 1} de {totalSteps}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar">{renderCurrentStep()}</div>

      {status !== 'idle' && (
        <div
          className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 z-50 max-w-md mx-auto bg-opacity-90 backdrop-blur ${
            status === 'correct' ? 'bg-emerald-900/80' : 'bg-rose-900/80'
          }`}
        >
          <div className="">
            <p className="font-bold text-xl text-white mb-1 flex items-center gap-2">
              {status === 'correct' ? '¡Correcto!' : 'Ups...'}
            </p>
            <p className="text-white/80 mb-4 leading-relaxed">{feedback}</p>
            <div className="flex gap-3">
              {status === 'wrong' && (
                <button
                  onClick={resetFeedback}
                  className="flex-1 py-3 rounded-2xl font-bold uppercase text-white bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2"
                >
                  <AlertCircle size={18} />
                  Reintentar
                </button>
              )}
              <button
                onClick={handleNext}
                className={`flex-1 py-3 rounded-2xl font-bold uppercase text-white flex items-center justify-center gap-2 ${
                  status === 'correct' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300' : 'bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-400 hover:to-orange-300'
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
