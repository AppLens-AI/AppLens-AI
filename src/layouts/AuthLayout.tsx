import { Outlet } from "react-router-dom";

function MockupCard({
  className,
  delay,
  bgColor,
  accentColor,
}: {
  className: string;
  delay: number;
  bgColor: string;
  accentColor: string;
}) {
  return (
    <div
      className={`absolute ${className} transition-transform duration-1000`}
      style={{
        animation: `floatSmooth ${12 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className={`relative rounded-2xl ${bgColor} shadow-2xl overflow-hidden`}
        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="h-8 bg-white/80 backdrop-blur-sm flex items-center px-3 border-b border-gray-200/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex-1 h-4 bg-gray-100 rounded max-w-[120px]" />
        </div>

        <div className={`p-4 ${bgColor}`}>
          <div
            className={`h-full w-full rounded-lg bg-gradient-to-br ${accentColor} flex items-center justify-center`}
          >
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes floatSmooth {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(1deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1deg);
          }
          75% {
            transform: translateY(-20px) rotate(0.5deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            animation: "pulse-slow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
            animation: "pulse-slow 10s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
            animation: "pulse-slow 12s ease-in-out infinite 4s",
          }}
        />

        <MockupCard
          className="w-52 h-40 top-0 left-[8%] -rotate-12"
          delay={0}
          bgColor="bg-gradient-to-br from-violet-500 to-purple-600"
          accentColor="from-violet-400/40 to-purple-500/40"
        />

        <MockupCard
          className="w-64 h-48 top-[15%] right-[5%] rotate-[8deg]"
          delay={2}
          bgColor="bg-gradient-to-br from-blue-500 to-cyan-500"
          accentColor="from-blue-400/40 to-cyan-400/40"
        />

        <MockupCard
          className="w-48 h-36 bottom-[20%] left-[5%] rotate-6"
          delay={4}
          bgColor="bg-gradient-to-br from-rose-500 to-pink-500"
          accentColor="from-rose-400/40 to-pink-400/40"
        />

        <MockupCard
          className="w-56 h-44 bottom-[10%] right-[10%] -rotate-6"
          delay={3}
          bgColor="bg-gradient-to-br from-emerald-500 to-teal-500"
          accentColor="from-emerald-400/40 to-teal-400/40"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="20"
                cy="20"
                r="1"
                fill="currentColor"
                className="text-blue-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
