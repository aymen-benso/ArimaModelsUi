
import requests

# Define the URL of the FastAPI endpoint
url = "http://127.0.0.1:8000/predict/"

input_data = {
    "model_name": "transport_elect_model.h5",
    "data": [
        {
            "year": 2025,
            "feature_1": 2591.0,
            "feature_2": 18739378.0,
            "feature_3": 1858723.0,
            "feature_4": 7.0,
            "feature_5": 4.0,
            "feature_6": 7.0,
            "feature_7": 1325804.0,

        },


    ]
}

# Make the POST request
response = requests.post(url, json=input_data)

# Print the response
print(response.json())

# Print the response
if response.status_code == 200:
    print("Prediction:", response.json())
else:
    print("Error:", response.status_code, response.text)

"""
# load model
model = tf.keras.models.load_model('model.h5')

# load test data
df = pd.read_csv('test.csv')
scaler = MinMaxScaler(feature_range=(0, 1))

data_normalized = scaler.fit_transform(df)

time_steps = 3

def create_dataset(data, time_steps):
    X, y = [], []
    for i in range(len(data) - time_steps):
        X.append(data[i:(i + time_steps), :])
        y.append(data[i + time_steps, 0])  # Assuming consumption is the first column
    return np.array(X), np.array(y)

X, y = create_dataset(data_normalized, time_steps)

train_size = int(len(X) * 0.67)
test_size = len(X) - train_size

X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]


# make a prediction
yhat = model.predict(X_test)
print(yhat)
"""



"""
curl -X POST "http://127.0.0.1:8000/predict" -H "Content-Type: application/json" -d '{
    "year": 2025,
    "feature_1": 0.4,
    "feature_2": 0.5,
    "feature_3": 0.6,
    "feature_4": 0.7,
    "feature_5": 0.8,
    "feature_6": 0.9,
    "feature_7": 1.0,
    "feature_8": 1.1
}'
        {
            "year": 2026,
            "feature_1": 2591.0,
            "feature_2": 18739378.0,
            "feature_3": 1858723.0,
            "feature_4": 7.0,
            "feature_5": 4.0,
            "feature_6": 7.0,
            "feature_7": 1325804.0,

        }
"""
