import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import type { User } from '../../types/post';

interface PostHeaderProps {
  author: User;
  tags: string[];
  createdAt: Date;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, tags, createdAt }) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    return `Hace ${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="pb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar
            src={author.avatar}
            alt={author.name}
            size="lg"
          />
          <div>
            <h3 className="font-semibold text-white flex items-center space-x-1">
              <span>{author.name}</span>
            </h3>
            <p className="text-sm text-white/80">{author.title}</p>
            <p className="text-xs text-white/60">{formatTimeAgo(createdAt)}</p>
          </div>
        </div>
        <button className="text-white/60 hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tags con colores adaptados al fondo verde */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant={tag} className="bg-white/20 text-white border-white/30">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PostHeader;