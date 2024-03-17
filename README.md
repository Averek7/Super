# Super

# Node.js Express Application Development Task

## Overview
The task requires you to develop a functional Node.js Express application, utilizing Postgres as the database and Jest for automated testing. You'll receive a problem statement via email just before your designated time-slot. Ensure that you're equipped with all the prerequisites for completing the task.

## Submission Requirements
Your submission must include a GitHub repository URL containing a fully functional Node.js Express application. This repository should encompass:
- API code implementing functionalities outlined in the problem statement.
- Database interactions integrated into the application.
- Comprehensive API-level and unit tests covering various scenarios for all developed code.

## Tasks
Your tasks will involve:
1. Developing APIs according to the functionalities specified in the problem statement.
2. Writing thorough API-level and unit tests to encompass as many scenarios as possible for all the code developed.

Ensure that your application is well-structured, follows best practices, and adheres to any guidelines provided in the problem statement.

## Steps:
1. Manually added the models to the database
2. Inserted test values into the database

## Schema
-- Create Customers table
CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Create Transactions table
CREATE TABLE Transactions (
    transaction_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create PaymentMethods table
CREATE TABLE PaymentMethods (
    payment_method_id SERIAL PRIMARY KEY,
    transaction_id INT NOT NULL,
    method_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL
);
