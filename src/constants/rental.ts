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
  nama: 'TRIO PlayStation',
  sebutan: 'Pusat Rental & Game Corner Terlengkap',
  bio: 'Penyedia layanan rental PlayStation berkualitas dengan konsol terbaru, pilihan game populer terlengkap, serta tempat main yang nyaman dan seru.',
  lokasi: 'Malang, Jawa Timur, Indonesia',
  email: 'info@trioplaystation.id',
  telepon: '+62 812 3456 7890',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/5260/5260498.png',
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: '1',
    nama: 'PlayStation 5 & PS4 Pro',
    tingkat: 'Tersedia',
    deskripsi: 'Konsol generasi terbaru dengan performa grafis maksimal',
  },
  {
    id: '2',
    nama: 'Koleksi Game Terbaru & FIFA/FC',
    tingkat: 'Lengkap',
    deskripsi: 'Update rutin judul game bola, aksi, dan co-op terbaru',
  },
  {
    id: '3',
    nama: 'Ruangan AC & TV 4K HDR',
    tingkat: 'Fasilitas Utama',
    deskripsi: 'Kenyamanan bermain dengan visual jernih dan pendingin ruangan prima',
  },
  {
    id: '4',
    nama: 'Snack & Drink Corner',
    tingkat: 'Tersedia',
    deskripsi: 'Pilihan camilan dan minuman dingin segar menemani sesi bermain',
  },
  {
    id: '5',
    nama: 'Parkiran Luas & Aman',
    tingkat: 'Gratis',
    deskripsi: 'Area parkir kendaraan lega untuk motor dan mobil dilengkapi pantauan keamanan',
  },
  {
    id: '6',
    nama: 'Musholla Nyaman',
    tingkat: 'Tersedia',
    deskripsi: 'Tempat ibadah yang bersih, tenang, dan dilengkapi peralatan sholat lengkap',
  },
  {
    id: '7',
    nama: 'Area Smoking & Non-Smoking',
    tingkat: 'Terpisah',
    deskripsi: 'Pemisahan ruangan khusus merokok dan bebas asap rokok demi kenyamanan bersama',
  },
  {
    id: '8',
    nama: 'Kamar Mandi Bersih',
    tingkat: 'Bersih',
    deskripsi: 'Fasilitas toilet yang selalu terjaga kebersihannya dan wangi setiap saat',
  },
  {
    id: '9',
    nama: 'Free Wi-Fi High Speed',
    tingkat: 'Gratis',
    deskripsi: 'Koneksi internet cepat dan stabil untuk mabar online maupun akses internet pengunjung',
  },
  {
    id: '10',
    nama: 'Sofa Gaming & Ruang VIP',
    tingkat: 'Nyaman',
    deskripsi: 'Tempat duduk sofa empuk ergonomis agar tetap nyaman meski bermain berjam-jam',
  },
];

export const PENGALAMAN_DATA: PengalamanItem[] = [
  {
    id: '1',
    peran: 'Penyedia Layanan Entertainment',
    instansi: 'TRIO PlayStation',
    tahun: '2023 - Sekarang',
    deskripsi:
      'Melayani ratusan gamer setiap bulan dengan pengalaman main game terbaik, turnamen eSports lokal, dan rental harian/mingguan.',
  },
  {
    id: '2',
    peran: 'Jaminan Unit & Stik Original',
    instansi: 'Standar Kualitas',
    tahun: 'Unit Terawat',
    deskripsi:
      'Seluruh konsol dan stik DualSense/DualShock selalu dicek dan dibersihkan secara berkala sebelum disewakan.',
  },
  {
    id: '3',
    peran: 'Layanan Antar Jemput Unit',
    instansi: 'Khusus Area Malang',
    tahun: 'Layanan Cepat',
    deskripsi:
      'Kemudahan sewa bawa pulang dengan pengantaran dan instalasi langsung ke rumah atau kos pelanggan.',
  },
  {
    id: '4',
    peran: 'Harga Bersahabat & Promo Mahasiswa',
    instansi: 'Tarif Hemat & Fleksibel',
    tahun: 'Ramah Kantong',
    deskripsi:
      'Tersedia harga sewa harian dan mingguan yang terjangkau khusus pelajar dan mahasiswa di Malang, lengkap dengan promo member setia.',
  },
  {
    id: '5',
    peran: 'Bebas Request & Update Game',
    instansi: 'Katalog Game Selalu Baru',
    tahun: 'Bebas Pilih',
    deskripsi:
      'Pelanggan bebas memilih judul game favorit sebelum unit disewa. Seluruh game olahraga, petualangan, dan co-op selalu di-update ke versi terbaru.',
  },
  {
    id: '6',
    peran: 'Dukungan Teknis & Garansi Tukar Unit',
    instansi: 'Bantuan Cepat 24/7',
    tahun: 'Siaga 24 Jam',
    deskripsi:
      'Jika terjadi kendala teknis pada konsol atau stik saat masa sewa berlangsung, tim kami siap membantu atau mengganti unit dengan cepat tanpa biaya tambahan.',
  },
];