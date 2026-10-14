export const NAMA_BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }

  return dp[m][n];
}

export function parseMonthFromWord(word: string): number | null {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean || clean.length < 2) return null;

  if (clean.startsWith('jan')) return 0;
  if (clean.startsWith('feb') || clean.startsWith('peb')) return 1;
  if (clean.startsWith('mar')) return 2;
  if (clean.startsWith('apr')) return 3;
  if (clean.startsWith('mei') || clean.startsWith('may')) return 4;
  if (clean.startsWith('jun')) return 5;
  if (clean.startsWith('jul')) return 6;
  if (clean.startsWith('agu') || clean.startsWith('ags') || clean.startsWith('aug')) return 7;
  if (clean.startsWith('sep')) return 8;
  if (clean.startsWith('okt') || clean.startsWith('oct')) return 9;
  if (clean.startsWith('nov') || clean.startsWith('nop')) return 10;
  if (clean.startsWith('des') || clean.startsWith('dec')) return 11;

  let bestMonth: number | null = null;
  let bestDist = 3;

  for (let i = 0; i < NAMA_BULAN.length; i++) {
    const dist = levenshteinDistance(clean, NAMA_BULAN[i].toLowerCase());
    if (dist < bestDist) {
      bestDist = dist;
      bestMonth = i;
    }
  }

  return bestMonth;
}

function createValidDate(year: number, month: number, day: number): Date | null {
  if (month < 0 || month > 11 || day < 1 || day > 31) return null;
  const d = new Date(year, month, day);
  if (
    d.getFullYear() === year &&
    d.getMonth() === month &&
    d.getDate() === day
  ) {
    return d;
  }
  return null;
}

export function parseIndonesianDate(input: string): Date | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 1. Numeric format: YYYY-MM-DD or YYYY/MM/DD
  const isoMatch = trimmed.match(/^(\d{4})[-/. ](\d{1,2})[-/. ](\d{1,2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    return createValidDate(year, month, day);
  }

  // 2. Numeric format: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const numMatch = trimmed.match(/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{4})$/);
  if (numMatch) {
    const day = parseInt(numMatch[1], 10);
    const month = parseInt(numMatch[2], 10) - 1;
    const year = parseInt(numMatch[3], 10);
    return createValidDate(year, month, day);
  }

  // 3. Mixed words and numbers (e.g. "16 Oktober 2026", "16 okt 2026", "16 oktokber 2026")
  const tokens = trimmed.split(/[\s,/-]+/).filter(Boolean);
  let day: number | null = null;
  let month: number | null = null;
  let year: number | null = null;

  for (const token of tokens) {
    const num = parseInt(token, 10);
    if (!isNaN(num) && /^\d+$/.test(token)) {
      if (token.length === 4 && num >= 1900 && num <= 2100) {
        year = num;
      } else if (token.length === 2 && num >= 20 && num <= 99 && year === null && day !== null) {
        year = 2000 + num;
      } else if (num >= 1 && num <= 31 && day === null) {
        day = num;
      } else if (token.length === 4 && year === null) {
        year = num;
      }
    } else {
      const parsedM = parseMonthFromWord(token);
      if (parsedM !== null && month === null) {
        month = parsedM;
      }
    }
  }

  if (day !== null && month !== null) {
    const finalYear = year !== null ? year : new Date().getFullYear();
    return createValidDate(finalYear, month, day);
  }

  return null;
}

export function formatTanggalIndonesia(date: Date): string {
  const day = date.getDate();
  const month = NAMA_BULAN[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function hitungBatasPengembalian(
  tanggalSewa: string | Date,
  durasiPaket: string
): string | null {
  const date =
    tanggalSewa instanceof Date
      ? tanggalSewa
      : parseIndonesianDate(tanggalSewa);

  if (!date) return null;

  const returnDate = new Date(date.getTime());
  const durasiLower = durasiPaket.toLowerCase();

  let daysToAdd = 1;
  let suffix = '';

  if (durasiLower.includes('24 jam') || durasiLower.includes('harian')) {
    daysToAdd = 1;
    suffix = ' (Maks. 24 Jam)';
  } else if (durasiLower.includes('7 hari') || durasiLower.includes('mingguan')) {
    daysToAdd = 7;
    suffix = '';
  } else {
    const hariMatch = durasiLower.match(/(\d+)\s*hari/);
    const jamMatch = durasiLower.match(/(\d+)\s*jam/);
    if (hariMatch) {
      daysToAdd = parseInt(hariMatch[1], 10);
      suffix = '';
    } else if (jamMatch) {
      const jam = parseInt(jamMatch[1], 10);
      daysToAdd = Math.max(1, Math.ceil(jam / 24));
      suffix = ` (Maks. ${durasiPaket})`;
    }
  }

  returnDate.setDate(returnDate.getDate() + daysToAdd);
  return `${formatTanggalIndonesia(returnDate)}${suffix}`;
}
