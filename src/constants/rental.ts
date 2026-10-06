import { PaketRental, ProfileData, SkillItem, PengalamanItem } from '../types/rental';

export const DAFTAR_PAKET: PaketRental[] = [
  {
    id: '1',
    namaPaket: 'Paket Harian PS4 Spartan',
    konsol: 'PS4',
    harga: 80000,
    durasi: '24 Jam',
    fitur: ['2 Stik Original', 'Bebas Pilih 3 Game', 'Kabel HDMI & Power'],
    isPopuler: false,
  },
  {
    id: '2',
    namaPaket: 'Paket Harian PS5 Spartan Ultra',
    konsol: 'PS5',
    harga: 150000,
    durasi: '24 Jam',
    fitur: ['2 Stik DualSense', 'Akses Semua Game PS5', 'Support 4K TV'],
    isPopuler: true,
  },
  {
    id: '3',
    namaPaket: 'Paket Mingguan PS4 Warrior',
    konsol: 'PS4',
    harga: 450000,
    durasi: '7 Hari',
    fitur: ['2 Stik Original', 'Full Game Account', 'Gratis Antar Jemput'],
    isPopuler: false,
  },
  {
    id: '4',
    namaPaket: 'Paket Mingguan PS5 Spartan King',
    konsol: 'PS5',
    harga: 850000,
    durasi: '7 Hari',
    fitur: ['2 Stik DualSense', 'VIP Support 24/7', 'Gratis Antar Jemput'],
    isPopuler: true,
  },
];

export const PROFILE_DATA: ProfileData = {
  nama: 'Developer Spartan',
  sebutan: 'Frontend Developer & UI/UX Enthusiast',
  bio: 'Seorang pengembang aplikasi yang berdedikasi dalam membangun antarmuka pengguna yang bersih, responsif, dan intuitif.',
  lokasi: 'Ponorogo, Jawa Timur',
  email: 'spartan@rentalps.id',
  telepon: '+62 812 3456 7890',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/5260/5260498.png',
};

export const SKILLS_DATA: SkillItem[] = [
  { id: '1', nama: 'React Native', tingkat: 'Lanjutan' },
  { id: '2', nama: 'TypeScript', tingkat: 'Lanjutan' },
  { id: '3', nama: 'UI/UX Design', tingkat: 'Menengah' },
  { id: '4', nama: 'State Management', tingkat: 'Lanjutan' },
];

export const PENGALAMAN_DATA: PengalamanItem[] = [
  {
    id: '1',
    peran: 'Mobile Developer',
    instansi: 'Spartan Gaming Studio',
    tahun: '2023 - Sekarang',
    deskripsi: 'Mengembangkan aplikasi persewaan PlayStation dan portofolio interaktif.',
  },
];