# 03. Machine Learning Explained (Python)

The Machine Learning (ML) architecture resides in the `ML/` folder. It functions as an independent microservice dedicated to predictive analytics. Its primary responsibility is to analyze complex student datasets and infer optimal career outcomes based on historical patterns.

## Key Technologies & Frameworks Used
- **Python:** The versatile, high-level programming language that powers the entire data science and ML ecosystem of this project.
- **Pandas:** A fast, powerful, flexible, and easy-to-use open-source data analysis and manipulation tool, built on top of the **Python** programming language. Used heavily for dataset handling.
- **NumPy:** The fundamental package for scientific computing in **Python**, providing support for large, multi-dimensional arrays and matrices.
- **Scikit-Learn:** The premier, robust **Machine Learning** library in **Python**. It provides the actual algorithmic implementations used for predictive modeling.
- **Flask:** A lightweight WSGI web application framework in **Python**. It is used to expose the trained ML models as RESTful API endpoints.

## ML Pipeline

### 1. Data Generation & Preprocessing (`dataset/`)
- Because real-world, privacy-compliant student data is difficult to source, the system generates synthetic, statistically realistic datasets (CSV files). 
- **Pandas** is used to load these datasets, clean missing values, normalize numerical features (like CGPA), and encode categorical features (like Branch or specific programming languages) into numerical representations that the ML algorithms can process.

### 2. Model Training (`training/`)
- The system employs Supervised Learning. Scripts like `train_role.py` and `train_company.py` feed the preprocessed data into **Scikit-Learn** estimators.
- **Algorithm Used:** **Random Forest Classifier**. This is an ensemble learning method that constructs a multitude of decision trees during training and outputs the mode of the classes for classification tasks. It was chosen for its high accuracy, resistance to overfitting, and ability to handle non-linear relationships in student data.

### 3. Model Serialization (`models/`)
- Training a **Random Forest** model from scratch for every prediction request is computationally expensive. Therefore, after training, the optimal models are serialized (saved to disk) using the `pickle` module into `.pkl` files (e.g., `role_model.pkl`).
- These serialized "brain" files allow the models to be loaded instantly into memory when the server starts.

### 4. API Serving & Inference (`api/ml_api.py`)
- To allow the **Node.js** backend to communicate with the **Python** models, a **Flask** API server is deployed (typically on port 5001).
- When the **Node.js** server needs a prediction, it sends a JSON payload containing the student's profile to the **Flask** `/predict` endpoint.
- **Flask** deserializes the data, applies the exact same preprocessing steps used during training, feeds the data to the loaded **Random Forest** `.pkl` model, and returns the predicted classification and probability score back to **Node.js** as JSON.
