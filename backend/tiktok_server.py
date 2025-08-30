import base64
from fastapi import FastAPI
from pydantic import BaseModel
from concrete.ml.deployment import FHEModelServer
import numpy as np
from typing import Union, List

app = FastAPI()

FHE_FILE_PATH_SERVER = "./fhe_directory"
FHE_FILE_PATH_RISK_SERVER = "./fhe_directory_risk"

class FHERequest(BaseModel):
    X_enc: Union[str, List]  # base64 string or list
    X_enc_risk: Union[str, List]
    serialized_keys: str      # base64 string
    serialized_keys_risk: str

def decode_input(x: Union[str, list]) -> Union[np.ndarray, bytes]:
    """
    Convert X_enc/X_enc_risk back to proper type.
    - If str: decode base64 to bytes
    - If list: convert to numpy array
    """
    if isinstance(x, str):
        return base64.b64decode(x)
    elif isinstance(x, list):
        return np.array(x)
    else:
        raise TypeError(f"Unsupported type for input: {type(x)}")

def decode_keys(key_b64: str) -> bytes:
    return base64.b64decode(key_b64)

def bytes_to_b64(b: bytes) -> str:
    return base64.b64encode(b).decode("utf-8")

@app.post("/fhe/process")
def process_fhe(req: FHERequest):
    print("--------------------------------------------------")
    print("Step 1) Tiktok server receives encrypted payload and does secure FHE inference")
    # Decode inputs
    X_enc = decode_input(req.X_enc)
    X_enc_risk = decode_input(req.X_enc_risk)
    serialized_keys = decode_keys(req.serialized_keys)
    serialized_keys_risk = decode_keys(req.serialized_keys_risk)

    # Load servers
    server = FHEModelServer(path_dir=FHE_FILE_PATH_SERVER)
    server.load()
    server_risk = FHEModelServer(path_dir=FHE_FILE_PATH_RISK_SERVER)
    server_risk.load()

    # Run inference
    encrypted_result = server.run(X_enc, serialized_keys)
    encrypted_result_risk = server_risk.run(X_enc_risk, serialized_keys_risk)

    print("FHE inference done on encrypted data.")
    print("--------------------------------------------------")

    print("Step 2) Server sends back encrypted output to client")
    response = {
        "encrypted_result": bytes_to_b64(encrypted_result),
        "encrypted_result_risk": bytes_to_b64(encrypted_result_risk)
    }
    print("Encrypted outputs serialized and ready to send.")
    print("--------------------------------------------------")

    return response
