// src/components/ui/ImageCard.tsx
import React from "react";

interface ImageCardProps {
  mainImage: string;
  realImage: string;
  alt?: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  mainImage,
  realImage,
  alt = "AI Generated Portrait",
  className = "",
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main AI generated image */}
      <img
        src={mainImage}
        alt={alt}
        className="rounded-lg object-cover shadow-md"
      />
      
      {/* AI GENERATED label */}
      <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 text-xs font-medium text-white rounded">
        AI GENERATED
      </div>
      
      {/* Before/Real image in small box */}
      <div className="absolute bottom-4 right-4">
        <div className="relative">
          <img
            src={realImage}
            alt={`Original ${alt}`}
            className="h-16 w-16 object-cover rounded-md border-2 border-corporate-blue shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;