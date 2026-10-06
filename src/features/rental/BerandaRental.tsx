import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { PaketRental } from '../../types/rental';
import { DAFTAR_PAKET } from '../../constants/rental';
import { rentalStyles as styles } from '../../styles/rental';

export const BerandaRental: React.FC = () => {
  const [selectedPaketId, setSelectedPaketId] = useState<string | null>(null);

  const handlePilihPaket = (paket: PaketRental) => {
    setSelectedPaketId(paket.id);
    Alert.alert('Sukses', `Anda memilih ${paket.namaPaket} - Rp ${paket.harga.toLocaleString('id-ID')}`);
  };

  const formatRupiah = (angka: number): string => `Rp ${angka.toLocaleString('id-ID')}`;

  return (
    <View>
      {/* HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>#1 Rental PlayStation Terpercaya</Text>
        </View>
        <Text style={styles.heroTitle}>
          TRIO PlayStation - <Text style={styles.titleCream}>Rental PS4</Text> & <Text style={styles.titleRed}>PS5 Terpercaya</Text>
        </Text>
        <Text style={styles.heroSub}>
          Nikmati pengalaman gaming terbaik tanpa harus membeli. Koleksi game lengkap, kondisi prima, harga bersahabat.
        </Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Pesan Sekarang</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
            <Text style={styles.secondaryButtonText}>Lihat Paket</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}><Text style={styles.statNumber}>500</Text><Text style={styles.statSymbol}>+</Text><Text style={styles.statLabel}>Pelanggan Puas</Text></View>
          <View style={styles.statItem}><Text style={styles.statNumber}>50</Text><Text style={styles.statSymbol}>+</Text><Text style={styles.statLabel}>Game Tersedia</Text></View>
          <View style={styles.statItem}><Text style={styles.statNumber}>5</Text><Text style={styles.statSymbol}>★</Text><Text style={styles.statLabel}>Rating</Text></View>
        </View>
      </View>

      {/* SECTION PAKET */}
      <View style={styles.paketSection}>
        <Text style={styles.sectionTitle}>Pilihan Paket Spartan Rental</Text>
        <Text style={styles.sectionSubtitle}>Pilih paket yang sesuai dengan kebutuhan main kamu</Text>
        <View style={styles.paketGrid}>
          {DAFTAR_PAKET.map((paket) => {
            const isSelected = selectedPaketId === paket.id;
            return (
              <View key={paket.id} style={[styles.cardPaket, paket.isPopuler && styles.cardPopuler, isSelected && styles.cardSelected]}>
                {paket.isPopuler && <View style={styles.badgePopuler}><Text style={styles.badgePopulerText}>🔥 Terlaris</Text></View>}
                <View style={styles.cardHeader}>
                  <Text style={styles.namaPaket}>{paket.namaPaket}</Text>
                  <View style={[styles.badgeKonsol, paket.konsol === 'PS5' ? styles.bgPs5 : styles.bgPs4]}>
                    <Text style={styles.textKonsol}>{paket.konsol}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.hargaText}>{formatRupiah(paket.harga)}</Text>
                  <Text style={styles.durasiText}> / {paket.durasi}</Text>
                </View>
                <View style={styles.fiturContainer}>
                  {paket.fitur.map((fiturItem, index) => <Text key={index} style={styles.fiturText}>✓ {fiturItem}</Text>)}
                </View>
                <TouchableOpacity style={[styles.btnPilih, isSelected && styles.btnPilihActive]} onPress={() => handlePilihPaket(paket)}>
                  <Text style={styles.btnPilihText}>{isSelected ? '✓ Terpilih' : 'Pilih Paket'}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};