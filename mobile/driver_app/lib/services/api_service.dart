import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // API Gateway URL (this should be the single entry point)
  // API Gateway URL (proper microservices architecture)
  static const String baseUrl = 'http://localhost:8080'; // API Gateway
  // static const String baseUrl = 'http://localhost:8081'; // Direct to User Service (bypass)

  // Driver registration endpoint through API Gateway
  static Future<Map<String, dynamic>> registerDriver({
    required String firstName,
    required String lastName,
    required String email,
    required String phone,
    required String commercialLicenseNumber,
    required String password,
  }) async {
    try {
      final url = Uri.parse('$baseUrl/api/drivers/register');

      final requestBody = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'commercialLicenseNumber': commercialLicenseNumber,
        'password': password,
      };

      print('🚀 Sending request to: $url');
      print('📦 Request body: ${jsonEncode(requestBody)}');

      final response = await http
          .post(
            url,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: jsonEncode(requestBody),
          )
          .timeout(
            const Duration(seconds: 30),
            onTimeout: () {
              throw Exception(
                'Request timeout - Please check if backend services are running',
              );
            },
          );

      print('📊 Response status: ${response.statusCode}');
      print('📄 Response body: ${response.body}');

      if (response.statusCode == 201 || response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        return responseData;
      } else {
        // Try to parse error response
        try {
          final errorData = jsonDecode(response.body);
          throw Exception(errorData['error'] ?? 'Registration failed');
        } catch (e) {
          throw Exception('Registration failed: ${response.body}');
        }
      }
    } on http.ClientException catch (e) {
      print('❌ HTTP Client Error: $e');
      throw Exception(
        'Connection failed - Please check if backend services are running on the correct ports',
      );
    } on FormatException catch (e) {
      print('❌ JSON Format Error: $e');
      throw Exception('Invalid response format from server');
    } catch (e) {
      print('❌ API Error: $e');
      throw Exception('Network error: $e');
    }
  }

  // Health check endpoint
  static Future<bool> checkApiHealth() async {
    try {
      final url = Uri.parse('$baseUrl/api/drivers/health');
      final response = await http.get(url);
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}
