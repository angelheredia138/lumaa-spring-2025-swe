# Task Management Application

A full-stack task management application built with React + TypeScript (frontend), Node.js + Express (backend), and PostgreSQL (database) for the Lumaa Full-Stack Coding Challenge.

## Demo Link

[Watch the application demo](https://youtu.be/5G33YNwsGqM)

This video demonstrates:

- User registration process
- Login functionality
- Creating, editing, and deleting tasks
- Responsive design and user interface

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)
- Git

To verify your installations:

```bash
node --version
npm --version
psql --version
git --version
```

## Detailed Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/angelheredia138/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe
```

### 2. Database Setup

1. Start PostgreSQL service:

   ```bash
   # On macOS
   brew services start postgresql

   # On Ubuntu
   sudo service postgresql start

   # On Windows
   net start postgresql
   ```

2. Access PostgreSQL:

   ```bash
   psql -U postgres
   ```

3. Create the database:

   ```sql
   CREATE DATABASE task_management;
   ```

4. Verify database creation:

   ```sql
   \l
   ```

   You should see 'task_management' in the list.

5. Exit psql:
   ```sql
   \q
   ```

### 3. Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

4. Generate a JWT secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. Update .env file with your configuration:

   ```
   PORT=3000
   JWT_SECRET=<paste-your-generated-secret-here>

   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=task_management
   ```

6. Start the backend server:

   ```bash
   # Development mode with auto-reload
   npm run dev

   # OR Production mode
   npm run build
   npm start
   ```

   The server will start on http://localhost:3000

### 4. Frontend Setup

1. Open a new terminal and navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173

## Verification Steps

1. Backend Health Check:

   ```bash
   curl http://localhost:3000/api/health
   ```

   Should return: `{"status":"ok"}`

2. Frontend Access:
   - Open http://localhost:5173 in your browser
   - You should see the login/register page

## Common Issues & Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running:

  ```bash
  # macOS/Linux
  ps aux | grep postgres

  # Windows
  tasklist | findstr postgres
  ```

- Check database credentials in .env
- Ensure PostgreSQL is accepting connections:
  ```bash
  psql -U postgres -h localhost
  ```

### Backend Issues

- Check if port 3000 is available:

  ```bash
  # macOS/Linux
  lsof -i :3000

  # Windows
  netstat -ano | findstr :3000
  ```

- Verify node_modules is installed
- Check logs for errors:
  ```bash
  npm run dev
  ```

### Frontend Issues

- Clear browser cache
- Check console for errors (F12 in browser)
- Verify API URL in frontend configuration

## Features

- **User Authentication**

  - Register with username and password (with password requirements)
  - Login with credentials
  - JWT-based authentication
  - Protected routes

- **Task Management**
  - Create new tasks with title and optional description
  - View list of tasks
  - Update task details and completion status
  - Delete tasks
  - Real-time updates

## Testing

To test the application:

1. Register a new user (password must meet requirements):

   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

2. Login with your credentials
3. Try creating, editing, and deleting tasks
4. Test the responsive design on different screen sizes

## Tech Stack

- **Frontend**:

  - React 19
  - TypeScript
  - React Router v7
  - Axios for API calls

- **Backend**:
  - Node.js
  - Express
  - TypeORM
  - PostgreSQL
  - JWT for authentication
  - Bcrypt for password hashing

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Frontend route protection
- Input validation
- Secure password requirements

## Salary Expectations

Hourly rate expectation: $30/hour or annually: $62,400

## Notes

- The application uses modern React features and TypeScript for type safety
- Backend implements proper error handling and validation
- Frontend includes responsive design for mobile devices
- Database relationships are properly set up between users and tasks
- All API endpoints are protected except for login and register
