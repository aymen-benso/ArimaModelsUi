import tensorflow as tf

# Load the model
model = tf.keras.models.load_model('./lstm_model.h5')

# Print the model summary
model.summary()