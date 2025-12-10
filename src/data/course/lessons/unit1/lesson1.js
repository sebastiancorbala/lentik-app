export const lessonOneData = [
  {
    id: 1,
    type: 'theory',
    title: "Todo necesita un protagonista",
    image: "https://github.com/user-attachments/assets/2d1faa4c-9f2b-487d-8f27-aefc760e0a5a ",
    content:
      "Imagina una película donde no sabes quién es el personaje principal. Sería confusa y aburrida, ¿verdad?\n\nLo mismo ocurre con la fotografía. Cuando miramos una imagen, nuestros ojos buscan instintivamente un punto donde concentrarnos.",
    buttonText: "Siguiente"
  },
  {
    id: 2,
    type: 'theory',
    title: "El error del principiante",
    image: "https://images.unsplash.com/photo-1546452230-0a2a4b087095?q=80&w=1200&auto=format&fit=crop",
    content:
      "El error número 1 es intentar fotografiar 'todo a la vez': el paisaje, tu amigo, el perro y el coche... todo en el mismo encuadre. Si todo es importante, nada lo es.\n\nPor eso debes tener claro qué buscar fotografiar. Saber por qué haces la foto y qué quieres capturar. (También puede haber más de un protagonista, pero por ahora practica con uno solo)",
    tip: 'Antes de disparar, pregúntate: "¿De qué trata esta foto?". Elige UN solo elemento (tu Sujeto) y dale prioridad.',
    buttonText: "Entendido"
  },
  {
    id: 3,
    type: 'quiz',
    title: "Comprobación: sujeto principal",
    question: "¿Qué hace que una foto sea confusa para el espectador?",
    options: [
      { id: 'a', text: "Que esté en blanco y negro." },
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
        src: "https://images.unsplash.com/photo-1572064761083-7905333d7729?q=80&w=900&auto=format&fit=crop",
        correct: false,
        feedback: "Aquí hay demasiadas cosas pasando y nada destaca."
      },
      {
        id: 'b',
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop",
        correct: true,
        feedback: "¡Correcto! Aunque el entorno es el mismo, aquí sabemos quién es el protagonista porque destaca sobre el fondo."
      }
    ]
  },
  {
    id: 5,
    type: 'image_quiz',
    instruction: "Analiza esta fotografía.",
    image:
      "https://images.unsplash.com/photo-1610649758203-eaaa7d636ade?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    question: "¿Cuál es el Sujeto Principal de esta imagen?",
    options: [
      { id: 'a', text: "Los edificios del fondo." },
      { id: 'b', text: "El paso de cebra." },
      { id: 'c', text: "El taxi amarillo.", correct: true }
    ],
    feedbackCorrect: "¡Así es! El fotógrafo usó el color y el contraste para decirnos: '¡Mira aquí!'. El resto es solo escenario.",
    feedbackWrong: "Piensa qué elemento resalta por contraste y guía tu mirada."
  },
  {
    id: 6,
    type: 'summary',
    title: "¡Lección Completada!",
    points: [
      "✅ Toda foto necesita un 'Protagonista'.",
      "✅ A veces menos es más: simplifica tu encuadre.",
      "✅ Si el sujeto no está claro, acércate más."
    ]
  }
];

export default lessonOneData;
