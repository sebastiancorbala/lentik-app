import React, { useState } from 'react';
import { 
  ChevronRight, 
  X, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Target, 
  Lightbulb, 
  Image as ImageIcon 
} from 'lucide-react';

// ==========================================
// DATOS DE LA LECCIÓN 1 (Hardcoded para Demo)
// ==========================================
const lessonData = [
  {
    id: 1,
    type: 'theory',
    title: "Todo necesita un protagonista",
    content: (
      <>
        <p className="mb-4">Imagina una película donde no sabes quién es el personaje principal. Sería confusa y aburrida, ¿verdad?</p>
        <p>Lo mismo ocurre con la fotografía. Cuando miramos una imagen, <strong className="text-yellow-400">nuestros ojos buscan instintivamente un punto donde concentrarnos.</strong></p>
      </>
    ),
    // Usamos una imagen de Unsplash que representa "foco"
    image: "https://images.unsplash.com/photo-1507765106233-a309990aa4bd?q=80&w=800&auto=format&fit=crop", 
    buttonText: "Siguiente"
  },
  {
    id: 2,
    type: 'theory',
    title: "El error del principiante",
    content: (
      <>
        <p className="mb-4">El error número 1 es intentar fotografiar <em>"todo a la vez"</em>: el paisaje, tu amigo, el perro y el coche... todo en el mismo encuadre.</p>
        <p>Si todo es importante, <span className="text-red-400 font-bold">nada lo es.</span></p>
      </>
    ),
    image: "https://images.unsplash.com/photo-1546452230-0a2a4b087095?q=80&w=800&auto=format&fit=crop", 
    tip: 'Antes de disparar, pregúntate: "¿De qué trata esta foto?". Elige UN solo elemento (tu Sujeto) y dale prioridad.',
    buttonText: "Entendido"
  },
  {
    id: 3,
    type: 'quiz',
    question: "Según lo que acabas de leer, ¿qué hace que una foto sea confusa para el espectador?",
    options: [
      { id: 'a', text: "Que esté tomada en blanco y negro." },
      { id: 'b', text: "Que no tenga un sujeto principal claro.", correct: true },
      { id: 'c', text: "Que tenga muchos colores diferentes." },
      { id: 'd', text: "Que sea una foto borrosa." }
    ],
    feedbackCorrect: "¡Exacto! Sin un ancla visual (sujeto), el ojo divaga y se pierde en la imagen.",
    feedbackWrong: "Negativo. Lo que más confunde es no saber a dónde mirar."
  },
  {
    id: 4,
    type: 'compare',
    instruction: "Toca la foto que tiene un Sujeto Principal claro.",
    options: [
      { 
        id: 'a', 
        src: "https://images.unsplash.com/photo-1572064761083-7905333d7729?q=80&w=600&auto=format&fit=crop", 
        correct: false,
        feedback: "Aquí hay demasiadas cosas pasando. No hay un punto focal." 
      },
      { 
        id: 'b', 
        src: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=600&auto=format&fit=crop", 
        correct: true,
        feedback: "¡Correcto! Aunque el entorno es el mismo, aquí sabemos exactamente quién es el protagonista." 
      }
    ]
  },
  {
    id: 5,
    type: 'image_quiz',
    instruction: "Analiza esta fotografía:",
    image: "https://images.unsplash.com/photo-1610649758203-eaaa7d636ade?q=80&w=1170&auto=format&fit=crop",
    question: "¿Cuál es el Sujeto Principal de esta imagen?",
    options: [
      { id: 'a', text: "Los edificios del fondo" },
      { id: 'b', text: "El paso de cebra" },
      { id: 'c', text: "El taxi amarillo", correct: true }
    ],
    feedbackCorrect: "¡Así es! El fotógrafo usó el color y el contraste para decirnos: '¡Mira aquí!'.",
    feedbackWrong: "Busca lo que más resalta por color y contraste."
  },
  {
    id: 6,
    type: 'summary',
    title: "¡Lección Completada!",
    points: [
      "Toda foto necesita un 'Protagonista'.",
      "A veces menos es más: simplifica tu encuadre.",
      "Si el sujeto no está claro, acércate más."
    ],
    buttonText: "Finalizar Lección"
  }
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [feedback, setFeedback] = useState('');

  const currentStep = lessonData[stepIndex];
  const progress = ((stepIndex + 1) / lessonData.length) * 100;

  // --- LÓGICA DE NAVEGACIÓN ---
  const handleNext = () => {
    if (stepIndex < lessonData.length - 1) {
      setStepIndex(prev => prev + 1);
      setStatus('idle');
      setSelectedOption(null);
      setFeedback('');
    } else {
      alert("¡Lección terminada! Volviendo al mapa...");
      setStepIndex(0); // Reiniciar demo
    }
  };

  const handleValidation = (option) => {
    if (status !== 'idle') return; // Evitar doble click

    setSelectedOption(option.id);
    if (option.correct) {
      setStatus('correct');
      setFeedback(currentStep.feedbackCorrect || option.feedback);
    } else {
      setStatus('wrong');
      setFeedback(currentStep.feedbackWrong || option.feedback);
    }
  };

  // --- RENDERIZADORES (VISTAS) ---

  // 1. Teoría
  const RenderTheory = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="relative w-full h-64 shrink-0 rounded-2xl overflow-hidden mb-6 shadow-2xl border border-white/10 bg-black">
        <img src={currentStep.image} alt="Concepto" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <h2 className="text-2xl font-black text-white mb-4 leading-tight">{currentStep.title}</h2>
        <div className="text-gray-300 text-lg leading-relaxed space-y-4">
          {currentStep.content}
        </div>
        
        {/* Caja de TIP */}
        {currentStep.tip && (
          <div className="mt-6 bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl">
            <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold uppercase text-xs tracking-wider">
              <Lightbulb size={16} /> Tu Misión
            </div>
            <p className="text-yellow-100 italic text-base">"{currentStep.tip}"</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <button 
          onClick={handleNext} 
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#0f0c29] font-bold py-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          {currentStep.buttonText} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  // 2. Quiz de Texto
  const RenderQuiz = () => (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-500">
      <div className="mb-8">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full">Pregunta Rápida</span>
        <h2 className="text-xl font-bold text-white mt-4 leading-relaxed">{currentStep.question}</h2>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        {currentStep.options.map((opt) => {
          let borderClass = 'border-white/10 hover:border-white/30 bg-white/5';
          let textClass = 'text-gray-200';
          
          if (status !== 'idle' && opt.correct) {
            borderClass = 'border-green-500 bg-green-500/20';
            textClass = 'text-green-100';
          } else if (status === 'wrong' && selectedOption === opt.id) {
            borderClass = 'border-red-500 bg-red-500/20';
            textClass = 'text-red-100';
          } else if (status !== 'idle' && !opt.correct) {
            borderClass = 'border-transparent opacity-40';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleValidation(opt)}
              disabled={status !== 'idle'}
              className={`w-full p-5 rounded-2xl text-left font-medium border-2 transition-all duration-200 ${borderClass} ${textClass}`}
            >
              <div className="flex justify-between items-center">
                <span>{opt.text}</span>
                {status !== 'idle' && opt.correct && <Check className="text-green-400" size={20} />}
                {status === 'wrong' && selectedOption === opt.id && <X className="text-red-400" size={20} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // 3. Comparación de Imágenes
  const RenderCompare = () => (
    <div className="flex flex-col h-full animate-in fade-in">
      <h2 className="text-lg font-bold text-white mb-6 text-center">{currentStep.instruction}</h2>
      <div className="grid grid-cols-1 gap-5 flex-1 overflow-y-auto pb-20 custom-scrollbar">
        {currentStep.options.map((opt) => (
          <div 
            key={opt.id} 
            onClick={() => handleValidation(opt)}
            className={`relative rounded-2xl overflow-hidden border-4 h-48 cursor-pointer transition-all transform hover:scale-[1.02]
              ${status === 'idle' ? 'border-transparent hover:border-purple-400' : ''}
              ${status !== 'idle' && opt.correct ? 'border-green-500 ring-4 ring-green-500/30 z-10' : ''}
              ${status === 'wrong' && selectedOption === opt.id ? 'border-red-500 opacity-80' : ''}
              ${status !== 'idle' && !opt.correct && selectedOption !== opt.id ? 'opacity-30 grayscale' : ''}
            `}
          >
            <img src={opt.src} alt="Opción" className="w-full h-full object-cover" />
            
            {status !== 'idle' && (opt.correct || selectedOption === opt.id) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className={`p-3 rounded-full ${opt.correct ? 'bg-green-500' : 'bg-red-500'} text-white shadow-lg`}>
                  {opt.correct ? <Check size={32} strokeWidth={4} /> : <X size={32} strokeWidth={4} />}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // 4. Quiz Visual (Imagen Grande)
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

  // 5. Resumen Final
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
        {currentStep.points.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="bg-green-500/20 p-1 rounded-full mt-0.5">
              <Check size={16} className="text-green-400" strokeWidth={3} />
            </div>
            <span className="text-gray-200 font-medium">{point}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleNext} 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} />
        {currentStep.buttonText}
      </button>
    </div>
  );

  return (
    <div className="flex justify-center bg-black min-h-screen font-sans">
      <div className="w-full max-w-md bg-[#0f0c29] shadow-2xl min-h-screen relative flex flex-col border-x border-white/5">
        
        {/* Header: Barra de Progreso y Salir */}
        <div className="px-6 pt-6 pb-2 flex items-center gap-4 bg-[#0f0c29] shrink-0">
          <button onClick={() => alert("Salir")} className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/10">
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
          {currentStep.type === 'theory' && <RenderTheory />}
          {currentStep.type === 'quiz' && <RenderQuiz />}
          {currentStep.type === 'compare' && <RenderCompare />}
          {currentStep.type === 'image_quiz' && <RenderImageQuiz />}
          {currentStep.type === 'summary' && <RenderSummary />}
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
    </div>
  );
}