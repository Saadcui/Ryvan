import { v2 as cloudinary } from 'cloudinary';

let configured = false;

export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }

  return cloudinary;
}

export async function uploadImageBuffer(buffer, options = {}) {
  const cld = getCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || 'ecommerce-products',
        resource_type: 'image',
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    stream.end(buffer);
  });
}