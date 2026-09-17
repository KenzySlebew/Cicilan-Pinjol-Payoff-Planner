import { z } from "zod";

export const debtCategorySchema = z.enum(
  ["paylater", "kartu_kredit", "pinjol", "kpr_kendaraan", "lainnya"],
  {
    errorMap: () => ({ message: "Pilih salah satu kategori cicilan yang sesuai" }),
  }
);

export const debtFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama cicilan minimal 2 karakter (contoh: Shopee PayLater, KK BCA)" })
    .max(50, { message: "Nama cicilan maksimal 50 karakter" }),
  category: debtCategorySchema,
  balance: z
    .number({ invalid_type_error: "Saldo pokok harus berupa angka" })
    .positive({ message: "Saldo pokok utang harus lebih besar dari Rp0" })
    .max(500_000_000, { message: "Nominal saldo melebihi batas wajar simulasi (maksimal Rp500 juta)" }),
  interestRatePerMonth: z
    .number({ invalid_type_error: "Bunga per bulan harus berupa angka" })
    .min(0, { message: "Bunga tidak boleh negatif (isi 0% jika cicilan tanpa bunga)" })
    .max(100, { message: "Bunga bulanan maksimal 100%" }),
  minimumPayment: z
    .number({ invalid_type_error: "Cicilan minimal harus berupa angka" })
    .positive({ message: "Cicilan wajib / minimum payment harus lebih besar dari Rp0" })
    .max(100_000_000, { message: "Cicilan minimal melebihi batas wajar" }),
  dueDay: z
    .number({ invalid_type_error: "Tanggal jatuh tempo harus berupa angka" })
    .int({ message: "Tanggal jatuh tempo harus bilangan bulat" })
    .min(1, { message: "Tanggal jatuh tempo minimal tanggal 1" })
    .max(31, { message: "Tanggal jatuh tempo maksimal tanggal 31" }),
});

export type DebtFormData = z.infer<typeof debtFormSchema>;
