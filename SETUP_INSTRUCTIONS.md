# SwiftLogistics Database Setup Instructions

## PostgreSQL Setup

1. **Connect to PostgreSQL and create the password column:**
   ```bash
   psql -U myuser -d swiftlogistics
   ```

2. **Run the SQL script to add password column:**
   ```sql
   \i infrastructure/database/postgresql/add_password_column.sql
   ```

   Or manually run:
   ```sql
   ALTER TABLE drivers 
   ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
   ```

## Running the Application

### 1. Start the User Service (Port 8081)
```bash
cd backend/user-service
./mvnw spring-boot:run
```

### 2. Start the API Gateway (Port 8080)
```bash
cd backend/api-gateway
./mvnw spring-boot:run
```

### 3. Test the API Gateway
```bash
curl http://localhost:8080/api/drivers/health
```

### 4. Run the Flutter App
```bash
cd mobile/driver_app
flutter run
```

## Architecture Overview

```
Mobile App (Flutter) 
    ↓
API Gateway (Port 8080) 
    ↓
User Service (Port 8081) 
    ↓
PostgreSQL Database (swiftlogistics)
```

### API Gateway Routes:
- `/api/drivers/**` → User Service (localhost:8081)
- `/api/orders/**` → Order Service (localhost:8082)  
- `/api/tracking/**` → Tracking Service (localhost:8083)

### Key Endpoints:
- `POST /api/drivers/register` - Driver registration
- `GET /api/drivers/health` - Health check
- `GET /api/drivers/{driverId}` - Get driver details

## Database Schema

The `drivers` table includes:
- `driver_id` (VARCHAR(20), Primary Key) - Auto-generated
- `first_name` (VARCHAR(50), NOT NULL)
- `last_name` (VARCHAR(50), NOT NULL)
- `email` (VARCHAR(100), UNIQUE, NOT NULL)
- `phone` (VARCHAR(15), NOT NULL)
- `commercial_license_number` (VARCHAR(30), UNIQUE, NOT NULL)
- `password_hash` (VARCHAR(255)) - BCrypt hashed password
- `status` (VARCHAR(20), DEFAULT 'pending')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Testing Driver Registration

You can test the API directly:

```bash
curl -X POST http://localhost:8080/api/drivers/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "commercialLicenseNumber": "CDL123456789",
    "password": "Password123"
  }'
```
