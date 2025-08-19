import 'package:flutter/material.dart';
import 'package:local_auth/local_auth.dart';
import 'package:package_info_plus/package_info_plus.dart';
import '../services/auth_service.dart';
import '../services/connectivity_service.dart';
import '../utils/app_theme.dart';
import 'registration_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _driverIdController = TextEditingController();
  final _passwordController = TextEditingController();
  final _authService = AuthService();
  final _connectivityService = ConnectivityService();

  bool _isLoading = false;
  bool _isPasswordVisible = false;
  bool _isBiometricAvailable = false;
  bool _isBiometricEnabled = false;
  ConnectionStatus _connectionStatus = ConnectionStatus.offline;
  String _appVersion = '';
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _initializeScreen();
  }

  Future<void> _initializeScreen() async {
    // Initialize connectivity service
    _connectivityService.initialize();
    _connectivityService.connectionStatus.listen((status) {
      if (mounted) {
        setState(() {
          _connectionStatus = status;
        });
      }
    });

    // Check biometric availability
    final isBiometricAvailable = await _authService.isBiometricAvailable();
    final isBiometricEnabled = await _authService.isBiometricLoginEnabled();

    // Get app version
    final packageInfo = await PackageInfo.fromPlatform();

    if (mounted) {
      setState(() {
        _isBiometricAvailable = isBiometricAvailable;
        _isBiometricEnabled = isBiometricEnabled;
        _appVersion = '${packageInfo.version}+${packageInfo.buildNumber}';
      });
    }

    // Auto-login with biometrics if enabled
    if (_isBiometricAvailable && _isBiometricEnabled) {
      _authenticateWithBiometrics();
    }
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final result = await _authService.login(
        _driverIdController.text.trim(),
        _passwordController.text,
      );

      if (result.success) {
        // Navigate to home screen or dashboard
        if (mounted) {
          // TODO: Navigate to dashboard
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Login successful!'),
              backgroundColor: AppColors.success,
            ),
          );
        }
      } else {
        setState(() {
          _errorMessage = result.error;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'An unexpected error occurred. Please try again.';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _authenticateWithBiometrics() async {
    try {
      final isAuthenticated = await _authService.authenticateWithBiometrics();
      if (isAuthenticated) {
        // Check if user has valid stored credentials
        final isLoggedIn = await _authService.isLoggedIn();
        if (isLoggedIn) {
          // TODO: Navigate to dashboard
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Biometric authentication successful!'),
                backgroundColor: AppColors.success,
              ),
            );
          }
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Biometric authentication failed'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  void _showForgotPasswordDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Forgot Password'),
        content: const Text(
          'Please contact your fleet manager or IT support to reset your password.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showContactSupportDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Contact Support'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('For technical support, please contact:'),
            SizedBox(height: 16),
            Text('📞 Phone: +1-800-SWIFT-LOG'),
            SizedBox(height: 8),
            Text('📧 Email: driver-support@swiftlogistics.com'),
            SizedBox(height: 8),
            Text('⏰ Hours: 24/7 Support Available'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _driverIdController.dispose();
    _passwordController.dispose();
    _connectivityService.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header Section
              _buildHeader(),
              const SizedBox(height: 40),

              // Login Form
              _buildLoginForm(),
              const SizedBox(height: 24),

              // Biometric Login Button
              if (_isBiometricAvailable) _buildBiometricButton(),

              const SizedBox(height: 24),

              // Additional Options
              _buildAdditionalOptions(),

              const SizedBox(height: 40),

              // Status Section
              _buildStatusSection(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        // Logo placeholder (you can add an actual logo later)
        Container(
          width: 120,
          height: 120,
          decoration: BoxDecoration(
            color: AppColors.primaryBlue,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: AppColors.primaryBlue.withOpacity(0.3),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: const Icon(
            Icons.local_shipping,
            size: 60,
            color: AppColors.white,
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'SwiftLogistics',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: AppColors.primaryBlue,
          ),
        ),
        const Text(
          'Driver App',
          style: TextStyle(
            fontSize: 18,
            color: AppColors.mediumGray,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildLoginForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // Error message
          if (_errorMessage != null)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: AppColors.error.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.error.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.error_outline, color: AppColors.error),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _errorMessage!,
                      style: const TextStyle(color: AppColors.error),
                    ),
                  ),
                ],
              ),
            ),

          // Driver ID Field
          TextFormField(
            controller: _driverIdController,
            decoration: const InputDecoration(
              labelText: 'Driver ID / Username',
              prefixIcon: Icon(Icons.person_outline),
              hintText: 'Enter your driver ID',
            ),
            textInputAction: TextInputAction.next,
            validator: (value) {
              if (value == null || value.trim().isEmpty) {
                return 'Please enter your driver ID';
              }
              return null;
            },
          ),
          const SizedBox(height: 16),

          // Password Field
          TextFormField(
            controller: _passwordController,
            decoration: InputDecoration(
              labelText: 'Password',
              prefixIcon: const Icon(Icons.lock_outline),
              suffixIcon: IconButton(
                icon: Icon(
                  _isPasswordVisible ? Icons.visibility_off : Icons.visibility,
                ),
                onPressed: () {
                  setState(() {
                    _isPasswordVisible = !_isPasswordVisible;
                  });
                },
              ),
              hintText: 'Enter your password',
            ),
            obscureText: !_isPasswordVisible,
            textInputAction: TextInputAction.done,
            onFieldSubmitted: (_) => _login(),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your password';
              }
              if (value.length < 6) {
                return 'Password must be at least 6 characters';
              }
              return null;
            },
          ),
          const SizedBox(height: 24),

          // Login Button
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: _isLoading ? null : _login,
              child: _isLoading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          AppColors.white,
                        ),
                      ),
                    )
                  : const Text(
                      'Login',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBiometricButton() {
    return Column(
      children: [
        const Text(
          'OR',
          style: TextStyle(
            color: AppColors.mediumGray,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 56,
          child: OutlinedButton.icon(
            onPressed: _authenticateWithBiometrics,
            icon: const Icon(Icons.fingerprint, size: 24),
            label: const Text(
              'Login with Biometrics',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAdditionalOptions() {
    return Column(
      children: [
        TextButton(
          onPressed: _showForgotPasswordDialog,
          child: const Text('Forgot Password?', style: TextStyle(fontSize: 16)),
        ),
        const SizedBox(height: 8),
        TextButton.icon(
          onPressed: _showContactSupportDialog,
          icon: const Icon(Icons.support_agent, size: 20),
          label: const Text('Contact Support', style: TextStyle(fontSize: 16)),
        ),
        const SizedBox(height: 8),
        TextButton(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => const RegistrationScreen(),
              ),
            );
          },
          child: const Text(
            'New Driver? Register Here',
            style: TextStyle(fontSize: 16),
          ),
        ),
      ],
    );
  }

  Widget _buildStatusSection() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Connection Status
            Row(
              children: [
                Icon(
                  _connectionStatus.isConnected ? Icons.wifi : Icons.wifi_off,
                  color: _connectionStatus.isConnected
                      ? AppColors.success
                      : AppColors.error,
                  size: 20,
                ),
                const SizedBox(width: 8),
                Text(
                  _connectionStatus.displayName,
                  style: TextStyle(
                    color: _connectionStatus.isConnected
                        ? AppColors.success
                        : AppColors.error,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),

            // App Version
            Row(
              children: [
                const Icon(
                  Icons.info_outline,
                  color: AppColors.mediumGray,
                  size: 20,
                ),
                const SizedBox(width: 8),
                Text(
                  'Version $_appVersion',
                  style: const TextStyle(
                    color: AppColors.mediumGray,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
