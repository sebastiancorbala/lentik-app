import React, { useState } from 'react';
import { X, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { lessonOneData } from '../data/lessonContent'; // Importamos los datos

export default function LessonScreen({ onExit }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [feedback, setFeedback] = useState('');

  const currentData = lessonOneData[step];
  const totalSteps = lessonOneData.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    setStatus('idle');
    setFeedback('');
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onExit(); // Volver al mapa
    }
  };

  const validate = (isCorrect, msgCorrect, msgWrong) => {
    if (status !== 'idle') return;
    if (isCorrect) {
      setStatus('correct');
      setFeedback(msgCorrect);
    } else {
      setStatus('wrong');
      setFeedback(msgWrong);
    }
  };

  // --- RENDERIZADORES DE PANTALLA ---

  const renderTheory = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="h-64 rounded-2xl overflow-hidden mb-6 border border-gray-800">
        <img src={currentData.image} className="w-full h-full object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">{currentData.title}</h2>
      <p className="text-gray-300 text-lg whitespace-pre-line mb-6">{currentData.content}</p>
      <button onClick={handleNext} className="mt-auto w-full bg-blue-600 py-4 rounded-xl font-bold text-white uppercase hover:bg-blue-500">
        {currentData.buttonText}
      </button>
    </div>
  );

  const renderQuiz = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white mb-8">{currentData.question}</h2>
      <div className="space-y-4">
        {currentData.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => validate(opt.correct, currentData.feedbackCorrect, currentData.feedbackWrong)}
            disabled={status !== 'idle'}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium text-lg transition-all
              ${status === 'idle' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-blue-500' : ''}
              ${status !== 'idle' && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-200' : ''}
              ${status === 'wrong' && !opt.correct ? 'opacity-50 border-gray-700' : ''}
            `}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-white mb-6">{currentData.instruction}</h2>
      <div className="grid grid-cols-1 gap-4">
        {currentData.options.map((opt, i) => (
          <div key={i} onClick={() => validate(opt.correct, opt.feedback, opt.feedback)} 
               className={`h-48 rounded-xl overflow-hidden border-4 transition-all cursor-pointer relative
                 ${status === 'idle' ? 'border-gray-700 hover:border-blue-500' : ''}
                 ${status !== 'idle' && opt.correct ? 'border-emerald-500' : ''}
                 ${status === 'wrong' && !opt.correct ? 'opacity-30 border-gray-700' : ''}
               `}>
            <img src={opt.src} className="w-full h-full object-cover" />
            {status !== 'idle' && opt.correct && (
              <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                <Check size={40} className="text-white" strokeWidth={4} />
              </div>
            )}
          </div>
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
        {currentData.points.map((p, i) => (
          <div key={i} className="flex gap-3 text-gray-300">
            <Check size={20} className="text-emerald-500 shrink-0" /> {p}
          </div>
        ))}
      </div>
      <button onClick={onExit} className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase hover:bg-gray-200">
        Continuar
      </button>
    </div>
  );

  return (
    <div className="h-screen bg-gray-900 flex flex-col p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onExit}><X className="text-gray-500 hover:text-white" /></button>
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="flex-1 overflow-y-auto pb-20">
        {currentData.type === 'theory' && renderTheory()}
        {currentData.type === 'quiz' && renderQuiz()}
        {currentData.type === 'compare' && renderCompare()}
        {currentData.type === 'summary' && renderSummary()}
      </div>

      {/* Modal de Feedback */}
      {status !== 'idle' && (
        <div className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 z-50
          ${status === 'correct' ? 'bg-emerald-900' : 'bg-rose-900'}
        `}>
          <div className="max-w-md mx-auto">
            <p className="font-bold text-xl text-white mb-2">
              {status === 'correct' ? '¡Correcto!' : 'Ups...'}
            </p>
            <p className="text-white/80 mb-4">{feedback}</p>
            <button onClick={handleNext} className={`w-full py-3 rounded-xl font-bold uppercase text-white
               ${status === 'correct' ? 'bg-emerald-600' : 'bg-rose-600'}
            `}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}