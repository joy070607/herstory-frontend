"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

interface QrCameraScannerProps {
  onDecode: (text: string) => void;
  onCancel: () => void;
}

export function QrCameraScanner({ onDecode, onCancel }: QrCameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let frameId: number;
    let cancelled = false;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        frameId = requestAnimationFrame(tick);
      } catch {
        setError("카메라를 사용할 수 없습니다. 권한을 확인해주세요.");
      }
    }

    function tick() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (result?.data) {
            onDecode(result.data);
            return;
          }
        }
      }
      frameId = requestAnimationFrame(tick);
    }

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      stream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-neutral-200 px-4 py-2 text-xs font-medium text-neutral-700 transition-transform active:scale-[0.96]"
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[17px]">
      <video ref={videoRef} className="h-[280px] w-full object-cover" playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
      <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-white/80" />
      <button
        type="button"
        onClick={onCancel}
        className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white transition-transform active:scale-[0.96]"
      >
        취소
      </button>
    </div>
  );
}
