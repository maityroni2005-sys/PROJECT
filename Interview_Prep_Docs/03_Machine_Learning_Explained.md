# 03. Machine Learning Microservice Tier (Python, Scikit-Learn & Flask)

The Machine Learning architecture resides in the `ML/` directory and executes on **Port 5001**. It operates as an independent microservice dedicated to statistical modeling, multi-class career role classification, real-time company suitability scoring, and algorithmic skill gap diagnostics.

---

## 1. Core Technologies & Mathematics
- **Python (3.8+)**: Core programming environment.
- **Scikit-Learn (v1.3+)**: Industry-standard ML framework providing the `RandomForestClassifier` ensemble estimator.
- **Flask (v3.0+) & Flask-CORS**: High-throughput WSGI micro-framework exposing REST API endpoints for Node.js consumption.
- **NumPy & Pandas**: Array manipulations, feature matrix transformations, and dataset serialization.
- **Joblib / Pickle**: Serialization libraries used to persist trained model estimators (`.pkl`).

---

## 2. Machine Learning Algorithm: Why Random Forest?
The core classification engine uses the **Random Forest Classifier (Ensemble of Decision Trees)**.

### Why not Logistic Regression?
Logistic regression assumes a linear relationship between features and the target role. In reality, student skill compatibility is deeply non-linear (e.g., having high Python skills paired with Pandas and TensorFlow signifies an ML Engineer, but having Python paired with Django and Docker signifies a Backend Engineer).

### Why not Deep Neural Networks?
Deep neural networks require tens of thousands of training instances, heavy GPU computation, and act as complete "black boxes". Random Forest offers superior explainability, requires zero feature scaling (it is invariant to monotonic feature transformations), resists overfitting through bagging (bootstrap aggregating), and executes inference in sub-millisecond response times.

### Hyperparameters:
- `n_estimators`: 100 decision trees.
- `criterion`: `'gini'` (Gini Impurity for optimal information split).
- `max_depth`: 12 (prevents individual tree memorization).
- `min_samples_split`: 4.

---

## 3. Mathematical Scoring Formulas & Feature Extraction

### A. Input Feature Vectors
Each candidate profile is parsed into three complementary feature sub-matrices:
1. **Academic Matrix ($X_{\text{acad}}$)**:
   - $\text{CGPA} \in [0.0, 10.0]$
   - $\text{Backlogs} \in [0, \infty)$
   - $\text{Graduation Year} \in [2024, 2028]$
2. **DSA Competency Weight ($X_{\text{dsa}}$)**:
   $$\text{DSA Weight} = \begin{cases} 0.40 & \text{if Beginner} \\ 0.75 & \text{if Intermediate} \\ 1.00 & \text{if Advanced} \end{cases}$$
3. **Skill Intersection Vector ($S_{\text{student}} \cap S_{\text{required}}$)**:
   - Normalized lowercase tokens extracted across languages, web frameworks, databases, and project tech stacks.
   - Skill Match Ratio:
     $$\text{Skill Ratio} = \frac{|S_{\text{student}} \cap S_{\text{required}}|}{|S_{\text{required}}|}$$

---

### B. Mathematical Formulas

#### 1. Career Role Compatibility Score
For each target career role (Full Stack Developer, Backend Developer, Frontend Developer, Data Analyst, ML Engineer, DevOps Engineer):

$$\text{Base Score} = \left( \text{Skill Ratio} \times W_{\text{skills}} + \frac{\text{CGPA}}{10} \times W_{\text{cgpa}} + \text{DSA Weight} \times W_{\text{dsa}} \right) \times 100$$

$$\text{Backlog Penalty} = \text{Backlogs} \times 4$$

$$\text{Final Role Score} = \min\left(99, \max\left(35, \text{round}(\text{Base Score} - \text{Backlog Penalty})\right)\right)$$

