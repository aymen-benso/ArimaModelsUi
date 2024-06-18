import pandas as pd

# Read the data from the CSV files
industrie_finale = pd.read_csv('files/Industrie_FINALE.csv')
transport_finale = pd.read_csv('files/Transport_FINALE.csv')
residentiel_finale = pd.read_csv('files/Residentiel_FINALE.csv')

# Calculate the sum and keep only 'Date' and 'consomation' columns
sum_df = industrie_finale.add(transport_finale, fill_value=0).add(residentiel_finale, fill_value=0)[['Date', 'consomation']]

# Write the result to Finale.csv
sum_df.to_csv('files/Finale.csv', index=False)