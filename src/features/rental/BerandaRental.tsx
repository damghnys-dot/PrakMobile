import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { PaketRental } from "../../types/rental";
import { DAFTAR_PAKET } from "../../constants/rental";
import { rentalStyles as styles } from "../../styles/rental";

export const BerandaRental: React.FC = () => {
  const [selectedPaketId, setSelectedPaketId] = useState<string | null>(null);

  const handlePilihPaket = (paket: PaketRental) => {
    setSelectedPaketId(paket.id);
    Alert.alert(
      "Sukses",
      `Anda memilih ${paket.namaPaket} - Rp ${paket.harga.toLocaleString("id-ID")}`,
    );
  };

  const formatRupiah = (angka: number): string =>
    `Rp ${angka.toLocaleString("id-ID")}`;

  return React.createElement(
    View,
    null,
    React.createElement(
      View,
      { style: styles.heroSection },
      React.createElement(
        View,
        { style: styles.badgeContainer },
        React.createElement(
          Text,
          { style: styles.badgeText },
          "#1 Rental PlayStation Terpercaya",
        ),
      ),
      React.createElement(
        Text,
        { style: styles.heroTitle },
        "TRIO PlayStation - ",
        React.createElement(Text, { style: styles.titleCream }, "Rental PS4"),
        " & ",
        React.createElement(Text, { style: styles.titleRed }, "PS5 Terpercaya"),
      ),
      React.createElement(
        Text,
        { style: styles.heroSub },
        "Nikmati pengalaman gaming terbaik tanpa harus membeli. Koleksi game lengkap, kondisi prima, harga bersahabat.",
      ),
      React.createElement(
        View,
        { style: styles.actionButtonsContainer },
        React.createElement(
          TouchableOpacity,
          { style: styles.primaryButton, activeOpacity: 0.85 },
          React.createElement(
            Text,
            { style: styles.primaryButtonText },
            "Pesan Sekarang",
          ),
        ),
        React.createElement(
          TouchableOpacity,
          { style: styles.secondaryButton, activeOpacity: 0.85 },
          React.createElement(
            Text,
            { style: styles.secondaryButtonText },
            "Lihat Paket",
          ),
        ),
      ),
      React.createElement(
        View,
        { style: styles.statsContainer },
        React.createElement(
          View,
          { style: styles.statItem },
          React.createElement(Text, { style: styles.statNumber }, "500"),
          React.createElement(Text, { style: styles.statSymbol }, "+"),
          React.createElement(Text, { style: styles.statLabel }, "Pelanggan Puas"),
        ),
        React.createElement(
          View,
          { style: styles.statItem },
          React.createElement(Text, { style: styles.statNumber }, "50"),
          React.createElement(Text, { style: styles.statSymbol }, "+"),
          React.createElement(Text, { style: styles.statLabel }, "Game Tersedia"),
        ),
        React.createElement(
          View,
          { style: styles.statItem },
          React.createElement(Text, { style: styles.statNumber }, "5"),
          React.createElement(Text, { style: styles.statSymbol }, "★"),
          React.createElement(Text, { style: styles.statLabel }, "Rating"),
        ),
      ),
    ),
    React.createElement(
      View,
      { style: styles.paketSection },
      React.createElement(
        Text,
        { style: styles.sectionTitle },
        "Pilihan Paket Spartan Rental",
      ),
      React.createElement(
        Text,
        { style: styles.sectionSubtitle },
        "Pilih paket yang sesuai dengan kebutuhan main kamu",
      ),
      React.createElement(
        View,
        { style: styles.paketGrid },
        ...DAFTAR_PAKET.map((paket) => {
          const isSelected = selectedPaketId === paket.id;
          return React.createElement(
            View,
            {
              key: paket.id,
              style: [
                styles.cardPaket,
                paket.isPopuler && styles.cardPopuler,
                isSelected && styles.cardSelected,
              ],
            },
            paket.isPopuler &&
              React.createElement(
                View,
                { style: styles.badgePopuler },
                React.createElement(
                  Text,
                  { style: styles.badgePopulerText },
                  "🔥 Terlaris",
                ),
              ),
            React.createElement(
              View,
              { style: styles.cardHeader },
              React.createElement(
                Text,
                { style: styles.namaPaket },
                paket.namaPaket,
              ),
              React.createElement(
                View,
                {
                  style: [
                    styles.badgeKonsol,
                    paket.konsol === "PS5" ? styles.bgPs5 : styles.bgPs4,
                  ],
                },
                React.createElement(
                  Text,
                  { style: styles.textKonsol },
                  paket.konsol,
                ),
              ),
            ),
            React.createElement(
              View,
              { style: styles.priceContainer },
              React.createElement(
                Text,
                { style: styles.hargaText },
                formatRupiah(paket.harga),
              ),
              React.createElement(
                Text,
                { style: styles.durasiText },
                ` / ${paket.durasi}`,
              ),
            ),
            React.createElement(
              View,
              { style: styles.fiturContainer },
              ...paket.fitur.map((fiturItem, index) =>
                React.createElement(
                  Text,
                  { key: index, style: styles.fiturText },
                  `✓ ${fiturItem}`,
                ),
              ),
            ),
            React.createElement(
              TouchableOpacity,
              {
                style: [styles.btnPilih, isSelected && styles.btnPilihActive],
                onPress: () => handlePilihPaket(paket),
              },
              React.createElement(
                Text,
                { style: styles.btnPilihText },
                isSelected ? "✓ Terpilih" : "Pilih Paket",
              ),
            ),
          );
        }),
      ),
    ),
  );
};
