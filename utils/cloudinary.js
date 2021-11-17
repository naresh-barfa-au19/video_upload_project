const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'do1alnxwd',
  api_key: process.env.CLOUDINARY_API_KEY || '556527351613449',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'VxdCZCFt9bw6U_kdrS8U83DlBHk',
});

module.exports = cloudinary;