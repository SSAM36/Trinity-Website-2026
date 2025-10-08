// Team Images Mapping
// This file maps team member positions to their Cloudinary public IDs
// Update the publicId values after uploading images to Cloudinary

export const teamImagesMap = {
  // Chairperson
  chairperson: ["teams/47"], // 47.png
  
  // Joint Chairpersons
  jointChairperson: ["teams/44", "teams/45", "teams/46"], // 44.png, 45.png, 46.png
  
  // Technical Secretary
  technicalSecretary: ["teams/12", "teams/13", "teams/14"], // 12.png, 13.png, 14.png
  
  // Cultural Secretary
  culturalSecretary: ["teams/37", "teams/38", "teams/39"], // 37.png, 38.png, 39.png
  
  // Sports Secretary
  sportsSecretary: ["teams/9", "teams/10", "teams/11"], // 9.png, 10.png, 11.png
  
  // Secretary
  secretary: ["teams/40", "teams/41"], // 40.png, 41.png
  
  // Treasurer
  treasurer: ["teams/42", "teams/43"], // 42.png, 43.png
  
  // Sports HOD
  sportsHOD: ["teams/6", "teams/7", "teams/8"], // 6.png, 7.png, 8.png
  
  // Events VCP
  eventsVCP: ["teams/15", "teams/16", "teams/17"], // 15.png, 16.png, 17.png
  
  // Marketing VCP
  marketingVCP: ["teams/32", "teams/33", "teams/34"], // 32.png, 33.png, 34.png
  
  // Marketing HOD
  marketingHOD: ["teams/35", "teams/36"], // 35.png, 36.png
  
  // Creatives VCP
  creativesVCP: ["teams/1", "teams/2"], // 1.png, 2.png
  
  // Creatives HOD
  creativesHOD: ["teams/3", "teams/4", "teams/5"], // 3.png, 4.png, 5.png
  
  // Editorial VCP
  editorialVCP: ["teams/23", "teams/24"], // 23.png, 24.png
  
  // Publicity VCP
  publicityVCP: ["teams/18", "teams/19", "teams/20"], // 18.png, 19.png, 20.png
  
  // Hospitality AR VCP
  hospitalityVCP: ["teams/25", "teams/26"], // 25.png, 26.png
  
  // Hospitality AR HOD
  hospitalityHOD: ["teams/27", "teams/28"], // 27.png, 28.png
  
  // Operations VCP
  operationsVCP: ["teams/29", "teams/30", "teams/31"], // 29.png, 30.png, 31.png
  
  // Security VCP
  securityVCP: ["teams/21", "teams/22"], // 21.png, 22.png
};

// Helper function to get image URLs for a department
export const getDepartmentImages = (departmentKey) => {
  return teamImagesMap[departmentKey] || [];
};

// Instructions for updating after Cloudinary upload:
// 1. Upload all images to Cloudinary in a 'teams' folder
// 2. If you use a different folder name, update all paths above
// 3. If you don't use folders, remove 'teams/' prefix from all paths
// Example: "teams/1" becomes "1" if no folder is used