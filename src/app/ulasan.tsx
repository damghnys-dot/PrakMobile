import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { DAFTAR_PAKET } from "../constants/rental";
import {
  cekKetersediaanUnitPS,
  fetchUlasanPenyewa,
} from "../services/rentalApiService";
import { UlasanPenyewa } from "../types/ulasan";

export default function UlasanScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;

  // State untuk API Call Ulasan Penyewa
  const [ulasanList, setUlasanList] = useState<UlasanPenyewa[]>([]);
  const [loadingUlasan, setLoadingUlasan] = useState<boolean>(true);
  const [errorUlasan, setErrorUlasan] = useState<string | null>(null);

  // State untuk Fitur Cek Ketersediaan Unit PS
  const [selectedUnit, setSelectedUnit] = useState<string>(
    DAFTAR_PAKET[0]?.namaPaket || "PS4 Slim Hemat",
  );
  const [durasiHariInput, setDurasiHariInput] = useState<string>("3");
  const [checkingStok, setCheckingStok] = useState<boolean>(false);
  const [hasilCek, setHasilCek] = useState<string | null>(null);
  const [errorCek, setErrorCek] = useState<string | null>(null);

  // Custom Async Function untuk memanggil API Ulasan dengan async/await
  const loadUlasan = async () => {
    setLoadingUlasan(true);
    setErrorUlasan(null);
    try {
      const data = await fetchUlasanPenyewa();
      setUlasanList(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorUlasan(err.message);
      } else {
        setErrorUlasan("Gagal memuat ulasan penyewa dari server.");
      }
    } finally {
      setLoadingUlasan(false);
    }
  };

  useEffect(() => {
    loadUlasan();
  }, []);

  // Handler Pengecekan Ketersediaan Unit PS menggunakan rantai .then() dan .catch()
  const handleCekKetersediaan = () => {
    setHasilCek(null);
    setErrorCek(null);
    setCheckingStok(true);

    const durasi = parseInt(durasiHariInput, 10);
    const validDurasi = isNaN(durasi) ? 0 : durasi;

    // WAJIB menggunakan rantai method .then() dan .catch()
    cekKetersediaanUnitPS(selectedUnit, validDurasi)
      .then((response: string) => {
        setHasilCek(response);
      })
      .catch((err: unknown) => {
        const errorText =
          typeof err === "string"
            ? err
            : err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat memeriksa unit.";
        setErrorCek(errorText);
      })
      .finally(() => {
        setCheckingStok(false);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0071DC" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainWrapper, isDesktop && styles.mainWrapperDesktop]}>
          {/* Header Navigasi */}
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Ulasan Penyewa & Cek Ketersediaan
            </Text>
            <Text style={styles.headerSubtitle}>
              Pusat informasi testimoni pelanggan dan verifikasi stok unit
              PlayStation di gudang TRIO Rental.
            </Text>
          </View>

          {/* Bagian Interaktif: Cek Ketersediaan Unit PS */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderBar}>
              <Text style={styles.sectionBadge}>FITUR ASINKRON</Text>
              <Text style={styles.sectionTitle}>
                Cek Ketersediaan Unit PS
              </Text>
              <Text style={styles.sectionDescription}>
                Periksa ketersediaan unit rental PlayStation sebelum melanjutkan
                ke proses reservasi. Maksimal masa penyewaan adalah 14 hari.
              </Text>
            </View>

            {/* Pilihan Paket Konsol */}
            <Text style={styles.inputLabel}>Pilih Model Konsol / Paket:</Text>
            <View style={styles.unitPillsContainer}>
              {DAFTAR_PAKET.map((paket) => {
                const isSelected = selectedUnit === paket.namaPaket;
                return (
                  <TouchableOpacity
                    key={paket.id}
                    style={[
                      styles.unitPill,
                      isSelected && styles.unitPillActive,
                    ]}
                    onPress={() => setSelectedUnit(paket.namaPaket)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.unitPillText,
                        isSelected && styles.unitPillTextActive,
                      ]}
                    >
                      {paket.namaPaket}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Input Durasi Hari */}
            <Text style={styles.inputLabel}>
              Durasi Sewa yang Diinginkan (Hari):
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={durasiHariInput}
              onChangeText={setDurasiHariInput}
              placeholder="Masukkan angka hari (contoh: 3)"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.inputHelper}>
              Batas durasi penyewaan valid: 1 sampai 14 hari.
            </Text>

            {/* Tombol Pengecekan */}
            <TouchableOpacity
              style={[
                styles.btnCek,
                checkingStok && styles.btnCekDisabled,
              ]}
              onPress={handleCekKetersediaan}
              disabled={checkingStok}
              activeOpacity={0.85}
            >
              {checkingStok ? (
                <View style={styles.checkingRow}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.btnCekText}>
                    Memeriksa Ketersediaan...
                  </Text>
                </View>
              ) : (
                <Text style={styles.btnCekText}>
                  Periksa Ketersediaan Unit
                </Text>
              )}
            </TouchableOpacity>

            {/* Kotak Hasil: Resolve (.then) */}
            {hasilCek && (
              <View style={styles.successBox}>
                <Text style={styles.successTitle}>Unit Tersedia</Text>
                <Text style={styles.successMessage}>{hasilCek}</Text>
              </View>
            )}

            {/* Kotak Hasil: Reject (.catch) */}
            {errorCek && (
              <View style={styles.rejectBox}>
                <Text style={styles.rejectTitle}>Pengecekan Gagal</Text>
                <Text style={styles.rejectMessage}>{errorCek}</Text>
              </View>
            )}
          </View>

          {/* Bagian Ulasan Penyewa (External API dummyjson.com) */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderBar}>
              <Text style={styles.sectionBadge}>EXTERNAL API CALL</Text>
              <Text style={styles.sectionTitle}>
                Daftar Ulasan Penyewa
              </Text>
              <Text style={styles.sectionDescription}>
                Data ulasan real-time yang diambil dari endpoint dummyjson.com/comments
                menggunakan async/await.
              </Text>
            </View>

            {/* Kondisi Loading */}
            {loadingUlasan && (
              <Loading message="Mengambil data ulasan penyewa dari server..." />
            )}

            {/* Kondisi Error */}
            {errorUlasan && !loadingUlasan && (
              <ErrorMessage
                message={errorUlasan}
                onRetry={loadUlasan}
              />
            )}

            {/* Kondisi Berhasil: Daftar Kartu Ulasan */}
            {!loadingUlasan && !errorUlasan && (
              <View style={styles.ulasanListContainer}>
                {ulasanList.map((ulasan) => (
                  <View key={ulasan.id} style={styles.ulasanCard}>
                    <View style={styles.ulasanCardHeader}>
                      <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarInitial}>
                          {ulasan.user.fullName.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.userInfo}>
                        <Text style={styles.userFullName}>
                          {ulasan.user.fullName}
                        </Text>
                        <Text style={styles.userUsername}>
                          @{ulasan.user.username}
                        </Text>
                      </View>
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedBadgeText}>
                          Penyewa
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.ulasanBody}>
                      "{ulasan.body}"
                    </Text>

                    <View style={styles.ulasanFooter}>
                      <View style={styles.likesBadge}>
                        <Text style={styles.likesText}>
                          Disukai: {ulasan.likes}
                        </Text>
                      </View>
                      <Text style={styles.unitTag}>
                        TRIO PlayStation Renter
                      </Text>
                    </View>
                  </View>
                ))}

                {/* Tombol Muat Ulang */}
                <TouchableOpacity
                  style={styles.btnRefresh}
                  onPress={loadUlasan}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnRefreshText}>
                    Muat Ulang Ulasan
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  scrollContent: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mainWrapper: {
    width: "100%",
    maxWidth: 680,
  },
  mainWrapperDesktop: {
    maxWidth: 760,
  },
  headerCard: {
    backgroundColor: "#0071DC",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#E0F2FE",
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionHeaderBar: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 14,
  },
  sectionBadge: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0071DC",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
    marginTop: 4,
  },
  unitPillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  unitPill: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  unitPillActive: {
    backgroundColor: "#0071DC",
    borderColor: "#0071DC",
  },
  unitPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
  unitPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  textInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
  },
  inputHelper: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 6,
    marginBottom: 16,
  },
  btnCek: {
    backgroundColor: "#0071DC",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCekDisabled: {
    backgroundColor: "#93C5FD",
  },
  btnCekText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  checkingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  successBox: {
    marginTop: 16,
    backgroundColor: "#F0FDF4",
    borderWidth: 1.5,
    borderColor: "#86EFAC",
    borderRadius: 10,
    padding: 14,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 4,
  },
  successMessage: {
    fontSize: 13,
    color: "#14532D",
    lineHeight: 18,
  },
  rejectBox: {
    marginTop: 16,
    backgroundColor: "#FEF2F2",
    borderWidth: 1.5,
    borderColor: "#FECACA",
    borderRadius: 10,
    padding: 14,
  },
  rejectTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#991B1B",
    marginBottom: 4,
  },
  rejectMessage: {
    fontSize: 13,
    color: "#7F1D1D",
    lineHeight: 18,
  },
  ulasanListContainer: {
    gap: 14,
  },
  ulasanCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
  },
  ulasanCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0071DC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarInitial: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  userInfo: {
    flex: 1,
  },
  userFullName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  userUsername: {
    fontSize: 11,
    color: "#64748B",
  },
  verifiedBadge: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0284C7",
  },
  ulasanBody: {
    fontSize: 13,
    color: "#334155",
    lineHeight: 19,
    fontStyle: "italic",
    marginBottom: 10,
  },
  ulasanFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
  },
  likesBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  likesText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0071DC",
  },
  unitTag: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  btnRefresh: {
    marginTop: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnRefreshText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
});
