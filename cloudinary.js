const cloudinary= require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'blog_images',  // Folder in Cloudinary to store images
    //   allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
    },
  });

//   cloudinary.api.resources((error, result) => {
//     if (error) {
//       console.error("Error retrieving images:", error);
//     } else {
//       console.log("Images in Cloudinary:", result.resources);
//     }
//   });
  
  module.exports = {
    cloudinary,
    storage,
  };