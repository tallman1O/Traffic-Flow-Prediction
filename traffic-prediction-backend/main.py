from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
from typing import Dict
import random

app = FastAPI()

# Simulated model loading (replace with actual model loading in production)
models = joblib.load("models.joblib")
ensemble = joblib.load("ensemble.joblib")
le = joblib.load("label_encoder.joblib")

class TrafficInput(BaseModel):
    area_name: str
    road_name: str
    weather_conditions: str
    day_of_week: int = Field(..., ge=0, le=6)

class TrafficPrediction(BaseModel):
    individual_predictions: Dict[str, str]
    ensemble_prediction: str
    traffic_volume: int
    average_speed: float
    travel_time_index: float
    road_capacity_utilization: float
    incident_reports: int
    environmental_impact: float
    public_transport_usage: float
    traffic_signal_compliance: float
    parking_usage: float
    pedestrian_cyclist_count: int
    roadwork: int

@app.post("/api/predict-traffic", response_model=TrafficPrediction)
async def predict_traffic(input_data: TrafficInput):
    try:
        # Simulated prediction (replace with actual model prediction in production)
        congestion_levels = ['low', 'medium', 'high', 'very high']
        individual_predictions = {
            "RandomForest": random.choice(congestion_levels),
            "GradientBoosting": random.choice(congestion_levels),
            "SVM": random.choice(congestion_levels)
        }
        ensemble_prediction = random.choice(congestion_levels)

        # Simulated additional predictions
        prediction = TrafficPrediction(
            individual_predictions=individual_predictions,
            ensemble_prediction=ensemble_prediction,
            traffic_volume=random.randint(500, 2000),
            average_speed=random.uniform(20, 60),
            travel_time_index=random.uniform(1, 2),
            road_capacity_utilization=random.uniform(0.5, 1),
            incident_reports=random.randint(0, 5),
            environmental_impact=random.uniform(0, 100),
            public_transport_usage=random.uniform(0, 100),
            traffic_signal_compliance=random.uniform(80, 100),
            parking_usage=random.uniform(0, 100),
            pedestrian_cyclist_count=random.randint(10, 200),
            roadwork=random.randint(0, 1)
        )

        return prediction

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)