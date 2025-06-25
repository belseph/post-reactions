// src/utils/imageUtils.ts - Utilidad para manejar imágenes de posts
export const POST_IMAGES = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=800'
];

/**
 * Obtiene una imagen aleatoria basada en el ID del post
 * Esto asegura que el mismo post siempre tenga la misma imagen
 */
export const getPostImage = (postId: string): string => {
  const index = parseInt(postId) % POST_IMAGES.length;
  return POST_IMAGES[index];
};

/**
 * Obtiene una imagen aleatoria
 */
export const getRandomPostImage = (): string => {
  const randomIndex = Math.floor(Math.random() * POST_IMAGES.length);
  return POST_IMAGES[randomIndex];
};