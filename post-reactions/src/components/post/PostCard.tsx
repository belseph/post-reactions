import React, { useState } from 'react';
import type { Post } from '../../types/post';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import ReactionStats from '../reaction/ReactionStats';
import CommentSection from '../comment/CommentSection';
import EditPostModal from './EditPostModal'; // ✅ NUEVO: Importar modal de edición
import { getPostImage } from '../../utils/imageUtils';

interface PostCardProps {
  post: Post;
  currentUserId?: string | null;
  onReaction: (postId: string, reactionType: string) => void;
  onCommentReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post,
  currentUserId,
  onReaction, 
  onCommentReaction,
  onNewComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ NUEVO: Estado del modal de edición

  const handleReaction = (reactionType: string) => {
    onReaction(post.id, reactionType);
  };

  // ✅ NUEVO: Handler para editar post
  const handleEditPost = () => {
    console.log('Editar post:', post.id);
    setShowEditModal(true);
  };

  // ✅ NUEVO: Handler para eliminar post
  const handleDeletePost = () => {
    console.log('Post eliminado:', post.id);
    // El post se eliminará automáticamente vía WebSocket o se recargará la página
    // Aquí podrías agregar lógica adicional si es necesario
  };

  // ✅ NUEVO: Handler para cuando se edita exitosamente
  const handleEditSuccess = () => {
    console.log('Post editado exitosamente');
    // El post se actualizará automáticamente vía WebSocket
    // Aquí podrías agregar lógica adicional si es necesario
  };

  console.log(`🔄 Renderizando PostCard ${post.id}:`, {
    userReaction: post.userReaction,
    reactions: post.reactions,
    _lastUpdate: post._lastUpdate,
    hasOnNewComment: !!onNewComment,
    currentUserId,
    authorId: post.author.id
  });

  return (
    <>
      <article className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden shadow-lg">
        <PostHeader
          author={post.author}
          tags={post.tags}
          createdAt={post.createdAt}
          postId={post.id} // ✅ NUEVO: Pasar postId
          currentUserId={currentUserId}
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
            currentUserId={currentUserId}
            onCommentReaction={onCommentReaction}
            onNewComment={onNewComment}
            forceRenderKey={post._lastUpdate}
          />
        )}
      </article>

      {/* ✅ NUEVO: Modal de edición de post */}
      {showEditModal && currentUserId && (
        <EditPostModal
          post={post}
          currentUserId={currentUserId}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
};

export default PostCard;