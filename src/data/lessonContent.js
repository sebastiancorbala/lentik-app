export const lessonOneData = [
  {
    id: 1,
    type: 'theory',
    title: "Todo necesita un protagonista",
    image: "https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&w=800&q=80", 
    content: "Imagina una película donde no sabes quién es el personaje principal. Sería confusa y aburrida, ¿verdad?\n\nLo mismo ocurre con la fotografía. Cuando miramos una imagen, nuestros ojos buscan instintivamente un punto donde concentrarnos.",
    buttonText: "Siguiente"
  },
  {
    id: 2,
    type: 'theory',
    title: "El error del principiante",
    image: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=800&q=80",
    content: "El error número 1 es intentar fotografiar 'todo a la vez'. Si todo es importante, nada lo es.\n\nTip Pro: Antes de disparar, pregúntate: '¿De qué trata esta foto?'. Elige UN solo elemento.",
    buttonText: "Entendido"
  },
  {
    id: 3,
    type: 'quiz',
    question: "¿Qué hace que una foto sea confusa para el espectador?",
    options: [
      { id: 'a', text: "Que esté en blanco y negro." },
      { id: 'b', text: "Que no tenga un sujeto principal claro.", correct: true },
      { id: 'c', text: "Que tenga muchos colores." }
    ],
    feedbackCorrect: "¡Exacto! Sin un sujeto, el ojo se pierde.",
    feedbackWrong: "No. Lo que confunde es no saber a dónde mirar."
  },
  {
    id: 4,
    type: 'compare',
    instruction: "Toca la foto que tiene un Sujeto Principal claro.",
    options: [
      { 
        id: 'a', 
        src: "https://images.unsplash.com/photo-1542665180-2d93ee896060?auto=format&fit=crop&w=500&q=60", 
        correct: false,
        feedback: "Aquí hay demasiadas cosas pasando." 
      },
      { 
        id: 'b', 
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=60", 
        correct: true,
        feedback: "¡Correcto! El músico destaca sobre el fondo." 
      }
    ]
  },
  {
    id: 5,
    type: 'summary',
    title: "¡Lección Completada!",
    points: [
      "Toda foto necesita un 'Protagonista'.",
      "Simplifica tu encuadre.",
      "Acércate más a tu sujeto."
    ]
  }
];