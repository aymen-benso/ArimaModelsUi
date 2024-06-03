import requests

url = "http://localhost:8000/predict/"

data = {
    "data": [
        [
            [2025,45400000,1000000,21,256,254,129,8173,67345]
        ],
        [
            [2025,45400000,1000000,21,256,254,129,8173,67345]
        ]
    ]
}

response = requests.post(url, json=data)
print(response.json())
