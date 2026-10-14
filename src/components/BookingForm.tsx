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
            placeholderTextColor="#94A3B8"
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
            placeholderTextColor="#94A3B8"
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
            placeholder="Contoh: 15 Oktober 2026"
            placeholderTextColor="#94A3B8"
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
            placeholderTextColor="#94A3B8"
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
              {error}
            </Text>
          </View>
        )}

        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={handleBooking}
          activeOpacity={0.85}
        >
          <Text style={styles.bookingButtonText}>
            Booking Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    fontSize: 13,
  },

  textArea: {
    minHeight: 80,
  },

  selectButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectText: {
    color: '#0F172A',
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },

  placeholderText: {
    color: '#94A3B8',
  },

  arrow: {
    color: '#0071DC',
    fontSize: 12,
  },

  packageList: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  packageItem: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  packageItemSelected: {
    backgroundColor: '#E0F2FE',
  },

  packageInfo: {
    flex: 1,
    marginRight: 10,
  },

  packageName: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },

  packageDetail: {
    color: '#475569',
    fontSize: 11,
  },

  packagePrice: {
    color: '#00439C',
    fontSize: 13,
    fontWeight: '800',
  },

  selectedPackage: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
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
    color: '#0071DC',
    fontSize: 11,
    fontWeight: '700',
  },

  consoleBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  consoleText: {
    color: '#0369A1',
    fontSize: 10,
    fontWeight: '800',
  },

  selectedPackageName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  priceLabel: {
    color: '#475569',
    fontSize: 12,
  },

  priceValue: {
    color: '#00439C',
    fontSize: 16,
    fontWeight: '900',
  },

  durationValue: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '600',
  },

  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },

  bookingButton: {
    backgroundColor: '#0071DC',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookingButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});