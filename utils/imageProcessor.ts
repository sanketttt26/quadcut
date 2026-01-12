import { ProcessedSlice } from "../types";

export const splitImage = async (file: File): Promise<ProcessedSlice[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      const width = img.width;
      const height = img.height;
      const sliceHeight = Math.floor(height / 4);
      const slices: ProcessedSlice[] = [];

      canvas.width = width;
      canvas.height = sliceHeight;

      const processSlice = async (index: number) => {
        ctx.clearRect(0, 0, width, sliceHeight);

        ctx.drawImage(
          img,
          0,
          index * sliceHeight,
          width,
          sliceHeight,
          0,
          0,
          width,
          sliceHeight
        );

        // Convert to Blob and DataURL
        const dataUrl = canvas.toDataURL(file.type);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              slices.push({
                id: index + 1,
                dataUrl,
                blob,
                label: `${index + 1} - ${getSliceLabel(index)}`,
                filename: `quadcut-part-${index + 1}.${
                  file.type.split("/")[1]
                }`,
              });

              if (slices.length === 4) {
                slices.sort((a, b) => a.id - b.id);
                resolve(slices);
              }
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          file.type,
          1.0
        );
      };

      (async () => {
        for (let i = 0; i < 4; i++) {
          await processSlice(i);
        }
      })();
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
};

const getSliceLabel = (index: number): string => {
  switch (index) {
    case 0:
      return "First strip (upload first)";
    case 1:
      return "Second strip";
    case 2:
      return "Third strip";
    case 3:
      return "Fourth strip";
    default:
      return `Part ${index + 1}`;
  }
};
