import axios from "axios";
import React, { useState } from "react";

const CloudinaryUploader = ({
  onUploadSuccess = (url) => {
    console.log("Imagen subida:", url);
  },
  multiple = false,
}) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (files) => {
    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "micanchaya");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/doce9wueq/image/upload",
          formData
        );

        return response.data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onUploadSuccess(multiple ? uploadedUrls : uploadedUrls[0]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      uploadImage(files);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 ">
      <label className="flex flex-col items-center justify-center w-full h-29 md:h-28  border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-2 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold text-[11px] md:text-xs">Click para subir</span>
          </p>
          <p className="text-[10px] md:text-[12px] text-gray-500">SVG, PNG or JPG</p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          multiple={multiple}
          disabled={uploading}
        />
      </label>
      {uploading && <div className="text-sm text-gray-500">Subiendo...</div>}
    </div>
  );
};

export default CloudinaryUploader;
