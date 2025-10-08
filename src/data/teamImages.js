// Team Images Mapping
// This file maps team member positions to their Cloudinary public IDs
// Update the publicId values after uploading images to Cloudinary

export const teamImagesMap = {
  // Chairperson - image 47
  chairperson: ["47_flgzgr"],
  
  // Joint Chairpersons - images 44, 45, 46
  jointChairperson: ["44_dzc027", "45_qyvl1g", "46_a7rfdi"],
  
  // Technical Secretary - images 12, 13, 14
  technicalSecretary: ["12_ggisf1", "13_rh8dk0", "14_nsux8h"],
  
  // Cultural Secretary - images 37, 38, 39
  culturalSecretary: ["37_axvlk7", "38_yviupq", "39_fxq1rv"],
  
  // Sports Secretary - images 9, 10, 11
  sportsSecretary: ["9_hxvcan", "10_zsap80", "11_k3uhlr"],
  
  // Secretary - images 40, 41
  secretary: ["40_kdjdat", "41_ibyqca"],
  
  // Treasurer - images 42, 43
  treasurer: ["42_x8k1y6", "43_vjgzhd"],
  
  // Sports HOD - images 6, 7, 8
  sportsHOD: ["6_s1xvn9", "7_iw6dih", "8_q7hrcs"],
  
  // Events VCP - images 15, 16, 17
  eventsVCP: ["15_z7y9je", "16_rx9ujf", "17_kkxb9x"],
  
  // Marketing VCP - images 32, 33, 34
  marketingVCP: ["32_reygzn", "33_otfhdx", "34_suxyiy"],
  
  // Marketing HOD - images 35, 36
  marketingHOD: ["35_jjppxj", "36_ybvom3"],
  
  // Creatives VCP - images 1, 2
  creativesVCP: ["1_nt7gja", "2_jrvvql"],
  
  // Creatives HOD - images 3, 4, 5
  creativesHOD: ["3_arzofm", "4_fx53x1", "5_pitblm"],
  
  // Editorial VCP - images 23, 24
  editorialVCP: ["23_jjvr8y", "24_menkts"],
  
  // Publicity VCP - images 18, 19, 20
  publicityVCP: ["18_rqzzxn", "19_xzx15d", "20_dxyzda"],
  
  // Hospitality AR VCP - images 25, 26
  hospitalityVCP: ["25_fj0sxo", "26_uu7acy"],
  
  // Hospitality AR HOD - images 27, 28
  hospitalityHOD: ["27_ozbljn", "28_gvsugz"],
  
  // Operations VCP - images 29, 30, 31
  operationsVCP: ["29_bhe8dk", "30_dejg21", "31_j0b6og"],
  
  // Security VCP - images 21, 22
  securityVCP: ["21_ivghbz", "22_beiol4"]
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