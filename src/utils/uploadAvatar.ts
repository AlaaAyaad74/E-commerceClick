import axios from "axios";
import { useState } from "react";

const useUploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "ecommerce");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dryeyj6ji/image/upload`,
          data
        );
        console.log(res.data);
        const url = res.data.secure_url;
        console.log("Uploaded Image URL:", url);
        setImageUrl(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return { uploadFile, file, imageUrl }; // Return the function, file state, and imageUrl
};

export default useUploadImage;
