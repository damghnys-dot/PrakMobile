import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Memuat data...",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0071DC" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    color: "#00439C",
    textAlign: "center",
  },
});

