export function fileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function imageDimensions(imageDataUrl: string) {
  return new Promise<{ imageWidth: number; imageHeight: number }>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve({ imageWidth: image.naturalWidth, imageHeight: image.naturalHeight });
    image.onerror = () => reject(new Error("Unable to read image dimensions"));
    image.src = imageDataUrl;
  });
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number } | null,
  orientation?: "landscape" | "portrait"
): Promise<string> {
  return new Promise((resolve) => {
    const image = new window.Image();
    // Only use crossOrigin for remote HTTP URLs
    if (imageSrc.startsWith("http")) {
      image.crossOrigin = "anonymous";
    }
    image.onload = () => {
      let crop = pixelCrop;
      // If crop is null or empty, calculate default centered crop based on orientation
      if (!crop || !crop.width || !crop.height) {
        const targetAspect = orientation === "portrait" ? 3 / 4 : 4 / 3;
        const imgAspect = image.naturalWidth / image.naturalHeight;
        let w = image.naturalWidth;
        let h = image.naturalHeight;
        let x = 0;
        let y = 0;
        if (imgAspect > targetAspect) {
          // image is wider than target aspect ratio
          w = Math.round(image.naturalHeight * targetAspect);
          x = Math.round((image.naturalWidth - w) / 2);
        } else {
          // image is taller than target aspect ratio
          h = Math.round(image.naturalWidth / targetAspect);
          y = Math.round((image.naturalHeight - h) / 2);
        }
        crop = { x, y, width: w, height: h };
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(crop.width);
      canvas.height = Math.round(crop.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(imageSrc);
        return;
      }
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
      resolve(canvas.toDataURL("image/jpeg", 0.95));
    };
    image.onerror = () => resolve(imageSrc);
    image.src = imageSrc;
  });
}

