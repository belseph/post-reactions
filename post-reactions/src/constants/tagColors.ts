export const tagColors: Record<string, string> = {
  // 🔵 Tecnología - Azul (innovación, digital)
  'Tecnología': 'bg-blue-100 text-blue-800 border-blue-200',
  
  // 🟡 Negocios - Amarillo/Naranja (crecimiento, dinero)
  'Negocios y Emprendimiento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  
  // 🟣 Arte - Púrpura (creatividad, imaginación)
  'Arte y Creatividad': 'bg-violet-100 text-violet-800 border-violet-200',
  
  // 🟠 Ciencia - Índigo/Púrpura (conocimiento, educación)
  'Ciencia y Educación': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  
  // 🟢 Idiomas - Esmeralda/Verde azulado (diversidad, cultura)
  'Idiomas y Cultura': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  
  // 🩷 Salud - Rosa (bienestar, vida)
  'Salud y Bienestar': 'bg-pink-100 text-pink-800 border-pink-200',
  
  // 🔴 Deportes - Naranja/Rojo (energía, competencia)
  'Deportes': 'bg-orange-100 text-orange-800 border-orange-200',
  
  // 🟢 Medio ambiente - Verde (naturaleza, sostenibilidad)
  'Medio ambiente y Sostenibilidad': 'bg-green-100 text-green-800 border-green-200',
  
  // 🟣 Desarrollo Personal - Púrpura oscuro (crecimiento personal)
  'Desarrollo Personal': 'bg-purple-100 text-purple-800 border-purple-200',
  
  // 🟣 Gaming - Púrpura/Rosa (diversión, entretenimiento)
  'Video Juegos y Entretenimiento': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
  
  // Color por defecto para etiquetas no definidas
  'default': 'bg-slate-100 text-slate-700 border-slate-200'
};

// Función helper para obtener el color de una etiqueta
export const getTagColor = (tagName: string): string => {
  return tagColors[tagName] || tagColors.default;
};

// ✅ ACTUALIZADO: Gradientes que coinciden con los colores que proporcionaste
export const tagGradients: Record<string, string> = {
  'all': 'bg-gradient-to-r from-purple-500 to-pink-500',
  'Tecnología': 'bg-gradient-to-r from-blue-500 to-cyan-500',
  'Negocios y Emprendimiento': 'bg-gradient-to-r from-yellow-500 to-orange-500',
  'Arte y Creatividad': 'bg-gradient-to-r from-violet-500 to-purple-500',
  'Ciencia y Educación': 'bg-gradient-to-r from-indigo-500 to-purple-500',
  'Idiomas y Cultura': 'bg-gradient-to-r from-emerald-500 to-teal-500',
  'Salud y Bienestar': 'bg-gradient-to-r from-pink-500 to-rose-500',
  'Deportes': 'bg-gradient-to-r from-orange-500 to-red-500',
  'Medio ambiente y Sostenibilidad': 'bg-gradient-to-r from-green-500 to-emerald-500',
  'Desarrollo Personal': 'bg-gradient-to-r from-purple-600 to-indigo-600',
  'Video Juegos y Entretenimiento': 'bg-gradient-to-r from-purple-500 to-pink-500'
};

// ✅ NUEVO: Función helper para obtener gradientes
export const getTagGradient = (tagName: string): string => {
  return tagGradients[tagName] || 'bg-gradient-to-r from-slate-500 to-gray-500';
};