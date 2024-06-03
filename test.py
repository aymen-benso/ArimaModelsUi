import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler


def load_model():
    model = tf.keras.models.load_model('model.h5')
    return model

def predict (model, df):
    
    yhat = model.predict(df)
    return yhat



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
X_test = [[[2025, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1]]]

X_test = np.array(X_test)

print(predict(load_model(), X_test))