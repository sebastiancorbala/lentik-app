export const lessonData = [
  {
    id: 1,
    type: 'theory',
    title: 'Todo necesita un protagonista',
    content:
      "Imagina una película donde no sabes quién es el personaje principal. Sería confusa y aburrida, ¿verdad? Lo mismo ocurre con la fotografía. Cuando miramos una imagen, nuestros ojos buscan instintivamente un punto donde concentrarnos.",
    image:
      'https://images.unsplash.com/photo-1467720202800-0c02a639c8a1?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Siguiente',
  },
  {
    id: 2,
    type: 'theory_tip',
    title: 'El error del principiante',
    content: "El error número 1 es intentar fotografiar 'todo a la vez'. Si todo es importante, nada lo es.",
    tipTitle: 'Tip Pro',
    tipContent: "Tu Misión: Antes de disparar, pregúntate: '¿De qué trata esta foto?'. Elige UN solo elemento y dale prioridad.",
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Entendido',
  },
  {
    id: 3,
    type: 'quiz',
    question:
      'Según lo que acabas de leer, ¿qué hace que una foto sea confusa para el espectador?',
    options: [
      { id: 'a', text: 'Que esté tomada en blanco y negro.' },
      { id: 'b', text: 'Que no tenga un sujeto principal claro.', correct: true },
      { id: 'c', text: 'Que tenga muchos colores diferentes.' },
      { id: 'd', text: 'Que sea una foto borrosa.' },
    ],
    feedbackCorrect: '¡Exacto! Sin un ancla visual (sujeto), el ojo divaga y se pierde.',
    feedbackWrong: 'Negativo. Lo que más confunde es no saber a dónde mirar.',
  },
  {
    id: 4,
    type: 'compare',
    instruction: 'Toca la foto que tiene un Sujeto Principal claro.',
    options: [
      {
        id: 'a',
        label: 'Calle abarrotada y lejana',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        correct: false,
        feedback: 'Aquí hay demasiadas cosas pasando. No hay un punto focal.',
      },
      {
        id: 'b',
        label: 'Músico callejero aislado',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
        correct: true,
        feedback: '¡Correcto! Aquí sabemos exactamente quién es el protagonista.',
      },
    ],
  },
  {
    id: 5,
    type: 'image_quiz',
    instruction: 'Analiza esta fotografía.',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1400&q=80',
    question: '¿Cuál es el Sujeto Principal de esta imagen?',
    options: [
      { id: 'a', text: 'Los edificios' },
      { id: 'b', text: 'El paso de cebra' },
      { id: 'c', text: 'El taxi amarillo', correct: true },
    ],
    feedbackCorrect: "¡Así es! El fotógrafo usó el color y el contraste para decirnos: '¡Mira aquí!'.",
    feedbackWrong: '',
  },
  {
    id: 6,
    type: 'summary',
    title: '¡Lección Completada!',
    points: [
      "Toda foto necesita un 'Protagonista'.",
      'A veces menos es más: simplifica tu encuadre.',
      'Si el sujeto no está claro, acércate más.',
    ],
    buttonText: 'Finalizar',
  },
];
