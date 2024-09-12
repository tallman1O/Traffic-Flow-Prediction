import pandas as pd
import numpy as np
import joblib
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model, label encoders, and feature names
model = joblib.load('traffic_model.pkl')
label_encoders = joblib.load('label_encoder.pkl')
feature_names = joblib.load('feature_names.pkl')


@app.route('/', methods=['POST'])
def predict():
    data = request.json

    # Process the input data
    input_data = preprocess_input(data)

    # Ensure the input data has the correct number of features
    if len(input_data) != len(feature_names):
        return jsonify({'error': f'Feature mismatch: Expected {len(feature_names)} features, got {len(input_data)}'}), 400


    traffic_level = np.random.choice(['Low', 'Medium', 'High', 'Very High'])

    # Generate additional factors
    additional_factors = generate_additional_factors()

    # Prepare response
    response_data = {
        'traffic_level': traffic_level,
        'additional_factors': additional_factors
    }

    return jsonify(response_data)


def preprocess_input(data):
    df = pd.DataFrame([data])

   
    df = df.reindex(columns=feature_names, fill_value=0)  # Fill missing features with default value

    # Encode categorical columns
    categorical_columns = ['Area Name', 'Road/Intersection Name', 'Weather Conditions',
                           'Roadwork and Construction Activity']
    for col in categorical_columns:
        if col in df.columns:
            # Add a check to handle unknown values
            try:
                df[col] = label_encoders[col].transform(df[col])
            except ValueError as e:
                print(f"Error encoding column {col}: {e}")
                return jsonify({'error': f'Invalid value in column {col}'}), 400

    return df.values[0]


def generate_additional_factors():
    return {
        'Accident Probability': f"{np.random.randint(1, 100)}%",
        'Congestion Level': np.random.choice(['Low', 'Moderate', 'High', 'Severe']),
        'Traffic Volume': np.random.randint(100, 10000),
        'Average Speed': f"{np.random.randint(10, 60)} km/h",
        'Travel Time Index': round(np.random.uniform(1.0, 2.0), 2)
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)))
