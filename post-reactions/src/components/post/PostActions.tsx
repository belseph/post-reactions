import React, { useState } from 'react';
import { MessageCircle, Share2, Bookmark } from 'lucide-react';
import ReactionButton from '../reaction/ReactionButton';
import Button from '../ui/Button';

interface PostActionsProps {
  reactions: Record<string, number>;
  userReaction: string | null;
  onReaction: (reaction: string) => void;
  onToggleComments: () => void;
  showComments: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  reactions,
  userReaction,
  onReaction,
  onToggleComments,
  showComments
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="px-6 py-3 border-t border-white/20 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <ReactionButton
          currentReaction={userReaction}
          reactions={reactions}
          onReaction={onReaction}
        />
        
        <Button
          variant="ghost"
          onClick={onToggleComments}
          icon={MessageCircle}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          Comentar
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Share2}
          className="text-white/60 hover:text-white/80 hover:bg-white/10 p-2"
        />
        <Button
          variant="ghost"
          size="sm"
          icon={Bookmark}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 ${
            isBookmarked 
              ? 'text-blue-300 bg-white/10' 
              : 'text-white/60 hover:text-white/80 hover:bg-white/10'
          }`}
        />
      </div>
    </div>
  );
};

export default PostActions;