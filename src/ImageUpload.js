import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [result, setResult] = useState("set null");
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
    <div className="container">
      <h1>Medicinal Plant Classification</h1>
      <h2>Image Upload</h2>
      <div className="file-input-container">
        <input type="file" accept="image/*" className="file-input" onChange={handleImageChange} />
        <button className="custom-file-input">Choose File</button>
      </div>
      {
      // selectedImage && (
        <div className="selected-image-preview">
          <img src={selectedImage ? URL.createObjectURL(selectedImage): "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"} alt="Selected" className="uploaded-image" />
        </div>
      // )
      }
      <button onClick={handleImageUpload} disabled={loading} style={{backgroundColor:"teal"}}>
        {loading ? 'Classifying...' : 'Classify'}
      </button>
      {result && <p className="result"><span style={{color:"black", fontWeight:800}}>Detected Class:</span> {result}</p>}
    </div>
  );
};

export default ImageUpload;
