from fastapi import FastAPI
from pydantic import BaseModel
from language_models import safe_generate 
from client_side import run_inference
import json

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

class CommentHistoryRequest(BaseModel):
    comment_history: str  # chunk of comment history with reasoning/suggestions

@app.post("/privacy_analysis")
async def privacy_analysis(req: CommentHistoryRequest):
    print("--------------------------------------------------")
    print("Step 1) Receiving comment history for privacy analysis")
    print(f"Received comment history:\n{req.comment_history}")
    print("--------------------------------------------------")

    print("Step 2) Generating privacy analysis using Phi-3")
    analysis_result = generate_privacy_analysis(req.comment_history)
    print("Privacy analysis generation done.")
    print("--------------------------------------------------")
    print(f"Result:\n{json.dumps(analysis_result, indent=2)}")
    print("--------------------------------------------------")

    return {"privacy_analysis": analysis_result}