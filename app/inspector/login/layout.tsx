interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center p-4 font-cabinet">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img
            src="/icons/primary-logo.svg"
            alt="Revela"
            className="h-8 w-auto"
          />
          <span className="text-xs font-bold bg-[#E8A020] text-white px-2 py-0.5 rounded">
            INSPECTOR
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
          {children}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Revela Inspector Portal · Restricted Access
        </p>
      </div>
    </div>
  );
}