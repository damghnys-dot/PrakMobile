import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import BookingForm from '../components/BookingForm';
import BookingResult from '../components/BookingResult';

// ==========================================
// MATERI ANGGOTA 2: INTERFACE & TYPE
// ==========================================
type TipeKonsol = 'PS4' | 'PS5';

interface PaketRental {
  id: string;
  namaPaket: string;
  konsol: TipeKonsol;
  harga: number;
  durasi: string;
  fitur: string[];
  isPopuler?: boolean;
}

// ==========================================
// MATERI ANGGOTA 2: ARRAY OF OBJECTS
// ==========================================
const DAFTAR_PAKET: PaketRental[] = [
  {
    id: '1',
    namaPaket: 'Paket Harian PS4 Spartan',
    konsol: 'PS4',
    harga: 80000,
    durasi: '24 Jam',
    fitur: ['2 Stik Original', 'Bebas Pilih 3 Game', 'Kabel HDMI & Power'],
    isPopuler: false,
  },
  {
    id: '2',
    namaPaket: 'Paket Harian PS5 Spartan Ultra',
    konsol: 'PS5',
    harga: 150000,
    durasi: '24 Jam',
    fitur: ['2 Stik DualSense', 'Akses Semua Game PS5', 'Support 4K TV'],
    isPopuler: true,
  },
  {
    id: '3',
    namaPaket: 'Paket Mingguan PS4 Warrior',
    konsol: 'PS4',
    harga: 450000,
    durasi: '7 Hari',
    fitur: ['2 Stik Original', 'Full Game Account', 'Gratis Antar Jemput'],
    isPopuler: false,
  },
  {
    id: '4',
    namaPaket: 'Paket Mingguan PS5 Spartan King',
    konsol: 'PS5',
    harga: 850000,
    durasi: '7 Hari',
    fitur: ['2 Stik DualSense', 'VIP Support 24/7', 'Gratis Antar Jemput'],
    isPopuler: true,
  },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menyimpan paket yang dipilih
  const [selectedPaketId, setSelectedPaketId] = useState<string | null>(
    null
  );

  const menuItems = ['Beranda', 'Tentang', 'Paket', 'Cara Sewa'];

  // ==========================================
  // CUSTOM FUNCTION
  // ==========================================
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectMenu = (item: string) => {
    setActiveMenu(item);
    setIsMenuOpen(false);
  };

  const handlePilihPaket = (paket: PaketRental) => {
    setSelectedPaketId(paket.id);

    alert(
      `Anda memilih ${paket.namaPaket} - Rp ${paket.harga.toLocaleString(
        'id-ID'
      )}`
    );
  };

  const formatRupiah = (angka: number): string => {
    return `Rp ${angka.toLocaleString('id-ID')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0C10" />

      {/* ==========================================
          HEADER
          ========================================== */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeaderBar}>
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logoImage}
            />

            <View style={styles.brandTitleContainer}>
              <Text style={styles.brandMainText}>SPARTAN</Text>
              <Text style={styles.brandSubText}>PLAYSTATION</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.hamburgerButton,
              isMenuOpen && styles.hamburgerButtonActive,
            ]}
            onPress={toggleMenu}
            activeOpacity={0.7}
          >
            <Text style={styles.hamburgerText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.dropdownMenu}>
            {menuItems.map((item) => {
              const isActive = activeMenu === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSelectMenu(item)}
                  style={[
                    styles.dropdownItem,
                    isActive && styles.dropdownItemActive,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      isActive && styles.dropdownTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.orderButtonInDropdown}
              activeOpacity={0.8}
              onPress={() => {
                setIsMenuOpen(false);
                alert('Mengarahkan ke Pemesanan...');
              }}
            >
              <Text style={styles.orderButtonTextInDropdown}>
                🎮 Pesan Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ==========================================
            HERO
            ========================================== */}
        <View style={styles.heroSection}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              🎮 #1 Rental PlayStation Terpercaya
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            Spartan PlayStation -{' '}
            <Text style={styles.titleCream}>Rental PS4</Text> &{' '}
            <Text style={styles.titleRed}>PS5 Terpercaya</Text>
          </Text>

          <Text style={styles.heroSub}>
            Nikmati pengalaman gaming terbaik tanpa harus membeli.
            Koleksi game lengkap, kondisi prima, harga bersahabat.
          </Text>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => alert('Mengarahkan ke Pemesanan...')}
            >
              <Text style={styles.primaryButtonText}>
                🎮 Pesan Sekarang
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={() => alert('Mengarahkan ke Lihat Paket...')}
            >
              <Text style={styles.secondaryButtonText}>
                🏷️ Lihat Paket
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500</Text>
              <Text style={styles.statSymbol}>+</Text>
              <Text style={styles.statLabel}>Pelanggan Puas</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statSymbol}>+</Text>
              <Text style={styles.statLabel}>Game Tersedia</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statSymbol}>★</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* ==========================================
            PAKET RENTAL - ANGGOTA 2
            ========================================== */}
        <View style={styles.paketSection}>
          <Text style={styles.sectionTitle}>
            Pilihan Paket Spartan Rental
          </Text>

          <Text style={styles.sectionSubtitle}>
            Pilih paket yang sesuai dengan kebutuhan main kamu
          </Text>

          <View style={styles.paketGrid}>
            {DAFTAR_PAKET.map((paket) => {
              const isSelected = selectedPaketId === paket.id;

              return (
                <View
                  key={paket.id}
                  style={[
                    styles.cardPaket,
                    paket.isPopuler && styles.cardPopuler,
                    isSelected && styles.cardSelected,
                  ]}
                >
                  {paket.isPopuler && (
                    <View style={styles.badgePopuler}>
                      <Text style={styles.badgePopulerText}>
                        🔥 Terlaris
                      </Text>
                    </View>
                  )}

                  <View style={styles.cardHeader}>
                    <Text style={styles.namaPaket}>
                      {paket.namaPaket}
                    </Text>

                    <View
                      style={[
                        styles.badgeKonsol,
                        paket.konsol === 'PS5'
                          ? styles.bgPs5
                          : styles.bgPs4,
                      ]}
                    >
                      <Text style={styles.textKonsol}>
                        {paket.konsol}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.hargaText}>
                      {formatRupiah(paket.harga)}
                    </Text>

                    <Text style={styles.durasiText}>
                      / {paket.durasi}
                    </Text>
                  </View>

                  <View style={styles.fiturContainer}>
                    {paket.fitur.map((fiturItem, index) => (
                      <Text
                        key={index}
                        style={styles.fiturText}
                      >
                        ✓ {fiturItem}
                      </Text>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.btnPilih,
                      isSelected && styles.btnPilihActive,
                    ]}
                    onPress={() => handlePilihPaket(paket)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.btnPilihText}>
                      {isSelected ? '✓ Terpilih' : 'Pilih Paket'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* ==========================================
            BOOKING FORM - ANGGOTA 3
            ========================================== */}
        <BookingForm />

        {/* ==========================================
            BOOKING RESULT - ANGGOTA 3
            ========================================== */}
        <BookingResult />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0C10',
  },

  // ==========================================
  // HEADER STYLE
  // ==========================================
  headerContainer: {
    backgroundColor: '#0F1117',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1D26',
  },

  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logoImage: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },

  brandTitleContainer: {
    justifyContent: 'center',
  },

  brandMainText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#E5C185',
    letterSpacing: 2,
    lineHeight: 24,
  },

  brandSubText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E5C185',
    letterSpacing: 2,
    marginTop: -2,
  },

  hamburgerButton: {
    width: 42,
    height: 42,
    backgroundColor: '#1E202B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2D3142',
  },

  hamburgerButtonActive: {
    backgroundColor: '#2D3142',
    borderColor: '#E5C185',
  },

  hamburgerText: {
    color: '#E5C185',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26,
  },

  dropdownMenu: {
    backgroundColor: '#151821',
    borderTopWidth: 1,
    borderTopColor: '#222735',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },

  dropdownItemActive: {
    backgroundColor: '#1E202B',
  },

  dropdownText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },

  dropdownTextActive: {
    color: '#E5C185',
    fontWeight: '700',
  },

  orderButtonInDropdown: {
    backgroundColor: '#E11D48',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 4,
    alignItems: 'center',
  },

  orderButtonTextInDropdown: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // ==========================================
  // HERO STYLE
  // ==========================================
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 30,
    alignItems: 'center',
  },

  badgeContainer: {
    backgroundColor: '#161922',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D3142',
    marginBottom: 20,
  },

  badgeText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 14,
  },

  titleCream: {
    color: '#E5C185',
  },

  titleRed: {
    color: '#E11D48',
  },

  heroSub: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 340,
    marginBottom: 28,
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E5C185',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  secondaryButtonText: {
    color: '#E5C185',
    fontSize: 14,
    fontWeight: '700',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 10,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 30,
    fontWeight: '900',
    color: '#E5C185',
    lineHeight: 32,
  },

  statSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E5C185',
    marginTop: -2,
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 12,
    color: '#8A94A6',
    fontWeight: '500',
  },

  // ==========================================
  // PAKET STYLE
  // ==========================================
  paketSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    marginBottom: 24,
  },

  paketGrid: {
    gap: 16,
  },

  cardPaket: {
    backgroundColor: '#151821',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222735',
    position: 'relative',
  },

  cardPopuler: {
    borderColor: '#E11D48',
  },

  cardSelected: {
    borderColor: '#E5C185',
    backgroundColor: '#1A1E2B',
  },

  badgePopuler: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#E11D48',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgePopulerText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  namaPaket: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },

  badgeKonsol: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  bgPs4: {
    backgroundColor: '#1E3A8A',
  },

  bgPs5: {
    backgroundColor: '#0284C7',
  },

  textKonsol: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },

  hargaText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#E5C185',
  },

  durasiText: {
    fontSize: 12,
    color: '#94A3B8',
  },

  fiturContainer: {
    marginBottom: 16,
    gap: 6,
  },

  fiturText: {
    fontSize: 12,
    color: '#CBD5E1',
  },

  btnPilih: {
    backgroundColor: '#1E202B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3142',
  },

  btnPilihActive: {
    backgroundColor: '#E5C185',
    borderColor: '#E5C185',
  },

  btnPilihText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});