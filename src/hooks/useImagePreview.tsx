import { useState } from "react";
import type { ChangeEvent } from "react";

export const useImagePreview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreview("");
      return;
    }

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const clearImage = () => {
    setFile(null);
    setPreview("");
  };

  return {
    file,
    preview,
    handleImageChange,
    clearImage,
  };
};