*Role-Specific Weights Table:*
| Target Role | $W_{\text{skills}}$ | $W_{\text{cgpa}}$ | $W_{\text{dsa}}$ | Minimum CGPA |
| :--- | :---: | :---: | :---: | :---: |
| **Full Stack Developer** | 0.60 | 0.25 | 0.15 | 6.5 |
| **Backend Developer** | 0.55 | 0.25 | 0.20 | 7.0 |
| **Frontend Developer** | 0.65 | 0.25 | 0.10 | 6.0 |
| **Data Analyst** | 0.60 | 0.30 | 0.10 | 6.5 |
| **ML Engineer** | 0.55 | 0.25 | 0.20 | 7.5 |
| **DevOps Engineer** | 0.60 | 0.25 | 0.15 | 6.5 |

---

#### 2. Company Suitability Score
Used for company catalog cards and job postings:

$$\text{Suitability Score} = \text{round}\left( (\text{Skill Ratio} \times 55) + \left(\frac{\text{CGPA}}{10} \times 35\right) + (\text{DSA Weight} \times 10) - (\text{Backlogs} \times 5) \right)$$

- **Hard Eligibility Gate**: If $\text{CGPA} < \text{Req CGPA}$ or $\text{Backlogs} > \text{Max Backlogs}$, the score is capped at **58%** to signal that while the student may possess technical aptitude, they cannot clear the corporate registration gate without upskilling or backlog remediation.

---

## 4. File-by-File Breakdown of the `ML/` Directory

### 1. [`ML/api/ml_api.py`](file:///c:/Users/maity\OneDrive\Desktop\roni\ML\api\ml_api.py)
- **Role**: Microservice HTTP server.
- **Key Functions**:
  - `extract_student_skills(student)`: Extracts, lowercases, cleans, and deduplicates all skill tokens across personal profiles, nested objects, and project descriptions.
  - `extract_academics(student)`: Safely parses CGPA, active backlogs, and assigns DSA level weights.
  - `@app.route('/predict-role')`: POST endpoint evaluating a student against the 6 canonical career roles, returning a descending-sorted list of roles with percentage scores, matched skills, and missing skills.
  - `@app.route('/predict-company')`: POST endpoint evaluating student skills and academic history against a target company's criteria.
  - `@app.route('/skill-gap')`: POST endpoint segmenting missing skills into **High Priority** (immediate screening blockers), **Medium Priority** (interview differentiators), and **Low Priority** (bonus competencies).
  - `@app.route('/health')`: Liveness probe verifying microservice availability.

### 2. [`ML/training/train_models.py`](file:///c:/Users/maity\OneDrive\Desktop\roni\ML\training\train_models.py)
- **Role**: Offline model training pipeline.
- **Workflow**:
  1. Generates 1,200 synthetic, statistically realistic engineering placement records based on Gaussian distribution ($\mu = 7.8, \sigma = 1.1$).
  2. Saves dataset to `ML/dataset/synthetic_students.json`.
  3. Fits Random Forest multi-class decision trees.
  4. Serializes trained estimator into `ML/models/role_model.pkl`.

### 3. [`ML/requirements.txt`](file:///c:/Users/maity\OneDrive\Desktop\roni\ML\requirements.txt)
- Declares core dependencies: `flask`, `flask-cors`, `pandas`, `scikit-learn`, `numpy`.

---

## 5. Resilient Node-to-Python Failover Architecture
If the Python microservice is stopped or undergoing updates during a live presentation:
1. The Node.js gateway catches the Axios connection timeout via a `try...catch` block.
2. Rather than throwing a `500 Internal Server Error`, Node.js invokes its built-in deterministic fallback formula:
   $$\text{Fallback Score} = \min(99, \max(30, \text{round}(\text{CGPA} \times 10 - \text{Backlogs} \times 5)))$$
3. The response payload sets `scoreSource: 'fallback'`. The UI displays the calculation honestly without showing broken loaders or error dialogues.
