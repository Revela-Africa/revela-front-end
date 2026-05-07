"use client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className=" h-screen bg-[#F7F2EB] overflow-hidden font-cabinet ">
      <main>{children}</main>
    </div>
  );
}
