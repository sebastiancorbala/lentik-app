export const lessonOneData = [
  {
    id: 1,
    type: 'theory',
    title: "Todo necesita un protagonista",
    content: "Imagina una película donde no sabes quién es el personaje principal. Sería confusa y aburrida, ¿verdad?\n\nLo mismo ocurre con la fotografía. Cuando miramos una imagen, nuestros ojos buscan instintivamente un punto donde concentrarnos.",
    image: "https://github.com/user-attachments/assets/2d1faa4c-9f2b-487d-8f27-aefc760e0a5a",
    buttonText: "Siguiente"
  },
  {
    id: 2,
    type: 'theory',
    title: "El error del principiante",
    content: "El error número 1 es intentar fotografiar 'todo a la vez': el paisaje, tu amigo, el perro y el coche... todo en el mismo encuadre. Si todo es importante, nada lo es.\n\nPor eso debes tener claro qué buscar fotografiar. Saber por qué haces la foto y qué quieres capturar.",
    // image: "https://images.unsplash.com/photo-1546452230-0a2a4b087095?q=80&w=800&auto=format&fit=crop",
    tip: 'Antes de disparar, pregúntate: "¿De qué trata esta foto?". Elige UN solo elemento (tu Sujeto) y dale prioridad.',
    buttonText: "Entendido"
  },
  {
    id: 3,
    type: 'quiz',
    question: "¿Qué hace que una foto sea confusa para el espectador?",
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
    instruction: "Práctica 1: Toca la foto que tiene un Sujeto Principal claro.",
    options: [
      {
        id: 'a',
        src: "https://images.unsplash.com/photo-1572064761083-7905333d7729?q=80&w=600&auto=format&fit=crop",
        correct: false,
        feedback: "Aquí hay demasiadas cosas pasando. No hay un punto focal."
      },
      {
        id: 'b',
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
        correct: true,
        feedback: "¡Correcto! Aunque el entorno es el mismo, aquí sabemos exactamente quién es el protagonista."
      }
    ]
  },
  {
    id: 5,
    type: 'compare',
    instruction: "Práctica 2: ¿Cuál de estas fotos separa mejor al sujeto del fondo?",
    options: [
      {
        id: 'a',
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
        correct: true,
        feedback: "¡Excelente! El fondo simple y desenfocado hace que la chica destaque inmediatamente."
      },
      {
        id: 'b',
        src: "https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=600&auto=format&fit=crop",
        correct: false,
        feedback: "Aquí el sujeto se pierde entre las luces, los carteles y la gente del fondo."
      }
    ]
  },
  {
    id: 6,
    type: 'compare',
    instruction: "Práctica 3: Toca la imagen donde el sujeto resalta claramente por contraste.",
    options: [
      {
        id: 'a',
        src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600&auto=format&fit=crop",
        correct: true,
        feedback: "¡Correcto! El contraste de colores separa al sujeto del entorno."
      },
      {
        id: 'b',
        src: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=600&auto=format&fit=crop",
        correct: false,
        feedback: "Aquí los colores son muy similares y el sujeto no destaca tanto."
      }
    ]
  },
  {
    id: 7,
    type: 'image_quiz',
    instruction: "Analiza esta fotografía:",
    image: "https://images.unsplash.com/photo-1610649758203-eaaa7d636ade?q=80&w=1170&auto=format&fit=crop",
    question: "¿Cuál es el Sujeto Principal de esta imagen?",
    options: [
      { id: 'a', text: "Los edificios del fondo" },
      { id: 'b', text: "El paso de cebra" },
      { id: 'c', text: "El taxi amarillo", correct: true }
    ],
    feedbackCorrect: "¡Así es! El fotógrafo usó el color y el contraste para decirnos: '¡Mira aquí!'. El resto es solo escenario.",
    feedbackWrong: "Busca lo que más resalta por color y contraste."
  },
  {
    id: 8,
    type: 'summary',
    title: "¡Lección Completada!",
    points: [
      " Toda foto necesita un 'Protagonista'.",
      " A veces menos es más: simplifica tu encuadre.",
      " Si el sujeto no está claro, acércate más."
    ],
    buttonText: "Finalizar Lección"
  }
];

export default lessonOneData;