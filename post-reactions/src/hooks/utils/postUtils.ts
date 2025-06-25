// src/hooks/utils/postUtils.ts - ARREGLADO: Parsing de fechas más robusto
import type { Post, Comment, NotificationReaction } from '../../types/post';

/**
 * ✅ ARREGLADO: Función helper para convertir fechas de forma segura
 */
const parseDate = (dateValue: any): Date => {
  if (!dateValue) {
    return new Date(); // Fecha actual como fallback
  }
  
  if (dateValue instanceof Date) {
    return dateValue; // Ya es un Date
  }
  
  if (typeof dateValue === 'string' || typeof dateValue === 'number') {
    const parsed = new Date(dateValue);
    // Verificar si la fecha es válida
    if (isNaN(parsed.getTime())) {
      console.warn('Fecha inválida recibida:', dateValue, 'usando fecha actual');
      return new Date();
    }
    return parsed;
  }
  
  console.warn('Tipo de fecha desconocido:', typeof dateValue, dateValue, 'usando fecha actual');
  return new Date();
};

/**
 * ✅ ARREGLADO: Parsea fechas en posts de forma más robusta
 */
export const parsePostDates = (post: any): Post => {
  return {
    ...post,
    createdAt: parseDate(post.createdAt),
    reactions: post.reactions || {},
    userReaction: post.userReaction || null,
    comments: post.comments?.map((comment: any) => parseCommentDates(comment)) || []
  };
};

/**
 * ✅ ARREGLADO: Parsea fechas en comentarios de forma más robusta
 */
export const parseCommentDates = (comment: any): Comment => {
  return {
    ...comment,
    createdAt: parseDate(comment.createdAt),
    reactions: comment.reactions || {},
    userReaction: comment.userReaction || null,
    replies: comment.replies?.map((reply: any) => parseCommentDates(reply)) || []
  };
};

/**
 * ✅ ARREGLADO: Actualiza reacciones en comentarios recursivamente
 * FUERZA INMUTABILIDAD para que React detecte los cambios
 */
export const updateCommentReactionsRecursive = (
  comments: Comment[], 
  reactionNotification: NotificationReaction,
  userReaction?: string | null
): Comment[] => {
  return comments.map(comment => {
    if (comment.id === reactionNotification.targetId && reactionNotification.targetType === 'COMMENT') {
      console.log(`🔄 Actualizando comentario ${comment.id}:`, {
        conteoAntes: comment.reactions,
        conteoDespues: reactionNotification.reactionCounts,
        userReactionAntes: comment.userReaction,
        userReactionDespues: userReaction !== undefined ? userReaction : comment.userReaction
      });
      
      // ✅ CREAR NUEVO OBJETO COMPLETAMENTE - FORZAR INMUTABILIDAD
      const updatedComment = {
        ...comment,
        // ✅ CREAR NUEVO OBJETO para reactions (no reutilizar referencia)
        reactions: { ...reactionNotification.reactionCounts },
        // ✅ ACTUALIZAR userReaction
        userReaction: userReaction !== undefined ? userReaction : comment.userReaction,
        // ✅ CREAR NUEVO ARRAY para replies (mantener inmutabilidad)
        replies: comment.replies ? [...comment.replies] : []
      };
      
      console.log('✅ Comentario actualizado:', updatedComment);
      return updatedComment;
    }
    
    if (comment.replies && comment.replies.length > 0) {
      // ✅ CREAR NUEVO OBJETO para el comentario padre también
      return {
        ...comment,
        replies: updateCommentReactionsRecursive(comment.replies, reactionNotification, userReaction)
      };
    }
    
    return comment;
  });
};

/**
 * ✅ ARREGLADO: Agrega comentario a posts con parsing de fechas
 */
export const addCommentToPosts = (posts: Post[], newComment: Comment): Post[] => {
  return posts.map(post => {
    if ((newComment as any).postId === post.id) {
      // ✅ ASEGURAR que el comentario tenga fecha parseada
      const commentWithParsedDate = {
        ...newComment,
        createdAt: parseDate(newComment.createdAt)
      };
      
      return {
        ...post,
        comments: [...post.comments, commentWithParsedDate]
      };
    }
    return post;
  });
};