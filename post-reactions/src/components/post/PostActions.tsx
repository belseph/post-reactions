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
    <div className="px-6 py-3 border-t border-white/20 flex items-center justify-between bg-white/5">
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
          className="text-white/70 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-200"
        >
          Comentar
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Share2}
          className="text-white/50 hover:text-white/70 hover:bg-white/10 p-2 transition-all duration-200"
        />
        <Button
          variant="ghost"
          size="sm"
          icon={Bookmark}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 transition-all duration-200 ${
            isBookmarked 
              ? 'text-blue-400 bg-blue-500/20' 
              : 'text-white/50 hover:text-white/70 hover:bg-white/10'
          }`}
        />
      </div>
    </div>
  );
};

export default PostActions;