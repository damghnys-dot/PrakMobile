import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function BookingResult() {
  const bookingSukses = true;

  const handleKonfirmasi = () => {
    alert('Booking berhasil dikonfirmasi!');
  };

  if (!bookingSukses) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Belum Ada Booking</Text>
        <Text style={styles.subtitle}>
          Silakan isi form pemesanan terlebih dahulu.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Booking Result</Text>

      <View style={styles.resultCard}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>

          <View>
            <Text style={styles.successTitle}>
              Booking Berhasil!
            </Text>

            <Text style={styles.successSubtitle}>
              Pesanan kamu berhasil dibuat
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nama Penyewa</Text>
          <Text style={styles.detailValue}>Dam</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>No. WhatsApp</Text>
          <Text style={styles.detailValue}>081234567890</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Paket</Text>
          <Text style={styles.detailValue}>
            PS5 Spartan Ultra
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Durasi</Text>
          <Text style={styles.detailValue}>24 Jam</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tanggal Sewa</Text>
          <Text style={styles.detailValue}>06 Oktober 2026</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>

          <Text style={styles.totalPrice}>
            Rp 150.000
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            ● Menunggu Konfirmasi
          </Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleKonfirmasi}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>
            ✓ Konfirmasi Booking
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: '#1A1D26',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#E5C185',
    textAlign: 'center',
    marginBottom: 20,
  },

  resultCard: {
    backgroundColor: '#151821',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222735',
  },

  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  successIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#166534',
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 44,
  },

  successTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 3,
  },

  successSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },

  divider: {
    height: 1,
    backgroundColor: '#2D3142',
    marginVertical: 18,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  detailLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },

  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    maxWidth: '55%',
    textAlign: 'right',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
  },

  totalPrice: {
    fontSize: 19,
    fontWeight: '900',
    color: '#E5C185',
  },

  statusContainer: {
    backgroundColor: '#332701',
    borderWidth: 1,
    borderColor: '#8A6D1D',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 18,
    marginBottom: 14,
  },

  statusText: {
    color: '#E5C185',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

  confirmButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});