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
