import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import type { User } from '../../types/post';

interface PostHeaderProps {
  author: User;
  tags: string[];
  createdAt: Date;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  author, 
  tags, 
  createdAt, 
  onEdit, 
  onDelete 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    return `Hace ${Math.floor(diffInHours / 24)}d`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setShowMenu(false);
    if (onEdit) {
      onEdit();
    } else {
      console.log('Editar post');
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    if (onDelete) {
      onDelete();
    } else {
      console.log('Eliminar post');
    }
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
            {/* ✅ ARREGLADO: Fecha con más contraste */}
            <p className="text-xs text-white/80">{formatTimeAgo(createdAt)}</p>
          </div>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-white/60 hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              <button
                onClick={handleEdit}
                className="w-full flex items-center space-x-3 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm font-medium">Editar post</span>
              </button>
              
              <button
                onClick={handleDelete}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Eliminar post</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ ARREGLADO: Tags con colores reales, no transparentes */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant={tag}>
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PostHeader;