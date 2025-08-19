# Database Setup Instructions

## Step 1: Add Password Column to Database
Please run the following SQL command in your PostgreSQL database (swiftlogistics):

```sql
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
```

You can run this using:
- pgAdmin
- psql command line: `psql -U myuser -d swiftlogistics -c "ALTER TABLE drivers ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);"`

## Step 2: Start the Backend
Navigate to the user-service directory and run:
```bash
cd backend/user-service
./mvnw spring-boot:run
```

Or on Windows:
```bash
cd backend/user-service
mvnw.cmd spring-boot:run
```

## Step 3: Test the API
The backend will be available at: http://localhost:8081

Test endpoints:
- Health check: GET http://localhost:8081/api/drivers/health
- Register driver: POST http://localhost:8081/api/drivers/register

## API Endpoints

### POST /api/drivers/register
Register a new driver
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "commercialLicenseNumber": "CDL123456",
  "password": "SecurePass123"
}
```

### GET /api/drivers/health
Health check endpoint

### GET /api/drivers/{driverId}
Get driver details by ID
