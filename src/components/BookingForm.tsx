import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function BookingForm() {
  const hargaPaket = 150000;

  const statusPaket =
    hargaPaket >= 200000 ? 'Paket Premium' : 'Paket Hemat';

  const handleBooking = () => {
    alert('Booking berhasil dikirim!');
  };

  return (
    <View style={styles.container}>
      {/* Header Booking */}
      <View style={styles.header}>
        <Text style={styles.title}>Booking Rental</Text>

        <Text style={styles.subtitle}>
          Isi data berikut untuk melakukan pemesanan PlayStation
        </Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        {/* Nama */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap</Text>

          <TextInput
            placeholder="Masukkan nama kamu"
            placeholderTextColor="#8A94A6"
            style={styles.input}
          />
        </View>

        {/* WhatsApp */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nomor WhatsApp</Text>

          <TextInput
            placeholder="08xxxxxxxxxx"
            placeholderTextColor="#8A94A6"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {/* Durasi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Durasi Sewa</Text>

          <TextInput
            placeholder="Contoh: 24 Jam"
            placeholderTextColor="#8A94A6"
            style={styles.input}
          />
        </View>

        {/* Informasi Paket */}
        <View style={styles.packageInfo}>
          <View>
            <Text style={styles.packageLabel}>Paket Dipilih</Text>
            <Text style={styles.packageName}>PS5 Spartan Ultra</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              Rp {hargaPaket.toLocaleString('id-ID')}
            </Text>

            <Text style={styles.packageStatus}>
              {statusPaket}
            </Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.bookingButton}
          activeOpacity={0.8}
          onPress={handleBooking}
        >
          <Text style={styles.bookingButtonText}>
            🎮  PESAN SEKARANG
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0C10',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#E5C185',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 330,
  },

  formCard: {
    backgroundColor: '#151821',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222735',
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#1E202B',
    borderWidth: 1,
    borderColor: '#2D3142',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 13,
  },

  packageInfo: {
    backgroundColor: '#1E202B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D3142',
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  packageLabel: {
    color: '#8A94A6',
    fontSize: 11,
    marginBottom: 4,
  },

  packageName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  priceContainer: {
    alignItems: 'flex-end',
  },

  price: {
    color: '#E5C185',
    fontSize: 15,
    fontWeight: '800',
  },

  packageStatus: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 3,
  },

  bookingButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },

  bookingButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});