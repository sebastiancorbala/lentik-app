import React, { useState } from 'react';
import { Check, X, Lightbulb, RotateCcw, Target } from 'lucide-react';
// Importamos los datos desde la ruta correcta
import { lessonOneData } from '../data/course/lessons/unit1/lesson1';

export default function LessonScreen({ onExit }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [feedback, setFeedback] = useState('');

  // Usamos los datos importados. Si fallan, usamos un array vacío para no romper la app.
  const lessonData = lessonOneData || [];
  
  // Fallback de seguridad
  const currentStep = lessonData[stepIndex];
  const totalSteps = lessonData.length;
  const progress = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;

  if (!currentStep) return <div className="text-white p-10 text-center">Cargando lección...</div>;

  // --- LÓGICA ---
  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(prev => prev + 1);
      setStatus('idle');
      setSelectedOption(null);
      setFeedback('');
    } else {
      onExit(); // Salir
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

  // --- RENDERIZADORES ---

  const RenderTheory = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500 gap-6">
      {currentStep.image && (
        <div className="relative w-full min-h-[240px] max-h-[300px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black shrink-0">
          <img src={currentStep.image} alt="Inspiración" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent" />
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur flex-1 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-black text-white mb-3 leading-tight">{currentStep.title}</h2>
        <p className="text-gray-200 whitespace-pre-line leading-relaxed text-lg">
          {currentStep.content}
        </p>
        
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
        <h3 className="text-2xl font-black text-white leading-tight">{currentStep.question}</h3>
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

                  {opt.correct ? <Check size={32} strokeWidth={4} /> : <X size={32} strokeWidth={4} />}
                </div>
              </div>
            )}

        ))}
      </div>
    </div>
  );

  const RenderImageQuiz = () => (
    <div className="flex flex-col h-full animate-in fade-in">
      <div className="w-full h-60 rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-lg relative bg-black shrink-0">
        <img src={currentStep.image} alt="Quiz" className="w-full h-full object-cover" />
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
      
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">{currentStep.title}</h2>
      <p className="text-gray-400 mb-8">¡Dominaste el concepto!</p>
      
      <div className="w-full bg-[#24243e] rounded-2xl p-6 text-left space-y-4 mb-8 border border-white/5 shadow-lg">
        {currentStep.points?.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="bg-emerald-500/20 p-1 rounded-full mt-0.5 shrink-0">
              <Check size={16} className="text-emerald-400" strokeWidth={3} />
            </div>
            <span className="text-gray-200 font-medium text-lg">{point}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onExit} 
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} />
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
        <button onClick={onExit} className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/10">
          <X size={24} />
        </button>
        <div className="flex-1 h-3 bg-[#24243e] rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-10"></div>
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Área de Contenido */}
      <div className="flex-1 px-6 py-6 overflow-hidden">
        {renderCurrentStep()}
      </div>

      {/* PANEL DE FEEDBACK (MODAL INFERIOR) */}
      {status !== 'idle' && (
        <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 rounded-t-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300 z-50
          ${status === 'correct' ? 'bg-[#0f291e]' : 'bg-[#290f0f]'}
        `}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-2 rounded-full shrink-0 ${status === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {status === 'correct' ? <Check size={28} strokeWidth={4} /> : <X size={28} strokeWidth={4} />}
            </div>
            <div>
              <h3 className={`font-black text-xl mb-1 ${status === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {status === 'correct' ? '¡Increíble!' : 'Casi...'}
              </h3>
              <p className="text-white/90 text-base font-medium leading-relaxed">{feedback}</p>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className={`w-full py-4 rounded-xl font-black text-white text-lg uppercase tracking-wide shadow-lg transition-transform active:scale-95
              ${status === 'correct' 
                ? 'bg-green-500 hover:bg-green-400 shadow-green-900/50' 
                : 'bg-red-500 hover:bg-red-400 shadow-red-900/50'}
            `}
          >
            CONTINUAR
          </button>
        </div>
      )}
    </div>
  );
}