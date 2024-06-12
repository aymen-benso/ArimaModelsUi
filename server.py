from fastapi import FastAPI, HTTPException
from test import load_model, predict
from pydantic import BaseModel
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import csv
import os
import pickle

class PredictRequest(BaseModel):
    model_name: str
    data: list

class DataRequest(BaseModel):
    data: list


app = FastAPI()

csv_files = [
    "Industrie_ELECTRICITE.csv",
    "Industrie_FINALE.csv",
    "Industrie_GAZEUX.csv",
    "Industrie_Liquides.csv",
    "Residentiel_ Liquide.csv",
    "Residentiel_ELECTRICITE.csv",
    "Residentiel_FINALE.csv",
    "Residentiel_GAZEUX.csv",
    "Transport_ELECTRICITE.csv",
    "Transport_FINALE.csv",
    "Transport_GAZEUX.csv",
    "Transport_Liquides.csv",
]

models_files =[
    'industrie_elect_model.pkl', 
    'industrie_finale_model.pkl', 
    'industrie_gazeux_model.pkl', 
    'industrie_liquide_model.pkl', 
    'residentiel_elect_model.pkl', 
    'residentiel_finale_model.pkl', 
    'residentiel_gazeux_model.pkl', 
    'residentiel_liquide_model.pkl', 
    'transport_elect_model.pkl', 
    'transport_finale_model.pkl', 
    'transport_gazeux_model.pkl', 
    'transport_liquide_model.pkl'
    ]


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




for file in csv_files:
    @app.get(f"/{file}")
    async def get_data():
        try:
            with open(f"./files/{file}", "r") as f:
                reader = csv.DictReader(f)
                data = [{"year": row["year"], "consomation": row["consomation"]} for row in reader]
            return data
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))



@app.post("/predict/")
async def make_prediction(request: PredictRequest):
    model_path = f"./models/{request.model_name}"
    print(model_path)
    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail="Model not found")

    with open(model_path, "rb") as f:
        model = pickle.load(f)

    print(request.data)
    data = np.array(request.data)

    prediction = []
    print("data", data)

    for i in range(len(data)-1):
        if i < len(data) :
                        prediction_result = model.predict(start = data[i], end = data[i+1])
                        prediction.append(prediction_result.values.tolist())  # Use .values to get only the predicted values

    print(prediction)
    return {"prediction": prediction}

        

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


"""
@app.post("/predict/")
async def make_prediction(request: DataRequest):
    try:
        model = load_model()
        data = request.data
        print(data)
        # Reshape data to match the model's expected input shape (batch_size, time_steps, 9)
        test = np.array(data).reshape(len(data), len(data[0]), 9)
        yhat = predict(model, test)
        return {"prediction": yhat.tolist(), "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""