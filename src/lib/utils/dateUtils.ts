/**
 * Utilitas tanggal berbahasa Indonesia untuk Pelunas
 */

const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const NAMA_BULAN_PENDEK = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

/**
 * Mendapatkan label bulan dan tahun (misal: "November 2024")
 */
export function formatBulanTahun(date: Date, pendek: boolean = false): string {
  const bulan = pendek ? NAMA_BULAN_PENDEK[date.getMonth()] : NAMA_BULAN[date.getMonth()];
  return `${bulan} ${date.getFullYear()}`;
}

/**
 * Menambahkan sejumlah bulan dari tanggal referensi
 */
export function tambahBulan(date: Date, jumlahBulan: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + jumlahBulan);
  return result;
}

/**
 * Menghitung tanggal jatuh tempo berikutnya dari parameter `dueDay` (1 - 31)
 */
export function getNextDueDate(dueDay: number): Date {
  const now = new Date();
  const currentDay = now.getDate();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Batasi dueDay sesuai jumlah hari di bulan sekarang
  const maxDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const targetDayInCurrentMonth = Math.min(dueDay, maxDayCurrentMonth);

  if (currentDay <= targetDayInCurrentMonth) {
    return new Date(currentYear, currentMonth, targetDayInCurrentMonth);
  }

  // Jika hari ini sudah lewat dueDay, maka bulan berikutnya
  const maxDayNextMonth = new Date(currentYear, currentMonth + 2, 0).getDate();
  const targetDayInNextMonth = Math.min(dueDay, maxDayNextMonth);
  return new Date(currentYear, currentMonth + 1, targetDayInNextMonth);
}

/**
 * Menghitung selisih hari ke jatuh tempo berikutnya
 * Return: angka hari (0 = hari ini, positif = sisa hari, negatif = lewat)
 */
export function getDaysUntilDue(dueDay: number): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const nextDue = getNextDueDate(dueDay);
  nextDue.setHours(0, 0, 0, 0);

  const diffTime = nextDue.getTime() - now.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}
