import React, { useState } from 'react';
import './App.css'; // You can import your CSS for styling
import UploadImage from './UploadImage';
import PlantRecognition from './PlantRecognition';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (imageFile) => {
    setUploadedImage(imageFile);
  };

  return (
    <div className="App">
      <h1>Plant Recognition App</h1>
      <UploadImage onImageUpload={handleImageUpload} />
      {uploadedImage && (
        <PlantRecognition
          uploadedImage={uploadedImage}
          apiEndpoint="https://miniature-xylophone-x455jwp7xqvfpww5-5000.app.github.dev/predict"
        />
      )}
    </div>
  );
}

export default App;
