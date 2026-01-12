export interface ProcessedSlice {
  id: number;
  dataUrl: string; // Base64 representation for preview
  blob: Blob; // Blob for downloading/zipping
  label: string;
  filename: string;
}

export interface AppState {
  originalImage: string | null;
  slices: ProcessedSlice[];
  isProcessing: boolean;
  error: string | null;
}

export type Theme = 'dark' | 'light';