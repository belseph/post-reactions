import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import EmojiPicker from '../ui/EmojiPicker';

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

  // ✅ NUEVO: Función para agregar emoji al contenido
  const handleEmojiSelect = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  return (
    <div className="p-6 border-t border-white/20">
      <form onSubmit={handleSubmit} className="flex items-start space-x-3">
        <Avatar
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150"
          alt="Tu avatar"
          size="md"
        />
        
        <div className="flex-1 relative">
          {/* ✅ ARREGLADO: Quitar el borde morado y usar colores coherentes */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-white/20 rounded-xl resize-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 placeholder-white/60 min-h-[80px] disabled:opacity-50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/30 outline-none"
            style={{ outline: 'none' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <div className="flex items-center justify-between mt-3">
            {/* ✅ NUEVO: Selector de emojis */}
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              className="flex-shrink-0"
            />
            
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              icon={Send}
              size="sm"
              variant={content.trim() && !isSubmitting ? 'primary' : 'secondary'}
              loading={isSubmitting}
              className={`outline-none border-none ${content.trim() && !isSubmitting ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white/70'}`}
              style={{ outline: 'none', border: 'none' }}
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