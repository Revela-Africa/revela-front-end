const VehicleScanner = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <>
      <style>{`
        @keyframes scanMove {
          0% {
            top: 12%;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            top: 78%;
            opacity: 0;
          }
        }
        .scan-line {
          animation: scanMove 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex items-center justify-center h-54.75  p-8">
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-[#F59E0B4D]" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-[#F59E0B4D]" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-[#F59E0B4D]" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-[#F59E0B4D]" />

          <div className="relative bg-[#F2F0EB] overflow-hidden">
            <div className="flex justify-center px-12 pt-10">
              <img
                src={`/images/scanner-default.png`}
                alt="Vehicle"
                className=" h-15 object-contain relative z-10"
              />
            </div>

            <div className="mx-12 h-10 bg-[#4A4A4A] -mt-5 relative z-0" />

            {/* Scanning Line */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div
                className="absolute left-0 right-0 h-0.5 scan-line"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(232, 160, 32, 0) 0%, #E8A020 50%, rgba(232, 160, 32, 0) 100%)",
                  boxShadow: "0px 0px 15px 0px #E8A020CC",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleScanner;
