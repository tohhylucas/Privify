from sklearn.model_selection import train_test_split
import pandas as pd
from utils import process_comment

from concrete.ml.sklearn import NeuralNetRegressor
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

num_categories = 3
FHE_FILE_PATH = "./fhe_directory"
FHE_FILE_PATH_CLIENT = "./fhe_directory"
FHE_FILE_PATH_SERVER = "./fhe_directory"

df = pd.read_csv('comments.csv')
column_labels = df.columns.tolist()
categories = column_labels[-num_categories:]
print(categories)



def clear_fhe_dir():
    if os.path.exists(FHE_FILE_PATH):
        for filename in os.listdir(FHE_FILE_PATH):
            file_path = os.path.join(FHE_FILE_PATH, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.remove(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')
        print(f"Cleared the directory: {FHE_FILE_PATH}")
    else:
        os.makedirs(FHE_FILE_PATH)
        print(f"Created the directory: {FHE_FILE_PATH}")

# (A) Train Classifier for Category
X = df.values[:, 0]
len_longest_comment = max(len(x) for x in X)
y = df.iloc[:, -num_categories:].to_numpy().astype(np.float32)

params = {
    "module__n_layers": 3,
    "module__activation_function" : nn.ReLU,
    "module__n_hidden_neurons_multiplier" : 4,
    
    "module__n_w_bits" : 4, 
    "module__n_a_bits" : 4,
    
    "max_epochs": 150,
    "verbose" : True,
    "lr" : 1e-3,
}


X_processed = np.array([process_comment(comment, max_length=70) for comment in X])
n_inputs = 70
n_outputs = num_categories

X_train, X_test, y_train, y_test = train_test_split(X_processed, y, test_size=0.05)
concrete_regressor = NeuralNetRegressor(**params)
concrete_regressor.fit(X_train, y_train)
y_pred = concrete_regressor.predict(X_test)

# For classification accuracy (assuming the most likely category)
accuracy = np.mean(np.argmax(y_pred, axis=1) == np.argmax(y_test, axis=1))
print(f"Classification Accuracy: {accuracy:.4f}")

# For MSE Loss
print(f"MSE_Loss {np.sum((y_pred - y_test) ** 2) / y_pred.shape[0]}")

concrete_regressor.compile(X_train)


dev = FHEModelDev(path_dir=FHE_FILE_PATH, model=concrete_regressor)

clear_fhe_dir()
dev.save()


