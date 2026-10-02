# 02. Backend Explained (Node.js & MongoDB)

The Backend is located in the `Backend/` folder. It serves as the core application tier and logic engine of the platform. It acts as the critical bridge routing data between the Frontend (client), the Database (persistence layer), and the **Python** ML service.

## Key Technologies Used
- **Node.js:** The asynchronous, event-driven JavaScript runtime environment that executes server-side code.
- **Express.js:** A minimal and flexible web application framework for **Node.js** that provides a robust set of features for web and mobile applications, heavily used here for routing API requests.
- **MongoDB:** A NoSQL database program that uses JSON-like documents with optional schemas, ideal for flexible student data storage.
- **Mongoose:** An Object Data Modeling (ODM) library for **MongoDB** and **Node.js**. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in **MongoDB**.

## Folder Structure & Architecture Explained

### 1. `server.js` and `app.js`
- **Purpose:** The entry points and configuration hub of the backend application.
- **Mechanism:** `server.js` establishes the connection to the **MongoDB** database and starts the server listening on a designated port (e.g., 5000). `app.js` registers middleware (like CORS for cross-origin requests and JSON body parsers) and binds the application routes.

### 2. `config/db.js`
- **Purpose:** Database initialization and connection management.
- **Mechanism:** Utilizes **Mongoose** to securely connect to the **MongoDB** cluster using connection strings managed securely via environment variables (`.env`).

### 3. `models/`
- **Purpose:** Data schema definition and validation.
- **Mechanism:** Defines the strict architectural blueprints for data. For example, the `Student.js` model enforces that a student document must contain a name, an email, a CGPA, and a structured array of skills. The `Company.js` model enforces fields like name, category, and minimum CGPA criteria.

### 4. `routes/`
- **Purpose:** API endpoint definition and request routing.
- **Mechanism:** Maps incoming HTTP requests (GET, POST, PUT, DELETE) from the **JavaScript** frontend to the appropriate controller logic. For example, requests to `/api/students` are routed to the `studentController.js`.

### 5. `controllers/`
- **Purpose:** Business logic execution and request handling.
- **Mechanism:** The controller functions extract parameters and body data from the request, invoke necessary services or **Mongoose** database queries, and return standardized JSON responses to the client.

### 6. `services/`
- **Purpose:** Encapsulated, reusable core logic functions.
- **Mechanism:** 
  - `eligibilityService.js`: Executes rule-based checks (e.g., validating if a student's CGPA meets a company's hard requirement).
  - `skillGapService.js`: Performs comparative analysis between a student's technical stack and a company's required stack to generate a categorized list of missing skills.

### 7. `.env` and `package.json`
- **`.env`:** Stores environment-specific variables, secrets, and API keys (e.g., the **MongoDB** URI).
- **`package.json`:** Manages project metadata and tracks all third-party **Node.js** dependencies (like **Express.js** and **Mongoose**). Running `npm install` resolves these dependencies.
