// Course sections with units and lessons/tests grouped for easier maintenance
export const courseSections = [
  {
    id: 1,
    title: "El ojo del fotógrafo",
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
    title: "Dominando la luz",
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
    title: "Calidad y control",
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
    title: "Composición avanzada",
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
    title: "Luz y color",
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

export default courseSections;
