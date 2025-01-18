"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { firebaseDeleteImageHandler } from "./firebaseImageDelete";
import { firebaseUploadImageHandler } from "./firebaseImageUpload";
import { Trash2, CloudUpload } from "lucide-react"; // Icons
import Image from "next/image"; // Image optimization
import useToast from "@/hooks/useToast";

const ImageHandler = ({
  setValue,
  getValues,
  name,
  label,
  multiple = false,
}) => {
  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [localPreviews, setLocalPreviews] = useState([]);

  // Load existing images from `getValues` on component mount
  useEffect(() => {
    const existingImages = getValues(name);
    if (Array.isArray(existingImages) && existingImages.length > 0) {
      setUploadedImages(existingImages);
    }
  }, [getValues, name]);

  const handleInputChange = (event) => {
    const files = event.target.files;
    if (files) {
      setLocalPreviews(Array.from(files));
    }
  };

  const uploadImagesToCloud = async () => {
    setIsUploading(true);
    const uploadedUrls = [];
    try {
      for (const file of localPreviews) {
        const url = await firebaseUploadImageHandler(file);
        if (url && typeof url === "string") {
          uploadedUrls.push(url);
        } else {
          toast.showError("Error uploading one or more files.");
        }
      }
      const allImages = [...uploadedImages, ...uploadedUrls];
      setUploadedImages(allImages);
      setValue(name, allImages); // Update the form value
      toast.showSuccess("Images uploaded successfully.");
    } catch (error) {
      toast.showError("Failed to upload images.");
    } finally {
      setIsUploading(false);
      setLocalPreviews([]);
    }
  };

  const deleteImageHandler = async (index) => {
    const imageToDelete = uploadedImages[index];
    try {
      await firebaseDeleteImageHandler(imageToDelete);

      const newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
      setValue(name, newImages); // Update the form value
      toast.showSuccess("Image deleted successfully.");
    } catch (error) {
      toast.showError("Failed to delete image.");
    }
  };

  return (
    <div className="mb-4 max-w-64 w-64">
      <label>{label}</label>
      <div className="flex max-w-64 w-64 justify-center mt-8">
        <div className="rounded-lg shadow-xl bg-gray-50">
          <div className="m-4">
            <div className="flex">
              {/* Display Local Previews Above Input */}
              {localPreviews.length > 0 && (
                <div className="mb-4">
                  {localPreviews.map((file, index) => (
                    <div key={index} className="absolute top-10 max-w-64 w-64">
                      <Image
                        width={100}
                        height={100}
                        src={URL.createObjectURL(file)}
                        alt="Local Preview"
                        className="max-w-64 w-64 max-h-24 h-24 object-contain rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* File Input */}
              <label className="flex flex-col w-full h-32 border-4 pt-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <CloudUpload size={30} color="#9ca3af" />
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file
                  </p>
                </div>
                <input
                  type="file"
                  multiple={multiple}
                  onChange={handleInputChange}
                  accept="image/*"
                  className="opacity-0"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button
              disabled={isUploading || localPreviews.length === 0}
              onClick={uploadImagesToCloud}
              className={`w-full px-4 py-2 text-white rounded shadow-xl ${
                isUploading || localPreviews.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium">Uploaded Images</h3>
          <div className="flex justify-center flex-wrap gap-5 mt-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt="Uploaded Image"
                  className="w-32 h-32 object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={() => deleteImageHandler(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageHandler;


// {
//   "images": [
//       "https://firebasestorage.googleapis.com/v0/b/rental-marketplace-7df5b.appspot.com/o/Rental-Store%2F64d5df63-9a8b-4b33-b95f-e0d71e6c857b?alt=media&token=fe124c77-7125-4ad8-9f7d-782f4b26009b"
//   ]
// } 