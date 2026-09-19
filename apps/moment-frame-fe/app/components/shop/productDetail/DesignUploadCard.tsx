"use client";

import { ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import { DesignDraft, Orientation } from "./types";

type DesignUploadCardProps = {
  draft: DesignDraft;
  index: number;
  size: string;
  onOrientationChange: (orientation: Orientation) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onDraftChange: (changes: Partial<DesignDraft>) => void;
};

export function DesignUploadCard({
  draft,
  index,
  size,
  onOrientationChange,
  onUpload,
  onDraftChange,
}: DesignUploadCardProps) {
  return (
    <article className="upload-design-card">
      <div className="upload-design-heading">
        <h3>Design {index + 1}</h3>
        <span>{size}</span>
      </div>
      <div className="orientation-options">
        <button
          className={draft.orientation === "landscape" ? "is-active" : ""}
          type="button"
          onClick={() => onOrientationChange("landscape")}
        >
          Landscape
        </button>
        <button
          className={draft.orientation === "portrait" ? "is-active" : ""}
          type="button"
          onClick={() => onOrientationChange("portrait")}
        >
          Portrait
        </button>
      </div>
      {draft.imageDataUrl ? (
        <div className={`upload-cropper upload-${draft.orientation}`}>
          <Cropper
            image={draft.imageDataUrl}
            crop={draft.crop}
            zoom={draft.zoom}
            aspect={draft.orientation === "landscape" ? 4 / 3 : 3 / 4}
            onCropChange={(crop) => onDraftChange({ crop })}
            onZoomChange={(zoom) => onDraftChange({ zoom })}
            onCropComplete={(_, croppedAreaPixels) =>
              onDraftChange({ croppedAreaPixels })
            }
          />
          <label className="upload-replace">
            <span>Replace photo</span>
            <input type="file" accept="image/*" onChange={onUpload} />
          </label>
        </div>
      ) : (
        <label className={`upload-dropzone upload-${draft.orientation}`}>
          <strong>Upload photo {index + 1}</strong>
          <span>
            {draft.orientation === "landscape"
              ? "Landscape image"
              : "Portrait image"}
          </span>
          <input type="file" accept="image/*" onChange={onUpload} />
        </label>
      )}
      {draft.imageDataUrl && (
        <label className="upload-zoom">
          <span>Zoom</span>
          <input
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={draft.zoom}
            onChange={(event) =>
              onDraftChange({ zoom: Number(event.target.value) })
            }
          />
        </label>
      )}
    </article>
  );
}
