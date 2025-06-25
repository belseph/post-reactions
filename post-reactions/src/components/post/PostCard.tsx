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
  onReaction: (postId: string, reactionType: string) => void;
  onCommentReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onReaction, 
  onCommentReaction,
  onNewComment
}) => {
  const [showComments, setShowComments] = useState(false);

  const handleReaction = (reactionType: string) => {
    onReaction(post.id, reactionType);
  };

  console.log(`🔄 Renderizando PostCard ${post.id}:`, {
    userReaction: post.userReaction,
    reactions: post.reactions,
    _lastUpdate: post._lastUpdate,
    hasOnNewComment: !!onNewComment
  });

  return (
    <article className="bg-gradient-to-br from-teal-600 via-green-600 to-emerald-700 rounded-xl p-6 border border-teal-500/30 hover:from-teal-500 hover:via-green-500 hover:to-emerald-600 transition-all duration-300 overflow-hidden shadow-lg">
      <PostHeader
        author={post.author}
        tags={post.tags}
        createdAt={post.createdAt}
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
          onCommentReaction={onCommentReaction}
          onNewComment={onNewComment}
          forceRenderKey={post._lastUpdate}
        />
      )}
    </article>
  );
};

export default PostCard;