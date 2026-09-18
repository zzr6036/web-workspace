"use client";

import { ChangeEvent } from "react";
import { DesignUploadCard } from "./DesignUploadCard";
import { DesignDraft, Orientation } from "./types";

type DesignUploadModalProps = {
  drafts: DesignDraft[];
  productSize: string;
  total: number;
  onClose: () => void;
  onUpload: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onOrientationChange: (index: number, orientation: Orientation) => void;
  onDraftChange: (index: number, changes: Partial<DesignDraft>) => void;
  onAddToCart: () => void;
  onOpenPreview?: () => void;
};

export function DesignUploadModal({
  drafts,
  productSize,
  total,
  onClose,
  onUpload,
  onOrientationChange,
  onDraftChange,
  onAddToCart,
  onOpenPreview,
}: DesignUploadModalProps) {
  const isReady = drafts.every(
    (draft) => draft.imageDataUrl && draft.croppedAreaPixels,
  );
  const hasImage = drafts.some((draft) => Boolean(draft.imageDataUrl));
  return (
    <div className="upload-modal-backdrop" role="presentation">
      <section
        className="upload-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-title"
      >
        <button
          className="upload-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close upload dialog"
        >
          ×
        </button>
        <p className="eyebrow">Upload Photo</p>
        <h2 id="upload-title">Prepare your photo panels.</h2>
        <p className="upload-intro">
          Choose an orientation and crop one photo for each panel.
        </p>
        <div className="upload-design-list">
          {drafts.map((draft, index) => (
            <DesignUploadCard
              key={draft.id}
              draft={draft}
              index={index}
              size={productSize}
              onOrientationChange={(orientation) =>
                onOrientationChange(index, orientation)
              }
              onUpload={(event) => onUpload(index, event)}
              onDraftChange={(changes) => onDraftChange(index, changes)}
            />
          ))}
        </div>
        <div className="upload-modal-actions">
          {onOpenPreview && (
            <button
              className="upload-preview-btn"
              type="button"
              onClick={onOpenPreview}
              disabled={!hasImage}
            >
              👁️ Preview on Frame
            </button>
          )}
          <button
            className="upload-confirm"
            type="button"
            onClick={onAddToCart}
            disabled={!isReady}
          >
            ADD TO CART · SGD {total.toFixed(2)}
          </button>
        </div>
      </section>
    </div>
  );
}
