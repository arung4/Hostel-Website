

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET); // Replace with your Cloudinary preset
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    return data.secure_url; // Returns the uploaded image/video URL
  };
  