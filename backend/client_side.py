from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from concrete.ml.sklearn import LogisticRegression
import pandas as pd
import matplotlib.pyplot as plt

from concrete.ml.sklearn import NeuralNetRegressor
from concrete.ml.deployment import FHEModelDev, FHEModelClient, FHEModelServer
import numpy as np
import torch.nn as nn
from collections import Counter
import re
from sklearn.preprocessing import normalize
import os
import shutil
from nltk.stem.porter import PorterStemmer
from utils import process_comment, clip_risk_score
import httpx
import base64

num_categories = 3
FHE_FILE_PATH = "./fhe_directory"
FHE_FILE_PATH_CLIENT = "./fhe_directory"
FHE_FILE_PATH_SERVER = "./fhe_directory"

FHE_FILE_PATH_RISK = "./fhe_directory_risk"
FHE_FILE_PATH_RISK_CLIENT = "./fhe_directory_risk"
FHE_FILE_PATH_RISK_SERVER = "./fhe_directory_risk"
API_URL ="http://127.0.0.1:5000/fhe/process" 

def quantize_encrypt_serialize(comment, client):
    processed_comment = process_comment(comment)
    processed_comment = np.array(processed_comment).reshape(1, -1)
    processed_enc_comment = client.quantize_encrypt_serialize(processed_comment)
    return processed_enc_comment

def bytes_to_b64(b: bytes) -> str:
    return base64.b64encode(b).decode("utf-8")

def decode_keys(key_b64: str) -> bytes:
    return base64.b64decode(key_b64)

def encode_X(x):
    """Convert X_enc / X_enc_risk to something JSON serializable."""
    if isinstance(x, bytes):
        return bytes_to_b64(x)
    elif isinstance(x, np.ndarray):
        return x.tolist()  # Convert numpy array to list
    else:
        raise TypeError(f"Unsupported type for JSON: {type(x)}")

def call_fhe_server(X_enc, X_enc_risk, serialized_keys, serialized_keys_risk):
    payload = {
        "X_enc": encode_X(X_enc),
        "X_enc_risk": encode_X(X_enc_risk),
        "serialized_keys": bytes_to_b64(serialized_keys),
        "serialized_keys_risk": bytes_to_b64(serialized_keys_risk)
    }

    response = httpx.post(API_URL, json=payload, timeout=httpx.Timeout(300.0))
    if response.status_code != 200:
        raise RuntimeError(f"Server returned {response.status_code}: {response.text}")

    data = response.json()
    return decode_keys(data["encrypted_result"]), decode_keys(data["encrypted_result_risk"])

def run_inference(comment):
    print("--------------------------------------------------")
    print("Step 3) Client quantize, encrypt and serialize input comment")
    client = FHEModelClient(path_dir=FHE_FILE_PATH_CLIENT)
    client_risk = FHEModelClient(path_dir=FHE_FILE_PATH_RISK_CLIENT)
    X_enc = quantize_encrypt_serialize(comment, client)
    X_enc_risk = quantize_encrypt_serialize(comment, client_risk)
    print("Done quantization + encryption + serialization.")
    print("--------------------------------------------------")

    print("Step 4) View the encrypted payload by client (first 50 chars only)")
    print("Encrypted classifier input:", str(X_enc)[:50], "... [truncated]")
    print("Encrypted risk input:", str(X_enc_risk)[:50], "... [truncated]")
    print("--------------------------------------------------")

    serialized_evaluation_keys = client.get_serialized_evaluation_keys()
    serialized_evaluation_keys_risk = client_risk.get_serialized_evaluation_keys()

    print("Step 5) Client sends request and receives the encrypted output from server")
    encrypted_result, encrypted_result_risk = call_fhe_server(
        X_enc, X_enc_risk, serialized_evaluation_keys, serialized_evaluation_keys_risk
    )
    print("Encrypted outputs received from server.")
    print("Encrypted classifier output:", str(encrypted_result)[:50], "... [truncated]")
    print("Encrypted risk output:", str(encrypted_result_risk)[:50], "... [truncated]")
    print("--------------------------------------------------")

    print("Step 6) Client deserialize, decrypt, and dequantize the encrypted output")
    y_enc = client.deserialize_decrypt_dequantize(encrypted_result)
    y_enc_risk = client_risk.deserialize_decrypt_dequantize(encrypted_result_risk)
    print("Decryption complete. Probabilities:", y_enc)
    print("Decryption complete. Risk score:", clip_risk_score(y_enc_risk))
    print("--------------------------------------------------")

    # Probabilities to Category Mapping
    category_map = {
        0: "location/geoinformation",
        1: "routines",
        2: "contactinfo",
    }

    pred_idx = int(np.argmax(y_enc))
    print("Final Category:", category_map.get(pred_idx))
    return category_map.get(pred_idx), clip_risk_score(y_enc_risk)
