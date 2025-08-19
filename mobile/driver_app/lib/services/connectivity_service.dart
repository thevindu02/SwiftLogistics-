import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';

class ConnectivityService {
  static final ConnectivityService _instance = ConnectivityService._internal();
  factory ConnectivityService() => _instance;
  ConnectivityService._internal();

  final Connectivity _connectivity = Connectivity();
  late StreamSubscription<List<ConnectivityResult>> _connectivitySubscription;

  final StreamController<ConnectionStatus> _connectionStatusController =
      StreamController<ConnectionStatus>.broadcast();

  Stream<ConnectionStatus> get connectionStatus =>
      _connectionStatusController.stream;

  void initialize() {
    _connectivitySubscription = _connectivity.onConnectivityChanged.listen((
      List<ConnectivityResult> results,
    ) {
      _updateConnectionStatus(results.first);
    });

    // Check initial connectivity
    _checkInitialConnectivity();
  }

  Future<void> _checkInitialConnectivity() async {
    try {
      final result = await _connectivity.checkConnectivity();
      _updateConnectionStatus(result.first);
    } catch (e) {
      _connectionStatusController.add(ConnectionStatus.offline);
    }
  }

  void _updateConnectionStatus(ConnectivityResult result) {
    switch (result) {
      case ConnectivityResult.wifi:
        _connectionStatusController.add(ConnectionStatus.wifi);
        break;
      case ConnectivityResult.mobile:
        _connectionStatusController.add(ConnectionStatus.mobile);
        break;
      case ConnectivityResult.ethernet:
        _connectionStatusController.add(ConnectionStatus.ethernet);
        break;
      case ConnectivityResult.none:
        _connectionStatusController.add(ConnectionStatus.offline);
        break;
      default:
        _connectionStatusController.add(ConnectionStatus.offline);
        break;
    }
  }

  Future<bool> hasConnection() async {
    try {
      final result = await _connectivity.checkConnectivity();
      return result.first != ConnectivityResult.none;
    } catch (e) {
      return false;
    }
  }

  void dispose() {
    _connectivitySubscription.cancel();
    _connectionStatusController.close();
  }
}

enum ConnectionStatus { wifi, mobile, ethernet, offline }

extension ConnectionStatusExtension on ConnectionStatus {
  String get displayName {
    switch (this) {
      case ConnectionStatus.wifi:
        return 'WiFi Connected';
      case ConnectionStatus.mobile:
        return 'Mobile Data';
      case ConnectionStatus.ethernet:
        return 'Ethernet Connected';
      case ConnectionStatus.offline:
        return 'Offline';
    }
  }

  bool get isConnected => this != ConnectionStatus.offline;
}
