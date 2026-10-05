import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export type PaketRental = {
  id: string;
  namaPaket: string;
  konsol: 'PS4' | 'PS5';
  harga: number;
  durasi: string;
  fitur: string[];
  isPopuler?: boolean;
};

export type BookingData = {
  nama: string;
  whatsapp: string;
  paket: PaketRental;
  tanggal: string;
  catatan: string;
};

interface BookingFormProps {
  daftarPaket: PaketRental[];
  onBookingSuccess: (data: BookingData) => void;
}

export default function BookingForm({
  daftarPaket,
  onBookingSuccess,
}: BookingFormProps) {
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [catatan, setCatatan] = useState('');

  const [paketTerpilih, setPaketTerpilih] =
    useState<PaketRental | null>(null);

  const [showPaket, setShowPaket] = useState(false);

  const [error, setError] = useState('');

  const formatRupiah = (angka: number) => {
    return `Rp ${angka.toLocaleString('id-ID')}`;
  };

  const handlePilihPaket = (paket: PaketRental) => {
    setPaketTerpilih(paket);
    setShowPaket(false);
    setError('');
  };

  const handleBooking = () => {
    if (nama.trim() === '') {
      setError('Nama penyewa wajib diisi.');
      return;
    }

    if (whatsapp.trim() === '') {
      setError('Nomor WhatsApp wajib diisi.');
      return;
    }

    if (paketTerpilih === null) {
      setError('Silakan pilih paket rental terlebih dahulu.');
      return;
    }

    if (tanggal.trim() === '') {
      setError('Tanggal sewa wajib diisi.');
      return;
    }

    const bookingData: BookingData = {
      nama,
      whatsapp,
      paket: paketTerpilih,
      tanggal,
      catatan,
    };

    onBookingSuccess(bookingData);

    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Booking Rental
      </Text>

      <Text style={styles.sectionSubtitle}>
        Isi data pemesanan untuk menyewa PlayStation
      </Text>

      <View style={styles.formCard}>
        {/* NAMA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nama Penyewa
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Masukkan nama"
            placeholderTextColor="#64748B"
            value={nama}
            onChangeText={setNama}
          />
        </View>

        {/* WHATSAPP */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nomor WhatsApp
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 081234567890"
            placeholderTextColor="#64748B"
            value={whatsapp}
            onChangeText={setWhatsapp}
            keyboardType="phone-pad"
          />
        </View>

        {/* PILIH PAKET */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Pilih Paket Rental
          </Text>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowPaket(!showPaket)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.selectText,
                !paketTerpilih && styles.placeholderText,
              ]}
            >
              {paketTerpilih
                ? paketTerpilih.namaPaket
                : 'Pilih paket rental'}
            </Text>

            <Text style={styles.arrow}>
              {showPaket ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {showPaket && (
            <View style={styles.packageList}>
              {daftarPaket.map((paket) => {
                const isSelected =
                  paketTerpilih?.id === paket.id;

                return (
                  <TouchableOpacity
                    key={paket.id}
                    style={[
                      styles.packageItem,
                      isSelected && styles.packageItemSelected,
                    ]}
                    onPress={() => handlePilihPaket(paket)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.packageInfo}>
                      <Text style={styles.packageName}>
                        {paket.namaPaket}
                      </Text>

                      <Text style={styles.packageDetail}>
                        {paket.konsol} • {paket.durasi}
                      </Text>
                    </View>

                    <Text style={styles.packagePrice}>
                      {formatRupiah(paket.harga)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* DETAIL PAKET */}
        {paketTerpilih && (
          <View style={styles.selectedPackage}>
            <View style={styles.selectedHeader}>
              <Text style={styles.selectedTitle}>
                Paket Dipilih
              </Text>

              <View style={styles.consoleBadge}>
                <Text style={styles.consoleText}>
                  {paketTerpilih.konsol}
                </Text>
              </View>
            </View>

            <Text style={styles.selectedPackageName}>
              {paketTerpilih.namaPaket}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Harga
              </Text>

              <Text style={styles.priceValue}>
                {formatRupiah(paketTerpilih.harga)}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Durasi
              </Text>

              <Text style={styles.durationValue}>
                {paketTerpilih.durasi}
              </Text>
            </View>
          </View>
        )}

        {/* TANGGAL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Tanggal Sewa
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: 06 Oktober 2026"
            placeholderTextColor="#64748B"
            value={tanggal}
            onChangeText={setTanggal}
          />
        </View>

        {/* CATATAN */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Catatan Tambahan
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Contoh: Minta 2 stik tambahan"
            placeholderTextColor="#64748B"
            value={catatan}
            onChangeText={setCatatan}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* ERROR */}
        {error !== '' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              ⚠ {error}
            </Text>
          </View>
        )}

        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={handleBooking}
          activeOpacity={0.8}
        >
          <Text style={styles.bookingButtonText}>
            🎮 Booking Sekarang
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
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
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

  textArea: {
    minHeight: 80,
  },

  selectButton: {
    backgroundColor: '#1E202B',
    borderWidth: 1,
    borderColor: '#2D3142',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectText: {
    color: '#FFFFFF',
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },

  placeholderText: {
    color: '#64748B',
  },

  arrow: {
    color: '#E5C185',
    fontSize: 12,
  },

  packageList: {
    marginTop: 8,
    backgroundColor: '#1E202B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D3142',
    overflow: 'hidden',
  },

  packageItem: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#2D3142',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  packageItemSelected: {
    backgroundColor: '#2A2930',
  },

  packageInfo: {
    flex: 1,
    marginRight: 10,
  },

  packageName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },

  packageDetail: {
    color: '#94A3B8',
    fontSize: 11,
  },

  packagePrice: {
    color: '#E5C185',
    fontSize: 12,
    fontWeight: '800',
  },

  selectedPackage: {
    backgroundColor: '#1A1E2B',
    borderWidth: 1,
    borderColor: '#E5C185',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },

  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  selectedTitle: {
    color: '#E5C185',
    fontSize: 11,
    fontWeight: '700',
  },

  consoleBadge: {
    backgroundColor: '#E11D48',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  consoleText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  selectedPackageName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  priceLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },

  priceValue: {
    color: '#E5C185',
    fontSize: 17,
    fontWeight: '900',
  },

  durationValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  errorContainer: {
    backgroundColor: '#3B111B',
    borderWidth: 1,
    borderColor: '#E11D48',
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },

  errorText: {
    color: '#FDA4AF',
    fontSize: 12,
    fontWeight: '600',
  },

  bookingButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  bookingButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});