from fastapi import FastAPI, HTTPException
from test import load_model, predict
from pydantic import BaseModel
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from test import load_model, predict
from pydantic import BaseModel
import numpy as np
import uvicorn
import csv

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

models_files = [
    "model_Industrie_ELECTRICITE",
    "model_Industrie_FINALE",
    "model_Industrie_GAZEUX",
    "model_Industrie_Liquides",
    "model_Residentiel_ Liquide",
    "model_Residentiel_ELECTRICITE",
    "model_Residentiel_FINALE",
    "model_Residentiel_GAZEUX",
    "model_Transport_ELECTRICITE",
    "model_Transport_FINALE",
    "model_Transport_GAZEUX",
    "model_Transport_Liquides",
]


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


        

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
