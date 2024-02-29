import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export const useImageCompress = () => {
  const [isLoading, setIsLoading] = useState(false);

  const compressImage = async ({
    maxSizeMB,
    maxWidthOrHeight,
    imageFile,
  }: {
    maxSizeMB: number;
    maxWidthOrHeight: number;
    imageFile: File;
  }) => {
    if (isLoading) return;

    setIsLoading(true);

    const options = {
      maxSizeMB, // 이미지 최대 용량
      maxWidthOrHeight, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imageUrl = await imageCompression.getDataUrlFromFile(
        compressedFile
      );

      return { compressedFile, imageUrl };
    } catch (error) {
      console.error(error);
      throw new Error('이미지 압축에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { compressImage, isLoading };
};
