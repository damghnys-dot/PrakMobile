import { PlayStationGame } from "../types/game";
import { delay } from "../utils/delay";

export async function fetchKatalogGame(): Promise<PlayStationGame[]> {
  const response = await fetch("https://api.sampleapis.com/playstation/games");

  if (!response.ok) {
    throw new Error("Gagal mengambil data katalog game dari server");
  }

  await delay(1000); // Simulasi loading 1 detik

  const data: PlayStationGame[] = await response.json();

  // 1. Buat daftar kata kunci game AAA / Populer yang biasa ada di Rental PS
  const kataKunciPopuler = [
    "Grand Theft Auto",
    "God of War",
    "The Last of Us",
    "Spider-Man",
    "Red Dead Redemption",
    "Resident Evil",
    "Tekken",
    "Crash Bandicoot",
    "Ghost of Tsushima",
    "Horizon Zero Dawn",
  ];

  // 2. Saring (filter) data API, hanya ambil game yang namanya mengandung kata kunci di atas
  const gamePopuler = data.filter((game) =>
    kataKunciPopuler.some((kata) => game.name.includes(kata)),
  );

  // 3. Kembalikan 10 game teratas dari hasil saringan tersebut
  return gamePopuler.slice(0, 10);
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
