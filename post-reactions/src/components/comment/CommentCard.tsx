import React, { useState } from 'react';
import type { Comment } from '../../types/post';
import Avatar from '../ui/Avatar';
import ReactionButton from '../reaction/ReactionButton';
import Button from '../ui/Button';
import CommentForm from './CommentForm';
import { Reply, MoreHorizontal } from 'lucide-react';

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
  onReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
  forceRenderKey?: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ 
  comment, 
  isReply = false, 
  onReaction,
  onNewComment,
  forceRenderKey
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const handleReaction = (reactionType: string) => {
    console.log('🎯 Reacción a comentario:', comment.id, reactionType, 'forceRenderKey:', forceRenderKey);
    if (onReaction) {
      onReaction(comment.id, reactionType);
    } else {
      console.warn('⚠️ No se proporcionó función onReaction para el comentario');
    }
  };

  const handleReplySubmit = async (content: string) => {
    if (onNewComment) {
      try {
        await onNewComment('1', content, comment.id);
        setShowReplyForm(false);
        setShowReplies(true);
        console.log('✅ Respuesta enviada exitosamente');
      } catch (error) {
        console.error('❌ Error al enviar respuesta:', error);
      }
    }
  };

  console.log(`🔄 Renderizando CommentCard ${comment.id}:`, {
    userReaction: comment.userReaction,
    reactions: comment.reactions,
    forceRenderKey,
    hasOnNewComment: !!onNewComment
  });

  return (
    <div className={`${isReply ? 'ml-8' : ''}`}>
      <div className="flex items-start space-x-3 group">
        <Avatar
          src={comment.author.avatar}
          alt={comment.author.name}
          size="sm"
        />
        
        <div className="flex-1 min-w-0">
          {/* ✅ ARREGLADO: Hover más sutil para el fondo del comentario */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-1">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">{comment.author.name}</h4>
                <p className="text-sm text-white/80">{comment.author.title}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white/60">{formatTimeAgo(comment.createdAt)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={MoreHorizontal}
                  className="text-white/60 hover:text-white/80 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                />
              </div>
            </div>
            
            <p className="text-white leading-relaxed">{comment.content}</p>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <ReactionButton
              key={`reaction-${comment.id}-${forceRenderKey || 0}`}
              currentReaction={comment.userReaction || null}
              reactions={comment.reactions}
              onReaction={handleReaction}
            />
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                icon={Reply}
                className="text-white/70 hover:text-purple-300 hover:bg-purple-500/10 transition-colors font-medium px-2 py-1 rounded-lg"
              >
                Responder
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReplySubmit}
                placeholder={`Responder a ${comment.author.name}...`}
                parentCommentId={comment.id}
              />
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {!showReplies ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplies(true)}
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 text-sm font-medium px-2 py-1 rounded-lg"
                >
                  Ver {comment.replies.length} respuesta{comment.replies.length > 1 ? 's' : ''}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplies(false)}
                    className="text-white/70 hover:text-white/90 hover:bg-white/10 text-sm font-medium px-2 py-1 rounded-lg"
                  >
                    Ocultar respuestas
                  </Button>
                  {comment.replies.map((reply) => (
                    <CommentCard 
                      key={`${reply.id}-${forceRenderKey || 0}`}
                      comment={reply} 
                      isReply={true}
                      onReaction={onReaction}
                      onNewComment={onNewComment}
                      forceRenderKey={forceRenderKey}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;