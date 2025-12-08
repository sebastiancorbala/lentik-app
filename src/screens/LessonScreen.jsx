import React, { useMemo, useState } from 'react';
import { X, Check, ArrowRight, AlertCircle, Lightbulb } from 'lucide-react';
import { lessonData } from '../data/unit1-lesson1';

export default function LessonScreen({ onExit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const totalSteps = lessonData.length;
  const currentData = lessonData[currentStep];
  const progress = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps]);

  const progressNodes = useMemo(
    () => [
      ...lessonData.map((step) => ({ id: step.id, label: step.title || step.question, type: step.type })),
      { id: 'test', label: 'Test', type: 'test' },
    ],
    []
  );

  const resetFeedback = () => {
    setStatus('idle');
    setFeedback('');
    setSelectedOption(null);
  };

  const handleNext = () => {
    resetFeedback();
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleValidation = (option, { successMessage, errorMessage }) => {
    if (status !== 'idle') return;

    setSelectedOption(option?.id ?? null);
    const isCorrect = option?.correct;
    if (isCorrect) {
      setStatus('correct');
      setFeedback(successMessage || option?.feedback || '');
    } else {
      setStatus('wrong');
      setFeedback(errorMessage || option?.feedback || 'Intenta nuevamente observando el sujeto.');
    }
  };

  const renderProgressDots = () => (
    <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
      {progressNodes.map((node) => {
        const isCurrent = currentData.id === node.id;
        const isCompleted = typeof node.id === 'number' && typeof currentData.id === 'number' && currentData.id > node.id;

        const baseColor = node.type === 'test' ? 'border-amber-500 text-amber-300' : 'border-blue-500 text-blue-300';
        const fillColor = node.type === 'test' ? 'bg-amber-500/20' : 'bg-blue-500/20';

        return (
          <div key={node.id} className="flex flex-col items-center min-w-[56px]">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${baseColor}
                ${isCurrent ? `${fillColor} scale-105` : ''}
                ${isCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : ''}
                ${node.type === 'test' ? 'opacity-80' : ''}`}
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

  const renderTheory = (withTip = false) => (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {currentData.image && (
        <div className="h-64 rounded-2xl overflow-hidden mb-6 border border-gray-800">
          <img src={currentData.image} className="w-full h-full object-cover" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-white mb-4">{currentData.title}</h2>
      <p className="text-gray-300 text-lg whitespace-pre-line mb-4">{currentData.content}</p>

      {withTip && (
        <div className="bg-amber-500/10 border border-amber-400/40 rounded-xl p-4 mb-6 text-amber-100 flex gap-3">
          <Lightbulb className="shrink-0" />
          <div>
            <p className="font-bold text-amber-100 mb-1">{currentData.tipTitle || 'Tip Pro'}</p>
            <p className="text-amber-50/90 text-base">{currentData.tipContent}</p>
          </div>
        </div>
      )}

      <button
        onClick={handleNext}
        className="mt-auto w-full bg-blue-600 py-4 rounded-xl font-bold text-white uppercase hover:bg-blue-500"
      >
        {currentData.buttonText || 'Siguiente'}
      </button>
    </div>
  );

  const renderQuiz = (isImageQuiz = false) => (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 mb-6">
        {currentData.instruction && <p className="text-blue-200 uppercase text-sm font-semibold">{currentData.instruction}</p>}
        {isImageQuiz && currentData.image && (
          <div className="h-56 rounded-2xl overflow-hidden border border-gray-800">
            <img src={currentData.image} className="w-full h-full object-cover" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-white">{currentData.question || currentData.title}</h2>
      </div>

      <div className="space-y-4">
        {currentData.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = !!option.correct;

          const baseStyles =
            status === 'idle'
              ? 'border-gray-700 bg-gray-800 text-gray-200 hover:border-blue-500'
              : 'border-gray-800 bg-gray-900 text-gray-500';
          const selectedStyles = isCorrect
            ? 'border-emerald-500 bg-emerald-900/30 text-emerald-100'
            : 'border-rose-500 bg-rose-900/40 text-rose-100';
          const highlightCorrect = isCorrect && !isSelected && status !== 'idle'
            ? 'border-emerald-500/70 bg-emerald-900/10 text-emerald-100/80'
            : '';

          return (
            <button
              key={option.id}
              onClick={() =>
                handleValidation(option, {
                  successMessage: currentData.feedbackCorrect,
                  errorMessage: currentData.feedbackWrong,
                })
              }
              disabled={status !== 'idle'}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium text-lg transition-all ${baseStyles}
                ${isSelected ? selectedStyles : ''}
                ${highlightCorrect}
                ${status !== 'idle' && !isSelected && !isCorrect ? 'opacity-50' : ''}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="flex flex-col h-full">
      <p className="text-blue-200 uppercase text-sm font-semibold mb-2">Comparación</p>
      <h2 className="text-xl font-bold text-white mb-4">{currentData.instruction}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentData.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = !!option.correct;

          return (
            <button
              key={option.id}
              onClick={() =>
                handleValidation(option, {
                  successMessage: option.feedback,
                  errorMessage: option.feedback,
                })
              }
              disabled={status !== 'idle'}
              className={`relative rounded-xl overflow-hidden border-4 transition-all cursor-pointer text-left
                ${status === 'idle' ? 'border-gray-700 hover:border-blue-500' : 'border-gray-800'}
                ${isSelected && isCorrect ? 'border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]' : ''}
                ${isSelected && !isCorrect ? 'border-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.25)]' : ''}
                ${status !== 'idle' && !isSelected ? 'opacity-60' : ''}`}
            >
              <img src={option.image} className="w-full h-48 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-3 py-2">
                {option.label}
              </div>
              {status !== 'idle' && isSelected && (
                <div
                  className={`absolute inset-0 bg-black/10 flex items-center justify-center
                    ${isCorrect ? 'text-emerald-400' : 'text-rose-300'}`}
                >
                  {isCorrect ? <Check size={40} className="drop-shadow" strokeWidth={4} /> : <AlertCircle size={36} strokeWidth={3} />}
                </div>
              )}
            </button>
          );
        })}
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
        {currentData.buttonText || 'Finalizar'}
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentData.type) {
      case 'theory':
        return renderTheory();
      case 'theory_tip':
        return renderTheory(true);
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
          <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
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
