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
// 1. DATOS DEL PLAN DE ESTUDIOS
// ==========================================
const courseData = [
  {
    id: 1,
    title: "SECCIÓN 1: EL OJO DEL FOTÓGRAFO",
    description: "Mejora tus fotos aprendiendo a mirar sin tocar botones complicados.",
    themeColor: "green",
    units: [
      {
        id: 101,
        order: 1,
        title: "Enfoque y Sujeto",
        status: "completed",
        icon: "check",
        lessons: [
          { id: "U1-L1", title: "¿Qué es el sujeto principal? (Identificar al protagonista)", type: "quiz", completed: true },
          { id: "U1-L2", title: "El Enfoque (Nítido vs. Borroso)", type: "reading", completed: true },
          { id: "U1-L3", title: "Bloqueo de enfoque (La técnica de enfocar y reencuadrar)", type: "practice", completed: true }
        ]
      },
      {
        id: 102,
        order: 2,
        title: "Encuadre Básico",
        status: "current",
        icon: "image",
        lessons: [
          { id: "U2-L1", title: "Horizontal vs. Vertical (Cuándo usar cuál)", type: "reading", completed: false },
          { id: "U2-L2", title: "Llenar el encuadre (Acercarse más)", type: "practice", completed: false },
          { id: "U2-L3", title: "El horizonte recto (Evitar fotos chuecas)", type: "quiz", completed: false }
        ]
      },
      {
        id: 103,
        order: 3,
        title: "La Regla de los Tercios",
        status: "locked",
        icon: "grid",
        lessons: [
          { id: "U3-L1", title: "¿Qué es la cuadrícula? (Grid)", type: "reading", completed: false },
          { id: "U3-L2", title: "Puntos de interés (Dónde poner al sujeto)", type: "practice", completed: false },
          { id: "U3-L3", title: "Rompiendo la regla (Centrado simétrico)", type: "quiz", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "SECCIÓN 2: DOMINANDO LA LUZ",
    description: "Entramos a lo técnico: introducimos las variables una por una.",
    themeColor: "blue",
    units: [
      {
        id: 201,
        order: 4,
        title: "Introducción a la Exposición",
        status: "locked",
        icon: "sun",
        lessons: [
          { id: "U4-L1", title: "Subexpuesta, Expuesta, Sobreexpuesta (Oscuro, Bien, Quemado)", type: "reading", completed: false },
          { id: "U4-L2", title: "¿Qué es el Triángulo? (La metáfora de los tres lados)", type: "quiz", completed: false }
        ]
      },
      {
        id: 202,
        order: 5,
        title: "Velocidad de Obturación",
        status: "locked",
        icon: "camera",
        lessons: [
          { id: "U5-L1", title: "Congelar el movimiento (Deportes, niños)", type: "reading", completed: false },
          { id: "U5-L2", title: "Capturar movimiento (Barridos, agua sedosa)", type: "practice", completed: false },
          { id: "U5-L3", title: "Trepidación (¿Por qué mi foto sale movida con poca luz?)", type: "quiz", completed: false }
        ]
      },
      {
        id: 203,
        order: 6,
        title: "La Apertura (Diafragma)",
        status: "locked",
        icon: "image",
        lessons: [
          { id: "U6-L1", title: "Números F (f/1.8 abierto vs. f/16 cerrado)", type: "reading", completed: false },
          { id: "U6-L2", title: "Profundidad de Campo (El fondo borroso o Bokeh)", type: "practice", completed: false },
          { id: "U6-L3", title: "Paisajes nítidos (Todo enfocado)", type: "quiz", completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "SECCIÓN 3: CALIDAD Y CONTROL",
    description: "Conceptos más abstractos para completar el modo manual.",
    themeColor: "green",
    units: [
      {
        id: 301,
        order: 7,
        title: "ISO (Sensibilidad)",
        status: "locked",
        icon: "sparkles",
        lessons: [
          { id: "U7-L1", title: "¿Qué hace el ISO? (Luz artificial)", type: "reading", completed: false },
          { id: "U7-L2", title: "El precio a pagar: Ruido digital (Grano)", type: "practice", completed: false },
          { id: "U7-L3", title: "ISO Nativo vs. ISO Alto (Cuándo subirlo)", type: "quiz", completed: false }
        ]
      },
      {
        id: 302,
        order: 8,
        title: "El Exposímetro",
        status: "locked",
        icon: "grid",
        lessons: [
          { id: "U8-L1", title: "Leyendo la barra de exposición (-2 ... 0 ... +2)", type: "reading", completed: false },
          { id: "U8-L2", title: "Modos de medición (Matricial vs. Puntual)", type: "quiz", completed: false }
        ]
      },
      {
        id: 303,
        order: 9,
        title: "Modo Manual (El Jefe Final)",
        status: "locked",
        icon: "camera",
        lessons: [
          { id: "U9-L1", title: "Equilibrando el triángulo (Si subo ISO, bajo tiempo...)", type: "practice", completed: false },
          { id: "U9-L2", title: "Prioridad Apertura vs. Prioridad Velocidad (Modos A/Av y S/Tv)", type: "quiz", completed: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "SECCIÓN 4: COMPOSICIÓN AVANZADA",
    description: "Volvemos a la creatividad con herramientas más sofisticadas.",
    themeColor: "blue",
    units: [
      {
        id: 401,
        order: 10,
        title: "Líneas y Geometría",
        status: "locked",
        icon: "grid",
        lessons: [
          { id: "U10-L1", title: "Líneas guía (Leading lines)", type: "reading", completed: false },
          { id: "U10-L2", title: "Patrones y repetición", type: "practice", completed: false },
          { id: "U10-L3", title: "Simetría perfecta", type: "quiz", completed: false }
        ]
      },
      {
        id: 402,
        order: 11,
        title: "Perspectiva y Lentes",
        status: "locked",
        icon: "image",
        lessons: [
          { id: "U11-L1", title: "Ángulos (Picado, Contrapicado, A ras de suelo)", type: "reading", completed: false },
          { id: "U11-L2", title: "Distancia focal (Angular vs. Teleobjetivo)", type: "practice", completed: false },
          { id: "U11-L3", title: "Compresión de planos (Hacer que el fondo se vea cerca)", type: "quiz", completed: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "SECCIÓN 5: LUZ Y COLOR",
    description: "El toque final para fotos profesionales.",
    themeColor: "green",
    units: [
      {
        id: 501,
        order: 12,
        title: "Temperatura y Color",
        status: "locked",
        icon: "sun",
        lessons: [
          { id: "U12-L1", title: "Cálido vs. Frío", type: "reading", completed: false },
          { id: "U12-L2", title: "Balance de Blancos (WB)", type: "practice", completed: false },
          { id: "U12-L3", title: "La Hora Dorada y la Hora Azul", type: "quiz", completed: false }
        ]
      },
      {
        id: 502,
        order: 13,
        title: "Dirección de la Luz",
        status: "locked",
        icon: "camera",
        lessons: [
          { id: "U13-L1", title: "Luz frontal vs. Luz lateral (Volumen)", type: "reading", completed: false },
          { id: "U13-L2", title: "Contraluz y Siluetas", type: "practice", completed: false },
          { id: "U13-L3", title: "Luz dura vs. Luz suave (Sombras)", type: "quiz", completed: false }
        ]
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
  const yellowGlow = "shadow-[0_0_26px_rgba(255,206,74,0.45)]";
  const baseGradient = "bg-gradient-to-br from-[#ffb347] via-[#ffc857] to-[#ff9f1c]";
  
  let bgColor = baseGradient;
  let ringClass = "";
  let IconComponent = () => <Camera className="w-8 h-8 text-[#2b1a00]" strokeWidth={3} />;
  let scaleEffect = "";

  if (unit.status === 'current') {
    ringClass = "ring-4 ring-yellow-200 ring-offset-4 ring-offset-[#0f102c]";
    scaleEffect = `scale-110 ${yellowGlow}`;
  } else if (unit.status === 'completed') {
    bgColor = "bg-gradient-to-br from-[#ffda6b] via-[#ffc233] to-[#ffb300]";
    IconComponent = () => <Check className="w-8 h-8 text-[#2b1a00]" strokeWidth={4} />;
  } else {
    // Locked
    bgColor = "bg-white/5";
    IconComponent = () => <Lock className="w-6 h-6 text-white/40" />;
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
            onStartLesson={onStartLesson}
          />
        </>
      )}

      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
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
    <div className="flex flex-col items-center px-4 pb-4 w-full">
      {courseData.map((section) => (
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