import React, { useState } from 'react';
import axios from 'axios';
export default function PlantRecognition({ imageFile, apiEndpoint }) {
  const [result, setResult] = useState(null);

  const recognizePlant = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('model', 'resnet');
    console.log(formData);
    try {
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error recognizing plant:', error);
    }
  };

  return (
    <div className="plant-recognition">
      <h2>Plant Recognition</h2>
      <button onClick={() => recognizePlant(imageFile)}>Recognize Plant</button>
      {result && (
        <div className="result">
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
