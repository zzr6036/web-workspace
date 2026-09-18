import { Area } from "react-easy-crop";

export type Orientation = "landscape" | "portrait";

export type DesignDraft = {
  id: number;
  orientation: Orientation;
  imageDataUrl?: string;
  crop: { x: number; y: number };
  zoom: number;
  croppedAreaPixels: Area | null;
  imageMetadata?: {
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
    imageWidth: number;
    imageHeight: number;
  };
};

export const createDesignDraft = (id: number): DesignDraft => ({
  id,
  orientation: "landscape",
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: null,
});
