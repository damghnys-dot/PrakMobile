import React, { useRef, useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {
  SkillItem,
  PengalamanItem,
  PaketRental,
} from '../types/rental';

import {
  PROFILE_DATA,
  SKILLS_DATA,
  PENGALAMAN_DATA,
  DAFTAR_PAKET,
} from '../constants/rental';

import {
  rentalHeaderStyles as styles,
  profileStyles,
} from '../styles/rental';

import { BerandaRental } from '../features/rental/BerandaRental';

import BookingForm, {
  BookingData,
} from '../components/BookingForm';

import BookingResult from '../components/BookingResult';

export default function Index() {
  const [activeMenu, setActiveMenu] = useState('Beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;

  const [activeProfileTab, setActiveProfileTab] =
    useState<'keahlian' | 'pengalaman'>('keahlian');

  const [selectedPaket, setSelectedPaket] =
    useState<PaketRental | null>(null);

  const [bookingData, setBookingData] =
    useState<BookingData | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const [bookingY, setBookingY] = useState(0);
  const [paketY, setPaketY] = useState(0);

  const menuItems = ['Beranda', 'Tentang', 'Paket'];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToBooking = () => {
    const targetY = bookingY > 0 ? bookingY : 800;
    if (activeMenu === 'Tentang') {
      setActiveMenu('Beranda');
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

  const { selectedPaketId } = useLocalSearchParams<{ selectedPaketId?: string }>();

  useEffect(() => {
    if (selectedPaketId) {
      const paketIdStr = Array.isArray(selectedPaketId)
        ? selectedPaketId[0]
        : selectedPaketId;
      const found = DAFTAR_PAKET.find(
        (p) => String(p.id) === String(paketIdStr)
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
    if (activeMenu === 'Tentang') {
      setActiveMenu('Beranda');
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

    if (item === 'Beranda') {
      setActiveMenu('Beranda');
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (item === 'Paket') {
      scrollToPaket();
    } else if (item === 'Tentang') {
      setActiveMenu('Tentang');
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  const handleSelectPaketFromBeranda = (paket: PaketRental) => {
    setSelectedPaket(paket);
    scrollToBooking();
  };

  const handleSelectPaketFromBooking = (paket: PaketRental) => {
    setSelectedPaket(paket);
  };

  const handleBookingSuccess = (data: BookingData) => {
    setBookingData(data);

    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: bookingY,
        animated: true,
      });
    }, 100);
  };

  const aboutContent = (
    <View style={profileStyles.profileWrapper}>
      <View style={profileStyles.profileCard}>
        <View style={profileStyles.topAccentBar} />

        <View style={profileStyles.profileCardBody}>
          <View style={profileStyles.badgePartner}>
            <Text style={profileStyles.badgePartnerText}>
              TENTANG KAMI
            </Text>
          </View>

          <Text style={profileStyles.namaText}>
            {PROFILE_DATA.nama}
          </Text>

          <Text style={profileStyles.sebutanText}>
            {PROFILE_DATA.sebutan}
          </Text>

          <View style={profileStyles.badgeLokasi}>
            <Text style={profileStyles.badgeLokasiText}>
              {PROFILE_DATA.lokasi}
            </Text>
          </View>

          <Text style={profileStyles.bioText}>
            {PROFILE_DATA.bio}
          </Text>

          <View style={profileStyles.infoColumnsContainer}>
            <View style={profileStyles.infoColumn}>
              <Text style={profileStyles.infoColumnLabel}>
                JAM OPERASIONAL
              </Text>
              <Text style={profileStyles.infoColumnValue}>
                Buka 24 Jam (Setiap Hari)
              </Text>
            </View>

            <View style={profileStyles.infoColumn}>
              <Text style={profileStyles.infoColumnLabel}>
                SISTEM SEWA
              </Text>
              <Text style={profileStyles.infoColumnValue}>
                Main di Tempat & Bawa Pulang
              </Text>
            </View>

            <View style={profileStyles.infoColumn}>
              <Text style={profileStyles.infoColumnLabel}>
                AREA LAYANAN
              </Text>
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
            activeProfileTab === 'keahlian' &&
              profileStyles.tabButtonActive,
          ]}
          onPress={() => setActiveProfileTab('keahlian')}
          activeOpacity={0.85}
        >
          <Text
            style={[
              profileStyles.tabText,
              activeProfileTab === 'keahlian' &&
                profileStyles.tabTextActive,
            ]}
          >
            Fasilitas & Unit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            profileStyles.tabButton,
            activeProfileTab === 'pengalaman' &&
              profileStyles.tabButtonActive,
          ]}
          onPress={() => setActiveProfileTab('pengalaman')}
          activeOpacity={0.85}
        >
          <Text
            style={[
              profileStyles.tabText,
              activeProfileTab === 'pengalaman' &&
                profileStyles.tabTextActive,
            ]}
          >
            Keunggulan Layanan
          </Text>
        </TouchableOpacity>
      </View>

      <View style={profileStyles.contentSection}>
        {activeProfileTab === 'keahlian' ? (
          <View style={profileStyles.gridContainer}>
            {SKILLS_DATA.map((skill: SkillItem, index: number) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
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
                      <Text style={profileStyles.cardTitle}>
                        {skill.nama}
                      </Text>
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
            {PENGALAMAN_DATA.map(
              (item: PengalamanItem) => (
                <View
                  key={item.id}
                  style={profileStyles.cardPengalaman}
                >
                  <View style={profileStyles.cardHeader}>
                    <Text style={profileStyles.peranText}>
                      {item.peran}
                    </Text>

                    <Text style={profileStyles.tahunText}>
                      {item.tahun}
                    </Text>
                  </View>

                  <Text style={profileStyles.instansiText}>
                    {item.instansi}
                  </Text>

                  <Text style={profileStyles.deskripsiText}>
                    {item.deskripsi}
                  </Text>
                </View>
              ),
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0071DC"
      />

      <View style={styles.headerContainer}>
        <View style={styles.topHeaderBar}>
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />

            <View style={styles.brandTitleContainer}>
              <Text style={styles.brandMainText}>
                TRIO
              </Text>

              <Text style={styles.brandSubText}>
                PLAYSTATION
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.hamburgerButton,
              isMenuOpen &&
                styles.hamburgerButtonActive,
            ]}
            onPress={toggleMenu}
            activeOpacity={0.85}
          >
            <Text style={styles.hamburgerText}>
              {isMenuOpen ? '✕' : '☰'}
            </Text>
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.floatingDropdownMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() =>
                  handleSelectMenu(item)
                }
                style={[
                  styles.dropdownItem,
                  activeMenu === item &&
                    styles.dropdownItemActive,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    activeMenu === item &&
                      styles.dropdownTextActive,
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
        contentContainerStyle={{ backgroundColor: '#F4F6F9', flexGrow: 1 }}
      >
        {activeMenu === 'Tentang' ? (
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
              style={{ maxWidth: 680, width: '100%', alignSelf: 'center' }}
              onLayout={(event) => {
                setBookingY(
                  event.nativeEvent.layout.y,
                );
              }}
            >
              <BookingForm
                daftarPaket={
                  DAFTAR_PAKET
                }
                selectedPaket={selectedPaket}
                onSelectPaket={handleSelectPaketFromBooking}
                onBookingSuccess={
                  handleBookingSuccess
                }
              />

              <BookingResult
                bookingData={bookingData}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}