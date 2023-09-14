import React from 'react';
import { useDropzone } from 'react-dropzone';
export default function UploadImage({ onImageUpload }) {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    onImageUpload(file);
    console.log(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag 'n' drop a plant image here, or click to select one</p>
    </div>
  );
}
