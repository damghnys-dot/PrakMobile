import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DAFTAR_PAKET } from '../../constants/rental';
import { rentalStyles as styles } from '../../styles/rental';
import { PaketRental } from '../../types/rental';

interface BerandaRentalProps {
  onPesanSekarang: () => void;
  onLihatPaket: () => void;
  onPaketSectionLayout: (y: number) => void;
  selectedPaket: PaketRental | null;
  onSelectPaket: (paket: PaketRental) => void;
}

export const BerandaRental: React.FC<BerandaRentalProps> = ({
  onPesanSekarang,
  onLihatPaket,
  onPaketSectionLayout,
  selectedPaket,
  onSelectPaket,
}) => {
  const formatRupiah = (angka: number): string =>
    `Rp ${angka.toLocaleString('id-ID')}`;

  return (
    <View>
      <View style={styles.heroSection}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>#1 Rental PlayStation Terpercaya</Text>
        </View>
        <Text style={styles.heroTitle}>
          TRIO PlayStation -{' '}
          <Text style={styles.titleCream}>Rental PS4</Text>
          {' & '}
          <Text style={styles.titleRed}>PS5 Terpercaya</Text>
        </Text>
        <Text style={styles.heroSub}>
          Nikmati pengalaman gaming terbaik tanpa harus membeli. Koleksi game
          lengkap, kondisi prima, harga bersahabat.
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
          {[
            ['500', '+', 'Pelanggan Puas'],
            ['50', '+', 'Game Tersedia'],
            ['5', '★', 'Rating'],
          ].map(([number, symbol, label]) => (
            <View key={label} style={styles.statItem}>
              <Text style={styles.statNumber}>{number}</Text>
              <Text style={styles.statSymbol}>{symbol}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={styles.paketSection}
        onLayout={(event) =>
          onPaketSectionLayout(event.nativeEvent.layout.y)
        }
      >
        <Text style={styles.sectionTitle}>Pilihan Paket Rental</Text>
        <Text style={styles.sectionSubtitle}>
          Pilih paket yang sesuai dengan kebutuhan main kamu.
        </Text>
        <View style={styles.paketGrid}>
          {DAFTAR_PAKET.map((paket) => {
            const isSelected = selectedPaket?.id === paket.id;
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
                    <Text style={styles.badgePopulerText}>🔥 Terlaris</Text>
                  </View>
                )}
                <View style={styles.cardHeader}>
                  <Text style={styles.namaPaket}>{paket.namaPaket}</Text>
                  <View
                    style={[
                      styles.badgeKonsol,
                      paket.konsol === 'PS5' ? styles.bgPs5 : styles.bgPs4,
                    ]}
                  >
                    <Text style={styles.textKonsol}>{paket.konsol}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.hargaText}>
                    {formatRupiah(paket.harga)}
                  </Text>
                  <Text style={styles.durasiText}> / {paket.durasi}</Text>
                </View>
                <View style={styles.fiturContainer}>
                  {paket.fitur.map((fiturItem) => (
                    <Text key={fiturItem} style={styles.fiturText}>
                      ✓ {fiturItem}
                    </Text>
                  ))}
                </View>
                <TouchableOpacity
                  style={[
                    styles.btnPilih,
                    isSelected && styles.btnPilihActive,
                  ]}
                  onPress={() => onSelectPaket(paket)}
                  activeOpacity={0.85}
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
    </View>
  );
};
