export const lessonThreeData = [
  {
    id: 1,
    type: 'theory',
    title: 'El fondo también habla',
    content: "¡Miau! Me veo guapo, ¿verdad? Pero espera... ¿qué es eso verde que me sale de la cabeza?\n\nA veces nos obsesionamos tanto con el sujeto que olvidamos mirar qué hay detrás. Un mal fondo puede arruinar una foto.",
    image: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=1000&auto=format&fit=crop', // Gato sorprendido (placeholder)
    buttonText: 'Entendido'
  },
  {
    id: 2,
    type: 'image_quiz',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop', // Gato en ambiente desordenado
    question: 'Esta foto tiene un problema grave de fondo. ¿Cuál es?',
    options: [
      { id: 'a', text: 'La pareja no está sonriendo.' },
      { id: 'b', text: 'El elemento del fondo roba la atención y arruina el romanticismo.', correct: true },
      { id: 'c', text: 'La foto está muy oscura.' }
    ],
    feedbackCorrect: "¡Así es! Un elemento feo o gracioso en el fondo puede convertir una foto romántica en un 'meme' o arruinar la atmósfera.",
    feedbackWrong: 'No es un problema de actitud o de luz: es el fondo el que distrae.'
  },
  {
    id: 3,
    type: 'compare',
    instruction: '¿Cuál foto se siente más profesional?',
    options: [
      {
        id: 'a',
        src: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=600&auto=format&fit=crop', // Foto con fondo distractivo
        correct: false,
        feedback: 'El poste y el brazo fantasma distraen mucho; el borde está sucio.'
      },
      {
        id: 'b',
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop', // Retrato limpio
        correct: true,
        feedback: '¡Exacto! Un pequeño paso limpió el fondo y los bordes.'
      }
    ]
  },
  {
    id: 4,
    type: 'quiz',
    title: 'Usa el contexto a tu favor',
    question: 'Estás fotografiando a un Chef famoso. ¿Qué fondo eliges?',
    options: [
      { id: 'a', text: 'Una pared blanca lisa.' },
      { id: 'b', text: 'Una cocina con ollas y vapor.', correct: true },
      { id: 'c', text: 'En la sala de su casa.' },
      { id: 'd', text: 'Caminando en la ciudad.' }
    ],
    feedbackCorrect: '¡Eso es! El entorno nos dice quién es sin usar palabras: muestra dónde trabaja y su estilo de vida.',
    feedbackWrong: 'Ese fondo no nos cuenta la historia de su profesión.'
  },
  {
    id: 5,
    type: 'theory',
    title: 'Si el fondo es feo, recórtalo',
    content: "¿El fondo es muy feo y no puedes moverte? ¡Elimínalo! Si tienes un lente largo (teleobjetivo) o haces Zoom, puedes 'aplastar' el fondo o recortarlo para que solo se vea tu sujeto.\n\nImagínalo como un deslizador: al acercarte, el encuadre se cierra en la cara del perro y el desorden desaparece.",
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop', // Cámara zoom
    tip: 'Al llenar el encuadre, el desorden desaparece. Dale todo el protagonismo a tu sujeto.'
  },
  {
    id: 6,
    type: 'compare',
    instruction: 'El cielo como lienzo',
    options: [
      {
        id: 'a',
        src: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=600&auto=format&fit=crop', // Angulo normal, fondo sucio
        correct: false,
        feedback: 'El suelo sucio distrae y el sujeto no destaca.'
      },
      {
        id: 'b',
        src: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=600&auto=format&fit=crop', // Contrapicado cielo
        correct: true,
        feedback: 'Con el cielo limpio de fondo eliminamos distracciones y el sujeto resalta.'
      }
    ]
  },
  {
    id: 7,
    type: 'image_quiz',
    // Imagen de contrapicado con cielo (low angle shot sky background)
    image: 'https://images.unsplash.com/photo-1542555353-83141f23850f?q=80&w=1000&auto=format&fit=crop', 
    question: "El cielo es el fondo más limpio y barato que existe. ¿Qué logramos usándolo?",
    options: [
      { id: 'a', text: "Que el sujeto se vea más atractivo." },
      { id: 'b', text: "Limpiar la imagen y eliminar distracciones.", correct: true },
      { id: 'c', text: "Dar sensación de calma en la foto." }
    ],
    feedbackCorrect: "¡Exacto! Al agacharnos y usar el cielo de fondo, eliminamos todo el ruido visual del suelo.",
    feedbackWrong: "Aunque puede calmar, el objetivo técnico es limpiar el encuadre."
  },
  {
    id: 8,
    type: 'quiz',
    title: 'Repaso rápido',
    question: '¿Qué debes hacer antes de presionar el botón de disparo?',
    options: [
      { id: 'a', text: 'Solo enfocar bien a tu sujeto' },
      { id: 'b', text: 'Escanear los bordes y el fondo buscando intrusos.', correct: true },
      { id: 'c', text: 'Encuadrar el cielo' }
    ],
    feedbackCorrect: '¡Bien! Un vistazo rápido al fondo evita postes, basura o intrusos no deseados.',
    feedbackWrong: 'No basta con enfocar; revisa el fondo y bordes antes de disparar.'
  },
  {
    id: 9,
    type: 'summary',
    title: '¡Felicidades! Visión de rayos X activada',
    points: [
      'Escanea el encuadre completo: el fondo puede arruinar o salvar la foto.',
      'Limpia bordes e intrusos: evita postes, brazos o basura saliendo de tu sujeto.',
      'Usa el fondo con intención: cuenta historias o elimínalo con encuadres cerrados o el cielo.'
    ],
    buttonText: 'Finalizar Lección'
  }
];

export default lessonThreeData;