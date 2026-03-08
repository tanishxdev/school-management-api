# School Management API

A **Node.js + Express + MySQL REST API** for managing schools and retrieving them based on **geographical proximity to a user's location**.

The system allows users to:

1. Add new schools with their geographic coordinates
2. Retrieve schools sorted by distance from the user's location

Distance is calculated using the **Haversine Formula**, which computes the shortest distance between two points on Earth's surface using latitude and longitude.

This project was built as part of a **Node.js Backend Assignment**.

---

# Problem Statement

Many applications require finding nearby entities based on a user's location.

Examples:

- Google Maps → Nearby restaurants
- Uber → Nearby drivers
- Food delivery apps → Nearby restaurants

Similarly, this system stores **school locations** and returns the **nearest schools to a user**.

The API solves two core problems:

1. Storing schools with geographic coordinates
2. Sorting schools based on distance from a user’s location

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
4. Return sorted result

Nearest schools appear first.

---

# Tech Stack

## Backend

Node.js
Express.js

Why Express?

- Lightweight framework
- Fast API development
- Industry standard for Node.js REST APIs

---

## Database

MySQL

Why MySQL?

- Structured relational database
- Efficient for storing tabular data
- Required in assignment

---

## API Testing

Postman

Used for testing and verifying API endpoints.

---

## Version Control

Git + GitHub

Used for:

- Source code management
- Assignment submission

---

# System Architecture

High level architecture:

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

Request lifecycle:

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
│   │
│   ├── config
│   │     db.js
│   │
│   ├── controllers
│   │     schoolController.js
│   │
│   ├── routes
│   │     schoolRoutes.js
│   │
│   ├── services
│   │     schoolService.js
│   │
│   ├── utils
│   │     distance.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

Explanation of folders:

| Folder      | Purpose                                    |
| ----------- | ------------------------------------------ |
| config      | Database configuration                     |
| controllers | Handle HTTP requests and responses         |
| routes      | API endpoint definitions                   |
| services    | Business logic                             |
| utils       | Helper utilities like distance calculation |
| app.js      | Main Express server                        |

This layered structure improves **maintainability and scalability**.

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

Field explanation:

| Column    | Description              |
| --------- | ------------------------ |
| id        | Unique school identifier |
| name      | Name of the school       |
| address   | Physical address         |
| latitude  | Geographic latitude      |
| longitude | Geographic longitude     |

---

# Distance Calculation

The system uses the **Haversine Formula** to compute distance between two coordinates.

Formula:

```
distance =
6371 × acos(
cos(lat1) × cos(lat2) × cos(lon2 − lon1) +
sin(lat1) × sin(lat2)
)
```

Where:

- 6371 = Earth radius in kilometers
- lat1, lon1 = user location
- lat2, lon2 = school location

Steps performed in the system:

1. Fetch all schools
2. Calculate distance for each school
3. Add distance field
4. Sort schools

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

Open MySQL and run:

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

### 1 Clone repository

```
git clone https://github.com/yourusername/school-management-api.git
```

---

### 2 Navigate into project

```
cd school-management-api
```

---

### 3 Install dependencies

```
npm install
```

---

### 4 Setup environment variables

Create `.env`

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
```

---

### 5 Start server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# API Endpoints

## 1 Add School

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

# 2 List Schools

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

The APIs were tested using **Postman**.

Test cases:

1. Add school with valid data
2. Add school with missing fields
3. Retrieve schools using location
4. Verify distance sorting

---

# Design Decisions

### Why compute distance in Node.js?

Two approaches exist:

1. Calculate distance inside MySQL query
2. Calculate distance in application logic

For this assignment, the calculation is done in Node.js because:

- Simpler implementation
- Easier to understand
- Suitable for small datasets

---

### Why layered architecture?

Separating logic into layers improves:

- Code readability
- Maintainability
- Scalability

Each layer has a single responsibility.

---

# Future Improvements

Possible improvements for production systems:

- MySQL geospatial queries
- Pagination for large datasets
- Input validation middleware
- Authentication for admin access
- Docker containerization
- Cloud database deployment

---

# Author

Tanish Kumar

B.Tech Undergrad
Delhi Technological University

Focused on Backend Development and System Design.
