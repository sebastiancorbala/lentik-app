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
  ChevronRight,
  BookOpen,
  User,
  Sparkles,
  Heart,
  Settings
} from 'lucide-react';

// ==========================================
// 1. DATOS
// ==========================================
const courseData = [
  {
    id: 1,
    title: "SECCIÓN 1: FUNDAMENTOS",
    description: "Domina la técnica base",
    themeColor: "green", 
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
        status: "current", 
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
        title: "Ángulos",
        status: "locked",
        icon: "grid",
        lessons: []
      }
    ]
  },
  {
    id: 2,
    title: "SECCIÓN 2: ILUMINACIÓN",
    description: "Pinta con la luz",
    themeColor: "blue",
    units: [
      {
        id: 201,
        order: 4,
        title: "Luz Natural",
        status: "locked",
        icon: "sun",
        lessons: []
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
  let colorClass = "bg-white/10 border border-white/5";
  let textClass = "text-white/60";

  if (lesson.completed) {
    icon = <Check size={14} className="text-white" />;
    colorClass = "bg-gradient-to-br from-[#4ad3a3] to-[#5be8c0] shadow-[0_0_20px_rgba(90,232,192,0.35)] border-0";
    textClass = "text-white";
  } else if (isCurrent) {
    icon = <Star size={14} className="text-white" />;
    colorClass = "bg-gradient-to-br from-[#ffaf45] to-[#ffd76a] shadow-[0_0_24px_rgba(255,215,106,0.35)] border-0";
    textClass = "text-white font-semibold";
  } else {
    icon = <span className="text-white/50 text-[10px] font-bold">{index + 1}</span>;
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group border-b border-white/5 last:border-0">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <p className={`text-sm leading-tight ${textClass}`}>
          {lesson.title}
        </p>
      </div>
      {isCurrent && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStart(); 
          }}
          className="px-4 py-1.5 bg-gradient-to-r from-[#ffaf45] to-[#ffd76a] text-[#24140f] text-xs font-black rounded-full shadow-[0_10px_24px_rgba(255,215,106,0.35)] hover:brightness-105 transform transition active:scale-95 flex items-center gap-1"
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

  const headerColor = colorTheme === 'blue'
    ? 'bg-gradient-to-r from-[#6b8bff] via-[#5f7dff] to-[#5fc7ff]'
    : 'bg-gradient-to-r from-[#4ad3a3] via-[#43c498] to-[#4fdfb2]';

  return (
    <div className="absolute z-40 left-1/2 transform -translate-x-1/2 mt-24 w-72 md:w-80 bg-[#120f33] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10 animate-in zoom-in-95 duration-200 origin-top">
      {/* Triángulo */}
      <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 ${headerColor}`}></div>

      {/* Encabezado */}
      <div className={`${headerColor} p-4 rounded-t-2xl relative text-center shadow-sm`}>
         <button
           onClick={(e) => { e.stopPropagation(); onClose(); }}
           className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors p-1 bg-black/10 rounded-full hover:bg-black/20"
         >
           <X size={14} />
         </button>
        <h3 className="text-white font-bold text-lg leading-tight drop-shadow-sm">{unit.title}</h3>
        <p className="text-white/90 text-[10px] font-bold mt-1 uppercase tracking-widest bg-black/15 inline-block px-2 py-0.5 rounded-full">
          {unit.lessons.length} Lecciones
        </p>
      </div>

      {/* Lista */}
      <div className="p-3 max-h-64 overflow-y-auto custom-scrollbar">
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
          <div className="text-center py-8 text-white/50 flex flex-col items-center">
            <Lock size={24} className="mb-2 opacity-50" />
            <p className="text-sm">Contenido próximamente</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. NODO DE UNIDAD
// ==========================================
const UnitNode = ({ unit, colorTheme, isSelected, onSelect, onStartLesson }) => {
  const themeColors = {
    green: {
      bg: "bg-gradient-to-br from-[#45d0a8] to-[#58e2ba]",
      ring: "ring-[#76ffd9]",
      active: "bg-gradient-to-br from-[#6af0c4] via-[#55e3b3] to-[#3cbf93]"
    },
    blue: {
      bg: "bg-gradient-to-br from-[#6b8bff] via-[#617df8] to-[#5fc7ff]",
      ring: "ring-[#8ce2ff]",
      active: "bg-gradient-to-br from-[#7da3ff] via-[#6e92ff] to-[#66d5ff]"
    }
  };
  
  const currentTheme = themeColors[colorTheme] || themeColors.green;
  
  let bgColor = "bg-white/5";
  let ringClass = "";
  let IconComponent = Lock;
  let scaleEffect = "";

  if (unit.status === 'completed') {
    bgColor = currentTheme.bg; 
    IconComponent = Check;
  } else if (unit.status === 'current') {
    bgColor = currentTheme.active;
    ringClass = `ring-4 ${currentTheme.ring} ring-offset-4 ring-offset-[#0f102c]`;
    IconComponent = () => <IconMap name={unit.icon} className="w-8 h-8 text-white" />;
    scaleEffect = "scale-110 shadow-[0_0_30px_rgba(122,214,255,0.4)]";
  } else {
    IconComponent = () => <IconMap name={unit.icon} className="w-6 h-6 text-white/60" />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-4 z-10 w-full">
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

      <button
        onClick={onSelect}
        className={`
          w-20 h-20 rounded-full flex items-center justify-center
          transition-all duration-300 ease-spring cursor-pointer
          ${bgColor} ${ringClass} ${scaleEffect}
          shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]
          active:translate-y-1 active:shadow-none z-30
        `}
      >
        {unit.status === 'completed' ? (
           <Check size={32} strokeWidth={4} className="text-white" />
        ) : (
           <IconComponent />
        )}
      </button>

      <div className="mt-3 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/10 z-10">
        <span className="text-xs font-bold text-white/70 uppercase tracking-wide">
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
  const bgClass = section.themeColor === 'blue'
    ? 'bg-gradient-to-r from-[#5d7dff] via-[#546df6] to-[#5ab8ff]'
    : 'bg-gradient-to-r from-[#45d0a8] via-[#39c39a] to-[#4ae8c0]';

  return (
    <div className={`${bgClass} text-white py-6 px-6 text-center shadow-md mb-8 w-full sticky top-[72px] z-20 rounded-2xl border border-white/10`}>
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.28em] mb-1 drop-shadow-sm">
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
export default function UnitMap({ onStartLesson }) {
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const handleUnitSelect = (unitId) => {
    setSelectedUnitId(prev => prev === unitId ? null : unitId);
  };

  return (
    <div className="flex flex-col items-center px-4 py-4 w-full">
      {courseData.map((section) => (
        <div key={section.id} className="flex flex-col items-center w-full">

          {/* Header de Sección */}
          <SectionHeader section={section} />

          {/* Unidades */}
          <div className="relative w-full flex flex-col items-center gap-8 px-4">

            {/* Conector */}
            {section.units.length > 0 && (
                <div className="absolute top-2 bottom-10 w-[14px] rounded-full bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0"></div>
            )}

            {section.units.map((unit) => (
              <UnitNode
                key={unit.id}
                unit={unit}
                colorTheme={section.themeColor}
                isSelected={selectedUnitId === unit.id}
                onSelect={() => handleUnitSelect(unit.id)}
                onStartLesson={onStartLesson}
              />
            ))}
          </div>

          <div className="h-10"></div>
        </div>
      ))}
    </div>
  );
}