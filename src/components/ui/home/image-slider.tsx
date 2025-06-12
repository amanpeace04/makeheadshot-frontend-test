// src/components/ui/image-slider.tsx
import React, { useEffect } from "react";
import { imagePairs } from "../../utils/image-utils";

const ImageSlider: React.FC = () => {  
  // Use useEffect to ensure the animation runs smoothly
  useEffect(() => {
    // Make sure animations run at 60fps
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @media (prefers-reduced-motion: no-preference) {
        .image-track {
          animation: slideTrack 40s linear infinite;
        }
      }
      
      @keyframes slideTrack {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-${100 / 3}%));
        }
      }
      
      .image-track:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden pb-4">
      {/* Container with faded edges */}
      <div className="relative w-full overflow-hidden" 
           style={{
             maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)'
           }}>
        
        {/* Track that moves with images */}
        <div className="image-track flex w-max">
          {/* Create three identical sections for seamless looping */}
          {[0, 1, 2].map((sectionIndex) => (
            <div key={sectionIndex} className="flex space-x-4 mr-4">
              {imagePairs.map((pair: any, idx: any) => (
                <div key={`section-${sectionIndex}-${idx}`} className="relative flex-shrink-0">
                  <img
                    src={pair.main}
                    alt={`AI Generated Portrait ${idx + 1}`}
                    className="h-80 w-auto rounded-lg object-cover shadow-md"
                    loading="eager"
                    decoding="async"
                  />
                  
                  {/* AI GENERATED label */}
                  <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 text-xs font-medium text-white rounded">
                    AI GENERATED
                  </div>
                  
                  {/* Before/Real image in small box */}
                  <div className="absolute bottom-4 right-4">
                    <div className="relative">
                      <img
                        src={pair.real}
                        alt={`Original photo ${idx + 1}`}
                        className="h-16 w-16 object-cover rounded-md border-2 border-corporate-blue shadow-lg"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;