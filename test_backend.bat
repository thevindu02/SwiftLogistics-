@echo off
echo Testing SwiftLogistics Backend Services...
echo.

echo 1. Testing User Service Health (Port 8081):
curl -X GET http://localhost:8081/api/drivers/health
echo.
echo.

echo 2. Testing API Gateway Health (Port 8080):
curl -X GET http://localhost:8080/api/drivers/health
echo.
echo.

echo 3. Testing Driver Registration via API Gateway:
curl -X POST http://localhost:8080/api/drivers/register ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Test\",\"lastName\":\"Driver\",\"email\":\"test@example.com\",\"phone\":\"1234567890\",\"commercialLicenseNumber\":\"TEST123\",\"password\":\"TestPass123\"}"
echo.
echo.

echo 4. Testing Driver Registration via User Service directly:
curl -X POST http://localhost:8081/api/drivers/register ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Test\",\"lastName\":\"Driver\",\"email\":\"test2@example.com\",\"phone\":\"1234567890\",\"commercialLicenseNumber\":\"TEST124\",\"password\":\"TestPass123\"}"
echo.

pause
