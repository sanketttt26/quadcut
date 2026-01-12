import JSZip from 'jszip';
import { ProcessedSlice } from '../types';

export const generateZip = async (slices: ProcessedSlice[]): Promise<Blob> => {
  const zip = new JSZip();
  const folder = zip.folder("quadcut-images");

  if (!folder) throw new Error("Failed to create zip folder");

  slices.forEach((slice) => {
    folder.file(slice.filename, slice.blob);
  });

  return await zip.generateAsync({ type: "blob" });
};