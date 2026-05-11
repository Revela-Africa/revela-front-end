export function ErrorStep() {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
        <span className="text-3xl">⚠️</span>
      </div>
      <div>
        <p className="font-extrabold text-foreground">Invalid invite link</p>
        <p className="text-sm text-muted-foreground mt-1">
          This link may have expired or already been used. Please contact your
          admin.
        </p>
      </div>
    </div>
  );
}