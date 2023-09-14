import React, { useState } from 'react';
// import './ImageUpload.css';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('model', 'resnet');
    try {
      const response = await fetch(
        'https://miniature-xylophone-x455jwp7xqvfpww5-5000.app.github.dev/predict',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data.class);
      } else {
        console.error('Error classifying image:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div className="selected-image-preview">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
        </div>
      )}
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? 'Classifying...' : 'Classify'}
      </button>
      {result && <p className="result">Detected Class: {result}</p>}
    </div>
  );
};

export default ImageUpload;
