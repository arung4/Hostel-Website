export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset
  
    const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    return data.secure_url; // Returns the uploaded image/video URL
  };
  