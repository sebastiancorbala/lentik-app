import React, { useState } from 'react';
import { 
  Check, 
  Camera, 
  Grid, 
  Lock, 
  Star, 
  Image as ImageIcon, 
  Sun, 
  X, 
  ChevronRight 
} from 'lucide-react';

// ==========================================
// 1. DATOS (La estructura del Árbol)
// ==========================================
const courseData = [
  {
    id: 1,
    title: "SECCIÓN 1: EL OJO DEL FOTÓGRAFO",
    description: "Aprende a mirar antes de disparar",
    themeColor: "green", // Tema VERDE
    units: [
      {
        id: 101,
        order: 1,
        title: "Enfoque y Sujeto",
        status: "completed",
        icon: "check",
        lessons: [
          { id: "L1-1", title: "¿Qué es el sujeto principal?", type: "quiz", completed: true },
          { id: "L1-2", title: "El Enfoque (Nítido vs. Borroso)", type: "reading", completed: true },
          { id: "L1-3", title: "Técnica de Bloqueo de enfoque", type: "practice", completed: true }
        ]
      },
      {
        id: 102,
        order: 2,
        title: "Composición Básica",
        status: "current", // Unidad ACTUAL
        icon: "image",
        lessons: [
          { id: "L2-1", title: "Regla de los Tercios", type: "reading", completed: true },
          { id: "L2-2", title: "Líneas Guía", type: "practice", completed: false }, 
          { id: "L2-3", title: "Espacio Negativo", type: "quiz", completed: false }
        ]
      },
      {
        id: 103,
        order: 3,
        title: "Perspectiva y Ángulos",
        status: "locked",
        icon: "grid",
        lessons: [
          { id: "L3-1", title: "Ángulo Picado y Contrapicado", type: "reading", completed: false },
          { id: "L3-2", title: "Perspectiva Forzada", type: "practice", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "SECCIÓN 2: DOMINANDO LA LUZ",
    description: "Entiende cómo la luz afecta tu imagen",
    themeColor: "blue", // Tema AZUL
    units: [
      {
        id: 201,
        order: 4,
        title: "Tipos de Luz",
        status: "locked",
        icon: "sun",
        lessons: [
          { id: "L4-1", title: "Luz Dura vs Luz Suave", type: "reading", completed: false },
          { id: "L4-2", title: "Temperatura de Color", type: "quiz", completed: false }
        ]
      },
      {
        id: 202,
        order: 5,
        title: "La Hora Dorada",
        status: "locked",
        icon: "camera",
        lessons: []
      }
    ]
  }
];

// ==========================================
// 2. COMPONENTES PEQUEÑOS
// ==========================================

const IconMap = ({ name, className }) => {
  switch (name) {
    case 'check': return <Check className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'grid': return <Grid className={className} />;
    case 'image': return <ImageIcon className={className} />;
    case 'sun': return <Sun className={className} />;
    default: return <Star className={className} />;
  }
};

const LessonItem = ({ lesson, index, isCurrent, onStart }) => {
  let icon;
  let colorClass = "bg-gray-100";
  let textClass = "text-gray-400";
  
  if (lesson.completed) {
    icon = <Check size={14} className="text-white" />;
    colorClass = "bg-green-500";
    textClass = "text-gray-700";
  } else if (isCurrent) {
    icon = <Star size={14} className="text-white" />;
    colorClass = "bg-yellow-400";
    textClass = "text-gray-800 font-semibold";
  } else {
    icon = <span className="text-gray-500 text-[10px] font-bold">{index + 1}</span>;
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-50 last:border-0">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${colorClass} shadow-sm`}>
        {icon}
      </div>
      <div className="flex-grow">
        <p className={`text-sm ${textClass}`}>
          {lesson.title}
        </p>
      </div>
      {isCurrent && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Evita cerrar el popover al hacer click
            onStart(); // Navega a la lección
          }}
          className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-md hover:bg-green-600 transform transition active:scale-95 flex items-center gap-1"
        >
          EMPEZAR <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
};

// ==========================================
// 3. TARJETA FLOTANTE (POPOVER)
// ==========================================
const UnitDetailCard = ({ unit, colorTheme, onClose, onStartLesson }) => {
  const currentLessonIndex = unit.lessons.findIndex(l => !l.completed);
  const effectiveCurrentIndex = currentLessonIndex === -1 && unit.lessons.length > 0 && unit.status !== 'completed' 
    ? 0 
    : currentLessonIndex;

  const headerColor = colorTheme === 'blue' ? 'bg-blue-500' : 'bg-green-500';

  return (
    <div className="absolute z-40 left-1/2 transform -translate-x-1/2 mt-24 w-72 md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 origin-top">
      
      {/* Triángulo indicador */}
      <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 ${headerColor}`}></div>
      
      {/* Encabezado */}
      <div className={`${headerColor} p-4 rounded-t-2xl relative text-center shadow-sm`}>
         <button 
           onClick={(e) => { e.stopPropagation(); onClose(); }} 
           className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors p-1 bg-black/10 rounded-full hover:bg-black/20"
         >
           <X size={14} />
         </button>
        <h3 className="text-white font-bold text-lg leading-tight drop-shadow-sm">{unit.title}</h3>
        <p className="text-white/90 text-[10px] font-bold mt-1 uppercase tracking-widest bg-black/10 inline-block px-2 py-0.5 rounded-full">
          {unit.lessons.length} Lecciones
        </p>
      </div>
      
      {/* Lista de Lecciones */}
      <div className="p-2 max-h-64 overflow-y-auto custom-scrollbar">
        {unit.lessons.length > 0 ? (
          unit.lessons.map((lesson, idx) => (
            <LessonItem 
              key={lesson.id} 
              lesson={lesson} 
              index={idx}
              isCurrent={idx === effectiveCurrentIndex}
              onStart={onStartLesson}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 flex flex-col items-center">
            <Lock size={24} className="mb-2 opacity-50" />
            <p className="text-sm">Contenido próximamente</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. NODO DE UNIDAD (CÍRCULO)
// ==========================================
const UnitNode = ({ unit, colorTheme, isSelected, onSelect, onStartLesson }) => {
  const themeColors = {
    green: { bg: "bg-green-500", ring: "ring-green-300", active: "bg-green-500" },
    blue: { bg: "bg-blue-500", ring: "ring-blue-300", active: "bg-blue-500" }
  };
  
  const currentTheme = themeColors[colorTheme] || themeColors.green;
  
  let bgColor = "bg-gray-200";
  let ringClass = "";
  let IconComponent = Lock;
  let scaleEffect = "";
  let iconClass = "text-gray-400";

  if (unit.status === 'completed') {
    bgColor = currentTheme.bg; 
    IconComponent = Check;
    iconClass = "text-white";
  } else if (unit.status === 'current') {
    bgColor = currentTheme.active;
    ringClass = `ring-4 ${currentTheme.ring} ring-offset-2`; 
    IconComponent = () => <IconMap name={unit.icon} className="w-8 h-8 text-white" />;
    iconClass = "text-white";
    scaleEffect = "scale-110";
  } else {
    IconComponent = () => <IconMap name={unit.icon} className="w-6 h-6 text-gray-400" />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-4 z-10 w-full">
      {/* Popover */}
      {isSelected && (
        <>
          <div className="fixed inset-0 z-20 cursor-default" onClick={() => onSelect(null)}></div>
          <UnitDetailCard 
            unit={unit} 
            colorTheme={colorTheme} 
            onClose={() => onSelect(null)} 
            onStartLesson={onStartLesson}
          />
        </>
      )}

      {/* Círculo Principal */}
      <button 
        onClick={onSelect}
        className={`
          w-20 h-20 rounded-full flex items-center justify-center 
          transition-all duration-300 ease-spring cursor-pointer
          ${bgColor} ${ringClass} ${scaleEffect}
          shadow-[0_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.1)] 
          active:translate-y-1 active:shadow-none z-30
        `}
      >
        {unit.status === 'completed' ? (
           <Check size={32} strokeWidth={4} className="text-white" />
        ) : (
           <IconComponent />
        )}
      </button>

      {/* Etiqueta */}
      <div className="mt-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 z-10">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
          Unidad {unit.order}
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 5. ENCABEZADO DE SECCIÓN
// ==========================================
const SectionHeader = ({ section }) => {
  const bgClass = section.themeColor === 'blue' ? 'bg-blue-500' : 'bg-green-500';
  
  return (
    <div className={`${bgClass} text-white py-8 px-6 text-center shadow-md mb-8 w-full sticky top-[60px] z-20`}>
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-1 drop-shadow-sm">
        {section.title}
      </h2>
      <p className="text-white/80 font-medium text-sm max-w-xs mx-auto">
        {section.description}
      </p>
    </div>
  );
};

// ==========================================
// 6. COMPONENTE PRINCIPAL (EXPORT)
// ==========================================
export default function UnitMap({ onStartLesson, onExit }) {
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const handleUnitSelect = (unitId) => {
    setSelectedUnitId(prev => prev === unitId ? null : unitId);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      
      {/* Barra Superior del Mapa */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm h-[60px]">
        <button
          type="button"
          onClick={() => onExit?.()}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Volver al inicio"
        >
          <X size={24} className="cursor-pointer" />
        </button>
        <div className="w-full mx-4 h-3 bg-gray-200 rounded-full overflow-hidden relative">
           <div className="absolute top-0 left-0 h-full bg-yellow-400 w-[15%] rounded-full opacity-30"></div>
           <div className="h-full bg-green-500 w-[35%] rounded-full shadow-inner"></div>
        </div>
        <div className="flex items-center text-orange-500 font-bold gap-1 animate-pulse">
           <Sun fill="currentColor" size={20} />
           <span>12</span>
        </div>
      </header>

      {/* Contenido del Mapa */}
      <div className="flex flex-col items-center">
        {courseData.map((section, sIndex) => (
          <div key={section.id} className="flex flex-col items-center w-full">
            
            {/* Header de Sección */}
            <SectionHeader section={section} />

            {/* Unidades */}
            <div className="relative w-full flex flex-col items-center gap-6 px-4">
              
              {/* Conector Gris */}
              {section.units.length > 0 && (
                 <div className="absolute top-0 bottom-10 w-2.5 bg-gray-100 rounded-full z-0"></div>
              )}

              {section.units.map((unit) => (
                <UnitNode 
                  key={unit.id} 
                  unit={unit} 
                  colorTheme={section.themeColor}
                  isSelected={selectedUnitId === unit.id}
                  onSelect={() => handleUnitSelect(unit.id)}
                  onStartLesson={onStartLesson} // ¡Importante para conectar con App.jsx!
                />
              ))}
            </div>

            <div className="h-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}