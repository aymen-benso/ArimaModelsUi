import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Input
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt

from sklearn.metrics import mean_squared_error
from sklearn.model_selection import TimeSeriesSplit
from keras.layers import Bidirectional
from keras.callbacks import ReduceLROnPlateau
from sklearn.model_selection import TimeSeriesSplit
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, PolynomialFeatures
from sklearn.metrics import mean_squared_error, mean_absolute_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Bidirectional
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.regularizers import l2
import xgboost as xgb
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

from statsmodels.tsa.seasonal import seasonal_decompose
# Load the dataset
df = pd.read_csv('test.csv')
# Normalize the data
scaler = MinMaxScaler(feature_range=(0, 1))
data_normalized = scaler.fit_transform(df)
# Function to create dataset with time steps
def create_dataset(data, time_steps):
    X, y = [], []
    for i in range(len(data) - time_steps):
        X.append(data[i:(i + time_steps), :])
        y.append(data[i + time_steps, 0])  # Assuming consumption is the first column
    return np.array(X), np.array(y)

# Define time steps
time_steps = 3
# Create input and output datasets
X, y = create_dataset(data_normalized, time_steps)

# Split data into train and test sets
train_size = int(len(X) * 0.67)
test_size = len(X) - train_size
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]
# Step 4: Model Architecture
def create_model():
    model = Sequential()
    model.add(Bidirectional(LSTM(units=64, dropout=0.2, recurrent_dropout=0.2, input_shape=(X_train.shape[1], X_train.shape[2]))))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Step 5: Define the grid search parameters
param_grid = {
    'batch_size': [32, 64],
    'epochs': [50, 100],
}
# Step 6: Perform the grid search
tscv = TimeSeriesSplit(n_splits=min(3, len(df)))
best_score = float('inf')
best_params = {}
for batch_size in param_grid['batch_size']:
    for epochs in param_grid['epochs']:
        cv_scores = []
        for train_index, test_index in tscv.split(df):
            try:
                X_cv_train, X_cv_test = X_train[train_index], X_train[test_index]
                y_cv_train, y_cv_test = y_train[train_index], y_train[test_index]
            except IndexError:
                continue  # Skip this split if index is out of bounds

            model = create_model()
            model.fit(X_cv_train, y_cv_train, epochs=epochs, batch_size=batch_size, verbose=0)
            cv_loss = model.evaluate(X_cv_test, y_cv_test, verbose=0)
            cv_scores.append(cv_loss)

        avg_cv_loss = np.mean(cv_scores)
        if avg_cv_loss < best_score:
            best_score = avg_cv_loss
            best_params = {'batch_size': batch_size, 'epochs': epochs}

print("Best parameters:", best_params)
print("Best score:", best_score)
# Step 7: Train the final model with the best parameters
best_batch_size = best_params['batch_size']
best_epochs = best_params['epochs']

final_model = create_model()
final_model.fit(X_train, y_train, epochs=best_epochs, batch_size=best_batch_size, verbose=0)
'''# Define and train the LSTM model
model = Sequential()

#model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
#model.add(LSTM(units=50))
model.add(Bidirectional(LSTM(units=64, dropout=0.2, recurrent_dropout=0.2,
                               input_shape=(X_train.shape[1], X_train.shape[2]))))

model.add(Dense(1))  # Output layer for consumption prediction
model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train, y_train, epochs=100, batch_size=64, verbose=1)
'''
lstm_model = Sequential()
lstm_model.add(Bidirectional(LSTM(100, activation='relu', return_sequences=True, kernel_regularizer=l2(0.001)), input_shape=(time_steps, X_train.shape[2])))
lstm_model.add(Dropout(0.3))
lstm_model.add(Bidirectional(LSTM(100, activation='relu', return_sequences=False, kernel_regularizer=l2(0.001))))
lstm_model.add(Dropout(0.3))
lstm_model.add(Dense(1))
lstm_model.compile(optimizer='adam', loss='mean_squared_error')

early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

lstm_model.fit(X_train, y_train, epochs=200, batch_size=32, validation_split=0.1, shuffle=False, callbacks=[early_stopping])
# Evaluate model
train_loss = lstm_model.evaluate(X_train, y_train, verbose=0)
test_loss = lstm_model.evaluate(X_test, y_test, verbose=0)
print('Train Loss:', train_loss)
print('Test Loss:', test_loss)
# Forecasting
forecast =lstm_model.predict(X_test)

# Inverse transform the forecasted values
forecast = scaler.inverse_transform(np.concatenate((forecast, np.zeros((forecast.shape[0], df.shape[1]-1))), axis=1))[:,0]

# Print forecasted values
print('Forecasted Values:', forecast)
# Calculate Mean Absolute Error (MAE)
mae = mean_absolute_error(df['consomation'][-len(forecast):], forecast)
print('Mean Absolute Error (MAE):', mae)
# Plot forecast vs actual values
'''plt.figure(figsize=(10, 6))
plt.plot(df.index[-len(forecast):], forecast, label='Forecast')
plt.plot(df.index[-len(forecast):], df['consomation'][-len(forecast):], label='Actual')
plt.xlabel('Year')
plt.ylabel('Energy Consumption')
plt.title('Forecast vs Actual Energy Consumption')
plt.legend()
plt.show()'''
# Forecast next 10 years
future_time_steps = 10
future_forecast = []
# Use last time_steps values from the data as initial input for forecasting
x_input = X_test[-1]

for i in range(future_time_steps):
    x_input = x_input.reshape((1, time_steps, df.shape[1]))
    y_future = lstm_model.predict(x_input, verbose=0)
    future_forecast.append(y_future[0, 0])
    # Create a new array with the desired shape and copy elements from x_input and y_future
    new_x_input = np.zeros((1, time_steps, df.shape[1]))
    new_x_input[:, :-1, :] = x_input[:, 1:, :]
    new_x_input[:, -1, :] = y_future
    x_input = new_x_input
# Import MinMaxScaler and fit it to the target variable 'consomation'
scaler_target = MinMaxScaler(feature_range=(0, 1))
scaler_target.fit(df['consomation'].values.reshape(-1, 1))

# Reshape the forecasted values to match the shape of the original data
forecast = np.array(future_forecast).reshape(-1, 1)

# Inverse transform the forecasted values for the next 10 years
# Inverse transform the forecasted values
forecast_inverse = scaler_target.inverse_transform(forecast)

# Print the shapes before and after inverse transformation
print('Shape of forecasted values before inverse transform:', forecast.shape)
print('Shape of forecasted values after inverse transform:', forecast_inverse.shape)

# Print the forecasted values after inverse transform
print('Forecasted Values after inverse transform:', forecast_inverse[:, 0])

# Save the model architecture and weights
lstm_model.save('lstm_model.h5')
