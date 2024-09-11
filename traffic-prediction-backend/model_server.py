# model_server.py
import joblib
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import parse_qs
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import numpy as np

# Load the model and label encoders
model = joblib.load('../traffic_model.pkl')
label_encoders = joblib.load('../label_encoders.pkl')

class ModelHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Process the input data
        input_data = self.preprocess_input(data)

        # Make prediction
        prediction = model.predict([input_data])[0]

        # Generate additional factors
        additional_factors = self.generate_additional_factors()

        # Prepare response
        response_data = {
            'prediction': prediction,
            'traffic_level': self.get_traffic_level(prediction),
            'additional_factors': additional_factors
        }

        # Send response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = json.dumps(response_data)
        self.wfile.write(response.encode('utf-8'))

    def preprocess_input(self, data):
        # Create a DataFrame with the input data
        df = pd.DataFrame([data])

        # Convert Date to datetime and extract day of week and month
        df['Date'] = pd.to_datetime(df['Date'])
        df['DayOfWeek'] = df['Date'].dt.dayofweek
        df['Month'] = df['Date'].dt.month

        # Encode categorical columns
        categorical_columns = ['Area Name', 'Road/Intersection Name', 'Weather Conditions', 'Roadwork and Construction Activity']
        for col in categorical_columns:
            df[col] = label_encoders[col].transform(df[col])

        # Drop unnecessary columns
        columns_to_drop = ['Date', 'Traffic Volume', 'Environmental Impact', 'Congestion Level']
        df = df.drop(columns_to_drop, axis=1, errors='ignore')

        return df.values[0]

    def get_traffic_level(self, prediction):
        levels = ['Low', 'Medium', 'High', 'Very High']
        return levels[prediction]

    def generate_additional_factors(self):
        # Generate random values for additional factors
        return {
            'Accident Probability': f"{np.random.randint(1, 100)}%",
            'Congestion Level': np.random.choice(['Low', 'Moderate', 'High', 'Severe']),
            'Traffic Volume': np.random.randint(100, 10000),
            'Average Speed': f"{np.random.randint(10, 60)} km/h",
            'Travel Time Index': round(np.random.uniform(1.0, 2.0), 2)
        }

def run(server_class=HTTPServer, handler_class=ModelHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()