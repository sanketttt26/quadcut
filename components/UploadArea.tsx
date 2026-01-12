import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPG, PNG, WEBP, GIF)');
      return false;
    }
    if (file.size > 20 * 1024 * 1024) { // 20MB
      alert('File size too large. Max 20MB.');
      return false;
    }
    return true;
  };

  const handleDemo = async () => {
    try {
      const response = await fetch('https://picsum.photos/1920/1080');
      const blob = await response.blob();
      const file = new File([blob], 'demo-image.jpg', { type: 'image/jpeg' });
      onFileSelect(file);
    } catch (err) {
      console.error("Failed to load demo image", err);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 pb-2">
          QuadCut
        </h1>
        <p className="text-lg text-zinc-400">
          Create viral split grids for X in seconds
        </p>
        <p className="text-sm text-zinc-500 mt-2">
          Note: Please use the web version of X (Twitter) when posting these grids to ensure they display correctly.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-3xl transition-all duration-300 ease-in-out
          h-80 flex flex-col items-center justify-center gap-4
          ${isDragging
            ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02]'
            : 'border-zinc-800 hover:border-zinc-600 bg-[#0c0c0e] hover:bg-[#121214]'
          }
        `}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileInput}
          disabled={isProcessing}
        />

        {isProcessing ? (
          <div className="flex flex-col items-center gap-4 text-cyan-500">
            <Loader2 className="w-12 h-12 animate-spin" />
            <span className="font-medium text-lg">Processing your artwork...</span>
          </div>
        ) : (
          <>
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300
              ${isDragging ? 'bg-cyan-500 text-white' : 'bg-zinc-800 text-cyan-500 group-hover:bg-zinc-700'}
            `}>
              <Upload className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-white">
                Drop your artwork here
              </h3>
              <p className="text-sm text-zinc-500">
                or click to browse • JPG, PNG, WEBP, GIF up to 20MB
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleDemo}
          disabled={isProcessing}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm px-4 py-2 rounded-full hover:bg-zinc-800"
        >
          <ImageIcon className="w-4 h-4" />
          Try demo
        </button>
      </div>
    </div>
  );
};