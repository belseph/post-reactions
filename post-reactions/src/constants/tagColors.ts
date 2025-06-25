// src/constants/tagColors.ts - Colores de las etiquetas para referencia
export const TAG_GRADIENTS = {
  'Tecnología': 'from-blue-500 to-cyan-500',
  'Negocios y Emprendimiento': 'from-yellow-500 to-orange-500', 
  'Arte y Creatividad': 'from-violet-500 to-purple-500',
  'Ciencia y Educación': 'from-indigo-500 to-purple-500',
  'Idiomas y Cultura': 'from-emerald-500 to-teal-500',
  'Salud y Bienestar': 'from-pink-500 to-rose-500',
  'Deportes': 'from-orange-500 to-red-500',
  'Medio ambiente y Sostenibilidad': 'from-green-500 to-emerald-500',
  'Desarrollo Personal': 'from-purple-600 to-indigo-600',
  'Video Juegos y Entretenimiento': 'from-purple-500 to-pink-500'
};

// Colores sólidos para badges y elementos UI
export const tagColors: Record<string, string> = {
  'Tecnología': 'bg-blue-100 text-blue-800 border-blue-200',
  'Negocios y Emprendimiento': 'bg-green-100 text-green-800 border-green-200',
  'Arte y Creatividad': 'bg-purple-100 text-purple-800 border-purple-200',
  'Ciencia y Educación': 'bg-orange-100 text-orange-800 border-orange-200',
  'Idiomas y Cultura': 'bg-rose-100 text-rose-800 border-rose-200',
  'Salud y Bienestar': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Deportes': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Medio ambiente y Sostenibilidad': 'bg-teal-100 text-teal-800 border-teal-200',
  'Desarrollo Personal': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Video Juegos y Entretenimiento': 'bg-violet-100 text-violet-800 border-violet-200',
  'default': 'bg-slate-100 text-slate-700 border-slate-200'
};

export const getTagColor = (tagName: string): string => {
  return tagColors[tagName] || tagColors.default;
};

export const getTagGradient = (tagName: string): string => {
  return TAG_GRADIENTS[tagName as keyof typeof TAG_GRADIENTS] || 'from-slate-500 to-gray-500';
};