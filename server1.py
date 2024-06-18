from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import csv
import os
from tensorflow.keras.models import load_model

class PredictRequestItem(BaseModel):
    year: int
    feature_1: float
    feature_2: float
    feature_3: float
    feature_4: float
    feature_5: float
    feature_6: float
    feature_7: float
    feature_8: float


class PredictRequest(BaseModel):
    model_name: str
    data: list[PredictRequestItem]

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
    "Finale.csv"
]

models_files =[
    'industrie_elect_model.h5', 
    'industrie_finale_model.h5', 
    'industrie_gazeux_model.h5', 
    'industrie_liquide_model.h5', 
    'residentiel_elect_model.h5', 
    'residentiel_finale_model.h5', 
    'residentiel_gazeux_model.h5', 
    'residentiel_liquide_model.h5', 
    'transport_elect_model.h5', 
    'transport_finale_model.h5', 
    'transport_gazeux_model.h5', 
    'transport_liquide_model.h5'
    ]


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/consumption/{file_name}/{year}")
async def get_consumption(file_name: str, year: str):
    try:
        with open(f"./files/{file_name}", "r") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["Date"] == year:
                    return {"year": year, "consomation": row["consomation"]}
        raise HTTPException(status_code=404, detail="Data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



for file in csv_files:
    @app.get(f"/{file}")
    async def get_data():
        try:
            with open(f"./files/{file}", "r") as f:
                reader = csv.DictReader(f)
                data = [{"year": row["Date"], "consomation": row["consomation"]} for row in reader]
            return data
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))



@app.post("/predict/")
async def make_prediction(request: PredictRequest):
    model_path = f"./models/{request.model_name}"
    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail="Model not found")

    model = load_model(model_path)
    results = []
    # Prepare the data
    input_data = []
    print("request data:",request.data)
    if len(request.data) == 1:
        for data in request.data:
            input_data.append([
                data.year,
                data.feature_1, data.feature_2, data.feature_3,
                data.feature_4, data.feature_5, data.feature_6,
                data.feature_7, data.feature_8
            ])
            print("input series:",input_data)
        # Convert to numpy array and reshape
            for i in range(len(input_data)):
                input_data = np.array(input_data)
                print(input_data.shape)
                if input_data.shape[0] < 32:
                    # If less than 32 samples, pad with zeros
                    padding = np.zeros((32 - input_data.shape[0], input_data.shape[1]))
                    input_data = np.vstack((input_data, padding))
                input_data = input_data.reshape((1, 32, 9))

                # Make prediction
                prediction_result = model.predict(input_data)
                predictions = prediction_result.tolist()
                results.append(predictions)
                print("ssss :",results)

        return {"predictions": predictions}
    
    for instance in request.data:

        print("instance:",instance)

        input_data.append([
            instance.year,
            instance.feature_1, instance.feature_2, instance.feature_3,
            instance.feature_4, instance.feature_5, instance.feature_6,
            instance.feature_7, instance.feature_8
        ])

        print("input series:",input_data)

        # Convert to numpy array and reshape

        for i in range(len(input_data)):
            input_data = np.array(input_data)
            print(input_data.shape)
            if input_data.shape[0] < 32 :
                # If less than 32 samples, pad with zeros
                padding = np.zeros((32 - input_data.shape[0], input_data.shape[1]))
                input_data = np.vstack((input_data, padding))
            
            input_data = input_data.reshape((1, 32, 9))

            # Make prediction
            prediction_result = model.predict(input_data)
            predictions = prediction_result[0].tolist()
            results.append(predictions)
            input_data = []
            print("ssss :",results)

    return {"predictions": results}
        

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