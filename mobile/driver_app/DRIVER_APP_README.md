# SwiftLogistics Driver App - Login & Registration

This Flutter mobile application provides secure authentication for drivers in the SwiftLogistics system.

## Features Implemented

### 🔐 Login Screen (`login_screen.dart`)
- **Professional UI**: Clean, logistics-themed design with company branding
- **Secure Authentication**: Driver ID/Username and password validation
- **Biometric Login**: Fingerprint/face authentication support
- **Connection Status**: Real-time network connectivity indicator
- **App Version Display**: Shows current app version
- **Error Handling**: User-friendly error messages and offline scenarios
- **Additional Options**:
  - Forgot password dialog
  - Contact support information
  - Navigation to registration screen

### 📝 Registration Screen (`registration_screen.dart`)
- **Comprehensive Form**: Collects all necessary driver information
- **Professional Information**: CDL number and driver credentials
- **Security**: Strong password requirements and confirmation
- **Terms Agreement**: Required acceptance of terms and conditions
- **Validation**: Form validation for all fields
- **Navigation**: Easy transition between login and registration

### 🎨 Design System

#### Color Palette
- **Primary Blue**: `#1E3A8A` - Professional, trustworthy
- **Accent Orange**: `#EA580C` - Action items, highlights  
- **Light Blue**: `#3B82F6` - Secondary elements
- **Success Green**: `#10B981` - Positive status indicators
- **Error Red**: `#EF4444` - Error messages and warnings
- **Neutral Grays**: Various shades for text and backgrounds

#### Theme Features
- Consistent Material Design components
- Custom button styles and input fields
- Professional card layouts
- Responsive design elements

### 🔧 Services & Architecture

#### Authentication Service (`auth_service.dart`)
- Secure credential validation
- Token management with Flutter Secure Storage
- Biometric authentication integration
- Offline capability handling
- Backend API integration ready

#### Connectivity Service (`connectivity_service.dart`)
- Real-time network status monitoring
- Wi-Fi, mobile data, and offline detection
- Status indicators for user awareness

## Security Features

1. **Secure Storage**: Auth tokens stored using Flutter Secure Storage
2. **Biometric Authentication**: Local authentication with fingerprint/face
3. **Input Validation**: Comprehensive form validation
4. **Network Security**: HTTPS API communication
5. **Offline Handling**: Graceful degradation when offline

## Dependencies Added

```yaml
dependencies:
  local_auth: ^2.3.0              # Biometric authentication
  flutter_secure_storage: ^9.2.2  # Secure token storage
  http: ^1.2.2                     # API requests
  shared_preferences: ^2.3.2      # App preferences
  connectivity_plus: ^6.0.5       # Connection status
  package_info_plus: ^8.0.2       # App version info
```

## Usage

### Login Flow
1. Driver enters credentials or uses biometric authentication
2. App validates against backend API
3. Success: Navigate to dashboard
4. Failure: Display appropriate error message

### Registration Flow
1. New driver fills out comprehensive form
2. Validates all required information
3. Submits for approval
4. Redirects to login screen

## Future Enhancements

- [ ] Actual logo implementation
- [ ] Backend API integration
- [ ] Push notification setup
- [ ] Password reset functionality
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Remember me functionality

## Technical Notes

- Built with Flutter 3.8.1+
- Material Design 3 components
- Responsive design for various screen sizes
- Professional logging and error handling
- Modular architecture for easy maintenance

## Backend Integration

The app is designed to integrate with your existing backend services:
- Login endpoint: `POST /api/auth/login`
- Registration endpoint: `POST /api/auth/register`
- Token validation: `GET /api/auth/validate`

Update the `_baseUrl` in `auth_service.dart` to match your backend configuration.
