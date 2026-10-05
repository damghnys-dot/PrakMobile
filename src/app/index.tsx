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

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Beranda');
  // State untuk kontrol dropdown menu hamburger
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Beranda', 'Tentang', 'Paket', 'Cara Sewa'];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectMenu = (item: string) => {
    setActiveMenu(item);
    setIsMenuOpen(false); // Otomatis menutup dropdown saat item dipilih
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0C10" />

      {/* 1. HEADER / NAVIGATION BAR */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeaderBar}>
          {/* LOGO & BRAND (SISI KIRI) */}
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logoImage}
            />
            <View style={styles.brandTitleContainer}>
              <Text style={styles.brandMainText}>TRIO</Text>
              <Text style={styles.brandSubText}>PLAYSTATION</Text>
            </View>
          </View>

          {/* TOMBOL HAMBURGER / TITIK TIGA (POJOK KANAN SENDIRI) */}
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

        {/* DROPDOWN MENU KETIKA HAMBURGER DIKLIK */}
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

            {/* TOMBOL PESAN SEKARANG DI DALAM MENU DROPDOWN */}
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
        {/* 2. HERO SECTION */}
        <View style={styles.heroSection}>
          
          {/* BADGE KATEGORI */}
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>🎮 #1 Rental PlayStation Terpercaya</Text>
          </View>

          {/* JUDUL UTAMA */}
          <Text style={styles.heroTitle}>
            RENTAL <Text style={styles.titleCream}>PS4</Text> & <Text style={styles.titleRed}>PS5</Text>
          </Text>

          {/* DESKRIPSI SINGKAT */}
          <Text style={styles.heroSub}>
            Nikmati pengalaman gaming terbaik tanpa harus membeli. Koleksi game lengkap, kondisi prima, harga bersahabat.
          </Text>

          {/* 3. DUA TOMBOL AKSI BERDAMPINGAN */}
          <View style={styles.actionButtonsContainer}>
            {/* Tombol Pesan Sekarang */}
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => alert('Mengarahkan ke Pemesanan...')}
            >
              <Text style={styles.primaryButtonText}>🎮  Pesan Sekarang</Text>
            </TouchableOpacity>

            {/* Tombol Lihat Paket */}
            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={() => alert('Mengarahkan ke Lihat Paket...')}
            >
              <Text style={styles.secondaryButtonText}>🏷️  Lihat Paket</Text>
            </TouchableOpacity>
          </View>

          {/* 4. STATISTIK RINGKAS */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0C10',
  },
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

  /* HAMBURGER BUTTON (POJOK KANAN SENDIRI) */
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

  /* DROPDOWN MENU */
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

  /* HERO SECTION */
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 40,
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
    fontSize: 32,
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

  /* TOMBOL BERDAMPINGAN */
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
    elevation: 6,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
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

  /* STATISTIK RINGKAS */
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
});