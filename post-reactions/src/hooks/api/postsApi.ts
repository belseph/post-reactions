// src/hooks/api/postsApi.ts
import type { Post } from '../../types/post';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Obtiene todos los posts desde el backend
 */
export const fetchPosts = async (currentUserId: string | null): Promise<Post[]> => {
  const userIdParam = currentUserId ? `?currentUserId=${currentUserId}` : '';
  const response = await fetch(`${API_BASE_URL}/posts${userIdParam}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * Envía una reacción al backend (POST o COMMENT)
 */
export const sendReaction = async (
  currentUserId: string,
  targetId: string,
  targetType: 'POST' | 'COMMENT',
  reactionType: string,
  reactionTypeId: number
): Promise<void> => {
  console.log(`🚀 Enviando reacción: ${reactionType} (ID: ${reactionTypeId}) para ${targetType} ${targetId} con usuario ${currentUserId}`);
  
  const response = await fetch(
    `${API_BASE_URL}/reactions?userId=${currentUserId}&targetId=${targetId}&targetType=${targetType}&reactionTypeId=${reactionTypeId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

  if (!response.ok && response.status !== 409) {
    const errorText = await response.text();
    throw new Error(`Fallo al enviar la reacción: ${response.status} ${response.statusText} - ${errorText}`);
  }

  console.log(`✅ Reacción ${targetType} enviada exitosamente!`);
};

/**
 * Consulta la reacción del usuario actual para un target específico
 */
export const fetchUserReaction = async (
  currentUserId: string,
  targetId: string,
  targetType: 'POST' | 'COMMENT'
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reactions/user-reaction?userId=${currentUserId}&targetId=${targetId}&targetType=${targetType}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Usuario no ha reaccionado
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const userReaction = await response.text();
    return userReaction || null;
  } catch (error) {
    console.error('Error fetching user reaction:', error);
    return null;
  }
};

/**
 * Crear un comentario
 */
export const createComment = async (
  content: string,
  postId: string,
  userId: string,
  parentCommentId?: string
): Promise<any> => {
  console.log(`🚀 Creando comentario:`, {
    content,
    postId,
    userId,
    parentCommentId
  });

  const url = new URL(`${API_BASE_URL}/comments`);
  url.searchParams.append('postId', postId);
  url.searchParams.append('userId', userId);
  if (parentCommentId) {
    url.searchParams.append('parentCommentId', parentCommentId);
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contenido: content
    })
  });

  console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear comentario: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  console.log(`✅ Comentario creado exitosamente:`, result);
  return result;
};

/**
 * ✅ NUEVO: Editar un post
 */
export const updatePost = async (
  postId: string,
  title: string,
  content: string,
  currentUserId?: string
): Promise<any> => {
  console.log(`🚀 Editando post ${postId}:`, { title, content, currentUserId });

  const url = new URL(`${API_BASE_URL}/posts/${postId}`);
  if (currentUserId) {
    url.searchParams.append('currentUserId', currentUserId);
  }

  const response = await fetch(url.toString(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo: title,
      contenido: content
    })
  });

  console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al editar post: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  console.log(`✅ Post editado exitosamente:`, result);
  return result;
};

/**
 * ✅ NUEVO: Eliminar un post
 */
export const deletePost = async (postId: string): Promise<void> => {
  console.log(`🚀 Eliminando post ${postId}`);

  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al eliminar post: ${response.status} ${response.statusText} - ${errorText}`);
  }

  console.log(`✅ Post eliminado exitosamente`);
};

/**
 * ✅ NUEVO: Editar un comentario
 */
export const updateComment = async (
  commentId: string,
  content: string
): Promise<any> => {
  console.log(`🚀 Editando comentario ${commentId}:`, { content });

  const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contenido: content
    })
  });

  console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al editar comentario: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  console.log(`✅ Comentario editado exitosamente:`, result);
  return result;
};

/**
 * ✅ NUEVO: Eliminar un comentario
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  console.log(`🚀 Eliminando comentario ${commentId}`);

  const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al eliminar comentario: ${response.status} ${response.statusText} - ${errorText}`);
  }

  console.log(`✅ Comentario eliminado exitosamente`);
};