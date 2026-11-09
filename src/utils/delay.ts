/**
 * Fungsi helper delay berbasis Promise dan setTimeout.
 * @param ms Durasi delay dalam milidetik.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
