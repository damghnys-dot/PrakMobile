import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Booking } from "../types/booking";

interface MyBookingsSectionProps {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  actionError: string | null;
  onRefresh: () => void;
  onCompleteBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
}

const formatRupiah = (angka: number): string =>
  `Rp ${angka.toLocaleString("id-ID")}`;

const formatStatusLabel = (status: string): string => {
  const trimmed = status.trim();
  if (!trimmed) {
    return "Aktif";
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

const formatTanggalCreatedAt = (isoString: string): string => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MyBookingsSection({
  bookings,
  loading,
  error,
  actionError,
  onRefresh,
  onCompleteBooking,
  onCancelBooking,
}: MyBookingsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.badge}>CLOUD DATABASE</Text>
          <Text style={styles.title}>Pesanan Saya</Text>
          <Text style={styles.subtitle}>
            Riwayat booking rental yang tersimpan di akun Anda. Tarik layar ke
            bawah untuk menyegarkan data.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.refreshButtonText}>Segarkan</Text>
        </TouchableOpacity>
      </View>

      {actionError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Gagal Memperbarui Pesanan</Text>
          <Text style={styles.errorText}>{actionError}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#003087" />
          <Text style={styles.loadingText}>Memuat daftar pesanan...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Gagal Memuat Pesanan</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRefresh}
            activeOpacity={0.85}
          >
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Belum Ada Pesanan</Text>
          <Text style={styles.emptyText}>
            Pesanan rental yang Anda buat melalui form Booking Rental akan
            muncul di sini secara otomatis.
          </Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {bookings.map((item) => {
            const normalizedStatus = item.status.trim().toLowerCase();
            const isAktif = normalizedStatus === "aktif";
            const isSelesai = normalizedStatus === "selesai";

            return (
              <View key={item.id} style={styles.bookingCard}>
                <View style={styles.cardTopRow}>
                  <View style={styles.paketGroup}>
                    <Text style={styles.paketName}>{item.paket_nama}</Text>
                    <Text style={styles.dateText}>
                      Dibuat: {formatTanggalCreatedAt(item.created_at)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      isSelesai && styles.statusBadgeCompleted,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        isSelesai && styles.statusTextCompleted,
                      ]}
                    >
                      {formatStatusLabel(item.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Durasi Sewa</Text>
                    <Text style={styles.metaValue}>
                      {item.durasi_hari} Hari
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Total Harga</Text>
                    <Text style={styles.priceValue}>
                      {formatRupiah(item.total_harga)}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  {isAktif && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => onCompleteBooking(item.id)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.completeButtonText}>
                        Tandai Selesai
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => onCancelBooking(item.id)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.cancelButtonText}>
                      {isSelesai ? "Hapus Riwayat" : "Batalkan Pesanan"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#003087",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  headerTextGroup: {
    flex: 1,
  },
  badge: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0071DC",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
  },
  refreshButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: "#003087",
    fontSize: 12,
    fontWeight: "700",
  },
  centerBox: {
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#991B1B",
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: "#B91C1C",
    lineHeight: 18,
  },
  retryButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#DC2626",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyBox: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 19,
  },
  listContainer: {
    gap: 12,
  },
  bookingCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  paketGroup: {
    flex: 1,
  },
  paketName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#003087",
  },
  dateText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },
  statusBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeCompleted: {
    backgroundColor: "#DCFCE7",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1E40AF",
  },
  statusTextCompleted: {
    color: "#166534",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 10,
    marginBottom: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0071DC",
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  completeButton: {
    flex: 1,
    backgroundColor: "#16A34A",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "800",
  },
});
