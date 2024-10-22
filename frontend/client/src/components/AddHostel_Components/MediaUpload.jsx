import React, { useState } from 'react';
import '../../styles/MediaUpload.scss'; // Import the SCSS file
import { uploadToCloudinary } from '../../utils/cloudinary.js'; // Assuming you have this utility

const MediaUpload = ({ onUpload }) => {
  const [media, setMedia] = useState({ images: [], videos: [] });

  const handleUpload = async (file, type) => {
    const uploadedUrl = await uploadToCloudinary(file);
    setMedia((prev) => ({
      ...prev,
      [type]: [...prev[type], uploadedUrl],
    }));
    onUpload(type, uploadedUrl); // Pass uploaded URLs to the parent component
  };

  return (
    <div className="media-upload">
      <h2>Upload Images & Videos</h2>
      <div className="upload-container">
        {/* Image Upload */}
        <label htmlFor="image-upload" className="upload-label">
          Upload Image
        </label>
        <input
          type="file"
          id="image-upload"
          onChange={(e) => handleUpload(e.target.files[0], 'images')}
        />

        {/* Video Upload */}
        <label htmlFor="video-upload" className="upload-label">
          Upload Video
        </label>
        <input
          type="file"
          id="video-upload"
          onChange={(e) => handleUpload(e.target.files[0], 'videos')}
        />
      </div>

      {/* Display Uploaded Images */}
      <div className="media-preview">
        <h3>Uploaded Images</h3>
        <div className="image-preview">
          {media.images.map((image, idx) => (
            <img key={idx} src={image} alt={`Hostel Image ${idx + 1}`} />
          ))}
        </div>

        {/* Display Uploaded Videos */}
        <h3>Uploaded Videos</h3>
        <div className="video-preview">
          {media.videos.map((video, idx) => (
            <video key={idx} src={video} controls />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
