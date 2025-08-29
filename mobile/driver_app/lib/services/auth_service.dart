import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:local_auth/local_auth.dart';
import 'package:http/http.dart' as http;

class AuthService {
  static const _storage = FlutterSecureStorage();
  static const String _tokenKey = 'auth_token';
  static const String _userIdKey = 'user_id';
  static const String _biometricEnabledKey = 'biometric_enabled';

  final LocalAuthentication _localAuth = LocalAuthentication();

  // Base URL for the backend API (you can update this to match your backend)
  static const String _baseUrl = 'http://localhost:8080/api/auth';

  // Login with credentials
  Future<LoginResult> login(String driverId, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'driverId': driverId, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final token = data['token'];
        final userId = data['userId'];

        // Store tokens securely
        await _storage.write(key: _tokenKey, value: token);
        await _storage.write(key: _userIdKey, value: userId.toString());

        return LoginResult(success: true, token: token);
      } else {
        final error = jsonDecode(response.body)['message'] ?? 'Login failed';
        return LoginResult(success: false, error: error);
      }
    } catch (e) {
      return LoginResult(
        success: false,
        error: 'Network error: ${e.toString()}',
      );
    }
  }

  // Check if biometric authentication is available
  Future<bool> isBiometricAvailable() async {
    try {
      final isAvailable = await _localAuth.canCheckBiometrics;
      final isDeviceSupported = await _localAuth.isDeviceSupported();
      return isAvailable && isDeviceSupported;
    } catch (e) {
      return false;
    }
  }

  // Get available biometric types
  Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _localAuth.getAvailableBiometrics();
    } catch (e) {
      return [];
    }
  }

  // Authenticate with biometrics
  Future<bool> authenticateWithBiometrics() async {
    try {
      final isAuthenticated = await _localAuth.authenticate(
        localizedReason: 'Authenticate to access SwiftLogistics Driver App',
        options: const AuthenticationOptions(
          biometricOnly: true,
          stickyAuth: true,
        ),
      );
      return isAuthenticated;
    } catch (e) {
      return false;
    }
  }

  // Enable biometric login
  Future<void> enableBiometricLogin() async {
    await _storage.write(key: _biometricEnabledKey, value: 'true');
  }

  // Disable biometric login
  Future<void> disableBiometricLogin() async {
    await _storage.delete(key: _biometricEnabledKey);
  }

  // Check if biometric login is enabled
  Future<bool> isBiometricLoginEnabled() async {
    final enabled = await _storage.read(key: _biometricEnabledKey);
    return enabled == 'true';
  }

  // Get stored auth token
  Future<String?> getAuthToken() async {
    return await _storage.read(key: _tokenKey);
  }

  // Get stored user ID
  Future<String?> getUserId() async {
    return await _storage.read(key: _userIdKey);
  }

  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final token = await getAuthToken();
    return token != null && token.isNotEmpty;
  }

  // Logout
  Future<void> logout() async {
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _userIdKey);
  }

  // Validate token with backend
  Future<bool> validateToken() async {
    try {
      final token = await getAuthToken();
      if (token == null) return false;

      final response = await http.get(
        Uri.parse('$_baseUrl/validate'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}

class LoginResult {
  final bool success;
  final String? token;
  final String? error;

  LoginResult({required this.success, this.token, this.error});
}
