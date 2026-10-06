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

  const menuDropdown = isMenuOpen
    ? React.createElement(
        View,
        { style: styles.dropdownMenu },
        ...menuItems.map((item) =>
          React.createElement(
            TouchableOpacity,
            {
              key: item,
              onPress: () => handleSelectMenu(item),
              style: [styles.dropdownItem, activeMenu === item && styles.dropdownItemActive],
            },
            React.createElement(
              Text,
              { style: [styles.dropdownText, activeMenu === item && styles.dropdownTextActive] },
              item,
            ),
          ),
        ),
      )
    : null;

  const aboutContent = React.createElement(
    View,
    { style: { paddingBottom: 40 } },
    React.createElement(
      View,
      { style: profileStyles.headerSection },
      React.createElement(Image, {
        source: { uri: PROFILE_DATA.avatarUrl },
        style: profileStyles.avatarImage,
      }),
      React.createElement(Text, { style: profileStyles.namaText }, PROFILE_DATA.nama),
      React.createElement(Text, { style: profileStyles.sebutanText }, PROFILE_DATA.sebutan),
      React.createElement(
        View,
        { style: profileStyles.badgeLokasi },
        React.createElement(Text, { style: profileStyles.badgeLokasiText }, `📍 ${PROFILE_DATA.lokasi}`),
      ),
      React.createElement(Text, { style: profileStyles.bioText }, PROFILE_DATA.bio),
    ),
    React.createElement(
      View,
      { style: profileStyles.tabContainer },
      React.createElement(
        TouchableOpacity,
        {
          style: [profileStyles.tabButton, activeProfileTab === 'keahlian' && profileStyles.tabButtonActive],
          onPress: () => setActiveProfileTab('keahlian'),
        },
        React.createElement(
          Text,
          { style: [profileStyles.tabText, activeProfileTab === 'keahlian' && profileStyles.tabTextActive] },
          'Keahlian',
        ),
      ),
      React.createElement(
        TouchableOpacity,
        {
          style: [profileStyles.tabButton, activeProfileTab === 'pengalaman' && profileStyles.tabButtonActive],
          onPress: () => setActiveProfileTab('pengalaman'),
        },
        React.createElement(
          Text,
          { style: [profileStyles.tabText, activeProfileTab === 'pengalaman' && profileStyles.tabTextActive] },
          'Pengalaman',
        ),
      ),
    ),
    React.createElement(
      View,
      { style: profileStyles.contentSection },
      activeProfileTab === 'keahlian'
        ? React.createElement(
            View,
            { style: profileStyles.gridContainer },
            ...SKILLS_DATA.map((skill: SkillItem) =>
              React.createElement(
                View,
                { key: skill.id, style: profileStyles.cardItem },
                React.createElement(Text, { style: profileStyles.cardTitle }, skill.nama),
                React.createElement(
                  View,
                  { style: profileStyles.badgeTingkat },
                  React.createElement(Text, { style: profileStyles.badgeTingkatText }, skill.tingkat),
                ),
              ),
            ),
          )
        : React.createElement(
            View,
            { style: profileStyles.listContainer },
            ...PENGALAMAN_DATA.map((item: PengalamanItem) =>
              React.createElement(
                View,
                { key: item.id, style: profileStyles.cardPengalaman },
                React.createElement(
                  View,
                  { style: profileStyles.cardHeader },
                  React.createElement(Text, { style: profileStyles.peranText }, item.peran),
                  React.createElement(Text, { style: profileStyles.tahunText }, item.tahun),
                ),
                React.createElement(Text, { style: profileStyles.instansiText }, item.instansi),
                React.createElement(Text, { style: profileStyles.deskripsiText }, item.deskripsi),
              ),
            ),
          ),
    ),
  );

  return React.createElement(
    SafeAreaView,
    { style: styles.container },
    React.createElement(StatusBar, {
      barStyle: 'light-content',
      backgroundColor: '#0A0C10',
    }),
    React.createElement(
      View,
      { style: styles.headerContainer },
      React.createElement(
        View,
        { style: styles.topHeaderBar },
        React.createElement(
          View,
          { style: styles.brandContainer },
          React.createElement(Image, {
            source: { uri: 'https://cdn-icons-png.flaticon.com/512/5260/5260498.png' },
            style: styles.logoImage,
          }),
          React.createElement(
            View,
            { style: styles.brandTitleContainer },
            React.createElement(Text, { style: styles.brandMainText }, 'TRIO'),
            React.createElement(Text, { style: styles.brandSubText }, 'PLAYSTATION'),
          ),
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: [styles.hamburgerButton, isMenuOpen && styles.hamburgerButtonActive],
            onPress: toggleMenu,
          },
          React.createElement(Text, { style: styles.hamburgerText }, '⋮'),
        ),
      ),
      menuDropdown,
    ),
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false },
      activeMenu === 'Tentang' ? aboutContent : React.createElement(BerandaRental, null),
    ),
  );
}
