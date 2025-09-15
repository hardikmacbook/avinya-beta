import React from "react";

const Title = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h1
      className="text-5xl font-bold mb-4 tracking-tight"
      style={{ color: "#8b2727" }}
    >
      {title}
    </h1>
    <p className="text-xl mb-8" style={{ color: "#8b2727", opacity: 0.8 }}>
      {subtitle}
    </p>
    
    {/* Premium Decorative Divider */}
    <div className="flex justify-center items-center w-full my-6 px-5">
      <div className="relative flex items-center justify-center w-full max-w-2xl">
        
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-end pr-6">
          {/* Gradient Line */}
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-[#8b2727] to-[#c33333] relative rounded-full max-w-48">
           
          </div>
          
          {/* Left Decorative Dot */}
          <div className="relative ml-3">
            <div className="w-3 h-3 bg-gradient-to-br from-[#8b2727] to-[#c33333] rounded-full shadow-lg relative z-10">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        </div>
        
        <div className="relative mx-4">
          
          {/* Main icon container */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-[#8b2727] via-[#c33333] to-[#8b2727] rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 z-10">
            {/* Inner highlight */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            
            {/* Icon */}
            <svg className="w-7 h-7 text-white drop-shadow-xl relative z-10 ml-1.5 mb-1" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(0.5px) translateY(0.5px)' }}>
              <path d="M12 2L2 14h6l-2 8 10-12h-6l2-8z" />
            </svg>
          </div>
          
          {/* Bottom shadow */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-[#8b2727]/20 rounded-full blur-xl opacity-60"></div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-start pl-6">
          {/* Right Decorative Dot */}
          <div className="relative mr-3">
            <div className="w-3 h-3 bg-gradient-to-br from-[#c33333] to-[#8b2727] rounded-full shadow-lg relative z-10">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
          
          {/* Gradient Line */}
          <div className="flex-1 h-1 bg-gradient-to-r from-[#c33333] via-[#8b2727] to-transparent relative rounded-full max-w-48">
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Title;