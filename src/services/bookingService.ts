import { supabase } from "../lib/supabase";
import { Booking } from "../types/booking";

export function parseDurasiHari(durasi: string): number {
  const lower = durasi.toLowerCase();
  const match = lower.match(/\d+/);
  const angka = match ? parseInt(match[0], 10) : 1;

  if (lower.includes("hari")) {
    return Math.max(1, angka);
  }
  if (lower.includes("jam")) {
    return Math.max(1, Math.ceil(angka / 24));
  }
  return Math.max(1, angka);
}

export interface CreateBookingPayload {
  userId: string;
  paketNama: string;
  durasiHari: number;
  totalHarga: number;
  status?: string;
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        user_id: payload.userId,
        paket_nama: payload.paketNama,
        durasi_hari: payload.durasiHari,
        total_harga: payload.totalHarga,
        status: payload.status ?? "Menunggu Konfirmasi",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Booking;
}

export async function fetchUserBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Booking[];
}

export async function deleteBookingById(bookingId: string): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }
}
