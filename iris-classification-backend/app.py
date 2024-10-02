from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow communication with React frontend

# Load the trained Random Forest model
model = joblib.load('model/random_forest_model.pkl')

# Define mapping between species and images
species_images = {
    'Iris-setosa': 'Iris_setosa.png',
    'Iris-versicolor': 'Iris_versicolor.png',
    'Iris-virginica': 'Iris_virginica.png'
}

# API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from React frontend

    # Extract the input data from the request
    sepal_length = data.get('sepal_length')
    sepal_width = data.get('sepal_width')
    petal_length = data.get('petal_length')
    petal_width = data.get('petal_width')

    # Prepare the input for prediction
    input_data = np.array([[sepal_length, sepal_width, petal_length, petal_width]])

    # Predict the species
    prediction = model.predict(input_data)[0]

    # Get the image file associated with the predicted species
    image_filename = species_images.get(prediction)

    # Return the prediction result as JSON, including the species and image
    return jsonify({'prediction': prediction, 'image_filename': image_filename})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
