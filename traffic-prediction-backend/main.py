# File: main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

app = FastAPI()

# Load the trained models and scaler
models = joblib.load("models.joblib")
ensemble = joblib.load("ensemble.joblib")
scaler = joblib.load("scaler.joblib")

class TrafficInput(BaseModel):
    area_name: str
    road_name: str
    weather_conditions: str
    roadwork: str
    traffic_volume: float
    average_speed: float
    travel_time_index: float
    road_capacity_utilization: float
    incident_reports: int
    environmental_impact: float
    public_transport_usage: float
    traffic_signal_compliance: float
    parking_usage: float
    pedestrian_cyclist_count: int
    day_of_week: int
    month: int

@app.post("/predict")
async def predict_traffic(input_data: TrafficInput):
    try:
        # Prepare input data
        input_df = pd.DataFrame({
            'Area Name': [input_data.area_name],
            'Road/Intersection Name': [input_data.road_name],
            'Weather Conditions': [input_data.weather_conditions],
            'Roadwork and Construction Activity': [input_data.roadwork],
            'Traffic Volume': [input_data.traffic_volume],
            'Average Speed': [input_data.average_speed],
            'Travel Time Index': [input_data.travel_time_index],
            'Road Capacity Utilization': [input_data.road_capacity_utilization],
            'Incident Reports': [input_data.incident_reports],
            'Environmental Impact': [input_data.environmental_impact],
            'Public Transport Usage': [input_data.public_transport_usage],
            'Traffic Signal Compliance': [input_data.traffic_signal_compliance],
            'Parking Usage': [input_data.parking_usage],
            'Pedestrian and Cyclist Count': [input_data.pedestrian_cyclist_count],
            'DayOfWeek': [input_data.day_of_week],
            'Month': [input_data.month]
        })

        # Encode categorical variables
        le = LabelEncoder()
        categorical_columns = ['Area Name', 'Road/Intersection Name', 'Weather Conditions']
        for col in categorical_columns:
            input_df[col] = le.fit_transform(input_df[col])

        # Scale the input data
        input_scaled = scaler.transform(input_df)

        # Make predictions
        predictions = {name: model.predict(input_scaled)[0] for name, model in models.items()}
        ensemble_prediction = ensemble.predict(input_scaled)[0]

        # Convert numeric predictions to labels
        congestion_levels = {0: 'low', 1: 'medium', 2: 'high', 3: 'very high'}
        predictions = {name: congestion_levels[pred] for name, pred in predictions.items()}
        ensemble_prediction = congestion_levels[ensemble_prediction]

        return {
            "individual_predictions": predictions,
            "ensemble_prediction": ensemble_prediction
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)