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
  fetchKatalogGame,
} from "../services/rentalApiService";
import { PlayStationGame } from "../types/game";

export default function KatalogScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;

  // State untuk API Call Katalog Game
  const [gameList, setGameList] = useState<PlayStationGame[]>([]);
  const [loadingGame, setLoadingGame] = useState<boolean>(true);
  const [errorGame, setErrorGame] = useState<string | null>(null);

  // State untuk Fitur Cek Ketersediaan Unit PS
  const [selectedUnit, setSelectedUnit] = useState<string>(
    DAFTAR_PAKET[0]?.namaPaket || "PS4 Slim Hemat",
  );
  const [durasiHariInput, setDurasiHariInput] = useState<string>("3");
  const [checkingStok, setCheckingStok] = useState<boolean>(false);
  const [hasilCek, setHasilCek] = useState<string | null>(null);
  const [errorCek, setErrorCek] = useState<string | null>(null);

  // Custom Async Function untuk memanggil API Katalog Game dengan async/await
  const loadKatalogGame = async () => {
    setLoadingGame(true);
    setErrorGame(null);
    try {
      const data = await fetchKatalogGame();
      setGameList(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorGame(err.message);
      } else {
        setErrorGame("Gagal memuat katalog game dari server.");
      }
    } finally {
      setLoadingGame(false);
    }
  };

  useEffect(() => {
    loadKatalogGame();
  }, []);

  // Handler Pengecekan Ketersediaan Unit PS menggunakan rantai method .then() dan .catch()
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
              Katalog Game PlayStation
            </Text>
            <Text style={styles.headerSubtitle}>
              Koleksi game terbaik yang siap dimainkan pada unit rental
              PlayStation di TRIO PlayStation.
            </Text>
          </View>

          {/* Bagian Katalog Game (External API sampleapis.com) */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderBar}>
              <Text style={styles.sectionBadge}>EXTERNAL API CALL</Text>
              <Text style={styles.sectionTitle}>
                Daftar Game Tersedia
              </Text>
              <Text style={styles.sectionDescription}>
                Data real-time diambil dari endpoint api.sampleapis.com/playstation/games
                menggunakan async/await.
              </Text>
            </View>

            {/* Kondisi Loading */}
            {loadingGame && (
              <Loading message="Memuat data..." />
            )}

            {/* Kondisi Error */}
            {errorGame && !loadingGame && (
              <ErrorMessage
                message={errorGame}
                onRetry={loadKatalogGame}
              />
            )}

            {/* Kondisi Berhasil: Daftar Kartu Game */}
            {!loadingGame && !errorGame && (
              <View style={styles.gameListContainer}>
                {gameList.map((game) => (
                  <View key={game.id} style={styles.gameCard}>
                    <View style={styles.gameCardHeader}>
                      <View style={styles.gameNumberBadge}>
                        <Text style={styles.gameNumberText}>#{game.id}</Text>
                      </View>
                      <View style={styles.gameInfo}>
                        <Text style={styles.gameName}>{game.name}</Text>
                        <Text style={styles.gameDevelopers}>
                          Pengembang: {game.developers && game.developers.length > 0 ? game.developers.join(", ") : "Tidak diketahui"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.genreContainer}>
                      {game.genre && game.genre.length > 0 ? (
                        game.genre.map((genreItem, index) => (
                          <View key={index} style={styles.genreBadge}>
                            <Text style={styles.genreBadgeText}>
                              {genreItem}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <View style={styles.genreBadge}>
                          <Text style={styles.genreBadgeText}>Umum</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}

                {/* Tombol Muat Ulang */}
                <TouchableOpacity
                  style={styles.btnRefresh}
                  onPress={loadKatalogGame}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnRefreshText}>
                    Muat Ulang Katalog Game
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Bagian Bawah: Cek Ketersediaan Unit PS */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderBar}>
              <Text style={styles.sectionBadge}>FITUR ASINKRON</Text>
              <Text style={styles.sectionTitle}>
                Cek Ketersediaan Unit PS
              </Text>
              <Text style={styles.sectionDescription}>
                Periksa ketersediaan unit rental PlayStation di gudang sebelum
                melakukan booking. Maksimal penyewaan adalah 14 hari.
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
              Batas durasi sewa valid: 1 sampai 14 hari.
            </Text>

            {/* Tombol Cek Ketersediaan */}
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
                  Cek Ketersediaan
                </Text>
              )}
            </TouchableOpacity>

            {/* Hasil Resolve (.then) */}
            {hasilCek && (
              <View style={styles.successBox}>
                <Text style={styles.successTitle}>Unit Tersedia</Text>
                <Text style={styles.successMessage}>{hasilCek}</Text>
              </View>
            )}

            {/* Hasil Reject (.catch) */}
            {errorCek && (
              <View style={styles.rejectBox}>
                <Text style={styles.rejectTitle}>Pengecekan Gagal</Text>
                <Text style={styles.rejectMessage}>{errorCek}</Text>
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
  gameListContainer: {
    gap: 12,
  },
  gameCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
  },
  gameCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  gameNumberBadge: {
    backgroundColor: "#002F6C",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
  },
  gameNumberText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  gameDevelopers: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  genreBadge: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  genreBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#0284C7",
  },
  btnRefresh: {
    marginTop: 10,
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
});
