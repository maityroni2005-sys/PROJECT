# 05. Setup Instructions (How to Run the Project)

This document outlines the systematic deployment sequence required to run the full-stack architecture locally. Proper execution requires starting the persistence layer, the application tier, the ML microservice, and finally serving the client tier.

## Prerequisites
- **Node.js** installed (v14+ recommended)
- **Python** installed (v3.8+ recommended)
- **MongoDB** installed and running locally, or a MongoDB Atlas cluster URI.

---

## Setup Instructions

### Step 1: Initialize the Database (MongoDB)
1. Ensure the **MongoDB** service is active on your local machine.
2. If using MongoDB Compass, connect to the default URI: `mongodb://localhost:27017`.
3. The database collections will be created automatically by **Mongoose** upon the first insertion.

---

### Step 2: Boot up the Backend (Node.js & Express.js)
1. Open a terminal instance.
2. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
3. Install the required **Node.js** dependencies:
   ```bash
   npm install
   ```
4. Start the **Express.js** application server:
   ```bash
   npm run dev
   ```
5. A successful boot will log: 
   `Server running in development mode on port 5000`
   `MongoDB Connected...`

---

### Step 3: Initialize the ML Service (Python & Flask)
1. Open a **second, concurrent terminal instance**.
2. Navigate to the ML directory:
   ```bash
   cd ML
   ```
3. Install the necessary **Python** dependencies (**Pandas**, **NumPy**, **Scikit-Learn**, **Flask**):
   ```bash
   pip install -r requirements.txt
   ```
4. *(Optional but Recommended)* Execute the ML Pipeline to generate data and train the **Random Forest** models:
   ```bash
   python training/train_role.py
   python training/train_company.py
   ```
   *This processes the data and generates the `.pkl` serialization files.*
5. Boot the **Flask** API server:
   ```bash
   python api/ml_api.py
   ```
6. A successful boot will log:
   `Running on http://127.0.0.1:5001`

---

### Step 4: Launch the Client Interface (HTML/CSS/JS Frontend)
1. No local development server is strictly required for the static frontend files, though an extension like VS Code "Live Server" is highly recommended to prevent CORS issues.
2. Alternatively, simply navigate to the `Frontend` directory in your file explorer.
3. Open `index.html` in a modern web browser (Chrome/Edge/Firefox).
4. The system is now fully operational. You can register a new user, build a profile, and request predictions.
