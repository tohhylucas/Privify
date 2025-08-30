1. activate venv

pip install

uvicorn on_device_server:app --reload --host 127.0.0.1 --port 8000

uvicorn tiktok_server:app --reload --host 127.0.0.1 --port 5000
