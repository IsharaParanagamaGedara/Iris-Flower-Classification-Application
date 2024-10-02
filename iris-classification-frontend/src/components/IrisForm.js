import React, { useState } from 'react';
import '../styles/style.css';  // Correct import

const IrisForm = () => {
  const [formData, setFormData] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);  // New state to hold the image filename

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    setPrediction(data.prediction);  // Set the prediction result
    setImage(data.image_filename);   // Set the image filename
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      sepal_length: '',
      sepal_width: '',
      petal_length: '',
      petal_width: ''
    });
    setPrediction(null);
    setImage(null);  // Clear the image when resetting the form
  };

  return (
    <div className="iris-form-container">
      <h1>Iris Classification</h1>
      <form onSubmit={handleSubmit}>
        <label>Sepal Length (cm):</label>
        <input type="number" name="sepal_length" value={formData.sepal_length} onChange={handleChange} required />

        <label>Sepal Width (cm):</label>
        <input type="number" name="sepal_width" value={formData.sepal_width} onChange={handleChange} required />

        <label>Petal Length (cm):</label>
        <input type="number" name="petal_length" value={formData.petal_length} onChange={handleChange} required />

        <label>Petal Width (cm):</label>
        <input type="number" name="petal_width" value={formData.petal_width} onChange={handleChange} required />

        <button type="submit">Predict</button>
        <button type="button" onClick={handleReset}>Clear</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h2>Prediction: {prediction}</h2>
          {image && <img src={`http://127.0.0.1:5000/static/${image}`} alt={prediction} className="iris-image" />}
        </div>
      )}
    </div>
  );
};

export default IrisForm;
