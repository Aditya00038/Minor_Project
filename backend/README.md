# Citizen App Backend - FastAPI + PostgreSQL

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Update `.env` file with your PostgreSQL credentials if needed.

### 3. Run the Server
```bash
python main.py
```
Or using uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. API Documentation
Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info (requires token)

### Users
- `GET /api/users` - Get all users (requires token)

## Request Examples

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone_no": "1234567890",
  "password": "securepass123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Database Schema

### Users Table
- `id` - Integer, Primary Key
- `name` - String
- `email` - String, Unique
- `phone_no` - String
- `hashed_password` - String
- `created_at` - DateTime
- `updated_at` - DateTime

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Token expiration (30 minutes)
- Protected routes
- CORS enabled for React Native

## Notes
- Tokens are stored client-side
- Logout removes token from client
- Use Authorization header: `Bearer <token>` for protected routes
