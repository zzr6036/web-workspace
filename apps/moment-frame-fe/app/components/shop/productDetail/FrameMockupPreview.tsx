/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getCroppedImg } from "../../../lib/imageUpload";
import { getProductMockupSpec, MockupVariant } from "../../../lib/frameMockupConfig";
import {
  QuadCorners,
  getMatrix3dForCorners,
  getClipPathPolygon,
} from "../../../lib/homography";
import { DesignDraft, Orientation } from "./types";

type FrameMockupPreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  drafts: DesignDraft[];
  subcategoryKey: string;
  productName: string;
  onAddToCart?: () => void;
  isReadyToAddToCart?: boolean;
};

export function FrameMockupPreview({
  isOpen,
  onClose,
  drafts,
  subcategoryKey,
  productName,
  onAddToCart,
  isReadyToAddToCart = false,
}: FrameMockupPreviewProps) {
  const [activeDraftIndex, setActiveDraftIndex] = useState(0);
  const [croppedImages, setCroppedImages] = useState<Record<number, string>>({});
  const [viewMode, setViewMode] = useState<"room" | "flat">("room");

  const currentDraft = drafts[activeDraftIndex] ?? drafts[0];
  const draftOrientation: Orientation = currentDraft?.orientation ?? "portrait";

  // Calibrator states
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [activeDragCorner, setActiveDragCorner] = useState<number | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Active orientation for the preview mockup scene (defaults to the draft's orientation)
  const [activeOrientation, setActiveOrientation] = useState<Orientation>(draftOrientation);

  // Active mockup variant spec from config
  const initialSpec: MockupVariant = getProductMockupSpec(subcategoryKey, activeOrientation);
  const [activeSlideSrc, setActiveSlideSrc] = useState<string>(initialSpec.slideSrc);
  const [corners, setCorners] = useState<QuadCorners>(initialSpec.corners);

  // Border radius state (with interactive slider in admin mode)
  const [borderRadius, setBorderRadius] = useState<string>(
    initialSpec.borderRadius ?? "14px 14px 4px 4px"
  );
  const [radiusNumber, setRadiusNumber] = useState<number>(() => {
    const match = (initialSpec.borderRadius ?? "14px").match(/\d+/);
    return match ? Number(match[0]) : 14;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number }>({
    width: 500,
    height: 500,
  });

  // When draft orientation changes, sync active orientation
  useEffect(() => {
    setActiveOrientation(draftOrientation);
  }, [draftOrientation]);

  // When activeOrientation or subcategoryKey changes, reload spec
  useEffect(() => {
    const spec = getProductMockupSpec(subcategoryKey, activeOrientation);
    setActiveSlideSrc(spec.slideSrc);
    setCorners(spec.corners);
    const specRadius = spec.borderRadius ?? "14px 14px 4px 4px";
    setBorderRadius(specRadius);
    const match = specRadius.match(/\d+/);
    setRadiusNumber(match ? Number(match[0]) : 14);
  }, [subcategoryKey, activeOrientation]);

  // Measure container for pixel-perfect matrix3d homography computation
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerDimensions({
          width: entry.contentRect.width || 500,
          height: entry.contentRect.height || 500,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  // Generate cropped preview images respecting orientation ratio (3:4 or 4:3)
  useEffect(() => {
    let isCancelled = false;

    async function generateCrops() {
      const results: Record<number, string> = {};
      for (let i = 0; i < drafts.length; i++) {
        const draft = drafts[i];
        if (draft.imageDataUrl) {
          const cropped = await getCroppedImg(
            draft.imageDataUrl,
            draft.croppedAreaPixels,
            draft.orientation
          );
          if (!isCancelled) {
            results[i] = cropped;
          }
        }
      }
      if (!isCancelled) {
        setCroppedImages(results);
      }
    }

    if (isOpen) {
      generateCrops();
    }

    return () => {
      isCancelled = true;
    };
  }, [isOpen, drafts]);

  // Dragging logic for calibrator pins
  const handlePointerDown = (index: number, e: React.PointerEvent) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveDragCorner(index);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activeDragCorner === null || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const xPercent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const yPercent = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

      setCorners((prev) => {
        const updated = [...prev] as QuadCorners;
        updated[activeDragCorner] = [
          parseFloat(xPercent.toFixed(1)),
          parseFloat(yPercent.toFixed(1)),
        ];
        return updated;
      });
    },
    [activeDragCorner]
  );

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeDragCorner !== null) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setActiveDragCorner(null);
    }
  };

  const copyCoordinates = () => {
    const codeSnippet = `      corners: [
        [${corners[0][0]}, ${corners[0][1]}], // Top-Left
        [${corners[1][0]}, ${corners[1][1]}], // Top-Right
        [${corners[2][0]}, ${corners[2][1]}], // Bottom-Right
        [${corners[3][0]}, ${corners[3][1]}], // Bottom-Left
      ],
      borderRadius: "${borderRadius}",`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const resetCoordinates = () => {
    const spec = getProductMockupSpec(subcategoryKey, activeOrientation);
    setCorners(spec.corners);
    setActiveSlideSrc(spec.slideSrc);
    const specRadius = spec.borderRadius ?? "14px 14px 4px 4px";
    setBorderRadius(specRadius);
    const match = specRadius.match(/\d+/);
    setRadiusNumber(match ? Number(match[0]) : 14);
  };

  if (!isOpen) return null;

  const currentCroppedUrl = croppedImages[activeDraftIndex] ?? currentDraft?.imageDataUrl;

  // Source crop aspect ratio calculation (width / height)
  const cropPixels = currentDraft?.croppedAreaPixels;
  const cropAspect =
    cropPixels && cropPixels.width && cropPixels.height
      ? cropPixels.width / cropPixels.height
      : draftOrientation === "portrait"
        ? 3 / 4
        : 4 / 3;

  // Virtual source canvas: 500 x (500 / cropAspect)
  const sourceWidth = 500;
  const sourceHeight = Math.round(500 / cropAspect);

  // Compute live Homography matrix3d transform from source crop bounds to 4 corners
  const matrix3dStyle = getMatrix3dForCorners(
    corners,
    containerDimensions.width,
    containerDimensions.height,
    sourceWidth,
    sourceHeight
  );

  // Compute polygon clip for sharp boundaries
  const clipPathStyle = getClipPathPolygon(corners);

  const cornerLabels = ["TL", "TR", "BR", "BL"];

  // Available sample slides to select from for this subcategory
  const availableSlides = [
    `/frames/product-slides/${subcategoryKey}/slide-01.png`,
    `/frames/product-slides/${subcategoryKey}/slide-02.png`,
    `/frames/product-slides/${subcategoryKey}/slide-03.png`,
  ];

  return (
    <div className="upload-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="upload-modal frame-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="frame-preview-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="upload-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close preview dialog"
        >
          ×
        </button>

        <div className="preview-header-row">
          <div>
            <p className="eyebrow">Real-World Mockup Preview</p>
            <h2 id="frame-preview-title">See your photo on the frame.</h2>
          </div>
          <button
            type="button"
            className={`preview-calibrate-toggle ${isCalibrating ? "is-active" : ""}`}
            onClick={() => setIsCalibrating(!isCalibrating)}
            title="Toggle interactive 4-corner calibration"
          >
            {isCalibrating ? "✓ Exit Calibrator" : "🎯 Calibrate (Admin)"}
          </button>
        </div>

        <p className="upload-intro">
          Dynamic JavaScript homography projection for <strong>{productName}</strong>.
        </p>

        {/* Admin Slide Selector Bar (Only in Calibration Mode) */}
        {/* {isCalibrating && (
          <div className="preview-orientation-bar">
            <div className="preview-slide-selector">
              <label htmlFor="slide-select">Slide Image:</label>
              <select
                id="slide-select"
                value={activeSlideSrc}
                onChange={(e) => setActiveSlideSrc(e.target.value)}
              >
                {availableSlides.map((src, i) => (
                  <option key={src} value={src}>
                    Slide 0{i + 1} ({src.split("/").pop()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )} */}

        {drafts.length > 1 && (
          <div className="preview-design-tabs">
            {drafts.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`preview-tab-btn ${activeDraftIndex === idx ? "is-active" : ""}`}
                onClick={() => setActiveDraftIndex(idx)}
              >
                Panel {idx + 1}
              </button>
            ))}
          </div>
        )}

        <div className="preview-view-toggle">
          <button
            type="button"
            className={viewMode === "room" ? "is-active" : ""}
            onClick={() => setViewMode("room")}
          >
            🖼️ In-Room Tabletop
          </button>
          <button
            type="button"
            className={viewMode === "flat" ? "is-active" : ""}
            onClick={() => setViewMode("flat")}
          >
            🔍 Cropped Print Area
          </button>
        </div>

        {/* Live calibration toolbar when admin mode is on */}
        {isCalibrating && (
          <div className="preview-calibrator-bar">
            <div className="calibrator-top-row">
              <span>Drag pins to align with frame corners.</span>
              <div className="calibrator-actions">
                <button type="button" onClick={resetCoordinates} className="calibrator-reset-btn">
                  Reset
                </button>
                <button type="button" onClick={copyCoordinates} className="calibrator-copy-btn">
                  {copiedNotification ? "✓ Copied to Clipboard!" : "📋 Copy Coordinates"}
                </button>
              </div>
            </div>

            {/* Interactive Border Radius Slider */}
            <div className="calibrator-radius-row">
              <label htmlFor="radius-slider" className="calibrator-radius-label">
                Border Radius: <strong>{radiusNumber}px</strong>
              </label>
              <input
                id="radius-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={radiusNumber}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRadiusNumber(val);
                  setBorderRadius(`${val}px`);
                }}
                className="calibrator-radius-slider"
              />
              <span className="calibrator-radius-value">{borderRadius}</span>
            </div>
          </div>
        )}

        <div className="frame-mockup-stage">
          {viewMode === "room" ? (
            <div
              ref={containerRef}
              className="frame-mockup-container"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Background realistic tabletop photo */}
              <img
                src={activeSlideSrc}
                alt="Product Mockup Scene"
                className="frame-mockup-background"
                draggable={false}
              />

              {/* Dynamic Homography Projection Layer */}
              {currentCroppedUrl ? (
                <div className="frame-dynamic-homography-layer">
                  <div
                    className="frame-homography-wrapper"
                    style={{
                      width: `${sourceWidth}px`,
                      height: `${sourceHeight}px`,
                      transform: matrix3dStyle,
                      transformOrigin: "0 0",
                      borderRadius: borderRadius,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={currentCroppedUrl}
                      alt="Your cropped photo"
                      className="frame-homography-photo"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        borderRadius: borderRadius,
                      }}
                      draggable={false}
                    />

                    {/* Ambient glass reflection highlight */}
                    <div className={`frame-mockup-glare glare-${initialSpec.glareType ?? "diagonal"}`} />
                    <div className="frame-mockup-inner-shadow" />
                  </div>
                </div>
              ) : (
                <div className="frame-mockup-empty-notice">
                  Please upload a photo first to view the preview.
                </div>
              )}

              {/* Draggable Corner Handles for Calibrator */}
              {isCalibrating &&
                corners.map(([px, py], index) => (
                  <div
                    key={index}
                    className={`calibrator-pin pin-${index} pin-${cornerLabels[index].toLowerCase()} pin-low-opacity ${activeDragCorner === index ? "is-dragging" : ""
                      }`}
                    style={{ left: `${px}%`, top: `${py}%` }}
                    onPointerDown={(e) => handlePointerDown(index, e)}
                  >
                    <span className="pin-crosshair" />
                    <span className="pin-label">{cornerLabels[index]}</span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="frame-flat-preview-container">
              {currentCroppedUrl ? (
                <img
                  src={currentCroppedUrl}
                  alt="Flat crop preview"
                  className="frame-flat-photo"
                />
              ) : (
                <p>No photo uploaded yet</p>
              )}
            </div>
          )}
        </div>

        <div className="frame-preview-actions">
          <button
            type="button"
            className="frame-preview-back-btn"
            onClick={onClose}
          >
            ← Back to Adjust Crop
          </button>
          {onAddToCart && (
            <button
              type="button"
              className="upload-confirm"
              onClick={() => {
                onClose();
                onAddToCart();
              }}
              disabled={!isReadyToAddToCart}
            >
              Confirm & Add to Cart
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
