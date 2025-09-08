-- Database setup script for Urembo Hub API
-- Run this script in your PostgreSQL database before running migrations

-- Create database (run this as superuser)
-- CREATE DATABASE urembo_hub;

-- Connect to the database and create schema
-- \c urembo_hub;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a basic user for the application (optional)
-- CREATE USER urembo_user WITH PASSWORD 'your_password_here';
-- GRANT ALL PRIVILEGES ON DATABASE urembo_hub TO urembo_user;

-- The Prisma migrations will handle the rest of the schema creation
