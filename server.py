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


class DataRequest(BaseModel):
    data: list


app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Allow requests from your React frontend origin
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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
