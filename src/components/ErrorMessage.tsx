import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terjadi Kesalahan</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 18,
  },
  retryButton: {
    backgroundColor: "#0071DC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});

