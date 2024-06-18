import requests

base_url = "http://localhost:8000"  # Replace with your actual base URL
file_name = "Industrie_ELECTRICITE.csv"  # Replace with your desired file name
year = "2022"  # Replace with your desired year

response = requests.get(f"{base_url}/consumption/{file_name}/{year}")
if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.status_code, response.text)
