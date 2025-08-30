
import torch
from transformers import pipeline
from typing import List, Dict
import re
import pandas as pd

pipe = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    torch_dtype=torch.bfloat16,
    device_map="auto"
)

def generate_moderation_response(comment: str, violation_types: List[str], risk_score: int) -> Dict[str, str]:
    """
    Generate reasoning and suggestion for a flagged comment.

    Args:
        comment (str): The social media comment.
        violation_types (List[str]): List of violation types.
        risk_score (int): Integer from 1 to 10 indicating severity.

    Returns:
        Dict[str, str]: Dictionary with keys "reason" and "suggestion".
    """
    messages = [
        {
            "role": "system",
            "content": """
You are a content moderation assistant. Analyze a social media comment flagged with a violation type. 

For each comment, output the following:
- reasoning: A single short sentence explaining why the comment violates the type. Focus on the specific risk.
- suggestion: A single short sentence suggesting how the comment could be safer or what the user should avoid.

Rules:
- Do not include the risk score in the output.
- Use proper grammar and punctuation.
- Each field should be concise and one line, suitable for a UI tooltip.

Inputs:
- Comment: the text posted by the user
- Violation type: one of [location/geoinformation, contactinfo, routines]
- Risk score: an integer from 1 to 10 indicating severity
"""
        },
        {
            "role": "user",
            "content": f""" comment:'{comment}', Violation types: '{', '.join(violation_types)}', risk: {risk_score}. Output the following:
- Reasoning: A single short sentence explaining why the comment violates the type. Focus on the specific risk and privacy concern.
- Suggestion: A single short sentence suggesting how the comment could be safer or what the user should avoid to protect his privacy. 
"""
        }
    ]

    # Apply chat template
    prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)

    # Generate output
    outputs = pipe(prompt, max_new_tokens=300, do_sample=True, temperature=0.3, top_k=50, top_p=0.95)
    full_text = outputs[0]["generated_text"]

    # Extract assistant response
    if "<|assistant|>" in full_text:
        response_text = full_text.split("<|assistant|>")[-1].strip()
    else:
        response_text = full_text.strip()

    # print(response_text)  # For debugging
    # print("-----")

    # Try to parse Reasoning and Suggestion even if JSON is malformed
    reason = ""
    suggestion = ""
    reason_match = re.search(r"[Rr]easoning:\s*(.+?)(?:\n|\Z)", response_text, re.DOTALL)
    if reason_match:
        reason = reason_match.group(1).strip().replace("\n", " ")

    suggestion_match = re.search(r"[Ss]uggestion:\s*(.+?)(?:\n\n|\Z)", response_text, re.DOTALL)
    if suggestion_match:
        suggestion = suggestion_match.group(1).strip().replace("\n", " ")

    return {"reason": reason, "suggestion": suggestion}



# Assuming your generate_moderation_response function is already defined
# and `pipe` is loaded globally

def safe_generate(comment: str, category: str, score: int, max_retries: int = 6) -> Dict[str, str]:

    for attempt in range(max_retries):
        result = generate_moderation_response(comment, [category], score)
        reason, suggestion = result.get("reason", ""), result.get("suggestion", "")
        if reason and suggestion:
            return result
        print(f"⚠️ Empty response, retrying ({attempt+1}/{max_retries})...")
    # If still empty after retries, fallback
    return {"reason": "Could not generate reasoning.", "suggestion": "Could not generate suggestion."}


def process_csv(input_csv: str, output_csv: str) -> None:

    df = pd.read_csv(input_csv)

    # Ensure required columns exist
    if not {"comment", "category", "score"}.issubset(df.columns):
        raise ValueError("CSV must contain columns: comment, category, score")

    reasons: List[str] = []
    suggestions: List[str] = []

    for idx, row in df.iterrows():
        comment, category, score = row["comment"], row["category"], row["score"]
        result = safe_generate(comment, category, int(score))
        reasons.append(result["reason"])
        suggestions.append(result["suggestion"])
        print(f"✅ Processed row {idx+1}/{len(df)}")

    # Add results to dataframe
    df["reason"] = reasons
    df["suggestion"] = suggestions

    # Save to new CSV
    df.to_csv(output_csv, index=False)
    print(f"✅ Done! Saved results to {output_csv}")


# Example usage
# process_csv("new_comments.csv", "output_with_reasons.csv")
# generate_moderation_response("User's location is New York City.", ["geoinformation"], 7)
