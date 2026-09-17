/**
 * Format angka ke mata uang Rupiah Indonesia (locale id-ID)
 * Contoh: 1450000 -> "Rp1.450.000"
 */
export function formatRupiah(amount: number, options?: { showZeroAsDash?: boolean; compact?: boolean }): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "Rp0";
  }

  if (amount === 0 && options?.showZeroAsDash) {
    return "-";
  }

  if (options?.compact && Math.abs(amount) >= 1_000_000) {
    const inMillions = amount / 1_000_000;
    const formatted = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(inMillions);
    return `Rp${formatted} jt`;
  }

  const formattedNumber = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return `Rp${formattedNumber}`;
}

/**
 * Format persentase bunga per bulan / per tahun
 * Contoh: 2.95 -> "2,95%"
 */
export function formatPersen(rate: number): string {
  if (isNaN(rate) || rate === null || rate === undefined) {
    return "0%";
  }
  return `${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rate)}%`;
}
