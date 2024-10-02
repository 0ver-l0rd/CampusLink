# CampusLink

A comprehensive Student Management System built using modern technologies to manage students, teachers, classes, subjects, and more, providing an easy-to-use interface for administrators to oversee educational activities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Student Management System is designed to simplify managing student data, class schedules, exams, and attendance. It offers administrators the ability to create, update, and delete records efficiently while ensuring secure data management through PostgreSQL and Prisma. Additionally, the system integrates cutting-edge AI features for intelligent task automation and assistance.

The system also incorporates ShadCN for custom styling and is deployed on **Netlify** for frontend hosting and **Neon** for PostgreSQL database management. The project utilizes **Eraser.io** for real-time collaboration features.

## Features

- **Student Management**: Add, update, delete, and view student information.
- **Teacher Management**: Manage teacher data and assignments to classes.
- **Class Management**: Create and update class schedules.
- **Exam & Subject Management**: Administer exams and manage subject data.
- **Attendance & Results**: Keep track of student attendance and results.
- **Responsive UI**: Clean, modern UI built with React and styled with ShadCN.
- **AI Assistant**: A virtual AI assistant to help users with various queries and system-related tasks.
- **Course Generation**: AI-powered course generator based on learning objectives and student profiles.
- **Exam Generation**: AI-generated exams based on subject content and difficulty levels.



## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: ShadCN UI
- **Database**: PostgreSQL, Prisma ORM
- **Real-time Collaboration**: Eraser.io
- **Backend Hosting**: Neon (PostgreSQL as a service)
- **Frontend Hosting**: Netlify

## Installation

### Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Neon](https://neon.tech/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/student-management-system.git
   cd student-management-system
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (explained below).

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_Z3VpZGluZy1yaGluby01NS5jbGVyay5hY2NvdW50cy5kZXYk"
CLERK_SECRET_KEY="sk_test_VODnIE4zIroWnajQJs9eGE3UAmIEkUiiW1BLDxvysN"
DATABASE_URL="postgresql://ss_owner:e8NwCa5GhZSm@ep-spring-shape-a5h9pbjg.us-east-2.aws.neon.tech/campus_Link?sslmode=require"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
```
## Database Setup

1. Initialize Prisma and configure the database:

   ```bash
   npx prisma init
   ```

   This will generate your `prisma/schema.prisma` file where the database schema is defined.

2. Apply migrations to set up your database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

3. Seed the database (optional):

   ```bash
   npx prisma db seed
   ```

## Running the Project

To start the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

The project is configured to deploy on **Netlify** for the frontend and **Neon** for the database.

### Deploying to Netlify

1. Log in to [Netlify](https://netlify.com) and connect your GitHub repository.
2. Set your environment variables on the Netlify dashboard.
3. Every push to your repository will automatically trigger a new deployment.

### Database Deployment on Neon

1. Set up a Neon PostgreSQL instance for hosting your database.
2. Update your `DATABASE_URL` in the `.env` file with the Neon connection string.
3. Neon automatically handles scaling and database management.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

### Steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Added feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.


