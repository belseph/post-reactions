import React, { useState } from 'react';
import type { Post } from '../../types/post';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import ReactionStats from '../reaction/ReactionStats';
import CommentSection from '../comment/CommentSection';
import { getPostImage } from '../../utils/imageUtils';

interface PostCardProps {
  post: Post;
  currentUserId?: string | null; // ✅ NUEVO: ID del usuario actual
  onReaction: (postId: string, reactionType: string) => void;
  onCommentReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post,
  currentUserId, // ✅ NUEVO: Recibir currentUserId
  onReaction, 
  onCommentReaction,
  onNewComment
}) => {
  const [showComments, setShowComments] = useState(false);

  const handleReaction = (reactionType: string) => {
    onReaction(post.id, reactionType);
  };

  // ✅ NUEVO: Handlers para editar y eliminar posts
  const handleEditPost = () => {
    console.log('Editar post:', post.id);
    // TODO: Implementar lógica de edición
    // Aquí podrías abrir un modal de edición o navegar a una página de edición
  };

  const handleDeletePost = () => {
    console.log('Eliminar post:', post.id);
    // TODO: Implementar lógica de eliminación
    // Aquí podrías mostrar un modal de confirmación y luego llamar al API
  };

  console.log(`🔄 Renderizando PostCard ${post.id}:`, {
    userReaction: post.userReaction,
    reactions: post.reactions,
    _lastUpdate: post._lastUpdate,
    hasOnNewComment: !!onNewComment,
    currentUserId, // ✅ NUEVO: Log para debug
    authorId: post.author.id
  });

  return (
    <article className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden shadow-lg">
      <PostHeader
        author={post.author}
        tags={post.tags}
        createdAt={post.createdAt}
        currentUserId={currentUserId} // ✅ NUEVO: Pasar currentUserId
        onEdit={handleEditPost} // ✅ NUEVO: Pasar handler de edición
        onDelete={handleDeletePost} // ✅ NUEVO: Pasar handler de eliminación
      />

      <PostContent 
        title={post.title}
        content={post.content} 
        image={getPostImage(post.id)}
      />

      <ReactionStats
        reactions={post.reactions}
        commentsCount={post.comments.length}
      />

      <PostActions
        reactions={post.reactions}
        userReaction={post.userReaction}
        onReaction={handleReaction}
        onToggleComments={() => setShowComments(!showComments)}
        showComments={showComments}
      />

      {showComments && (
        <CommentSection 
          comments={post.comments} 
          postId={post.id}
          currentUserId={currentUserId} // ✅ NUEVO: Pasar currentUserId
          onCommentReaction={onCommentReaction}
          onNewComment={onNewComment}
          forceRenderKey={post._lastUpdate}
        />
      )}
    </article>
  );
};

export default PostCard;