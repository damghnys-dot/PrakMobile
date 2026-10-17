import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { DAFTAR_PAKET } from '../../constants/rental';
import { PaketRental } from '../../types/rental';

export default function DetailPaketScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Cari data paket dari DAFTAR_PAKET berdasarkan id (perbandingan aman String)
  const paket: PaketRental | undefined = DAFTAR_PAKET.find(
    (item) => String(item.id) === String(id)
  );

  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;

  const formatRupiah = (angka: number): string =>
    `Rp ${angka.toLocaleString('id-ID')}`;

  // Navigasi Tombol 1: Kembali
  const handleKembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Navigasi Tombol 2: Pilih & Pesan Paket Ini
  const handlePilihPaket = () => {
    if (!paket) return;
    router.replace({
      pathname: '/',
      params: { selectedPaketId: String(paket.id) },
    });
  };

  // Jika paket dengan id tidak ditemukan
  if (!paket) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0071DC" />
        <View style={styles.notFoundContainer}>
          <View style={styles.notFoundCard}>
            <View style={styles.notFoundIconContainer}>
              <Text style={styles.notFoundIconText}>!</Text>
            </View>
            <Text style={styles.notFoundTitle}>Paket Tidak Ditemukan</Text>
            <Text style={styles.notFoundText}>
              Maaf, paket rental dengan ID &quot;{id}&quot; tidak terdaftar
              dalam katalog TRIO PlayStation.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleKembali}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Kembali ke Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const isPS5 = paket.konsol.toUpperCase().includes('PS5');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0071DC" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerWrapper}>
          {/* Main Card: Info & Harga */}
          <View style={styles.mainCard}>
            {/* Badges Row */}
            <View style={styles.badgesRow}>
              <View
                style={[
                  styles.badgeKonsol,
                  isPS5 ? styles.badgePS5 : styles.badgePS4,
                ]}
              >
                <Text
                  style={[
                    styles.badgeKonsolText,
                    isPS5 ? styles.textPS5 : styles.textPS4,
                  ]}
                >
                  {paket.konsol}
                </Text>
              </View>

              <View style={styles.badgeDurasi}>
                <Text style={styles.badgeDurasiText}>{paket.durasi}</Text>
              </View>

              {paket.isPopuler && (
                <View style={styles.badgePopuler}>
                  <Text style={styles.badgePopulerText}>Terpopuler</Text>
                </View>
              )}
            </View>

            {/* Nama Paket */}
            <Text style={styles.namaPaket}>{paket.namaPaket}</Text>

            {/* Harga Sewa */}
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.hargaText}>{formatRupiah(paket.harga)}</Text>
                <Text style={styles.durasiText}> / {paket.durasi}</Text>
              </View>
              <Text style={styles.priceNote}>
                *Harga sudah termasuk kelengkapan stik & game pilihan
              </Text>
            </View>
          </View>

          {/* Section: Fasilitas Paket */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionAccentBar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Fasilitas Paket</Text>
                <Text style={styles.sectionSubtitle}>
                  Kelengkapan unit yang kamu dapatkan selama sewa
                </Text>
              </View>
            </View>

            <View style={styles.fiturList}>
              {paket.fitur.map((fiturItem, index) => (
                <View key={index} style={styles.fiturRow}>
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                  <Text style={styles.fiturText}>{fiturItem}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Section: Spesifikasi Konsol */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionAccentBar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>
                  Spesifikasi & Performa Unit {paket.konsol}
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Kondisi prima siap pakai untuk pengalaman gaming maksimal
                </Text>
              </View>
            </View>

            <View style={styles.specGrid}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Visual & Resolusi</Text>
                <Text style={styles.specValue}>
                  {isPS5
                    ? 'Mendukung hingga 4K HDR 120Hz, visual ultra jernih & mulus'
                    : 'Full HD 1080p HDR grafis tajam dan stabil'}
                </Text>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Kontroler Stik</Text>
                <Text style={styles.specValue}>
                  {isPS5
                    ? 'DualSense Wireless Controller dengan Haptic Feedback & Adaptive Triggers'
                    : 'DualShock 4 Wireless Controller original dengan tombol presisi'}
                </Text>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Kapasitas & Storage</Text>
                <Text style={styles.specValue}>
                  {isPS5
                    ? 'Ultra-High Speed Custom SSD NVMe loading sekejap mata'
                    : '1TB High Capacity Storage terisi penuh update game terbaru'}
                </Text>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Game Terinstal</Text>
                <Text style={styles.specValue}>
                  Bebas pilih & request game populer: EA Sports FC 25 / FIFA,
                  eFootball, GTA V, Marvel&apos;s Spider-Man, Mortal Kombat, God of
                  War, dll.
                </Text>
              </View>
            </View>
          </View>

          {/* Section: Syarat & Ketentuan Sewa */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionAccentBar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Syarat & Ketentuan Sewa</Text>
                <Text style={styles.sectionSubtitle}>
                  Aturan sewa demi keamanan dan kenyamanan bersama
                </Text>
              </View>
            </View>

            <View style={styles.syaratList}>
              <View style={styles.syaratItem}>
                <Text style={styles.syaratNumber}>1</Text>
                <Text style={styles.syaratText}>
                  <Text style={styles.syaratBold}>Jaminan Identitas: </Text>
                  Wajib menunjukkan & menyerahkan KTP atau KTM asli yang masih
                  aktif selama masa sewa sebagai jaminan.
                </Text>
              </View>

              <View style={styles.syaratItem}>
                <Text style={styles.syaratNumber}>2</Text>
                <Text style={styles.syaratText}>
                  <Text style={styles.syaratBold}>Garansi Tukar Unit 24 Jam: </Text>
                  Jika terjadi kendala teknis atau gangguan fungsi stik/konsol,
                  kami siap tukar unit secara gratis dan cepat.
                </Text>
              </View>

              <View style={styles.syaratItem}>
                <Text style={styles.syaratNumber}>3</Text>
                <Text style={styles.syaratText}>
                  <Text style={styles.syaratBold}>Bebas Request Game: </Text>
                  Pelanggan bebas menentukan pilihan judul game favorit saat
                  konfirmasi pemesanan sebelum unit dikirim / diambil.
                </Text>
              </View>

              <View style={styles.syaratItem}>
                <Text style={styles.syaratNumber}>4</Text>
                <Text style={styles.syaratText}>
                  <Text style={styles.syaratBold}>Durasi & Pengembalian: </Text>
                  Unit wajib dikembalikan tepat waktu sesuai durasi sewa (
                  {paket.durasi}) sejak unit diterima.
                </Text>
              </View>

              <View style={styles.syaratItem}>
                <Text style={styles.syaratNumber}>5</Text>
                <Text style={styles.syaratText}>
                  <Text style={styles.syaratBold}>Perawatan Unit: </Text>
                  Unit untuk pemakaian pribadi, dilarang membongkar segel konsol
                  atau memindahtangankan unit ke pihak lain.
                </Text>
              </View>
            </View>
          </View>

          {/* Action Navigation Buttons */}
          <View
            style={[
              styles.actionsContainer,
              isDesktop ? styles.actionsRowDesktop : styles.actionsRowMobile,
            ]}
          >
            {/* Tombol 1: Kembali */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleKembali}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Kembali</Text>
            </TouchableOpacity>

            {/* Tombol 2: Pilih & Pesan Paket Ini */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePilihPaket}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>
                Pilih & Pesan Paket Ini
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  containerWrapper: {
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
    gap: 16,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0071DC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  badgeKonsol: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgePS4: {
    backgroundColor: '#EBF3FC',
  },
  badgePS5: {
    backgroundColor: '#0071DC',
  },
  badgeKonsolText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textPS4: {
    color: '#0071DC',
  },
  textPS5: {
    color: '#FFFFFF',
  },
  badgeDurasi: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeDurasiText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  badgePopuler: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  badgePopulerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  namaPaket: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 32,
    marginBottom: 16,
  },
  priceContainer: {
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  hargaText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0071DC',
  },
  durasiText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 4,
  },
  priceNote: {
    fontSize: 12,
    color: '#0284C7',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionAccentBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
    backgroundColor: '#0071DC',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  fiturList: {
    gap: 10,
  },
  fiturRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EBF3FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkIcon: {
    color: '#0071DC',
    fontSize: 13,
    fontWeight: '900',
  },
  fiturText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  specGrid: {
    gap: 12,
  },
  specItem: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0071DC',
  },
  specLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0071DC',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  specValue: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
    fontWeight: '500',
  },
  syaratList: {
    gap: 12,
  },
  syaratItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  syaratNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0071DC',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 1,
  },
  syaratText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  syaratBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  actionsContainer: {
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsRowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsRowMobile: {
    flexDirection: 'column',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0071DC',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#0071DC',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0071DC',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0071DC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundCard: {
    maxWidth: 480,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notFoundIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EBF3FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  notFoundIconText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0071DC',
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
});
