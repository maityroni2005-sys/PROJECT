# 01. Project Overview

## What is this project?
This project is the **"ML-Based Student Placement Guidance & Career Recommendation System"**. 

It is a comprehensive web application designed to assist final-year engineering students in determining their optimal career path and evaluating their chances of securing placements at specific companies. By leveraging **Machine Learning**, the system provides data-driven insights rather than generic advice.

## System Architecture
The project follows a modern, decoupled three-tier architecture:
1. **The Frontend (Client Tier):** The user interface where students interact with the system. It is built using **HTML5**, **CSS3**, **Bootstrap 5**, and **JavaScript**.
2. **The Backend (Application Tier):** The central nervous system that processes business logic, handles data persistence, and orchestrates requests. It is built with **Node.js** and **Express.js**.
3. **The Machine Learning API (Data Science Tier):** A dedicated microservice responsible exclusively for predictive analytics. It utilizes **Python** and **Scikit-Learn** (specifically the **Random Forest** algorithm), served via a **Flask** API.

## Data Flow
The system operates on a seamless flow of data between its tiers:
1. **Student Registration & Profile Creation:** The student inputs their academic and technical data (CGPA, branch, programming skills) via the **Frontend**.
2. **Data Persistence:** The **Frontend** sends a JSON payload to the **Node.js** backend via RESTful APIs. The backend validates the payload and stores it securely in a **MongoDB** database.
3. **Analysis Request:** When the user requests an analysis, the **Node.js** backend first performs a "Hard Eligibility Check" (e.g., verifying if the CGPA meets a company's strict threshold).
4. **ML Prediction:** If the student passes the basic criteria, the **Node.js** backend forwards the student's profile data to the **Python**/**Flask** ML API.
5. **Prediction Generation:** The **Python** service runs the data through the pre-trained **Random Forest** models to predict the best Career Role and a Company Match Score (percentage).
6. **Skill Gap Analysis:** Concurrently, the **Node.js** backend compares the student's existing skills against the company's required skills to generate a priority-based "Missing Skills" report.
7. **Final Display & Resume:** The **Frontend** renders the dashboard with these insights. The user can then generate a dynamic PDF resume using frontend **JavaScript** libraries.
