import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';

// Import Types & Constants
import { SkillItem, PengalamanItem } from '../types/rental';
import { PROFILE_DATA, SKILLS_DATA, PENGALAMAN_DATA } from '../constants/rental';

// Import Styles (Termasuk rentalHeaderStyles yang baru dipindah)
import { rentalHeaderStyles as styles, profileStyles } from '../styles/rental';
import { BerandaRental } from '../features/rental/BerandaRental';

export default function Index() {
  const [activeMenu, setActiveMenu] = useState('Beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'keahlian' | 'pengalaman'>('keahlian');

  const menuItems = ['Beranda', 'Tentang', 'Paket'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSelectMenu = (item: string) => {
    setActiveMenu(item);
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0A0C10"
      />

      {/* HEADER / NAVBAR APP */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeaderBar}>
          <View style={styles.brandContainer}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5260/5260498.png' }} style={styles.logoImage} />
            <View style={styles.brandTitleContainer}>
              <Text style={styles.brandMainText}>TRIO</Text>
              <Text style={styles.brandSubText}>PLAYSTATION</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.hamburgerButton, isMenuOpen && styles.hamburgerButtonActive]} onPress={toggleMenu}>
            <Text style={styles.hamburgerText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.dropdownMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item} onPress={() => handleSelectMenu(item)} style={[styles.dropdownItem, activeMenu === item && styles.dropdownItemActive]}>
                <Text style={[styles.dropdownText, activeMenu === item && styles.dropdownTextActive]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeMenu === 'Tentang' ? (
          /* KONTEN TENTANG / PROFIL */
          <View style={{ paddingBottom: 40 }}>
            <View style={profileStyles.headerSection}>
              <Image source={{ uri: PROFILE_DATA.avatarUrl }} style={profileStyles.avatarImage} />
              <Text style={profileStyles.namaText}>{PROFILE_DATA.nama}</Text>
              <Text style={profileStyles.sebutanText}>{PROFILE_DATA.sebutan}</Text>
              <View style={profileStyles.badgeLokasi}>
                <Text style={profileStyles.badgeLokasiText}>📍 {PROFILE_DATA.lokasi}</Text>
              </View>
              <Text style={profileStyles.bioText}>{PROFILE_DATA.bio}</Text>
            </View>

            {/* TAB NAVIGASI */}
            <View style={profileStyles.tabContainer}>
              <TouchableOpacity style={[profileStyles.tabButton, activeProfileTab === 'keahlian' && profileStyles.tabButtonActive]} onPress={() => setActiveProfileTab('keahlian')}>
                <Text style={[profileStyles.tabText, activeProfileTab === 'keahlian' && profileStyles.tabTextActive]}>Keahlian</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[profileStyles.tabButton, activeProfileTab === 'pengalaman' && profileStyles.tabButtonActive]} onPress={() => setActiveProfileTab('pengalaman')}>
                <Text style={[profileStyles.tabText, activeProfileTab === 'pengalaman' && profileStyles.tabTextActive]}>Pengalaman</Text>
              </TouchableOpacity>
            </View>

            <View style={profileStyles.contentSection}>
              {activeProfileTab === 'keahlian' ? (
                <View style={profileStyles.gridContainer}>
                  {SKILLS_DATA.map((skill: SkillItem) => (
                    <View key={skill.id} style={profileStyles.cardItem}>
                      <Text style={profileStyles.cardTitle}>{skill.nama}</Text>
                      <View style={profileStyles.badgeTingkat}>
                        <Text style={profileStyles.badgeTingkatText}>{skill.tingkat}</Text>
                      </View>
                    </View>
                  ))}
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
                      <Text style={profileStyles.deskripsiText}>{item.deskripsi}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ) : (
          /* KONTEN RENTAL (BERANDA / PAKET) */
          <BerandaRental />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
