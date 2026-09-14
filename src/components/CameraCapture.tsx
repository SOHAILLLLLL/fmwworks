"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PhotoAngleKey } from "@/lib/types";
import { AngleGuide } from "@/components/angle-guides";

export function CameraCapture({
  angle,
  captured,
  onCapture,
  onRetake,
}: {
  angle: PhotoAngleKey;
  captured: string | null;
  onCapture: (blob: Blob, previewUrl: string) => void;
  onRetake: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraFailed, setCameraFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (captured) return;
    let cancelled = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setReady(true);
      } catch {
        if (!cancelled) setCameraFailed(true);
      }
    }
    start();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [captured, angle]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) onCapture(blob, URL.createObjectURL(blob));
      },
      "image/jpeg",
      0.9,
    );
  }, [onCapture]);

  const onFileFallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onCapture(file, URL.createObjectURL(file));
    },
    [onCapture],
  );

  if (captured) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-border-strong bg-surface-sunken">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={captured} alt="Captured" className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={onRetake}
          className="absolute bottom-3 right-3 border border-border-strong bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        >
          Retake
        </button>
      </div>
    );
  }

  if (cameraFailed) {
    return (
      <label className="flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-border-strong bg-surface-sunken text-sm text-ink-muted">
        Tap to take or choose a photo
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileFallback} />
      </label>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-border-strong bg-ink">
      <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 p-6">
        <AngleGuide angle={angle} />
      </div>
      {ready && (
        <button
          type="button"
          onClick={capture}
          aria-label="Capture photo"
          className="absolute bottom-4 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-4 border-surface bg-stamp-red shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        />
      )}
    </div>
  );
}
