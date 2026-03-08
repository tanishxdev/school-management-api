# School Management API

A **Node.js + Express + MySQL REST API** for managing schools and retrieving them based on **geographical proximity to a user's location**.

The system allows users to:

1. Add new schools with their geographic coordinates
2. Retrieve schools sorted by distance from the user's location

Distance is calculated using the **Haversine Formula**, which computes the shortest distance between two points on Earth using latitude and longitude.

This project was built as part of a **Node.js Backend Assignment**.

---

# Project Overview

Many real-world applications require finding nearby entities based on a user's location.

Examples include:

- Google Maps → Nearby restaurants
- Uber → Nearby drivers
- Food delivery apps → Nearby restaurants

Similarly, this system stores **school locations** and returns the **nearest schools to a user**.

The API solves two main problems:

1. Storing schools with geographic coordinates
2. Retrieving schools sorted by distance from a user’s location

---

# Key Features

### Add School

Allows a user to add a school with:

- name
- address
- latitude
- longitude

All fields are validated before inserting into the database.

---

### List Schools by Proximity

Returns all schools sorted by distance from the user's location.

Steps involved:

1. Fetch schools from database
2. Calculate distance between user and school
3. Sort schools by distance
4. Return sorted results

Nearest schools appear first.

---

# Tech Stack

### Backend

- Node.js
- Express.js

Why Express?

- Lightweight framework
- Fast API development
- Widely used for building REST APIs

---

### Database

- MySQL

Why MySQL?

- Structured relational database
- Efficient for storing tabular data
- Required by assignment

---

### API Testing

- Postman

Used to test API endpoints and verify responses.

---

### Version Control

- Git
- GitHub

Used for source code management and submission.

---

# System Architecture

```
Client (Postman / Browser)
        |
        |
     Express Server
        |
     Routes Layer
        |
     Controller Layer
        |
     Service Layer
        |
      MySQL Database
```

---

# Request Flow

Example request:

```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

Lifecycle:

1. Client sends HTTP request
2. Express router maps request to controller
3. Controller validates parameters
4. Service layer fetches schools from database
5. Distance calculated using Haversine formula
6. Schools sorted by distance
7. Response returned to client

---

# Project Structure

```
school-management-api
│
├── src
│
│   ├── config
│   │     db.js
│
│   ├── controllers
│   │     schoolController.js
│
│   ├── routes
│   │     schoolRoutes.js
│
│   ├── services
│   │     schoolService.js
│
│   ├── utils
│   │     distance.js
│
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

### Folder Explanation

| Folder      | Purpose                                 |
| ----------- | --------------------------------------- |
| config      | Database configuration                  |
| controllers | Handles request/response logic          |
| routes      | Defines API endpoints                   |
| services    | Business logic                          |
| utils       | Helper functions (distance calculation) |
| app.js      | Entry point for the Express server      |

This layered architecture improves **maintainability and scalability**.

---

# Database Design

Database name:

```
school_db
```

Table:

```
schools
```

Schema:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### Field Explanation

| Column    | Description          |
| --------- | -------------------- |
| id        | Unique identifier    |
| name      | School name          |
| address   | School address       |
| latitude  | Geographic latitude  |
| longitude | Geographic longitude |

---

# Distance Calculation

The API calculates distance using the **Haversine Formula**.

Formula:

```
distance =
6371 × acos(
cos(lat1) × cos(lat2) × cos(lon2 − lon1) +
sin(lat1) × sin(lat2)
)
```

Where:

- 6371 = Earth's radius in kilometers
- lat1, lon1 = user coordinates
- lat2, lon2 = school coordinates

Steps used in this project:

1. Fetch all schools
2. Calculate distance from user location
3. Attach distance to school object
4. Sort schools by distance

---

# Environment Variables

Create a `.env` file in the root directory.

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
```

---

# Database Setup

Create database:

```
CREATE DATABASE school_db;
```

Create table:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

# Installation and Setup

### Clone repository

```
git clone https://github.com/tanishxdev/school-management-api.git
```

---

### Move into project directory

```
cd school-management-api
```

---

### Install dependencies

```
npm install
```

---

### Setup environment variables

Create `.env`

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
```

---

### Start server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# API Endpoints

| Method | Endpoint       | Description                         |
| ------ | -------------- | ----------------------------------- |
| POST   | `/addSchool`   | Add a new school                    |
| GET    | `/listSchools` | Retrieve schools sorted by distance |

---

# Add School API

Endpoint

```
POST /addSchool
```

Example Request

```
http://localhost:5000/addSchool
```

Request Body

```json
{
  "name": "Delhi Public School",
  "address": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.209
}
```

Response

```json
{
  "message": "School added successfully"
}
```

---

# List Schools API

Endpoint

```
GET /listSchools
```

Example Request

```
http://localhost:5000/listSchools?latitude=28.6139&longitude=77.2090
```

Example Response

```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "New Delhi",
    "latitude": 28.6139,
    "longitude": 77.209,
    "distance": 1.2
  }
]
```

Schools are returned sorted by **distance from the user location**.

---

# Testing

APIs were tested using **Postman**.

Test cases include:

- Add school with valid data
- Validation failure cases
- Retrieve schools by location
- Verify sorting by distance

The Postman collection is included in the repository.

---

# Design Decisions

### Why calculate distance in Node.js?

Two possible approaches exist:

1. Calculate distance directly in MySQL
2. Calculate distance in the application layer

For this assignment, the calculation is performed in Node.js because:

- Simpler implementation
- Easier debugging
- Suitable for smaller datasets

---

### Why layered architecture?

Separating logic into layers improves:

- code readability
- maintainability
- scalability

Each layer has a **single responsibility**.

---

# Future Improvements

Possible production improvements:

- MySQL geospatial indexing
- Pagination for large datasets
- Input validation middleware
- Authentication for admin operations
- Docker containerization
- Cloud database deployment

---

# Author

Tanish Kumar
B.Tech Undergraduate
Delhi Technological University

Focused on Backend Development and System Design.
