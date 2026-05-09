import { CheckCircle2, Loader2 } from "lucide-react";

export function SuccessStep() {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center">
        <CheckCircle2 size={32} color="white" />
      </div>
      <div>
        <p className="font-extrabold text-foreground text-lg">
          Account activated!
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Redirecting you to your dashboard...
        </p>
      </div>
      <Loader2 size={16} className="animate-spin text-muted-foreground" />
    </div>
  );
}