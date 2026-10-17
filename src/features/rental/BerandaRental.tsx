import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { PaketRental } from '../../types/rental';
import { DAFTAR_PAKET } from '../../constants/rental';
import { rentalStyles as styles } from '../../styles/rental';

export interface BerandaRentalProps {
  onPesanSekarang?: () => void;
  onLihatPaket?: () => void;
  onPaketSectionLayout?: (y: number) => void;
  selectedPaket?: PaketRental | null;
  onSelectPaket?: (paket: PaketRental) => void;
}

export const BerandaRental: React.FC<BerandaRentalProps> = ({
  onPesanSekarang,
  onLihatPaket,
  onPaketSectionLayout,
  selectedPaket,
  onSelectPaket,
}) => {
  const router = useRouter();
  const [internalSelectedPaketId, setInternalSelectedPaketId] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;

  const currentSelectedId = selectedPaket !== undefined ? selectedPaket?.id : internalSelectedPaketId;

  const handlePilihPaket = (paket: PaketRental) => {
    setInternalSelectedPaketId(paket.id);
    onSelectPaket?.(paket);
  };

  const formatRupiah = (angka: number): string =>
    `Rp ${angka.toLocaleString('id-ID')}`;

  return (
    <View>
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
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onPesanSekarang}
          >
            <Text style={styles.primaryButtonText}>Pesan Sekarang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={onLihatPaket}
          >
            <Text style={styles.secondaryButtonText}>Lihat Paket</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statNumberRow}>
              <Text style={styles.statNumber}>500</Text>
              <Text style={styles.statSymbol}>+</Text>
            </View>
            <Text style={styles.statLabel}>Pelanggan Puas</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statNumberRow}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statSymbol}>+</Text>
            </View>
            <Text style={styles.statLabel}>Game Tersedia</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statNumberRow}>
              <Text style={styles.statNumber}>5.0</Text>
              <Text style={styles.statSymbol}>/5.0</Text>
            </View>
            <Text style={styles.statLabel}>Rating Kepuasan</Text>
          </View>
        </View>
      </View>

      <View
        style={styles.paketSection}
        onLayout={(event) => {
          onPaketSectionLayout?.(event.nativeEvent.layout.y);
        }}
      >
        <Text style={styles.sectionTitle}>Pilihan Paket Spartan Rental</Text>
        <Text style={styles.sectionSubtitle}>Pilih paket yang sesuai dengan kebutuhan main kamu</Text>

        <View style={styles.paketGrid}>
          {DAFTAR_PAKET.map((paket) => {
            const isSelected = currentSelectedId === paket.id;
            return (
              <View
                key={paket.id}
                style={[
                  styles.cardPaket,
                  isDesktop ? styles.cardPaketDesktop : styles.cardPaketMobile,
                  paket.isPopuler && styles.cardPopuler,
                  isSelected && styles.cardSelected,
                ]}
              >
                <View>
                  <View style={styles.cardHeader}>
                    <Text style={styles.namaPaket}>{paket.namaPaket}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      {paket.isPopuler && (
                        <View style={styles.badgePopuler}>
                          <Text style={styles.badgePopulerText}>Terlaris</Text>
                        </View>
                      )}
                      <View style={styles.badgeKonsol}>
                        <Text style={styles.textKonsol}>{paket.konsol}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.hargaText}>{formatRupiah(paket.harga)}</Text>
                    <Text style={styles.durasiText}> / {paket.durasi}</Text>
                  </View>

                  <View style={styles.fiturContainer}>
                    {paket.fitur.map((fiturItem, index) => (
                      <View key={index} style={styles.fiturItem}>
                        <Text style={styles.fiturCheck}>✓</Text>
                        <Text style={styles.fiturText}>{fiturItem}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.cardActionsContainer}>
                  <TouchableOpacity
                    style={styles.btnDetail}
                    onPress={() => router.push(`/paket/${paket.id}`)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.btnDetailText}>Lihat Detail</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btnPilih, isSelected && styles.btnPilihActive]}
                    onPress={() => handlePilihPaket(paket)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.btnPilihText}>
                      {isSelected ? '✓ Terpilih' : 'Pilih Paket'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
