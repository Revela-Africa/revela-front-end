"use client";


import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type FileDropzoneProps = {
  label: string;
  selectedFile?: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
};

export function FileDropzone({
  label,
  selectedFile = null,
  onFileChange,
  error,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSizeMB = 10,
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const validateAndSetFile = (file: File | null) => {
    if (!file) {
      onFileChange(null);
      return;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      onFileChange(null);
      return;
    }

    onFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    validateAndSetFile(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-normal tracking-[1.2px] uppercase text-[#3A3A3A]">
        {label}
      </label>

      <label
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors",
          selectedFile
            ? "border-[#E8A020] bg-[#FFF7E4]"
            : "border-border hover:bg-muted/50",
          isDragging && "border-[#E8A020] bg-[#FFF7E4]",
          error && "border-destructive",
        )}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
         { !selectedFile && <UploadCloud
            size={24}
            className={
              selectedFile ? "text-[#E8A020]" : "text-muted-foreground"
            }
          />
}
          {selectedFile ? (
            <div className="flex flex-col items-center gap-2">
              {/* Image Preview */}
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={previewUrl ?? undefined}
                  alt="preview"
                  className="h-20 w-40 object-cover rounded-md border"
                />
              ) : (
                // PDF / fallback
                <div className="flex items-center gap-2 text-sm text-[#E8A020]">
                  📄 <span>{selectedFile.name}</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Click or drag to replace
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                <span className="text-[#E8A020] font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG up to 10MB
              </p>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            validateAndSetFile(file);
          }}
        />
      </label>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
