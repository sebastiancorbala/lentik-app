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
import { courseSections } from '../data/course/sections';

// ==========================================
// 1. DATOS DEL PLAN DE ESTUDIOS
// ==========================================

// ==========================================
// 2. COMPONENTES PEQUEÑOS
// ==========================================

const IconMap = ({ name, className }) => {
  switch (name) {
    case 'check': return <Check className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'grid': return <Grid className={className} />;
    case 'image': return <ImageIcon className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'sun': return <Sun className={className} />;
    default: return <Star className={className} />;
  }
};

const LessonItem = ({ lesson, index, isCurrent, onStart, isAvailable }) => {
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
            onStart(lesson);
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
  const lessons = unit?.lessons ?? [];

  const currentLessonIndex = lessons.findIndex(l => !l.completed);
  const effectiveCurrentIndex = currentLessonIndex === -1 && lessons.length > 0 && unit.status !== 'completed'
    ? 0
    : currentLessonIndex;

  const isAvailable = unit.status === 'current' || unit.status === 'completed';

  const headerColor = colorTheme === 'blue'
    ? 'bg-gradient-to-r from-[#6b8bff] via-[#5f7dff] to-[#5fc7ff]'
    : 'bg-gradient-to-r from-[#4ad3a3] via-[#43c498] to-[#4fdfb2]';

  return (
    <div className="absolute z-40 left-1/2 transform -translate-x-1/2 mt-24 w-80 max-w-[90vw] bg-[#120f33] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10 animate-in zoom-in-95 duration-200 origin-top">
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
          {lessons.length} Lecciones
        </p>
      </div>

      {/* Lista */}
      <div className="p-3 max-h-64 overflow-y-auto custom-scrollbar">
        {lessons.length > 0 ? (
          lessons.map((lesson, idx) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={idx}
              isCurrent={idx === effectiveCurrentIndex}
              isAvailable={isAvailable} 
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
const UnitNode = ({ unit, isSelected, onSelect, onStartLesson, colorTheme }) => {
  const baseGradient = "bg-gradient-to-br from-[#ffb347] via-[#ffc857] to-[#ff9f1c]";

  let bgColor = baseGradient;
  let ringClass = "";
  let IconComponent = () => <Camera className="w-8 h-8 text-[#2b1a00]" strokeWidth={3} />;

  if (unit.status === 'completed') {
    bgColor = "bg-gradient-to-br from-[#ffda6b] via-[#ffc233] to-[#ffb300]";
    IconComponent = () => <Check className="w-8 h-8 text-[#2b1a00]" strokeWidth={4} />;
  } else {
    bgColor = `${baseGradient} opacity-90`;
  }

  // FIX: Ajuste del z-index dinámico
  const zIndexClass = isSelected ? "z-50" : "z-10";

  return (
    <div className={`relative flex flex-col items-center justify-center py-4 w-full ${zIndexClass}`}>
      {isSelected && (
        <>
          <div className="fixed inset-0 z-20 cursor-default" onClick={() => onSelect(null)}></div>
          <UnitDetailCard
            unit={unit}
            colorTheme={colorTheme}
            onClose={() => onSelect(null)}
            onStartLesson={(lesson) => onStartLesson?.(unit, lesson)}
          />
        </>
      )}

      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <button
          onClick={onSelect}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center
            transition-all duration-300 ease-spring cursor-pointer
            ${bgColor} ${ringClass}
            shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]
            active:translate-y-1 active:shadow-none z-30
          `}
        >
           <IconComponent />
        </button>

        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-bold uppercase tracking-wide text-xs">
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
    <div className={`${bgClass} text-white py-5 px-5 text-center shadow-md mb-12 w-full sticky top-0 z-20 rounded-2xl border border-white/10`}>
      <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-white/80 mb-1">
        Sección {section.id}
      </p>
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide drop-shadow-sm">
        {section.title}
      </h2>
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
    <div className="flex flex-col items-center px-4 pb-4 w-full">
      {courseSections.map((section) => (
        <div key={section.id} className="flex flex-col items-center w-full">

          {/* Header de Sección */}
          <SectionHeader section={section} />

          {/* Unidades */}
          <div className="relative w-full flex flex-col items-center gap-10 px-4">

            {/* Conector */}
            {section.units.length > 0 && (
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent z-0"></div>
            )}

            {section.units.map((unit) => (
              <UnitNode
                key={unit.id}
                unit={unit}
                isSelected={selectedUnitId === unit.id}
                onSelect={() => handleUnitSelect(unit.id)}
                onStartLesson={onStartLesson}
                colorTheme={section.themeColor}
              />
            ))}
          </div>

          <div className="h-10"></div>
        </div>
      ))}
    </div>
  );
}