export type TipeKonsol = 'PS4' | 'PS5';

export interface PaketRental {
  id: string;
  namaPaket: string;
  konsol: TipeKonsol;
  harga: number;
  durasi: string;
  fitur: string[];
  isPopuler?: boolean;
}

export interface SkillItem {
  id: string;
  nama: string;
  tingkat: string;
}

export interface PengalamanItem {
  id: string;
  peran: string;
  instansi: string;
  tahun: string;
  deskripsi: string;
}

export interface ProfileData {
  nama: string;
  sebutan: string;
  bio: string;
  lokasi: string;
  email: string;
  telepon: string;
  github: string;
  linkedin: string;
  avatarUrl: string;
}