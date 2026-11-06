import { DummyJsonCommentsResponse, UlasanPenyewa } from "../types/ulasan";
import { delay } from "../utils/delay";

export async function fetchUlasanPenyewa(): Promise<UlasanPenyewa[]> {
  const response = await fetch("https://dummyjson.com/comments?limit=6");

  if (!response.ok) {
    throw new Error("Gagal mengambil data ulasan penyewa dari server");
  }

  await delay(1000);

  const data: DummyJsonCommentsResponse = await response.json();
  return data.comments;
}

export function cekKetersediaanUnitPS(
  namaPaket: string,
  durasiHari: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (durasiHari >= 1 && durasiHari <= 14) {
        resolve(
          "Unit " +
            namaPaket +
            " tersedia di gudang untuk sewa " +
            durasiHari +
            " hari. Silakan lanjutkan booking.",
        );
      } else {
        reject(
          "Gagal, durasi sewa " +
            namaPaket +
            " tidak valid. Maksimal penyewaan adalah 14 hari.",
        );
      }
    }, 1500);
  });
}
