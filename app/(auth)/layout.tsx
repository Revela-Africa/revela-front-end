import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center font-cabinet">
      <div className="w-full max-w-md bg-[#F7F2EB] h-dvh flex flex-col justify-between">
        <nav className="flex p-6  ">
          <Link href="/">
            <img
              src="/icons/primary-logo.svg"
              alt="Revela"
              className="h-8 w-auto"
            />
          </Link>
        </nav>

        <main className=" px-6 h-full overflow-scroll ">{children}</main>

        <p className="text-center text-xs text-muted-foreground ">
          © {new Date().getFullYear()} Revela. All rights reserved.
        </p>
      </div>
    </div>
  );
}
