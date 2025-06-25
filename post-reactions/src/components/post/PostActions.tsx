import React, { useState } from 'react';
import { MessageCircle, Share2, Bookmark, Heart } from 'lucide-react';
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

  // Calcular total de reacciones para mostrar como en el PostCard externo
  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="pt-5">
      <div className="flex flex-row gap-5">
        {/* Botón de Me Gusta estilo del PostCard externo */}
        <div className="flex flex-col items-center">
          <Heart 
            className={`w-5 h-5 cursor-pointer transition-all duration-200 ${
              userReaction 
                ? 'text-red-400 fill-red-400 hover:scale-110 active:scale-95' 
                : 'text-white/70 hover:text-red-400 hover:scale-110 active:scale-95'
            }`}
            onClick={() => onReaction('Me gusta')}
          />
          <p className="text-white/70 text-sm mt-1">{totalReactions}</p>
        </div>

        {/* Botón de Comentarios estilo del PostCard externo */}
        <div className="flex flex-col items-center">
          <MessageCircle 
            className="w-5 h-5 text-white/70 hover:text-purple-400 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200"
            onClick={onToggleComments}
          />
          <p className="text-white/70 text-sm mt-1">0</p>
        </div>

        {/* Botón de Compartir */}
        <div className="flex flex-col items-center">
          <Share2 
            className="w-5 h-5 text-white/70 hover:text-blue-400 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200"
          />
          <p className="text-white/70 text-sm mt-1">0</p>
        </div>
      </div>

      {/* Mostrar ReactionButton expandido si es necesario */}
      <div className="mt-3">
        <ReactionButton
          currentReaction={userReaction}
          reactions={reactions}
          onReaction={onReaction}
        />
      </div>
    </div>
  );
};

export default PostActions;