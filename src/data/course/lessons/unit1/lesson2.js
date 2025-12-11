export const lessonTwoData = [
  {
    id: 1,
    type: 'theory',
    title: 'Tú decides qué es real',
    content: 'En la vida real, tus ojos cambian de enfoque constantemente. En una foto, ese momento queda congelado para siempre.\n\nEl enfoque no sirve solo para que la foto se vea "bien". Es tu forma de gritarle al espectador: "¡Mira aquí, esto es lo importante!".',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
    buttonText: 'Siguiente'
  },
  {
    id: 2,
    type: 'theory',
    title: 'La Regla de Oro',
    content: 'El ojo humano es perezoso y curioso: Siempre viaja primero a la parte más nítida de la imagen.\nSi tu sujeto (tu "protagonista") está borroso y el fondo está nítido, has perdido la batalla. El espectador mirará el fondo y se olvidará de tu sujeto.',
    image: 'https://images.unsplash.com/photo-1504203700686-0ceab9c21ea2?q=80&w=1600&auto=format&fit=crop',
    tip: 'Dato Clave: No importa si el fondo está totalmente borroso (ese efecto bonito se llama Bokeh, mismo que aprenderás más adelante). Lo único obligatorio es que tu Sujeto esté nítido.',
    buttonText: 'Entendido'
  },
  {
    id: 3,
    type: 'quiz',
    title: 'Comprobación',
    question: 'Estás tomando un retrato a tu amigo. ¿Qué pasa si su cara sale borrosa pero el árbol de atrás sale perfecto?',
    options: [
      { id: 'a', text: 'Es una foto artística y misteriosa.' },
      { id: 'b', text: 'El espectador se distraerá mirando el árbol.', correct: true },
      { id: 'c', text: 'No pasa nada si la iluminación es buena.' }
    ],
    feedbackCorrect: '¡Exacto! La mirada se irá al árbol (la zona nítida) e ignorará a tu amigo.',
    feedbackWrong: 'Cuidado. Salvo casos muy artísticos (fotografía experimental o conceptual) si el protagonista está borroso, la foto se considera un error técnico.'
  },
  {
    id: 4,
    type: 'compare',
    instruction: 'Toca la foto que tiene el Enfoque Correcto en el sujeto.',
    options: [
      {
        id: 'a',
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
        correct: false,
        feedback: 'Aquí el foco se fue a las orejas/pelo y los ojos quedaron suaves.'
      },
      {
        id: 'b',
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop&blur=0',
        correct: true,
        feedback: '¡Bien visto! En los retratos, los ojos siempre deben ser el punto más nítido. Es donde conectamos con la persona.'
      }
    ]
  },
  {
    id: 5,
    type: 'image_quiz',
    instruction: '¿Dónde colocó el fotógrafo el enfoque aquí?',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop',
    question: '¿Qué elemento está enfocado?',
    options: [
      { id: 'a', text: 'Los edificios de la ciudad.' },
      { id: 'b', text: 'Las gotas de lluvia.', correct: true },
      { id: 'c', text: 'Toda la imagen por igual.' }
    ],
    feedbackCorrect: '¡Correcto! El fotógrafo quería que sintieras la lluvia, no que vieras la ciudad. El protagonista es la lluvia y el enfoque nos lo cuenta.',
    feedbackWrong: 'Piensa en qué parte se ve más nítida: si las gotas están claras y el fondo no, ahí está el enfoque.'
  },
  {
    id: 6,
    type: 'summary',
    title: '¡Lección Completada!',
    points: [
      'La nitidez dirige la mirada del espectador.',
      'Si el sujeto está borroso, la foto suele fallar.',
      'En retratos: ¡Enfoca siempre a los ojos!'
    ],
    buttonText: 'Finalizar Lección'
  }
];

export default lessonTwoData;
