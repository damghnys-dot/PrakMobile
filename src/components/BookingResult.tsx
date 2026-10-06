import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BookingData } from "./BookingForm";

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

  // ==========================================
  // JIKA BELUM ADA BOOKING
  // ==========================================
  if (!bookingData) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Booking Result</Text>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🎮</Text>

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
            activeOpacity={0.8}
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
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: "#1A1D26",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#E5C185",
    textAlign: "center",
    marginBottom: 20,
  },

  emptyCard: {
    backgroundColor: "#151821",
    borderRadius: 16,
    padding: 30,
    borderWidth: 1,
    borderColor: "#222735",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },

  emptyText: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },

  resultCard: {
    backgroundColor: "#151821",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#222735",
  },

  successContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  successIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#166534",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  successIcon: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },

  successTextContainer: {
    flex: 1,
  },

  successTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  successSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
  },

  divider: {
    height: 1,
    backgroundColor: "#2D3142",
    marginVertical: 18,
  },

  detailTitle: {
    color: "#E5C185",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 14,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 13,
  },

  detailLabel: {
    fontSize: 12,
    color: "#94A3B8",
    flex: 1,
  },

  detailValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1.5,
    textAlign: "right",
  },

  noteContainer: {
    backgroundColor: "#1E202B",
    borderRadius: 8,
    padding: 10,
    marginTop: 2,
  },

  noteLabel: {
    color: "#94A3B8",
    fontSize: 11,
    marginBottom: 4,
  },

  noteText: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#CBD5E1",
  },

  totalPrice: {
    fontSize: 19,
    fontWeight: "900",
    color: "#E5C185",
  },

  statusContainer: {
    backgroundColor: "#332701",
    borderWidth: 1,
    borderColor: "#8A6D1D",
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 18,
    marginBottom: 14,
  },

  statusConfirmed: {
    backgroundColor: "#12351F",
    borderColor: "#22C55E",
  },

  statusText: {
    color: "#E5C185",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  statusTextConfirmed: {
    color: "#86EFAC",
  },

  confirmButton: {
    backgroundColor: "#E11D48",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  confirmedButton: {
    backgroundColor: "#166534",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  confirmedButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
