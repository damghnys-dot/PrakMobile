import { PlayStationGame } from "../types/game";
import { delay } from "../utils/delay";

export async function fetchKatalogGame(): Promise<PlayStationGame[]> {
  const response = await fetch("https://api.sampleapis.com/playstation/games");

  if (!response.ok) {
    throw new Error("Gagal mengambil data katalog game dari server");
  }

  await delay(1000);

  const data: PlayStationGame[] = await response.json();

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

  const gamePopuler = data.filter((game) =>
    kataKunciPopuler.some((kata) => game.name.includes(kata)),
  );

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

const DUMMY_GAMES: PlayStationGame[] = [
  {
    id: 1,
    name: "God of War Ragnarok",
    genre: ["Action", "Adventure"],
    developers: ["Santa Monica Studio"],
  },
  {
    id: 2,
    name: "Grand Theft Auto V",
    genre: ["Action", "Open World"],
    developers: ["Rockstar North"],
  },
];
export async function fetchApi(): Promise<PlayStationGame[]> {
  await delay(1500);
  return DUMMY_GAMES;
}
export async function fetchDummyKatalogGame(): Promise<PlayStationGame[]> {
  await delay(1500);
  return DUMMY_GAMES;
}
