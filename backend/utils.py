import numpy as np

def process_comment(comment, max_length=70):

    # Clean and normalize the comment
    comment = comment.lower().strip()
    
    # Pad or truncate to max_length
    if len(comment) < max_length:
        comment = comment + ' ' * (max_length - len(comment))
    else:
        comment = comment[:max_length]
    
    # Convert characters to ASCII values (0-127 range)
    char_vector = [ord(char) for char in comment]
    
    # Convert to numpy array
    char_array = np.array(char_vector, dtype=np.float64)    

    # Min-max scaling to [0, 1] range
    char_min, char_max = char_array.min(), char_array.max()
    if char_max > char_min:
        char_array = (char_array - char_min) / (char_max - char_min)
    else:
        char_array = np.zeros_like(char_array)  # Handle case where all chars are same

    return char_array

def clip_risk_score(prediction):
    return np.clip(np.round(prediction), 1, 10)