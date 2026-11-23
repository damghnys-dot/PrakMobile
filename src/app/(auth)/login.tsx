import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [callsign, setCallsign] = useState<string>("");
  //const [phone, setPhone] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const handleToggleMode = () => {
    setIsRegistering((prev) => !prev);
    setErrorMsg(null);
    setInfoMsg(null);
  };

  const handleSubmit = async () => {
    if (loading) return;

    const trimmedEmail = email.trim();
    const trimmedCallsign = callsign.trim();

    setErrorMsg(null);
    setInfoMsg(null);

    if (!trimmedEmail || !password) {
      setErrorMsg("Email dan kata sandi wajib diisi.");
      return;
    }

    if (isRegistering && !trimmedCallsign) {
      setErrorMsg("Nama Member wajib diisi saat mendaftar.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.");
      return;
    }
    //if (password.length < 6) {
    //setErrorMsg("Kata sandi minimal 6 karakter.");
    //return;
    //}if (isRegistering && password !== confirmPassword) {
    //setErrorMsg("Konfirmasi kata sandi tidak cocok.");
    //return;
    //}
    setLoading(true);

    setLoading(true);
    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: {
              callsign: trimmedCallsign,
              //phone: phone.trim(),
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }

        if (!data.session) {
          setInfoMsg(
            "Pendaftaran berhasil. Silakan periksa email Anda untuk verifikasi akun sebelum masuk.",
          );
          setIsRegistering(false);
          setPassword("");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Terjadi kesalahan saat memproses autentikasi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroHeader}>
            <Text style={styles.brandBadge}>PORTAL MEMBER</Text>
            <Text style={styles.brandTitle}>TRIO PlayStation</Text>
            <Text style={styles.brandSubtitle}>
              {isRegistering
                ? "Daftar akun member baru untuk mulai booking konsol PlayStation."
                : "Masuk ke akun member Anda untuk mengakses layanan rental."}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.formTitle}>
              {isRegistering ? "Daftar Member Baru" : "Masuk Akun Member"}
            </Text>

            {errorMsg && (
              <View style={styles.errorBox}>
                <Text style={styles.errorTitle}>Autentikasi Gagal</Text>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            )}

            {infoMsg && (
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Informasi</Text>
                <Text style={styles.infoText}>{infoMsg}</Text>
              </View>
            )}

            {isRegistering && (
              <>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Nama Member</Text>
                  <TextInput
                    style={styles.input}
                    value={callsign}
                    onChangeText={setCallsign}
                    placeholder="Masukkan nama panggilan atau nama lengkap"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="words"
                    editable={!loading}
                  />
                </View>
                {/*
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Nomor Hp</Text>
                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="contoh: 08123118"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    editable={!loading}
                  />
                </View>*/}
              </>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="contoh@email.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Kata Sandi</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Minimal 6 karakter"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>Memproses...</Text>
                </View>
              ) : (
                <Text style={styles.submitButtonText}>
                  {isRegistering ? "Daftar Member Baru" : "Masuk ke Aplikasi"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchLink}
              onPress={handleToggleMode}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text style={styles.switchLinkText}>
                {isRegistering
                  ? "Sudah punya akun? Masuk di sini"
                  : "Belum punya akun? Daftar di sini"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003087",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  heroHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  brandBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    color: "#E0F2FE",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
    overflow: "hidden",
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  brandSubtitle: {
    fontSize: 14,
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
    maxWidth: 340,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    shadowColor: "#001845",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#003087",
    textAlign: "center",
    marginBottom: 18,
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#991B1B",
    marginBottom: 2,
  },
  errorText: {
    fontSize: 13,
    color: "#B91C1C",
    lineHeight: 18,
  },
  infoBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E40AF",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    color: "#1D4ED8",
    lineHeight: 18,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0F172A",
  },
  submitButton: {
    backgroundColor: "#0071DC",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#6495ED",
    opacity: 0.85,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  switchLink: {
    marginTop: 18,
    alignItems: "center",
    paddingVertical: 4,
  },
  switchLinkText: {
    color: "#003087",
    fontSize: 13,
    fontWeight: "700",
  },
});
