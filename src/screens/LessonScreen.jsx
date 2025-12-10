import React, { useState } from 'react';
import { 
  ChevronRight, 
  X, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Target, 
  Lightbulb, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
// Importamos los datos desde la ruta correcta
import { lessonOneData } from '../data/course/lessons/unit1/lesson1';

export default function LessonScreen({ onExit = () => {} }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [feedback, setFeedback] = useState('');

  // Usamos los datos importados
  const lessonData = lessonOneData || [];
  
  // Fallback de seguridad
  const currentStep = lessonData[stepIndex];
  const totalSteps = lessonData.length;
  const progress = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;

  if (!currentStep) return <div className="text-white p-10 text-center">Cargando lección...</div>;

  // --- LÓGICA ---
  const resetLessonState = () => {
    setStepIndex(0);
    setStatus('idle');
    setSelectedOption(null);
    setFeedback('');
  };

  const handleExit = () => {
    resetLessonState();
    onExit();
  };

  const handleNext = () => {
    if (stepIndex < lessonData.length - 1) {
      setStepIndex(prev => prev + 1);
      setStatus('idle');
      setSelectedOption(null);
      setFeedback('');
    } else {
      handleExit(); // Salir y reiniciar estado
    }
  };

  const handleValidation = (option) => {
    if (status !== 'idle') return;

    setSelectedOption(option.id);
    const isCorrect = option.correct;
    
    // Usamos feedback específico o el general de la lección
    const feedbackText = isCorrect 
      ? (option.feedback || currentStep.feedbackCorrect || '¡Correcto!')
      : (option.feedback || currentStep.feedbackWrong || 'Intenta de nuevo.');

    if (isCorrect) {
      setStatus('correct');
      setFeedback(feedbackText);
    } else {
      setStatus('wrong');
      setFeedback(feedbackText);
    }
  };

  // --- RENDERIZADORES (DISEÑO CODEX: PURPLE THEME) ---

  const RenderTheory = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500 gap-6">
      {currentStep.image && (
        <div className="relative w-full min-h-[240px] max-h-[300px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black shrink-0">
          <img src={currentStep.image} alt="Inspiración" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-white/80">
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 font-semibold backdrop-blur-md">
              Inspiración visual
            </span>
            <Sparkles size={18} className="text-yellow-300 drop-shadow" />
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur flex-1 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-black text-white mb-3 leading-tight">{currentStep.title}</h2>
        <div className="text-gray-200 whitespace-pre-line leading-relaxed text-lg">
          {currentStep.content}
        </div>
        
        {currentStep.tip && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-100 flex gap-3 items-start">
            <Lightbulb className="mt-1 shrink-0 text-amber-400" size={20} />
            <div>
              <p className="text-sm uppercase tracking-wide font-bold text-amber-400 mb-1">Tip Pro</p>
              <p className="text-amber-50 leading-relaxed italic">{currentStep.tip}</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        className="mt-auto w-full bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 py-4 rounded-2xl font-bold text-white uppercase tracking-wide shadow-lg shadow-purple-900/40 hover:brightness-110 active:scale-95 transition-all"
      >
        {currentStep.buttonText || 'Continuar'}
      </button>
    </div>
  );

  const RenderQuiz = (useImages = false) => (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white leading-tight">{currentStep.question}</h2>
      </div>

      {currentStep.image && useImages && (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg bg-black shrink-0">
          <img src={currentStep.image} alt="Quiz Context" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`gap-3 overflow-y-auto custom-scrollbar pb-4 ${useImages && !currentStep.image ? 'grid grid-cols-2' : 'flex flex-col flex-1'}`}>
        {currentStep.options?.map((option) => {
           let stateClass = "bg-white/5 border-white/10 hover:bg-white/10";
           if (status !== 'idle' && option.correct) stateClass = "bg-emerald-500/20 border-emerald-500 text-emerald-100";
           else if (status === 'wrong' && selectedOption === option.id) stateClass = "bg-red-500/20 border-red-500 text-red-100";
           else if (status !== 'idle') stateClass = "opacity-40 border-transparent";

           return (
            <button
              key={option.id}
              onClick={() => handleValidation(option)}
              disabled={status !== 'idle'}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group text-white ${stateClass}`}
            >
              {useImages && option.src ? (
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-black/50">
                   <img src={option.src} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
              
              <div className="flex justify-between items-center relative z-10 text-white">
                <span className="font-semibold text-lg leading-snug">{option.text}</span>
                {status !== 'idle' && option.correct && <Check className="text-emerald-400" />}
                {status === 'wrong' && selectedOption === option.id && <X className="text-red-400" />}
              </div>
            </button>
           );
        })}
      </div>
    </div>
  );

  const RenderCompare = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-black text-white leading-tight">{currentStep.instruction}</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 flex-1 overflow-y-auto pb-2 custom-scrollbar">
        {currentStep.options.map((opt) => (
          <button 
            key={opt.id} 
            onClick={() => handleValidation(opt)}
            disabled={status !== 'idle'}
            className={`relative rounded-3xl overflow-hidden border-4 h-52 transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-yellow-400/70
              ${status === 'idle' ? 'border-transparent hover:border-purple-400/60' : ''}
              ${status !== 'idle' && opt.correct ? 'border-emerald-500 ring-4 ring-emerald-500/30 z-10' : ''}
              ${status === 'wrong' && selectedOption === opt.id ? 'border-red-500 opacity-90' : ''}
              ${status !== 'idle' && !opt.correct && selectedOption !== opt.id ? 'opacity-40 grayscale' : ''}
            `}
          >
            <img src={opt.src} alt="Opción de comparación" className="w-full h-full object-cover" />

            {status !== 'idle' && (opt.correct || selectedOption === opt.id) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[2px]">
                <div className={`p-3 rounded-full ${opt.correct ? 'bg-emerald-500' : 'bg-red-500'} text-white shadow-lg`}>
                  {opt.correct ? <Check size={32} strokeWidth={4} /> : <X size={32} strokeWidth={4} />}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const RenderImageQuiz = () => (
    <div className="flex flex-col h-full animate-in fade-in">
      <div className="w-full h-60 rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-lg relative bg-black shrink-0">
        <img src={currentStep.image} alt="Quiz" className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
          <ImageIcon size={12} className="inline mr-1" /> Analiza
        </div>
      </div>
      
      <h3 className="text-white font-bold text-lg mb-4">{currentStep.question}</h3>
      
      <div className="space-y-3 flex-1 overflow-y-auto pb-20 custom-scrollbar">
        {currentStep.options.map((opt) => {
           let bgClass = "bg-white/5 border border-white/10 hover:bg-white/10 text-white";
           if (status !== 'idle' && opt.correct) bgClass = "bg-green-500/20 border-green-500 text-green-100";
           else if (status === 'wrong' && selectedOption === opt.id) bgClass = "bg-red-500/20 border-red-500 text-red-100";
           else if (status !== 'idle') bgClass = "opacity-30 border-transparent";

           return (
            <button
              key={opt.id}
              onClick={() => handleValidation(opt)}
              disabled={status !== 'idle'}
              className={`w-full p-4 rounded-xl text-left transition-all font-medium ${bgClass}`}
            >
              {opt.text}
            </button>
           );
        })}
      </div>
    </div>
  );

  const RenderSummary = () => (
    <div className="flex flex-col h-full items-center justify-center text-center animate-in zoom-in-95 duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-yellow-500/30 blur-3xl rounded-full"></div>
        <div className="w-28 h-28 bg-[#24243e] rounded-full flex items-center justify-center relative shadow-2xl border-4 border-yellow-500">
          <Target size={56} className="text-yellow-400" />
        </div>
      </div>
      
      <h2 className="text-3xl font-black text-white mb-6">{currentStep.title}</h2>
      <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left space-y-3 mb-8 backdrop-blur">
        {(currentStep.points ?? []).map((point, index) => (
          <div key={index} className="flex gap-3 text-gray-100">
            <Check size={20} className="text-emerald-400 shrink-0" /> {point}
          </div>
        ))}
      </div>
      <button
        onClick={handleExit}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black py-4 rounded-2xl font-bold uppercase hover:from-emerald-400 hover:to-teal-300"
      >
        {currentStep.buttonText || 'Finalizar'}
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep.type) {
      case 'theory': return <RenderTheory />;
      case 'quiz': return <RenderQuiz />;
      case 'compare': return <RenderCompare />; 
      case 'image_quiz': return <RenderImageQuiz />; 
      case 'summary': return <RenderSummary />;
      default: return <div className="text-white">Tipo desconocido: {currentStep.type}</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f0c29] z-50 flex flex-col font-sans">
      {/* Header: Barra de Progreso y Salir */}
      <div className="px-6 pt-6 pb-2 flex items-center gap-4 bg-[#0f0c29] shrink-0">
        <button onClick={handleExit} className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/10">
          <X size={24} />
        </button>
        <div className="flex-1 h-3 bg-[#24243e] rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-10"></div>
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Área de Contenido */}
      <div className="flex-1 px-6 py-6 overflow-y-auto custom-scrollbar">
        {renderCurrentStep()}
      </div>

      {/* PANEL DE FEEDBACK (MODAL INFERIOR) */}
      {status !== 'idle' && (
        <div className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 z-50 max-w-md mx-auto bg-opacity-90 backdrop-blur ${
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
                  onClick={() => {
                    setStatus('idle');
                    setFeedback('');
                    setSelectedOption(null);
                  }}
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
                disabled={currentStep.type === 'summary'}
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