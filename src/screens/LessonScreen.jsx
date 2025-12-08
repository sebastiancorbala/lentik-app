import React, { useMemo, useState } from 'react';
import { X, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { lessonData } from '../data/unit1-lesson1';

export default function LessonScreen({ onExit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const totalSteps = lessonData.length;
  const currentData = lessonData[currentStep];
  const progress = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps]);

  const progressNodes = useMemo(
    () => [
      ...lessonData.map((step) => ({ id: step.id, label: step.title, type: step.type })),
      { id: 'test', label: 'Test', type: 'test' },
    ],
    []
  );

  const resetFeedback = () => {
    setStatus('idle');
    setFeedback('');
  };

  const handleNext = () => {
    resetFeedback();
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleValidation = (isCorrect, successMessage, errorMessage) => {
    if (status !== 'idle') return;
    if (isCorrect) {
      setStatus('correct');
      setFeedback(successMessage);
    } else {
      setStatus('wrong');
      setFeedback(errorMessage);
    }
  };

  const renderProgressDots = () => (
    <div className="flex items-center gap-2 mb-3">
      {progressNodes.map((node, index) => {
        const isCurrent = currentData.id === node.id;
        const isCompleted =
          typeof node.id === 'number' && typeof currentData.id === 'number' && currentData.id > node.id;

        const baseColor = node.type === 'test' ? 'border-amber-500 text-amber-300' : 'border-blue-500 text-blue-300';
        const fillColor = node.type === 'test' ? 'bg-amber-500/20' : 'bg-blue-500/20';

        return (
          <div key={node.id} className="flex flex-col items-center min-w-[56px]">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${baseColor}
                ${isCurrent ? `${fillColor} scale-105` : ''}
                ${isCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : ''}
                ${node.type === 'test' ? 'opacity-75' : ''}`}
            >
              {node.type === 'test' ? 'T' : node.id}
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-1 leading-tight line-clamp-2">
              {node.type === 'test' ? 'Test' : node.label}
            </p>
          </div>
        );
      })}
    </div>
  );

  const renderTheory = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {currentData.image && (
        <div className="h-64 rounded-2xl overflow-hidden mb-6 border border-gray-800">
          <img src={currentData.image} className="w-full h-full object-cover" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-white mb-4">{currentData.title}</h2>
      <p className="text-gray-300 text-lg whitespace-pre-line mb-6">{currentData.content}</p>
      <button
        onClick={handleNext}
        className="mt-auto w-full bg-blue-600 py-4 rounded-xl font-bold text-white uppercase hover:bg-blue-500"
      >
        Siguiente
      </button>
    </div>
  );

  const renderQuiz = (isImageQuiz = false) => (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white mb-6">{currentData.title}</h2>
      {isImageQuiz && currentData.image && (
        <div className="h-56 rounded-2xl overflow-hidden mb-6 border border-gray-800">
          <img src={currentData.image} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="space-y-4">
        {currentData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleValidation(option.correct, currentData.feedbackCorrect, currentData.feedbackWrong)}
            disabled={status !== 'idle'}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium text-lg transition-all
              ${status === 'idle' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-blue-500' : ''}
              ${status !== 'idle' && option.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-200' : ''}
              ${status === 'wrong' && !option.correct ? 'opacity-50 border-gray-700' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-white mb-6">{currentData.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleValidation(option.correct, option.feedback, option.feedback)}
            disabled={status !== 'idle'}
            className={`relative rounded-xl overflow-hidden border-4 transition-all cursor-pointer text-left
              ${status === 'idle' ? 'border-gray-700 hover:border-blue-500' : ''}
              ${status !== 'idle' && option.correct ? 'border-emerald-500' : ''}
              ${status === 'wrong' && !option.correct ? 'opacity-40 border-gray-700' : ''}`}
          >
            <img src={option.image} className="w-full h-48 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-3 py-2">
              {option.label}
            </div>
            {status !== 'idle' && option.correct && (
              <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                <Check size={40} className="text-white" strokeWidth={4} />
              </div>
            )}
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
        Salir
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentData.type) {
      case 'theory':
        return renderTheory();
      case 'quiz':
        return renderQuiz();
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
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-sm text-gray-400 font-semibold">{currentStep + 1}/{totalSteps}</div>
      </div>

      {renderProgressDots()}

      <div className="flex-1 overflow-y-auto pb-20">{renderCurrentStep()}</div>

      {status !== 'idle' && (
        <div
          className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 z-50
            ${status === 'correct' ? 'bg-emerald-900' : 'bg-rose-900'}`}
        >
          <div className="max-w-md mx-auto">
            <p className="font-bold text-xl text-white mb-2">
              {status === 'correct' ? '¡Correcto!' : 'Ups...'}
            </p>
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
                className={`flex-1 py-3 rounded-xl font-bold uppercase text-white flex items-center justify-center gap-2
                  ${status === 'correct' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'}`}
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
