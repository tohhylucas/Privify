from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
import pandas as pd
from utils import process_comment

from concrete.ml.sklearn import NeuralNetRegressor
from concrete.ml.sklearn import RandomForestRegressor
from concrete.ml.deployment import FHEModelDev, FHEModelClient, FHEModelServer
import numpy as np
import pandas as pd
import torch.nn as nn
from collections import Counter
import re
from sklearn.preprocessing import normalize
from sklearn.model_selection import train_test_split
import os
import shutil


FHE_FILE_PATH_RISK = "./fhe_directory_risk"
FHE_FILE_PATH_RISK_CLIENT = "./fhe_directory_risk"
FHE_FILE_PATH_RISK_SERVER = "./fhe_directory_risk"



def clear_fhe_dir():
    if os.path.exists(FHE_FILE_PATH_RISK):
        for filename in os.listdir(FHE_FILE_PATH_RISK):
            file_path = os.path.join(FHE_FILE_PATH_RISK, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.remove(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')
        print(f"Cleared the directory: {FHE_FILE_PATH_RISK}")
    else:
        os.makedirs(FHE_FILE_PATH_RISK)
        print(f"Created the directory: {FHE_FILE_PATH_RISK}")

# (A) Train Classifier for Category
# Load new_comments.csv with risk scores
# Load new_comments.csv with risk scores
df_risk = pd.read_csv('comments.csv')
X_risk = df_risk.values[:, 0]  # comment column
y_risk = df_risk.iloc[:, 2].astype(float).to_numpy(dtype=np.float32).reshape(-1, 1)

# Process comments the same way
X_risk_processed = np.array([process_comment(comment, max_length=70) for comment in X_risk])

# Train the model
params_risk = {
    "module__n_layers": 3,  # Simpler for regression
    "module__activation_function": nn.ReLU,
    "module__n_hidden_neurons_multiplier": 4,
    "module__n_w_bits": 4,
    "module__n_a_bits": 4,
    "max_epochs": 300,
    "verbose": True,
    "lr": 3e-3,
}

risk_model = NeuralNetRegressor(**params_risk)
risk_model.fit(X_risk_processed, y_risk)
risk_model.compile(X_risk_processed)

dev_risk = FHEModelDev(path_dir=FHE_FILE_PATH_RISK, model=risk_model)

clear_fhe_dir()
dev_risk.save()


