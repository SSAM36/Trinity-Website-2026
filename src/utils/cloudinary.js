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
 * @param {boolean} options.autoGravity - Auto gravity for cropping
 * @returns {string} Optimized image URL
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary cloud name not found in environment variables');
    return '';
  }

  const {
    width = 600,
    height = null, // Let height be auto to preserve aspect ratio
    crop = 'scale', // Use scale to preserve original proportions
    quality = 90,
    autoFormat: enableAutoFormat = true,
    autoGravity: enableAutoGravity = false // Don't auto-crop by default
  } = options;

  let transformation = cld.image(publicId)
    .delivery(qualityAction(quality));

  // Apply resizing based on crop mode
  if (crop === 'scale') {
    // Scale preserving aspect ratio
    transformation = transformation.resize(auto().width(width));
  } else if (height) {
    // Only apply height if specified and not using scale
    transformation = transformation.resize(auto().width(width).height(height));
  } else {
    // Just width, let height be auto
    transformation = transformation.resize(auto().width(width));
  }

  // Apply auto format for optimal file format
  if (enableAutoFormat) {
    transformation = transformation.delivery(format('auto'));
  }

  // Apply auto gravity only if specifically requested
  if (enableAutoGravity && crop === 'fill' && height) {
    transformation = transformation.resize(
      auto().width(width).height(height).gravity(autoGravity())
    );
  }

  return transformation.toURL();
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