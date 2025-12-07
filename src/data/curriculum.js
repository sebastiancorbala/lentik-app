import { Eye, Smartphone, Monitor, Lock, Camera, Check, Play, Star } from 'lucide-react';

export const curriculumData = [
  {
    id: "u1",
    title: "Unidad 1",
    subtitle: "Enfoque y Sujeto",
    color: "emerald", // Referencia de color para Tailwind
    status: "completed", // current, locked, completed
    lessons: [
      { id: "l1", title: "¿Quién es el protagonista?", type: "theory" },
      { id: "l2", title: "El poder del Enfoque", type: "theory" },
      { id: "l3", title: "Bloqueo de Enfoque", type: "practice" },
      { id: "test1", title: "Examen Unidad 1", type: "test" }
    ]
  },
  {
    id: "u2",
    title: "Unidad 2",
    subtitle: "Encuadre Básico",
    color: "blue",
    status: "current",
    lessons: [
      { id: "l1", title: "Horizontal vs Vertical", type: "theory" },
      { id: "l2", title: "Llenar el encuadre", type: "theory" },
      { id: "l3", title: "El horizonte recto", type: "practice" }
    ]
  },
  {
    id: "u3",
    title: "Unidad 3",
    subtitle: "Regla de Tercios",
    color: "gray",
    status: "locked",
    lessons: []
  }
];