import { useState } from "react";
import { getCloudinaryUrl, getPlaceholderUrl } from "../utils/cloudinary";

const OptimizedImage = ({ 
  publicId, 
  alt = "Team Member", 
  className = "",
  sizes = "400px",
  loading = "lazy" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useLocalFallback, setUseLocalFallback] = useState(false);

  // Generate responsive URLs without forcing dimensions (preserve original aspect ratio)
  const imageUrl = getCloudinaryUrl(publicId, {
    width: 600, // Higher quality but let height be auto
    quality: 90, // Higher quality to maintain original look
    autoFormat: true,
    autoGravity: false, // Don't auto-crop, preserve original
    crop: 'scale' // Scale instead of fill to preserve aspect ratio
  });

  const placeholderUrl = getPlaceholderUrl(publicId);

  // Generate local fallback path (remove teams/ prefix and add proper path)
  const localImagePath = `/teams/TeamsImg/${publicId.replace('teams/', '')}.png`;

  // Fallback to placeholder if Cloudinary cloud name is not set
  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary not configured. Add VITE_CLOUDINARY_CLOUD_NAME to your .env file');
    return (
      <img
        src={localImagePath}
        alt={alt}
        className={className}
      />
    );
  }

  // If we're using local fallback or Cloudinary failed, show local image
  if (useLocalFallback || hasError) {
    return (
      <div className={`relative ${className}`}>
        {/* Simple theme-matching loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-lg rounded-lg animate-pulse"></div>
        )}
        
        <img
          src={localImagePath}
          alt={alt}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.error(`Failed to load local image: ${localImagePath}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Simple theme-matching loading state - matches your card background */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-lg rounded-lg animate-pulse"></div>
      )}
      
      {/* Main high-quality image */}
      <img
        src={imageUrl}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.warn(`Cloudinary image failed: ${publicId}, falling back to local image`);
          setHasError(true);
          setUseLocalFallback(true);
        }}
      />
    </div>
  );
};

export default OptimizedImage;