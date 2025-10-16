import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { format, quality as qualityAction } from '@cloudinary/url-gen/actions/delivery';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

/**
 * Generate optimized Cloudinary image URL
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {Object} options - Transformation options
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @param {string} options.crop - Crop mode ('fill', 'fit', 'scale', etc.)
 * @param {number} options.quality - Image quality (1-100)
 * @param {boolean} options.autoFormat - Auto format selection
 * @returns {string} Optimized image URL
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.warn('Cloudinary cloud name not found in environment variables');
    return '';
  }

  const {
    width = 800, // Reduced from 1200 to 800 for better performance
    height = null,
    crop = 'scale',
    quality = 70, // Reduced from 85-90 to 70 for better compression
    autoFormat: enableAutoFormat = true,
  } = options;

  // Build transformation string manually for better control
  const transformations = [];
  
  // Add crop mode and dimensions
  if (crop === 'scale') {
    transformations.push(`c_scale,w_${width}`);
  } else if (height) {
    transformations.push(`c_${crop},w_${width},h_${height}`);
  } else {
    transformations.push(`c_scale,w_${width}`);
  }
  
  // Add quality - use auto:low for even better compression
  transformations.push(`q_${quality}`);
  
  // Add auto format - this will serve WebP/AVIF to modern browsers
  if (enableAutoFormat) {
    transformations.push('f_auto');
  }

  // Combine all transformations with comma
  const transformString = transformations.join(',');
  
  // Build the final URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
};

/**
 * Generate responsive image URLs for different screen sizes
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @returns {Object} Object with URLs for different breakpoints
 */
export const getResponsiveUrls = (publicId) => {
  return {
    mobile: getCloudinaryUrl(publicId, { width: 280, height: 280 }),
    tablet: getCloudinaryUrl(publicId, { width: 400, height: 400 }),
    desktop: getCloudinaryUrl(publicId, { width: 500, height: 500 }),
    xl: getCloudinaryUrl(publicId, { width: 600, height: 600 })
  };
};

/**
 * Generate placeholder/blur image for loading states
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @returns {string} Low quality placeholder URL
 */
export const getPlaceholderUrl = (publicId) => {
  return getCloudinaryUrl(publicId, {
    width: 80, // Slightly larger for better blur effect
    quality: 20, // Very low quality for fast loading
    crop: 'scale' // Preserve aspect ratio even for placeholder
  });
};

export { cld };
export default cld;