"use client";

import { ImageUrlType } from "@/graphql/generated/graphql";
import { useState } from "react";

interface Props {
  imageUrls: string[];
  images: ImageUrlType[];
}

export function PhotoStrip({ imageUrls, images }: Props) {
  const [enlarged, setEnlarged] = useState<string | null>(null);
  if (!images.length) {
    return (
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-sm text-muted-foreground text-center py-4">
          No photos uploaded
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-sm font-bold text-foreground mb-3">
          {imageUrls.length} Photos
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <div key={index} className="shrink-0">
              <button
                onClick={() => setEnlarged(image.imageUrl)}
                className="w-20 h-16 rounded-lg overflow-hidden bg-muted block hover:opacity-80 transition-opacity"
              >
                <img
                  src={image.imageUrl}
                  alt={`Vehicle ${image.angle} Image`}
                  className="w-full h-full object-cover"
                />
              </button>
              <p className="text-[10px] text-muted-foreground text-center mt-1">
                {image.angle.replace(/_/g, " ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {enlarged && (
        <div
          className="fixed h-full inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlarged(null)}
        >
          <img
            src={enlarged}
            alt="Enlarged"
            className=" h-75 rounded-sm object-contain"
          />
        </div>
      )}
    </>
  );
}
