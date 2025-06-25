import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import EmojiPickerReact, { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Cerrar el picker cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {/* Botón para abrir el picker */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white/60 hover:text-white/90 hover:bg-white/10 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 p-2 rounded-lg outline-none border-none"
        style={{ outline: 'none', border: 'none' }}
        onFocus={(e) => e.target.blur()}
      >
        <Smile className="w-5 h-5" />
      </button>

      {/* Picker de emojis */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-50 animate-in slide-in-from-bottom-2 duration-200">
          <EmojiPickerReact
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
            previewConfig={{
              showPreview: false
            }}
            searchDisabled={false}
            skinTonesDisabled={true}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;