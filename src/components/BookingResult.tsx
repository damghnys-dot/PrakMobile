import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BookingData } from "./BookingForm";
import { hitungBatasPengembalian } from "../utils/rentalDate";

interface BookingResultProps {
  bookingData: BookingData | null;
}

export default function BookingResult({ bookingData }: BookingResultProps) {
  const [status, setStatus] = useState("Menunggu Konfirmasi");

  const formatRupiah = (angka: number) => {
    return `Rp ${angka.toLocaleString("id-ID")}`;
  };

  const handleKonfirmasi = () => {
    setStatus("Booking Dikonfirmasi");
    alert("Booking berhasil dikonfirmasi!");
  };

  const deadlineText = bookingData
    ? bookingData.batasPengembalian ||
      hitungBatasPengembalian(bookingData.tanggal, bookingData.paket.durasi)
    : null;

  // ==========================================
  // JIKA BELUM ADA BOOKING
  // ==========================================
  if (!bookingData) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Booking Result</Text>

        <View style={styles.emptyCard}>
          <View style={styles.emptyIconBadge}>
            <Text style={styles.emptyIconText}>PS</Text>
          </View>

          <Text style={styles.emptyTitle}>Belum Ada Booking</Text>

          <Text style={styles.emptyText}>
            Silakan isi form pemesanan terlebih dahulu.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Booking Result</Text>

      <View style={styles.resultCard}>
        {/* SUCCESS HEADER */}
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>

          <View style={styles.successTextContainer}>
            <Text style={styles.successTitle}>Booking Berhasil!</Text>

            <Text style={styles.successSubtitle}>
              Pesanan kamu berhasil dibuat
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* DETAIL BOOKING */}
        <Text style={styles.detailTitle}>Detail Pemesanan</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nama Penyewa</Text>
          <Text style={styles.detailValue}>{bookingData.nama}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>No. WhatsApp</Text>
          <Text style={styles.detailValue}>{bookingData.whatsapp}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Paket</Text>
          <Text style={styles.detailValue}>{bookingData.paket.namaPaket}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Konsol</Text>
          <Text style={styles.detailValue}>{bookingData.paket.konsol}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Durasi</Text>
          <Text style={styles.detailValue}>{bookingData.paket.durasi}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tanggal Sewa</Text>
          <Text style={styles.detailValue}>{bookingData.tanggal}</Text>
        </View>

        {deadlineText && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Batas Pengembalian</Text>
            <Text style={[styles.detailValue, styles.deadlineToReturn]}>
              {deadlineText}
            </Text>
          </View>
        )}

        {bookingData.catatan !== "" && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Catatan</Text>
            <Text style={styles.noteText}>{bookingData.catatan}</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* TOTAL */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>
          <Text style={styles.totalPrice}>
            {formatRupiah(bookingData.paket.harga)}
          </Text>
        </View>

        {/* STATUS */}
        <View
          style={[
            styles.statusContainer,
            status === "Booking Dikonfirmasi" && styles.statusConfirmed,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              status === "Booking Dikonfirmasi" && styles.statusTextConfirmed,
            ]}
          >
            ● {status}
          </Text>
        </View>

        {/* BUTTON */}
        {status === "Menunggu Konfirmasi" ? (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleKonfirmasi}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmButtonText}>✓ Konfirmasi Booking</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.confirmedButton}>
            <Text style={styles.confirmedButtonText}>
              ✓ Booking Telah Dikonfirmasi
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    maxWidth: 680,
    width: "100%",
    alignSelf: "center",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 16,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  emptyIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#00439C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  emptyIconText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  emptyTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },

  emptyText: {
    color: "#475569",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  successContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  successIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  successIcon: {
    color: "#16A34A",
    fontSize: 22,
    fontWeight: "900",
  },

  successTextContainer: {
    flex: 1,
  },

  successTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 3,
  },

  successSubtitle: {
    fontSize: 13,
    color: "#475569",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },

  detailTitle: {
    color: "#0071DC",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  detailLabel: {
    fontSize: 13,
    color: "#475569",
    flex: 1,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    flex: 1.5,
    textAlign: "right",
  },

  deadlineToReturn: {
    color: "#00439C",
    fontWeight: "800",
  },

  noteContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 10,
    marginTop: 4,
  },

  noteLabel: {
    color: "#475569",
    fontSize: 11,
    marginBottom: 2,
  },

  noteText: {
    color: "#0F172A",
    fontSize: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "900",
    color: "#00439C",
  },

  statusContainer: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 14,
  },

  statusConfirmed: {
    backgroundColor: "#DCFCE7",
    borderColor: "#BBF7D0",
  },

  statusText: {
    color: "#D97706",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  statusTextConfirmed: {
    color: "#15803D",
  },

  confirmButton: {
    backgroundColor: "#0071DC",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  confirmedButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },

  confirmedButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
