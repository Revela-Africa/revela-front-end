"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { X, Zap, ZapOff, ImageIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  angleLabel: string;
  onCapture: (file: File) => void;
  onClose: () => void;
  onGallerySelect: (file: File) => void;
}

export function CameraCapture({
  angleLabel,
  onCapture,
  onClose,
  onGallerySelect,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );
  const [captured, setCaptured] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  // ── Start camera ───────────────────────────────────────────
  const startCamera = useCallback(async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }

    setCaptured(null);
    setError(null);
    setIsReady(false);
    setTorchOn(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsReady(true);

          // Check torch support
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities();
          setTorchSupported("torch" in capabilities);
        };
      }
    } catch {
      setError("Camera access denied. Use the gallery option below.");
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  // ── Torch ──────────────────────────────────────────────────
  async function toggleTorch() {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as any],
      });
      setTorchOn((prev) => !prev);
    } catch {}
  }

  // ── Capture ────────────────────────────────────────────────
  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const fileName = `${angleLabel.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: "image/jpeg" });

        setCaptured(canvas.toDataURL("image/jpeg"));
        streamRef.current?.getTracks().forEach((t) => t.stop());
        setTimeout(() => onCapture(file), 600);
      },
      "image/jpeg",
      0.92,
    );
  }

  // ── Gallery ────────────────────────────────────────────────
  function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onGallerySelect(file);
    e.target.value = "";
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black">
      {!captured ? (
        <div className="relative aspect-4/3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {!isReady && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
            </div>
          )}

          {isReady && (
            <>
              <div className="absolute top-0 left-0 right-0 h-[18%] bg-linear-to-b from-black/60 to-black/" />

              <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-linear-to-t from-black/60 to-black/" />

              {/* ── Focus rect — dashed orange border ── */}
              <div
                className="absolute rounded-lg"
                style={{
                  top: "18%",
                  bottom: "28%",
                  left: "8%",
                  right: "8%",
                }}
              >
                <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-[3px] border-l-[3px] border-[#E8A020] rounded-tl-md" />

                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-[3px] border-r-[3px] border-[#E8A020] rounded-tr-md" />

                <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-[3px] border-l-[3px] border-[#E8A020] rounded-bl-md" />

                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-[3px] border-r-[3px] border-[#E8A020] rounded-br-md" />

                {/* Angle label — center of focus rect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-base font-semibold tracking-wide drop-shadow-lg">
                    Align {angleLabel}
                  </p>
                </div>
              </div>

              {/* ── Perfect angle pill — above focus rect ── */}
              <div
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#E8A020] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                style={{ top: "8%" }}
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#E8A020"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Perfect angle!
              </div>

              {/* ── Controls bar ── */}
              <div
                className="absolute bottom-5 left-0 right-0 flex items-center justify-between px-8"
                style={{ height: "18%" }}
              >
                {/* Torch */}
                <button
                  type="button"
                  onClick={torchSupported ? toggleTorch : undefined}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center transition-colors",
                    torchSupported
                      ? "bg-white/20 hover:bg-white/30 border border-[#FFFFFF4D]"
                      : "opacity-40 cursor-not-allowed",
                  )}
                >
                  {torchOn ? (
                    <Zap size={20} className="text-[#E8A020]" fill="#E8A020" />
                  ) : (
                    <ZapOff size={20} className="text-white" />
                  )}
                </button>

                {/* Capture button */}
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="w-16 h-16 rounded-full bg-white border-[3px] border-[#1a1a2e] flex items-center justify-center shadow-xl hover:scale-95 active:scale-90 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-black" />
                </button>

                {/* Gallery */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 border border-[#FFFFFF4D] transition-colors"
                >
                  <ImageIcon size={20} className="text-white" />
                </button>
              </div>
            </>
          )}

          {/* Close button — top right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-10"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      ) : (
        /* ── Captured preview ── */
        <div className="relative aspect-4/3">
          <img
            src={captured}
            alt="Captured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-[#E8A020] text-white text-sm flex  items-center justify-center gap-x-1 font-bold px-4 py-2 rounded-full">
              <Check /> Photo captured!
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="aspect-4/3 flex flex-col items-center justify-center gap-4 bg-muted p-6 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={startCamera}
            className="text-xs text-[#E8A020] font-bold hover:underline"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={onClose}
            className=" rounded-full bg-(--gold-secondary) p-2 px-4 text-white flex items-center justify-center"
          >
            Close <X size={16} className="text-xl " />
          </button>
        </div>
      )}

      {/* Hidden canvas + gallery input */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleGalleryChange}
      />
    </div>
  );
}
