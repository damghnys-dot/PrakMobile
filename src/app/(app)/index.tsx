import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Booking } from "../../types/booking";
import { PaketRental, PengalamanItem, SkillItem } from "../../types/rental";

import {
  DAFTAR_PAKET,
  PENGALAMAN_DATA,
  PROFILE_DATA,
  SKILLS_DATA,
} from "../../constants/rental";

import { profileStyles, rentalHeaderStyles as styles } from "../../styles/rental";

import { BerandaRental } from "../../features/rental/BerandaRental";

import BookingForm, { BookingData } from "../../components/BookingForm";

import BookingResult from "../../components/BookingResult";
import MyBookingsSection from "../../components/MyBookingsSection";
import { useAuth } from "../../context/AuthContext";
import { useRental } from "../../context/RentalContext";
import { supabase } from "../../lib/supabase";
import {
  createBooking,
  deleteBookingById,
  fetchUserBookings,
  parseDurasiHari,
} from "../../services/bookingService";

export default function Index() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;

  const [activeProfileTab, setActiveProfileTab] = useState<
    "keahlian" | "pengalaman"
  >("keahlian");

  const { selectedPaket, setSelectedPaket } = useRental();
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const callsignMeta = user?.user_metadata?.callsign;
  const memberName =
    typeof callsignMeta === "string" && callsignMeta.trim().length > 0
      ? callsignMeta.trim()
      : user?.email || "Member TRIO";
  const memberEmail = user?.email || "-";

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setLoggingOut(false);
    }
  };

  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState<boolean>(true);
  const [refreshingBookings, setRefreshingBookings] = useState<boolean>(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [bookingActionError, setBookingActionError] = useState<string | null>(
    null,
  );
  const [savingBooking, setSavingBooking] = useState<boolean>(false);
  const [saveBookingError, setSaveBookingError] = useState<string | null>(null);
  const [saveBookingMessage, setSaveBookingMessage] = useState<string | null>(
    null,
  );

  const loadBookings = useCallback(async (isPullRefresh = false) => {
    if (isPullRefresh) {
      setRefreshingBookings(true);
    } else {
      setLoadingBookings(true);
    }
    setBookingsError(null);
    setBookingActionError(null);

    try {
      const data = await fetchUserBookings();
      setBookings(data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Gagal memuat daftar pesanan dari server.";
      setBookingsError(msg);
    } finally {
      setLoadingBookings(false);
      setRefreshingBookings(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      loadBookings(false);
    } else {
      setBookings([]);
      setLoadingBookings(false);
    }
  }, [user?.id, loadBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    const previousBookings = bookings;
    setBookingActionError(null);
    setBookings((current) => current.filter((item) => item.id !== bookingId));

    try {
      await deleteBookingById(bookingId);
    } catch (err: unknown) {
      setBookings(previousBookings);
      const msg =
        err instanceof Error
          ? err.message
          : "Gagal membatalkan pesanan. Data telah dikembalikan.";
      setBookingActionError(msg);
    }
  };

  const scrollRef = useRef<ScrollView>(null);

  const [bookingY, setBookingY] = useState(0);
  const [paketY, setPaketY] = useState(0);

  const menuItems = ["Beranda", "Tentang", "Paket", "Katalog"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToBooking = () => {
    const targetY = bookingY > 0 ? bookingY : 800;
    if (activeMenu === "Tentang") {
      setActiveMenu("Beranda");
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: bookingY > 0 ? bookingY : targetY,
          animated: true,
        });
      }, 100);
    } else {
      scrollRef.current?.scrollTo({
        y: targetY,
        animated: true,
      });
    }
  };

  const { selectedPaketId } = useLocalSearchParams<{
    selectedPaketId?: string;
  }>();

  useEffect(() => {
    if (selectedPaketId) {
      const paketIdStr = Array.isArray(selectedPaketId)
        ? selectedPaketId[0]
        : selectedPaketId;
      const found = DAFTAR_PAKET.find(
        (p) => String(p.id) === String(paketIdStr),
      );
      if (found) {
        setSelectedPaket(found);
        setTimeout(() => {
          scrollToBooking();
        }, 150);
      }
    }
  }, [selectedPaketId, bookingY]);

  const scrollToPaket = () => {
    const targetY = paketY > 0 ? paketY : 380;
    if (activeMenu === "Tentang") {
      setActiveMenu("Beranda");
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: targetY,
          animated: true,
        });
      }, 100);
    } else {
      scrollRef.current?.scrollTo({
        y: targetY,
        animated: true,
      });
    }
  };

  const handleSelectMenu = (item: string) => {
    setIsMenuOpen(false);

    if (item === "Beranda") {
      setActiveMenu("Beranda");
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (item === "Paket") {
      scrollToPaket();
    } else if (item === "Tentang") {
      setActiveMenu("Tentang");
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (item === "Katalog") {
      router.push("/katalog");
    }
  };

  const handleSelectPaketFromBeranda = (paket: PaketRental) => {
    setSelectedPaket(paket);
    scrollToBooking();
  };

  const handleSelectPaketFromBooking = (paket: PaketRental) => {
    setSelectedPaket(paket);
  };

  const handleBookingSuccess = async (data: BookingData) => {
    setBookingData(data);
    setSaveBookingError(null);
    setSaveBookingMessage(null);

    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: bookingY,
        animated: true,
      });
    }, 100);

    if (!user) {
      return;
    }

    setSavingBooking(true);
    try {
      const created = await createBooking({
        userId: user.id,
        paketNama: data.paket.namaPaket,
        durasiHari: parseDurasiHari(data.paket.durasi),
        totalHarga: data.paket.harga,
      });
      setBookings((current) => [created, ...current]);
      setSaveBookingMessage("Pesanan berhasil disimpan ke database cloud.");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Gagal menyimpan pesanan ke database cloud.";
      setSaveBookingError(msg);
    } finally {
      setSavingBooking(false);
    }
  };
  const sapaHalo = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("halo");
      }, 500);
    });
  };

  const handleKlikHalo = () => {
    sapaHalo().then((pesan) => {
      alert(pesan);
    });
  };
  const ambilSaya = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("saya");
      }, 500);
    });
  };
  const handleKlikSaya = async () => {
    const hasil = await ambilSaya();
    alert(hasil);
  };
  const aboutContent = (
    <View style={profileStyles.profileWrapper}>
      <View style={profileStyles.profileCard}>
        <View style={profileStyles.topAccentBar} />

        <View style={profileStyles.profileCardBody}>
          <View style={profileStyles.badgePartner}>
            <Text style={profileStyles.badgePartnerText}>TENTANG KAMI</Text>
          </View>

          <Text style={profileStyles.namaText}>{PROFILE_DATA.nama}</Text>

          <Text style={profileStyles.sebutanText}>{PROFILE_DATA.sebutan}</Text>

          <View style={profileStyles.badgeLokasi}>
            <Text style={profileStyles.badgeLokasiText}>
              {PROFILE_DATA.lokasi}
            </Text>
          </View>

          <Text style={profileStyles.bioText}>{PROFILE_DATA.bio}</Text>

          <View style={profileStyles.infoColumnsContainer}>
            <View style={profileStyles.infoColumn}>
              <Text style={profileStyles.infoColumnLabel}>JAM OPERASIONAL</Text>
              <Text style={profileStyles.infoColumnValue}>
                Buka 24 Jam (Setiap Hari)
              </Text>
            </View>

            <View style={profileStyles.infoColumn}>
              <Text style={profileStyles.infoColumnLabel}>SISTEM SEWA</Text>
              <Text style={profileStyles.infoColumnValue}>
                Main di Tempat & Bawa Pulang
              </Text>
            </View>

            <View style={profileStyles.infoColumn}>
              <Text style={profileStyles.infoColumnLabel}>AREA LAYANAN</Text>
              <Text style={profileStyles.infoColumnValue}>
                Kota Malang & Sekitarnya
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={profileStyles.tabContainer}>
        <TouchableOpacity
          style={[
            profileStyles.tabButton,
            activeProfileTab === "keahlian" && profileStyles.tabButtonActive,
          ]}
          onPress={() => setActiveProfileTab("keahlian")}
          activeOpacity={0.85}
        >
          <Text
            style={[
              profileStyles.tabText,
              activeProfileTab === "keahlian" && profileStyles.tabTextActive,
            ]}
          >
            Fasilitas & Unit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            profileStyles.tabButton,
            activeProfileTab === "pengalaman" && profileStyles.tabButtonActive,
          ]}
          onPress={() => setActiveProfileTab("pengalaman")}
          activeOpacity={0.85}
        >
          <Text
            style={[
              profileStyles.tabText,
              activeProfileTab === "pengalaman" && profileStyles.tabTextActive,
            ]}
          >
            Keunggulan Layanan
          </Text>
        </TouchableOpacity>
      </View>

      <View style={profileStyles.contentSection}>
        {activeProfileTab === "keahlian" ? (
          <View style={profileStyles.gridContainer}>
            {SKILLS_DATA.map((skill: SkillItem, index: number) => {
              const formattedIndex = String(index + 1).padStart(2, "0");
              return (
                <View
                  key={skill.id}
                  style={[
                    profileStyles.cardItem,
                    isDesktop
                      ? profileStyles.cardItemDesktop
                      : profileStyles.cardItemMobile,
                  ]}
                >
                  <View style={profileStyles.cardItemLeft}>
                    <View style={profileStyles.indexBox}>
                      <Text style={profileStyles.indexText}>
                        {formattedIndex}
                      </Text>
                    </View>

                    <View style={profileStyles.cardItemTextContent}>
                      <Text style={profileStyles.cardTitle}>{skill.nama}</Text>
                      {skill.deskripsi && (
                        <Text style={profileStyles.cardSubtitle}>
                          {skill.deskripsi}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={profileStyles.badgeTingkat}>
                    <Text style={profileStyles.badgeTingkatText}>
                      {skill.tingkat}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={profileStyles.listContainer}>
            {PENGALAMAN_DATA.map((item: PengalamanItem) => (
              <View key={item.id} style={profileStyles.cardPengalaman}>
                <View style={profileStyles.cardHeader}>
                  <Text style={profileStyles.peranText}>{item.peran}</Text>

                  <Text style={profileStyles.tahunText}>{item.tahun}</Text>
                </View>

                <Text style={profileStyles.instansiText}>{item.instansi}</Text>

                <Text style={profileStyles.deskripsiText}>
                  {item.deskripsi}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0071DC" />

      <View style={styles.headerContainer}>
        <View style={styles.topHeaderBar}>
          <View style={styles.brandContainer}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />

            <View style={styles.brandTitleContainer}>
              <Text style={styles.brandMainText}>TRIO</Text>

              <Text style={styles.brandSubText}>PLAYSTATION</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.hamburgerButton,
              isMenuOpen && styles.hamburgerButtonActive,
            ]}
            onPress={toggleMenu}
            activeOpacity={0.85}
          >
            <Text style={styles.hamburgerText}>{isMenuOpen ? "✕" : "☰"}</Text>
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.floatingDropdownMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleSelectMenu(item)}
                style={[
                  styles.dropdownItem,
                  activeMenu === item && styles.dropdownItemActive,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    activeMenu === item && styles.dropdownTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingBookings}
            onRefresh={() => loadBookings(true)}
            colors={["#003087"]}
            tintColor="#003087"
          />
        }
        contentContainerStyle={{
          backgroundColor: "#F4F6F9",
          flexGrow: 1,
          paddingBottom: 40,
        }}
      >
        <View style={memberStyles.wrapper}>
          <View style={memberStyles.card}>
            <View style={memberStyles.infoColumn}>
              <Text style={memberStyles.badge}>MEMBER AKTIF</Text>
              <Text style={memberStyles.name} numberOfLines={1}>
                {memberName}
              </Text>
              <Text style={memberStyles.email} numberOfLines={1}>
                {memberEmail}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                memberStyles.logoutButton,
                loggingOut && memberStyles.logoutButtonDisabled,
              ]}
              onPress={handleLogout}
              disabled={loggingOut}
              activeOpacity={0.85}
            >
              {loggingOut ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={memberStyles.logoutText}>Logout</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {activeMenu === "Tentang" ? (
          aboutContent
        ) : (
          <>
            <BerandaRental
              onPesanSekarang={scrollToBooking}
              onLihatPaket={scrollToPaket}
              onPaketSectionLayout={(y) => setPaketY(y)}
              selectedPaket={selectedPaket}
              onSelectPaket={handleSelectPaketFromBeranda}
            />

            <View
              style={{
                maxWidth: 680,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: 16,
              }}
              onLayout={(event) => {
                setBookingY(event.nativeEvent.layout.y);
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/katalog")}
                style={{
                  backgroundColor: "#002F6C",
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginTop: 28,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#002F6C",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                activeOpacity={0.85}
              >
                <Text
                  style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 15 }}
                >
                  Lihat Katalog Game PS
                </Text>
              </TouchableOpacity>

              <BookingForm
                daftarPaket={DAFTAR_PAKET}
                selectedPaket={selectedPaket}
                onSelectPaket={handleSelectPaketFromBooking}
                onBookingSuccess={handleBookingSuccess}
              />

              {savingBooking && (
                <View style={memberStyles.syncBox}>
                  <ActivityIndicator size="small" color="#003087" />
                  <Text style={memberStyles.syncText}>
                    Menyimpan pesanan ke database cloud...
                  </Text>
                </View>
              )}

              {saveBookingMessage && !savingBooking && (
                <View style={memberStyles.successBox}>
                  <Text style={memberStyles.successText}>
                    {saveBookingMessage}
                  </Text>
                </View>
              )}

              {saveBookingError && !savingBooking && (
                <View style={memberStyles.errorBox}>
                  <Text style={memberStyles.errorText}>{saveBookingError}</Text>
                </View>
              )}

              <BookingResult bookingData={bookingData} />

              <MyBookingsSection
                bookings={bookings}
                loading={loadingBookings}
                error={bookingsError}
                actionError={bookingActionError}
                onRefresh={() => loadBookings(false)}
                onCancelBooking={handleCancelBooking}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const memberStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    shadowColor: "#003087",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoColumn: {
    flex: 1,
  },
  badge: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0071DC",
    letterSpacing: 1,
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  email: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 78,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonDisabled: {
    opacity: 0.7,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  syncBox: {
    marginTop: 12,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  syncText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E40AF",
  },
  successBox: {
    marginTop: 12,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 10,
    padding: 12,
  },
  successText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#065F46",
  },
  errorBox: {
    marginTop: 12,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 10,
    padding: 12,
  },
  errorText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B91C1C",
  },
});
