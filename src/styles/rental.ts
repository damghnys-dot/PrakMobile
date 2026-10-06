import { StyleSheet } from 'react-native';

export const rentalStyles = StyleSheet.create({
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 30,
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
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 14,
  },
  titleCream: {
    color: '#FFFFFF',
  },
  titleRed: {
    color: '#f7f5f5',
  },
  heroSub: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 340,
    marginBottom: 28,
  },
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
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#f3f0ec',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#f3f0eb',
    fontSize: 14,
    fontWeight: '700',
  },
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
    color: '#f1ece5',
    lineHeight: 32,
  },
  statSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f4f2ed',
    marginTop: -2,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#8A94A6',
    fontWeight: '500',
  },
  paketSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#1A1D26',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#E5C185',
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  paketGrid: {
    gap: 16,
  },
  cardPaket: {
    backgroundColor: '#151821',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222735',
    position: 'relative',
  },
  cardPopuler: {
    borderColor: '#E11D48',
  },
  cardSelected: {
    borderColor: '#E5C185',
    backgroundColor: '#1A1E2B',
  },
  badgePopuler: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#E11D48',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePopulerText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  namaPaket: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  badgeKonsol: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bgPs4: {
    backgroundColor: '#1E3A8A',
  },
  bgPs5: {
    backgroundColor: '#0284C7',
  },
  textKonsol: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  hargaText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#E5C185',
  },
  durasiText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  fiturContainer: {
    marginBottom: 16,
    gap: 6,
  },
  fiturText: {
    fontSize: 12,
    color: '#CBD5E1',
  },
  btnPilih: {
    backgroundColor: '#1E202B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3142',
  },
  btnPilihActive: {
    backgroundColor: '#E5C185',
    borderColor: '#E5C185',
  },
  btnPilihText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  }
});

export const profileStyles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#E5C185',
    marginBottom: 12,
  },
  namaText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sebutanText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E5C185',
    marginBottom: 10,
  },
  badgeLokasi: {
    backgroundColor: '#161922',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D3142',
    marginBottom: 12,
  },
  badgeLokasiText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  bioText: {
    fontSize: 12,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#151821',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#1E202B',
  },
  tabText: {
    fontSize: 13,
    color: '#8A94A6',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#E5C185',
    fontWeight: '700',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  gridContainer: {
    gap: 10,
  },
  cardItem: {
    backgroundColor: '#151821',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#222735',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  badgeTingkat: {
    backgroundColor: '#1E202B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2D3142',
  },
  badgeTingkatText: {
    color: '#E5C185',
    fontSize: 11,
    fontWeight: '600',
  },
  listContainer: {
    gap: 12,
  },
  cardPengalaman: {
    backgroundColor: '#151821',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222735',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  peranText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  tahunText: {
    fontSize: 11,
    color: '#E5C185',
    fontWeight: '600',
  },
  instansiText: {
    fontSize: 12,
    color: '#E11D48',
    fontWeight: '600',
    marginBottom: 8,
  },
  deskripsiText: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
  },
});

export const rentalHeaderStyles = StyleSheet.create({
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
    color: '#fffefb',
    letterSpacing: 2,
    lineHeight: 24,
  },
  brandSubText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f4f2ee',
    letterSpacing: 2,
    marginTop: -2,
  },
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
});