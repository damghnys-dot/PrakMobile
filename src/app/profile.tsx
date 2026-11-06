import { StyleSheet, Text, View } from "react-native";

export default function ProfilPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <InfoModulDua />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#475569",
    marginBottom: 10,
  },
});

function InfoModulDua() {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        marginVertical: 15,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#0071DC",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#0071DC",
          marginBottom: 4,
        }}
      >
        Praktikum Modul 2
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#475569",
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        Materi: Routing & Navigasi (Expo Router) + React Hooks
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", color: "#0F172A" }}>
        Achmad Althof Avisena
      </Text>
    </View>
  );
}

