import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
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

  const [activeProfileTab, setActiveProfileTab] =
    useState<'keahlian' | 'pengalaman'>('keahlian');

  const [bookingData, setBookingData] =
    useState<BookingData | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const [bookingY, setBookingY] = useState(0);

  const menuItems = ['Beranda', 'Tentang', 'Paket'];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectMenu = (item: string) => {
    setActiveMenu(item);
    setIsMenuOpen(false);

    if (item === 'Beranda') {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }

    if (item === 'Paket') {
      scrollRef.current?.scrollTo({
        y: 300,
        animated: true,
      });
    }

    if (item === 'Tentang') {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
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
    <View style={{ paddingBottom: 40 }}>
      <View style={profileStyles.headerSection}>
        <Image
          source={{ uri: PROFILE_DATA.avatarUrl }}
          style={profileStyles.avatarImage}
        />

        <Text style={profileStyles.namaText}>
          {PROFILE_DATA.nama}
        </Text>

        <Text style={profileStyles.sebutanText}>
          {PROFILE_DATA.sebutan}
        </Text>

        <View style={profileStyles.badgeLokasi}>
          <Text style={profileStyles.badgeLokasiText}>
            📍 {PROFILE_DATA.lokasi}
          </Text>
        </View>

        <Text style={profileStyles.bioText}>
          {PROFILE_DATA.bio}
        </Text>
      </View>

      <View style={profileStyles.tabContainer}>
        <TouchableOpacity
          style={[
            profileStyles.tabButton,
            activeProfileTab === 'keahlian' &&
              profileStyles.tabButtonActive,
          ]}
          onPress={() => setActiveProfileTab('keahlian')}
        >
          <Text
            style={[
              profileStyles.tabText,
              activeProfileTab === 'keahlian' &&
                profileStyles.tabTextActive,
            ]}
          >
            Keahlian
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            profileStyles.tabButton,
            activeProfileTab === 'pengalaman' &&
              profileStyles.tabButtonActive,
          ]}
          onPress={() => setActiveProfileTab('pengalaman')}
        >
          <Text
            style={[
              profileStyles.tabText,
              activeProfileTab === 'pengalaman' &&
                profileStyles.tabTextActive,
            ]}
          >
            Pengalaman
          </Text>
        </TouchableOpacity>
      </View>

      <View style={profileStyles.contentSection}>
        {activeProfileTab === 'keahlian' ? (
          <View style={profileStyles.gridContainer}>
            {SKILLS_DATA.map((skill: SkillItem) => (
              <View
                key={skill.id}
                style={profileStyles.cardItem}
              >
                <Text style={profileStyles.cardTitle}>
                  {skill.nama}
                </Text>

                <View style={profileStyles.badgeTingkat}>
                  <Text style={profileStyles.badgeTingkatText}>
                    {skill.tingkat}
                  </Text>
                </View>
              </View>
            ))}
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
        backgroundColor="#0A0C10"
      />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeaderBar}>
          <View style={styles.brandContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5260/5260498.png',
              }}
              style={styles.logoImage}
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
          >
            <Text style={styles.hamburgerText}>
              ⋮
            </Text>
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.dropdownMenu}>
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

      {/* CONTENT */}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
      >
        {activeMenu === 'Tentang' ? (
          aboutContent
        ) : (
          <>
            <BerandaRental />

            {/* BOOKING FORM - ANGGOTA 3 */}
            <View
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
                onBookingSuccess={
                  handleBookingSuccess
                }
              />

              {/* BOOKING RESULT - ANGGOTA 3 */}
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