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
