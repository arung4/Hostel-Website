import React, { useEffect, useState } from 'react';
import '../../styles/MediaUpload.scss'; // Import the SCSS file
import { uploadToCloudinary } from '../../utils/cloudinary.js';
 

const MediaUpload = ({ onMediaUpload }) => {
   
  const cloud_name= "dczir9uw3";
  const upload_preset= "ml_default";

  const [images,setImages] = useState([]); 
  const [videos,setVideos] = useState([]); 
  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Cloudinary widget script if not already loaded
    if (!document.getElementById("cloudinary-widget-script")) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.id = "cloudinary-widget-script";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true); // Script already loaded
    }
  }, []);

  const openCloudinaryWidget = (mediaType) => {
    if (!loaded) {
      console.error("Cloudinary widget script not yet loaded.");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloud_name,
        uploadPreset: upload_preset,
        sources: ['local', 'url', 'camera'],
        resourceType: mediaType, // 'image' or 'video'
        multiple: true,
      },
      (error, result) => {
        if (!error && result?.event === 'success') {
          const url = result.info.secure_url;
          if (mediaType === 'image') {
            setImages((prev) => {
              const updatedImages = [...prev, url];
              onMediaUpload({ images: updatedImages, videos });
              return updatedImages;
            });
          } else if (mediaType === 'video') {
            setVideos((prev) => {
              const updatedVideos = [...prev, url];
              onMediaUpload({ images, videos: updatedVideos });
              return updatedVideos;
            });
          }
        }
      }
    );
  };

  return (
    <div className="media-upload">
      <h2>Upload Images & Videos</h2>

      <div className="upload-container">
        {/* Image Upload */}
        <button type="button" onClick={() => openCloudinaryWidget('image')}>
        Upload Image
      </button>
        {/* Video Upload */}
        <button type="button" onClick={() => openCloudinaryWidget('video')}>
        Upload Video
      </button>
      </div>

      {/* Display Uploaded Images */}
      <div>
        <h4>Images</h4>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`uploaded-${index}`} width="100" />
        ))}
      </div>

        {/* Display Uploaded Videos */}
        <div>
        <h4>Videos</h4>
        {videos.map((video, index) => (
          <video key={index} controls width="200">
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
};

export default MediaUpload;
