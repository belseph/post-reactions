import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  postId?: string;
  parentCommentId?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  placeholder = "Escribe un comentario...",
  postId,
  parentCommentId
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(content);
        setContent('');
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="p-6 border-t border-slate-600/30">
      <form onSubmit={handleSubmit} className="flex items-start space-x-3">
        <Avatar
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150"
          alt="Tu avatar"
          size="md"
        />
        
        <div className="flex-1 relative">
          {/* ✅ ARREGLADO: Mejor contraste para el textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-slate-600/50 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder-slate-400 min-h-[80px] disabled:opacity-50 bg-slate-700/40 backdrop-blur-sm text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <div className="flex items-center justify-between mt-3">
            <Button
              variant="ghost"
              size="sm"
              icon={Smile}
              className="text-slate-400 hover:text-slate-200 p-1"
              disabled={isSubmitting}
            />
            
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              icon={Send}
              size="sm"
              variant={content.trim() && !isSubmitting ? 'primary' : 'secondary'}
              loading={isSubmitting}
              className={content.trim() && !isSubmitting ? 'bg-purple-500 hover:bg-purple-700 text-white' : 'bg-slate-600/50 hover:bg-slate-600/70 text-slate-300'}
            >
              {isSubmitting ? 'Enviando...' : 'Comentar'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;