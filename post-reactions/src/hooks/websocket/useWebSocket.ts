import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import type { Comment, NotificationReaction } from '../../types/post';

interface UseWebSocketOptions {
  onNewComment: (comment: Comment) => void;
  onReactionChange: (notification: NotificationReaction) => void;
  onCommentUpdate?: (comment: Comment) => void; // ✅ NUEVO: Para comentarios editados
  onCommentDelete?: (commentId: string) => void; // ✅ NUEVO: Para comentarios eliminados
}

export const useWebSocket = ({ 
  onNewComment, 
  onReactionChange, 
  onCommentUpdate, 
  onCommentDelete 
}: UseWebSocketOptions) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new WebSocket('ws://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('WebSocket Conectado!');

        // Suscripción a comentarios nuevos
        client.subscribe('/topic/comments/new', message => {
          console.log('Nueva notificación de comentario RAW:', message.body);
          try {
            const newComment: Comment = JSON.parse(message.body);
            onNewComment(newComment);
          } catch (e) {
            console.error('Error parseando notificación de comentario:', e, message.body);
          }
        });

        // ✅ NUEVO: Suscripción a comentarios editados
        if (onCommentUpdate) {
          client.subscribe('/topic/comments/updated', message => {
            console.log('Comentario actualizado RAW:', message.body);
            try {
              const updatedComment: Comment = JSON.parse(message.body);
              onCommentUpdate(updatedComment);
            } catch (e) {
              console.error('Error parseando comentario actualizado:', e, message.body);
            }
          });
        }

        // ✅ NUEVO: Suscripción a comentarios eliminados
        if (onCommentDelete) {
          client.subscribe('/topic/comments/deleted', message => {
            console.log('Comentario eliminado RAW:', message.body);
            try {
              const deletedCommentId: string = message.body.replace(/"/g, ''); // Remover comillas si las hay
              onCommentDelete(deletedCommentId);
            } catch (e) {
              console.error('Error parseando comentario eliminado:', e, message.body);
            }
          });
        }

        // Suscripción a reacciones
        client.subscribe('/topic/reactions/new', message => {
          console.log('Nueva notificación de reacción RAW:', message.body);
          try {
            const reactionNotification: NotificationReaction = JSON.parse(message.body);
            console.log('Notificación de reacción PARSEADA:', reactionNotification);
            onReactionChange(reactionNotification);
          } catch (e) {
            console.error('ERROR al procesar notificación de reacción del WebSocket:', e, 'Mensaje recibido:', message.body);
          }
        });
      },

      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
      },
      onDisconnect: () => {
        console.log('WebSocket Desconectado.');
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.deactivate();
        console.log('Desactivando conexión WebSocket.');
      }
    };
  }, [onNewComment, onReactionChange, onCommentUpdate, onCommentDelete]);

  return clientRef.current;
};