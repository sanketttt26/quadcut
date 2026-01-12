import React, { useState } from 'react';
import { Download, RefreshCw, CheckCircle2, FileArchive } from 'lucide-react';
import { ProcessedSlice } from '../types';
import { generateZip } from '../utils/zipManager';
import FileSaver from 'file-saver';

interface ResultViewProps {
  slices: ProcessedSlice[];
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ slices, onReset }) => {
  const [isZipping, setIsZipping] = useState(false);

  const saveFile = (blob: Blob, name: string) => {
    if (typeof FileSaver === 'function') {
       (FileSaver as any)(blob, name);
    } else if (typeof FileSaver === 'object' && 'saveAs' in FileSaver) {
       (FileSaver as any).saveAs(blob, name);
    } else {
       console.error("FileSaver import structure unknown:", FileSaver);
       (FileSaver as any)?.saveAs?.(blob, name) ?? (FileSaver as any)?.(blob, name);
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const blob = await generateZip(slices);
      saveFile(blob, 'quadcut-images.zip');
    } catch (error) {
      console.error(error);
      alert('Failed to generate ZIP file.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadSingle = (slice: ProcessedSlice) => {
    saveFile(slice.blob, slice.filename);
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-10 animate-fade-in">
      
      <div className="mb-8 p-4 rounded-xl bg-green-950/30 border border-green-900/50 flex items-center gap-3 text-green-400">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium text-sm md:text-base">
          Image split successfully! Download your quadrants below.
        </p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-zinc-400 font-medium">
          Upload to X in this order (1—4)
        </h2>
      </div>

      <div className="space-y-4">
        {slices.map((slice) => (
          <div 
            key={slice.id} 
            className="group relative bg-[#121214] rounded-2xl p-3 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
          >
            <div className="relative aspect-[4/1] w-full overflow-hidden rounded-xl bg-zinc-900/50">
              <img 
                src={slice.dataUrl} 
                alt={slice.label}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg">
                {slice.id}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-2">
              <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                {slice.label}
              </span>
              
              <button
                onClick={() => handleDownloadSingle(slice)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isZipping ? (
            <>Generating ZIP...</>
          ) : (
            <>
              <FileArchive className="w-5 h-5" />
              Download All as ZIP
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-zinc-700 hover:bg-zinc-800 text-white font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Start Over
        </button>
      </div>

    </div>
  );
};