import { PlayStationGame } from "../types/game";
import { delay } from "../utils/delay";

export async function fetchKatalogGame(): Promise<PlayStationGame[]> {
  const response = await fetch("https://api.sampleapis.com/playstation/games");

  if (!response.ok) {
    throw new Error("Gagal mengambil data katalog game dari server");
  }

  await delay(1000);

  const data: PlayStationGame[] = await response.json();
  return data.slice(0, 10);
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
