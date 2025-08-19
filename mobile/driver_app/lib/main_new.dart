import 'package:flutter/material.dart';
import 'utils/app_theme.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const SwiftLogisticsDriverApp());
}

class SwiftLogisticsDriverApp extends StatelessWidget {
  const SwiftLogisticsDriverApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SwiftLogistics Driver',
      theme: AppTheme.lightTheme,
      home: const LoginScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
