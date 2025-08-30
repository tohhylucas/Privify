from fastapi import FastAPI
from pydantic import BaseModel
from llm_test import safe_generate 
from client_side import run_inference

app = FastAPI()

SERVER_LINK = "http://example.com/endpoint"
num_categories = 3
FHE_FILE_PATH = "./fhe_directory"
FHE_FILE_PATH_CLIENT = "./fhe_directory"
FHE_FILE_PATH_SERVER = "./fhe_directory"

FHE_FILE_PATH_RISK = "./fhe_directory_risk"
FHE_FILE_PATH_RISK_CLIENT = "./fhe_directory_risk"
FHE_FILE_PATH_RISK_SERVER = "./fhe_directory_risk"

def local_llm_process(text: str) -> str:
    return f"LLpyM Response: {text}"

class CommentRequest(BaseModel):
    comment: str

@app.post("/process")
async def process_comment(req: CommentRequest):
    print("--------------------------------------------------")
    print("Step 1) Receiving comment")
    print(f"Received comment: {req.comment}")
    print("--------------------------------------------------")

    print("Step 2) Running FHE inference to get category and risk scores")
    category, risk_score = run_inference(req.comment)
    print(f"Inference complete -> Category: {category}, Risk Score: {risk_score}")
    print("--------------------------------------------------")

    print("Step 7) Generating SLM output")
    llm_output = safe_generate(req.comment, category, risk_score)
    print("LLM generation done.")
    print("--------------------------------------------------")

    print("Step 8) Output generated and sending reply")
    print(f"Reply: {llm_output}")
    print("--------------------------------------------------")

    return {"response": llm_output}
