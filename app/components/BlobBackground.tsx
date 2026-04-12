// "use client";

// import { motion } from "framer-motion";

// type BlobProps = {
//   className: string;
//   gradient: string;
//   duration: number;
//   delay?: number;
// };

// function Blob({ className, gradient, duration, delay = 0 }: BlobProps) {
//   return (
//     <motion.div
//       className={`absolute rounded-full blur-[80px] opacity-45 ${className}`}
//       style={{ background: gradient }}
//       animate={{
//         x: [0, 40, -20, 30],
//         y: [0, -30, 50, 20],
//         scale: [1, 1.08, 0.94, 1.05],
//       }}
//       transition={{
//         duration,
//         delay,
//         ease: "linear",
//         repeat: Infinity,
//       }}
//     />
//   );
// }

// export default function BlobBackground() {
//   return (
//     <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//       <Blob
//         className="top-[-15%] left-[-10%] w-[700px] h-[700px]"
//         gradient="radial-gradient(circle,#FFD580,#FFB800)"
//         duration={18}
//       />

//       <Blob
//         className="top-[20%] right-[-15%] w-[600px] h-[600px]"
//         gradient="radial-gradient(circle,#FDE8D5,#F5C090)"
//         duration={22}
//         delay={-6}
//       />

//       <Blob
//         className="bottom-[-10%] left-[20%] w-[500px] h-[500px]"
//         gradient="radial-gradient(circle,#E8F4FF,#C8DFF5)"
//         duration={26}
//         delay={-12}
//       />

//       <Blob
//         className="bottom-[10%] right-[10%] w-[400px] h-[400px]"
//         gradient="radial-gradient(circle,#FFF3CC,#FFE080)"
//         duration={20}
//         delay={-4}
//       />

//       <Blob
//         className="top-[50%] left-[40%] w-[300px] h-[300px] opacity-30"
//         gradient="radial-gradient(circle,#FFE5C0,#F5C060)"
//         duration={16}
//         delay={-8}
//       />
//     </div>
//   );
// }

export default function BlobBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[60px] opacity-40 bg-[radial-gradient(circle,#FFD580,#FFB800)] animate-[blobFloat_18s_ease-in-out_infinite]" />

      <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] rounded-full blur-[60px] opacity-40 bg-[radial-gradient(circle,#FDE8D5,#F5C090)] animate-[blobFloat_22s_ease-in-out_infinite]" />

      <div className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] rounded-full blur-[60px] opacity-30 bg-[radial-gradient(circle,#E8F4FF,#C8DFF5)] animate-[blobFloat_26s_ease-in-out_infinite]" />

      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full blur-[60px] opacity-30 bg-[radial-gradient(circle,#FFF3CC,#FFE080)] animate-[blobFloat_20s_ease-in-out_infinite]" />

    </div>
  );
}