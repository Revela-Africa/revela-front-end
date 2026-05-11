import { Loader2 } from "lucide-react";

export function VerifyStep() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <Loader2 size={32} className="animate-spin text-[#E8A020]" />
      <div className="text-center">
        <p className="font-bold text-foreground">Verifying your invite...</p>
        <p className="text-sm text-muted-foreground mt-1">
          This will only take a moment
        </p>
      </div>
    </div>
  );
}