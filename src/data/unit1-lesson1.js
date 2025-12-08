export const lessonData = [
  {
    id: 1,
    type: 'theory',
    title: 'Todo necesita un protagonista',
    content: 'Imagina una película sin personaje principal... En foto, el ojo busca dónde concentrarse.',
    image:
      'https://images.unsplash.com/photo-1467720202800-0c02a639c8a1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    type: 'theory',
    title: 'El error del principiante',
    content: "Intentar fotografiar todo a la vez. Si todo es importante, nada lo es",
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    type: 'quiz',
    title: '¿Qué hace confusa a una foto?',
    options: [
      { id: 'a', text: 'Que esté en blanco y negro' },
      { id: 'b', text: 'Que no tenga un sujeto principal claro', correct: true },
      { id: 'c', text: 'Que tenga muchos colores' },
    ],
    feedbackCorrect: '¡Exacto! Sin un protagonista claro, el ojo no sabe dónde mirar.',
    feedbackWrong: 'Busca un sujeto principal. Sin él, la foto pierde fuerza.',
  },
  {
    id: 4,
    type: 'compare',
    title: 'Toca la foto con un Sujeto Claro',
    options: [
      {
        id: 'a',
        label: 'Calle abarrotada sin foco',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60',
        correct: false,
        feedback: 'Aquí hay demasiadas distracciones.',
      },
      {
        id: 'b',
        label: 'Músico callejero aislado',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=60',
        correct: true,
        feedback: '¡Correcto! El sujeto es evidente.',
      },
    ],
  },
  {
    id: 5,
    type: 'image_quiz',
    title: '¿Cuál es el sujeto?',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=900&q=80',
    options: [
      { id: 'a', text: 'El taxi amarillo', correct: true },
      { id: 'b', text: 'La calle gris' },
      { id: 'c', text: 'Los edificios del fondo' },
    ],
    feedbackCorrect: 'Eso es. El color y la posición resaltan el taxi.',
    feedbackWrong: 'El elemento que contrasta más es el taxi amarillo.',
  },
  {
    id: 6,
    type: 'summary',
    title: '¡Lección Completada!',
    points: ['Toda foto necesita protagonista', 'Simplifica el encuadre', 'Acércate más'],
  },
];
