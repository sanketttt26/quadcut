import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UploadArea } from './components/UploadArea';
import { ResultView } from './components/ResultView';
import { splitImage } from './utils/imageProcessor';
import { AppState } from './types';

import { Analytics } from "@vercel/analytics/react"

function App() {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    slices: [],
    isProcessing: false,
    error: null,
  });

  const handleFileSelect = async (file: File) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {

      await new Promise(resolve => setTimeout(resolve, 800));

      const slices = await splitImage(file);
      setState({
        originalImage: URL.createObjectURL(file),
        slices,
        isProcessing: false,
        error: null,
      });
    } catch (error) {
      console.error(error);
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: "Failed to process image. Please try again."
      }));
      alert("Failed to process image. Please try another file.");
    }
  };

  const handleReset = () => {

    if (state.originalImage) URL.revokeObjectURL(state.originalImage);
    setState({
      originalImage: null,
      slices: [],
      isProcessing: false,
      error: null,
    });
  };

  return (
    <div className={`flex flex-col w-full ${state.slices.length === 0 ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center">
        {state.slices.length > 0 ? (
          <ResultView slices={state.slices} onReset={handleReset} />
        ) : (
          <UploadArea
            onFileSelect={handleFileSelect}
            isProcessing={state.isProcessing}
          />
        )}
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;