import requests

response = requests.get('http://127.0.0.1:8000/api/users/')
print(response.json())

response = requests.get('http://127.0.0.1:8000/api/users/', headers={'Accept':
'application/json; version=1.1'})
print(response.json())