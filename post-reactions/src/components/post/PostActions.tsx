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
    <div className="flex flex-row gap-5 pt-5">
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
          className="text-white/70 hover:text-purple-500 hover:scale-110 active:scale-95 active:text-blue-500 cursor-pointer transition-all duration-200"
        >
          Comentar
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Share2}
          className="text-white/70 hover:text-white/90 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200 p-2"
        />
        <Button
          variant="ghost"
          size="sm"
          icon={Bookmark}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200 ${
            isBookmarked 
              ? 'text-blue-300' 
              : 'text-white/70 hover:text-white/90'
          }`}
        />
      </div>
    </div>
  );
};

export default PostActions;