# Bangalore Traffic Prediction Project

This project is a web application that predicts traffic levels in Bangalore based on various factors such as location, weather conditions, and roadwork status. It consists of a Next.js frontend, a Flask-based machine learning API, and a traffic prediction model.

## Project Structure

```
traffic-prediction-frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── predict-traffic/
│   │   │       └── route.ts
│   │   ├── form/
│   │   │   └── page.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   └── ...
├── public/
├── .next/
├── node_modules/
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md

traffic-prediction-backend/
├── model_server.py
├── traffic_model.pkl
├── label_encoders.pkl
├── feature_names.pkl
└── requirements.txt
```

## Setup and Installation

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```
   cd traffic-prediction-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root of the frontend directory and add:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`.

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```
   cd traffic-prediction-backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```
   python app.py
   ```

The backend API will be available at `http://localhost:8000`.

## Usage

1. Open a web browser and go to `http://localhost:3000`.
2. Fill out the form with the required information:
   - Weather Conditions
   - Area Name
   - Road/Intersection Name
   - Roadwork and Construction Activity
3. Click the "Submit" button to get the traffic prediction.

## API Endpoints

- `POST /api/predict-traffic`: Accepts form data and returns traffic predictions.

## Technologies Used

- Frontend:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
- Backend:
  - FastAPI
  - Scikit-learn
  - Pandas
  - NumPy
- Machine Learning:
  - Scikit-learn (Random Forest Classifier)


## Acknowledgments

- Kaggle for providing the dataset
- [Anthropic](https://www.anthropic.com) for AI assistance in development
