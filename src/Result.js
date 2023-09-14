import React from 'react';

const Result = ({ result }) => {
  return (
    <div className="result-container">
      <h2>Classification Result</h2>
      <p>Detected Class: {result}</p>
    </div>
  );
};

export default Result;
