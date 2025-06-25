export const tagColors: Record<string, string> = {
  // 🔵 Tecnología - Azul degradado
  'Tecnología': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-300',
  
  // 🟡 Negocios - Amarillo/Naranja degradado
  'Negocios y Emprendimiento': 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-300',
  
  // 🟣 Arte - Púrpura degradado
  'Arte y Creatividad': 'bg-gradient-to-r from-violet-500 to-purple-500 text-white border-violet-300',
  
  // 🟠 Ciencia - Índigo/Púrpura degradado
  'Ciencia y Educación': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-300',
  
  // 🟢 Idiomas - Esmeralda/Verde azulado degradado
  'Idiomas y Cultura': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300',
  
  // 🩷 Salud - Rosa degradado
  'Salud y Bienestar': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-300',
  
  // 🔴 Deportes - Naranja/Rojo degradado
  'Deportes': 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-300',
  
  // 🟢 Medio ambiente - Verde degradado
  'Medio ambiente y Sostenibilidad': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300',
  
  // 🟣 Desarrollo Personal - Púrpura oscuro degradado
  'Desarrollo Personal': 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-300',
  
  // 🟣 Gaming - Púrpura/Rosa degradado
  'Video Juegos y Entretenimiento': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-300',
  
  // Color por defecto para etiquetas no definidas
  'default': 'bg-gradient-to-r from-slate-500 to-gray-500 text-white border-slate-300'
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